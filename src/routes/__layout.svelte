
<script>
  import "../app.css";
  import Navbar from "./layout/_navbar.svelte"
  import Footer from "./layout/_footer.svelte"
  import Navigation from "./layout/_navigation.svelte";
</script>


<Navbar/>
  <main>
    <div class="container mx-auto mt-6 mb-4 px-6">
      <Navigation/>
    </div>
    <div class='container mx-auto mb-6 bg-gray-200 dark:bg-gray-800 p-6 rounded-lg'>
      <slot></slot>
    </div>
  </main>
<Footer/>

<style>
</style>