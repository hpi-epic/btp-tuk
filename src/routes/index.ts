import _ from "lodash";
import axios, { Axios, AxiosError } from 'axios';
import type { ODataRequest, PurchasingView } from "$lib/interface/odata"
import { useProxy } from "$lib/proxy";
import { ENV } from "$lib/environment";

// if we are in production mode, accordingly, using the SAP BTP, we need to use the Proxy
if(ENV.MODE == 'production'){
    await useProxy(axios)
}

/**
 * Get HTTP Method accessable via '/__data.json'. Svelte uses this function automatically when accessing '/' via index.html
 */
export const get = async () => {
    try {
        const data: ODataRequest<PurchasingView> = await purchasingViewGet();

        return {
            status: 200,
            headers: {},
            body: {
                data: data.d.results // svelte syntax -> this makes the results accessable in the exported variable "data" in index.svelte 
            }
        }
    } catch (e){
        console.log("Cannot access Purchasing View on SAP HANA. Did you set the credentials as environment correctly? " + e)
        return {
            body: {
                status: 501,
                headers: {},
                data: [] // svelte syntax -> this makes the results accessable in the exported variable "data" in index.svelte 
            }
        }
    }
}

/**
 * Get purchasing view from SAP HANA Odata service.
 * 
 * @note When using the SAP BTP / production mode proxy informations are automatically added to the request configuration via lib/proxy.ts
 * @returns 
 */
const purchasingViewGet = async function (): Promise<ODataRequest<PurchasingView>> {
    return new Promise((resolve, reject) => {
        const targetUrl = "http://vm-he4-hana.eaalab.hpi.uni-potsdam.de:8000/odataservice/api.xsodata/purchasing_view/?$format=json"
        const config = {
            headers: {
                'cache-control': 'public, max-age=3600',
            },
            auth: {
                username: ENV.ODATA_HPI_HANA_USERNAME,
                password: ENV.ODATA_HPI_HANA_PASSWORD
            }
        }
        axios.get(targetUrl, config)
            .then(response => {resolve(response.data)})
            .catch(error => {reject(error)})
    })
}