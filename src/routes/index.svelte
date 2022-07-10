<script lang="ts">
    //@ts-ignore svelte-table does not have any typings and we do not want to add them manuelly
    import type { PurchasingView } from '$lib/interface/odata';
    import Table from "./_Table.svelte";
    import Chart from "./_Chart.svelte";
    import _ from 'lodash';

    // Svelte executes the Get() function in index.ts automatically
    export let data: PurchasingView[];
</script>


<div class="flex flex-col space-y-6">
    <h1 class="text-xl font-bold dark:text-white">Purchasing View</h1>
    <p class="dark:text-gray-400">

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hendrerit non nisl ut gravida. Phasellus suscipit placerat ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl odio, volutpat at erat eu, vestibulum feugiat erat. Nullam urna urna, volutpat faucibus nisi ut, pulvinar imperdiet erat. Nulla tempor accumsan libero eget condimentum. Nulla facilisi. Quisque sed elementum ex, eu condimentum justo.
        
        Aenean vitae venenatis libero. Mauris ex justo, auctor ac mattis in, fermentum rhoncus mi. Praesent tincidunt metus ex, vel lobortis tellus sagittis et. Suspendisse eget est imperdiet, interdum est sit amet, pellentesque lorem. Phasellus dui mi, blandit faucibus tortor non, suscipit sollicitudin leo. Morbi dictum semper magna, non tincidunt arcu accumsan vel. Proin commodo ipsum enim, eget varius neque sagittis sit amet. Pellentesque consequat vel sem at vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla lobortis dapibus posuere. Suspendisse eu dui viverra ipsum scelerisque consequat id et risus. Maecenas elementum suscipit ex, vel maximus quam varius sollicitudin. Maecenas auctor sapien ut metus ullamcorper hendrerit sit amet vitae turpis. Nam vel imperdiet justo. Fusce ut sollicitudin enim. Morbi pellentesque venenatis vulputate. Praesent ut est orci. Duis et tempor lorem. Orci varius natoque penatibus.
    </p>

    <Chart xValues={_.map(data, "COMPANY")} yValues={_.map(data, "TOTAL_REVENUE").map(Number)}/>
    <Table columns={['COMPANY', 'TOTAL_REVENUE']} rows={data}/>
</div>