<script lang="ts">
    //@ts-ignore svelte-table does not have any typings and we do not want to add them manuelly
    import SvelteTable from "svelte-table";

    import type { PurchasingView } from '$lib/interface/odata';

    // Svelte automatically executes the Get() function in index.ts
    export let data: PurchasingView[];

    // Prepare the table
    const columns = [
        {
            key: "COMPANY",
            title: "Vendor",
            value: (v: PurchasingView) => v.COMPANY,
            sortable: true,
            filterOptions: (rows: PurchasingView[]) => {
                let letrs: {[index: string]: {name: string, value: string}} = {};
                rows.forEach(row => {
                    let letr: string = row.COMPANY.charAt(0);
                    
                    if (letrs[letr] === undefined)
                        letrs[letr] = {
                            name: `${letr.toUpperCase()}`,
                            value: letr.toLowerCase()
                        };
                });

                letrs = Object.entries(letrs)
                    .sort()
                    .reduce((o: {[index: string]: {name: string, value: string}}, [k, v]) => ((o[k] = v), o), {});

                return Object.values(letrs);
            },
            filterValue: (v: PurchasingView) => v.COMPANY.charAt(0).toLowerCase()
        },
        {
            key: "TOTAL_REVENUE",
            title: "Total Revenue",
            value: (v: PurchasingView) => v.TOTAL_REVENUE + " $",
            sortable: true,
        },
    ]
</script>

<h1>Vendor Total Purchasing</h1>
<SvelteTable
    rows={data}
    columns={columns}
    classNameTable='table-auto border-collapse border border-slate-500 border-separate border-spacing-2 border border-slate-500'
    classNameThead='border border-slate-600'
/>

<style>
    h1 {
        color: white;
        background-color: rgb(210 95 43);
        padding: 0.75rem;
        margin: 1rem;
        width: 100%;
        border-radius: 1rem;
        font-size: 1.25rem;
        margin-top: 2rem;
    }
</style>