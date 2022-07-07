
<div class="container">
  <Header/>
  <main>
   <slot></slot>
  </main>
</div>


<style>
.container {
  display: flex;
  align-items: center;
  margin: 1rem;
  flex-flow: column;
}

main {
  max-width: 600px;
  width: 100%;
}

:global(body){
  background-color: rgb(248 250 252);
  font-family: sans-serif;
}
</style>

<script>
  import Header from "./header/header.svelte"
</script>