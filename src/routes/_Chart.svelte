<div class="h-96">
    <canvas bind:this={chartCanvas}></canvas>
</div>  

<script lang="ts">
	import Chart from 'chart.js/auto/auto.js';
	import { onMount } from 'svelte';
    import { themeDark } from "./../stores"

	export let yValues: number[]
	export let xValues: string[]

	let ctx: CanvasRenderingContext2D
	let chartCanvas: HTMLCanvasElement

	onMount(async () => {
        ctx = chartCanvas.getContext('2d')!
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                    labels: xValues,
                    datasets: [{
                            label: 'Revenue',
                            backgroundColor: 'rgb(210, 95, 43)',
                            borderColor: 'rgb(163, 34, 55)',
                            data: yValues
                    }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            color: "rgb(156 163 175)" //"rgb(31 41 55)"
                        },
                        grid: {
                            color: "rgb(55 65 81)"
                        }
                    },
                    y: {
                        ticks: {
                            color: "rgb(156 163 175)" // "rgb(31 41 55)"
                        },
                        grid: {
                            color: "rgb(55 65 81)"
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
		});

        themeDark.subscribe((isDarkmode) => {
            if(isDarkmode){
                // Tick color 
                chart.options.scales.x.ticks.color = "rgb(31 41 55)"
                chart.options.scales.y.ticks.color = "rgb(31 41 55)"

                // Grid color 
                chart.options.scales.x.grid.color = "rgb(209 213 219)"
                chart.options.scales.y.grid.color = "rgb(209 213 219)"
            } else {
                // Tick color
                chart.options.scales.x.ticks.color = "rgb(156 163 175)"
                chart.options.scales.y.ticks.color = "rgb(156 163 175)"

                // Grid color 
                chart.options.scales.x.grid.color = "rgb(55 65 81)"
                chart.options.scales.y.grid.color = "rgb(55 65 81)"
            }
            chart.update()
        })
	});

</script>