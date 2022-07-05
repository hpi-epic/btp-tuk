

import HttpsProxyAgent from "https-proxy-agent";
import _ from "lodash";
import axios from 'axios';
import { environment } from "$lib/environment"

// @ts-ignore Get VCAP_SERVICES from environment -> use process.env for Cloudfoundry and svelte module for development
const VCAP_SERVICES = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : JSON.parse(environment.VCAP_SERVICES).VCAP_SERVICES;
const connectionCredentials = VCAP_SERVICES.connectivity[0].credentials;

export const get = async () => {
    try {
        const proxy_access_token = await getAccessToken(connectionCredentials.token_service_url, connectionCredentials.clientid, connectionCredentials.clientsecret)
        const vbak = await _callOnPremHttp(connectionCredentials.onpremise_proxy_host, connectionCredentials.onpremise_proxy_http_port, proxy_access_token);
        
        return {
            body: {
                vbak: vbak.d.results
            }
        }
    } catch {
        console.log("No")
    }
}

const getAccessToken = async function (oauthUrl: string, oauthClient: string, oauthSecret: string): Promise<string> {

    const tokenUrl = oauthUrl + '/oauth/token?grant_type=client_credentials&response_type=token'
    const tokenResponse = await fetch(tokenUrl, {
        headers: {
            Authorization: "Basic " + Buffer.from(oauthClient + ':' + oauthSecret).toString("base64")
        }
    })
    const data = await tokenResponse.json() as {access_token: string, token_type: string, expires_in: number, scope: string, jti: string};
    return data.access_token
}

const _callOnPremHttp = async function (connProxyHost: string, connProxyPort: string, proxy_access_token: string): Promise<any> {
    const proxyAgent = new HttpsProxyAgent.HttpsProxyAgent(connProxyHost + ":" + connProxyPort);
    const username = "STUDENT2021"
    const password = "Student2021"
    const targetUrl = "http://vm-he4-hana.eaalab.hpi.uni-potsdam.de:8000/odataservice/hello.xsodata/VBAK/?$format=json&$top=100"

    const dataResponse = await fetch(targetUrl, {
        headers: {
            'Proxy-Authorization': `Bearer ${proxy_access_token}`,
            Authorization: "Basic " + Buffer.from(username + ':' + password).toString("base64")
        },
        // @ts-ignore
        agent: proxyAgent
    })
    return await dataResponse.json()
}

