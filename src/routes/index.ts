// @ts-ignore
import hdb from "hdb";
import _ from "lodash";

export const get = async () => {
    var client = hdb.createClient({
        host     : 'vm-he4-hana.eaalab.hpi.uni-potsdam.de',
        port     : 30015,
        user     : 'STUDENT2021',
        password : 'Student2021'
    });

    client.on('error', function (err: any) {
        console.error('Network connection error', err);
    });

    const query = `Select table_name from tables where schema_name = 'SAPHPB';`
    let tables = new Promise((resolve, reject) => {
        client.connect(function (err: any) {
            if (err) {
                console.error('Connection error', err);
                reject(err)
            }
            
            client.exec(query, function (err: any, rows: any) {
                client.end();
    
                if (err) {
                    console.error('Execute error:', err);
                    reject(err)
                }

                resolve(
                    _.map(rows, "TABLE_NAME")
                )
            });
        });
    })

    return {
        body: {
            tables: await tables
        }
    }
}