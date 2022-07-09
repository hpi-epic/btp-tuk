<script lang="ts">
    import "@carbon/styles/css/styles.css";
    import "@carbon/charts/styles.css";
    import { BarChartSimple } from "@carbon/charts-svelte";

    export let data: {group: string, value: number}[]
    export let height: number
</script>
  
<BarChartSimple
    data={data}
    options={{
        title: "Simple bar (discrete)",
        height: {height} + "px",
        axes: {
            left: { mapsTo: "value" },
            bottom: { mapsTo: "group", scaleType: "labels" },
        },
}}
/>