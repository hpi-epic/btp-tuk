<script lang="ts">
    // populated with data from the endpoint
    export let tables: any;
</script>


<div>
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    <h1>{tables.value}</h1>
</div>

