<script lang="ts">
    //@ts-ignore svelte-table does not have any typings and we do not want to add them manuelly
    import type { PurchasingView } from '$lib/interface/odata';
    import Table from "./_table.svelte";

    // Svelte executes the Get() function in index.ts automatically
    export let data: PurchasingView[];
</script>


<div class="flex flex-col space-y-6">
    <h1 class="text-xl font-bold dark:text-white">Purchasing View</h1>
    <p class="dark:text-gray-400">{JSON.stringify(data)}</p>

    <Table columns={['COMPANY', 'TOTAL_REVENUE']} rows={data}/>
</div>