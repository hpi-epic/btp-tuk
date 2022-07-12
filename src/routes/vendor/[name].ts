import _ from "lodash";
import axios from 'axios';
import type { ODataRequest, VendorsView } from "$lib/interface/odata"
import { useProxy } from "$lib/proxy";
import { ENV } from "$lib/environment";

//if(ENV.MODE == 'production'){
//    await useProxy(axios)
//}

/*
export const get = async (params: {params:{name: string}}) => {
    return {
        body: {
            name: params.params.name,
            data: [{VENDOR: "HAUS", TOTAL_EXPENSES: 20}, {VENDOR: "MAUS", TOTAL_EXPENSES: 10}]
        }
    }
}
*/

export async function get(params: {params: {name: string}}) { 
    try {
        const data: ODataRequest<VendorsView> = await vendorsViewGet( params.params.name);

        return {
            status: 200,
            headers: {},
            body: {
                data: data.d.results,
                name: params.params.name
            }
        }
    } catch (e){
        console.log("Cannot access Vendor View. " + e)
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
 const vendorsViewGet = async function (name: string): Promise<ODataRequest<VendorsView>> {

    return new Promise((resolve, reject) => {
        const targetUrl = `http://vm-he4-hana.eaalab.hpi.uni-potsdam.de:8000/odataservice/api.xsodata/vendors_view/?$format=json&$filter=COMPANY eq '${name}'`
        const config = {
            headers: {
                'cache-control': 'public, max-age=3600',
            },
            auth: {
                username: ENV.ODATA_HPI_HANA_USERNAME,
                password: ENV.ODATA_HPI_HANA_PASSWORD
            }
        }
        console.log(targetUrl)
        axios.get(targetUrl, config)
            .then(response => {resolve(response.data)})
            .catch(error => {reject(error)})
    })
}