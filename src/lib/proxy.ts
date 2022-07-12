
import type { Axios, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { ConnectivityCredentials, VCAPServices } from './interface/btp';

/**
 * Add a request interceptor to axios instance to add proxy information to request
 * 
 * @param axios 
 */
export const useProxy = async (axios_instance: Axios): Promise<void> => {
    // Get proxy configuration inclduing access_token, host and port of proxy
    const proxyConfig = await prepareProxy()

    // Add proxy configuration before a request is executed
    const onRequest = (config: AxiosRequestConfig) => {
        return {
            ...config,
            ...proxyConfig // add proxy configuration
        }
    }

    // Attach interceptor to axios
    axios_instance.interceptors.request.use(onRequest)
}


/**
 * Create proxy configuration for axios request using credentials provided by VCAP_SERVICES.
 * Executes HTTP request "getProxyAccessToken" in order to get the access_token for the proxy.
 * 
 * @requires VCAP_SERVICES must be present as environment variable (which is the case in cloud foundry development)
 * @returns proxy configuration
 */
const prepareProxy = async (): Promise<AxiosRequestConfig> => {

    // Check if required environment variables are present
    if (!process.env.VCAP_SERVICES){
        throw Error(`
            Cannot find VCAP_SERVICES environment variable which are required for the proxy.
            VCAP_Services are only present in production mode.`
        )
    }

    const VCAP_SERVICES: VCAPServices = JSON.parse(process.env.VCAP_SERVICES)
    const connectivityCredentials = VCAP_SERVICES.connectivity[0].credentials;

    // Get access token  
    const accessToken = await getProxyAccessToken(connectivityCredentials)

    return {
        headers: {
            'Proxy-Authorization': 'Bearer ' + accessToken,
            'cache-control': 'public, max-age=3600',
        },
        proxy: {
            host: connectivityCredentials.onpremise_proxy_host,
            port: Number(connectivityCredentials.onpremise_proxy_port)
        },
    }
}

/**
 * Execute HTTP request against the SAP BTP Token Service to get an access token for the connectivity service.
 * 
 * @param credentials  
 * @returns access token useable for the connectivity service of the SAP BTP 
 */
const getProxyAccessToken = async function (credentials: ConnectivityCredentials): Promise<string> {
    return new Promise((resolve, reject) => {
        const tokenUrl = credentials.token_service_url + '/oauth/token?grant_type=client_credentials&response_type=token'
        const headerAuthCredentials = Buffer.from(credentials.clientid + ':' + credentials.clientsecret ).toString("base64")
        const config = {
            headers: {
                Authorization: "Basic " + headerAuthCredentials,
                'cache-control': 'public, max-age=3600',
            }
        }
        axios.get(tokenUrl, config)
            .then(response => resolve(response.data.access_token))
            .catch(error => reject(error))
    })
}