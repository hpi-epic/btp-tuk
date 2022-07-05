// @ts-ignore
import _ from "lodash";
import axios from 'axios';
import { environment } from "$lib/environment"

//@ts-ignore
const VCAP_SERVICES = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : JSON.parse(environment.VCAP_SERVICES).VCAP_SERVICES;
const conSrvCred = VCAP_SERVICES.connectivity[0].credentials;

export const get = async () => {

    const proxy_access_token = await getProxyAccessToken(conSrvCred.token_service_url, conSrvCred.clientid, conSrvCred.clientsecret);
    const result = getVBAKData(conSrvCred.onpremise_proxy_host, conSrvCred.onpremise_proxy_http_port, proxy_access_token);

    return {
        body: {
            tables: result
        }
    }
}

const getProxyAccessToken = async function (oauthUrl: string, oauthClient: string, oauthSecret: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const tokenUrl = oauthUrl + '/oauth/token?grant_type=client_credentials&response_type=token'
        const config = {
            headers: {
                Authorization: "Basic " + Buffer.from(oauthClient + ':' + oauthSecret).toString("base64")
            }
        }
        axios.get(tokenUrl, config)
            .then(response => resolve(response.data.access_token))
            .catch(error => {
                console.log("Failed to fetch access token for proxy.")
                reject(error)
            })
    })
}

const getVBAKData = async function (connProxyHost: any, connProxyPort: any, connJwtToken: string) {
    return new Promise((resolve, reject) => {
        const targetUrl = "http://vm-he4-hana.eaalab.hpi.uni-potsdam.de:8000/odataservice/hello.xsodata/VBAK/?$format=json&$top=10"
        const config = {
            headers: {
                'Proxy-Authorization': 'Bearer ' + connJwtToken
            },
            auth: {
                username: 'STUDENT2021',
                password: 'Student2021'
            }
        }
        axios.get(targetUrl, config)
            .then(response => {resolve(_.map(response.data.d.results,'VBELN'))})
            .catch(error => {reject(error)})
    })
}
