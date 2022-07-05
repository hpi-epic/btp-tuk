// @ts-ignore
import hdb from "hdb";
import _ from "lodash";
import axios from 'axios';


//@ts-ignore
const VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES);
const conSrvCred = VCAP_SERVICES.connectivity[0].credentials;

// const conSrvCred = {
//     token_service_url:"https://58f7db29trial.authentication.us10.hana.ondemand.com",
//     clientid: "sb-clonea2a8fe67513042199aa4cea99849a38a!b86869|destination-xsappname!b62",
//     clientsecret: "f6cc505c-aab8-4c47-bf2b-467ff0a27e12$rfzYoROsSb7iBFRw5P1lpsEoiBHWTsYmpQ5iRpS7bkc=",
//     onpremise_proxy_host:"connectivityproxy.internal.cf.us10.hana.ondemand.com",
//     onpremise_proxy_http_port:"20003"
// }


export const get = async () => {

    let tables = new Promise(async (resolve, reject) => {

        try {
            const connJwtToken = await _fetchJwtToken(conSrvCred.token_service_url, conSrvCred.clientid, conSrvCred.clientsecret);
            console.log("token", connJwtToken)
            const result = await _callOnPremHttp(conSrvCred.onpremise_proxy_host, conSrvCred.onpremise_proxy_http_port, connJwtToken);
            console.log("all good")
            resolve(result);
        } catch (e) {
            console.log(e)
            console.log("fucked up");
            reject(e);
        }

    })


    // var client = hdb.createClient({
    //     host     : 'vm-he4-hana.eaalab.hpi.uni-potsdam.de',
    //     port     : 30015,
    //     user     : 'STUDENT2021',
    //     password : 'Student2021'
    // });

    // client.on('error', function (err: any) {
    //     console.error('Network connection error', err);
    // });

    // const query = `Select table_name from tables where schema_name = 'SAPHPB';`
    // let tables = new Promise((resolve, reject) => {
    //     client.connect(function (err: any) {
    //         if (err) {
    //             console.error('Connection error', err);
    //             reject(err)
    //         }

    //         client.exec(query, function (err: any, rows: any) {
    //             client.end();

    //             if (err) {
    //                 console.error('Execute error:', err);
    //                 reject(err)
    //             }

    //             resolve(
    //                 _.map(rows, "TABLE_NAME")
    //             )
    //         });
    //     });
    // })

    return {
        body: {
            tables: await tables

        }
    }
}
const _fetchJwtToken = async function (oauthUrl: string, oauthClient: string, oauthSecret: string) {
    return new Promise((resolve, reject) => {
        const tokenUrl = oauthUrl + '/oauth/token?grant_type=client_credentials&response_type=token'
        const config = {
            headers: {
                Authorization: "Basic " + Buffer.from(oauthClient + ':' + oauthSecret).toString("base64")
            }
        }
        axios.get(tokenUrl, config)
            .then(response => {
                resolve(response.data.access_token)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const _callOnPremHttp = async function (connProxyHost: any, connProxyPort: any, connJwtToken: unknown) {
    return new Promise((resolve, reject) => {
        const targetUrl = "http://vm-he4-hana.eaalab.hpi.uni-potsdam.de:4004/say/hello(to='Tobias')"
        const config = {
            headers: {
                'Proxy-Authorization': 'Bearer ' + connJwtToken
            },
            proxy: {
                host: connProxyHost,
                port: connProxyPort
            }
        }
        axios.get(targetUrl, config)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}