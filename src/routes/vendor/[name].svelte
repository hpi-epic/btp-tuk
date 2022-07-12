<script lang="ts">
    import Chart from "../_chart.svelte"
    import _ from "lodash"
    import type { VendorsView } from "$lib/interface/odata";


    export let name: string
    export let data: VendorsView[]
</script>

<div class="flex flex-col space-y-6">
    <h1 class="text-xl font-bold dark:text-white">{name}</h1>
    <p class="text-gray-800 dark:text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et erat ac diam suscipit rhoncus id imperdiet justo. Nulla accumsan, justo ut aliquet blandit, tortor ipsum condimentum magna, in consectetur diam massa vitae risus. Vivamus iaculis feugiat dolor non cursus. Sed eu dolor vitae felis maximus finibus non ultricies risus. Sed in rutrum libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam in lorem tortor. Aenean accumsan lorem sit amet ultricies laoreet. Morbi sed sem purus. Donec vitae ipsum viverra, porttitor erat et, ultrices mi. Proin elementum libero vel ante laoreet eleifend. Nunc pretium.
    </p>

    <Chart xValues={_.map(data, "VENDOR")} yValues={_.map(data, "TOTAL_EXPENSES").map(Number)}/>
</div>