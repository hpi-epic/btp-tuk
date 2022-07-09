
<script>
  import "../app.css";
  import Navbar from "./layout/Navbar.svelte"
  import Footer from "./layout/Footer.svelte"
import Navigation from "./layout/Navigation.svelte";
</script>


<Navbar/>
  <main>
    <div class="mx-12 mt-6 mb-4 px-6">
      <Navigation/>
    </div>
    <div class='mx-12 mb-6 bg-gray-800 p-6 rounded-lg'>
      <slot></slot>
    </div>
  </main>
<Footer/>

<style>
  :global(body){
    background-color: #111827
  }
</style>