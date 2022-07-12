<script lang="ts">
    import { goto } from "$app/navigation";

    export let columns: string[]
    export let rows: PurchasingView[]
    export let key: string
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {#each columns as column}
                    <th scope="col" class="px-6 py-3">
                        {column}
                    </th>
                {/each}
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Show</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {#each rows as row}
                <tr class="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600" on:click={() => goto('/vendor/' + row[key])}>
                    {#each columns as column}
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {row[column]}
                        </th>
                    {/each}
                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
