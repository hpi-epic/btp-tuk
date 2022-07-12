
<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
    <a href="/" class="flex items-center">
        <div class="mr-3 h-6 sm:h-9">
            <Logo size={35}/>
        </div>
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Vendor Management</span>
    </a>
    <div class="flex md:order-2">

        <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5" on:click={onChangeMode}>
            <span class="flex">
                <svg id="theme-toggle-dark-icon" class:hidden={!isDarkmode} class="mx-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                <svg id="theme-toggle-light-icon" class:hidden={isDarkmode} class="mx-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            {isDarkmode ? "Dark Mode" : "Light Mode"}
            </span>
        </button>
        

    </div>
    <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
        <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
                <a href="/" class="block py-2 pr-4 pl-3 dark:text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white" aria-current="page">Home</a>
            </li>
            <li>
                <a href="/" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">GitHub</a>
            </li>
        </ul>
        </div>
    </div>
</nav>

<script>
    import { onMount } from "svelte";
    import { themeDark } from "../../stores"

    let isDarkmode = false

    onMount(async () => {
        themeDark.subscribe((value) => {
            isDarkmode = value
            if (value) {
                document.documentElement.classList.remove('dark');
            } else {
                document.documentElement.classList.add('dark');
            }
        })
        themeDark.set(window.document.documentElement.classList.contains('dark'))
    })

    import Logo from "./Logo.svelte"

    const onChangeMode = () => {
        themeDark.update((current) => !current)
    }

</script>