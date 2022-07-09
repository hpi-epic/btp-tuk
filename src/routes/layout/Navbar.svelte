
<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
    <a href="https://hpi.de/" class="flex items-center">
        <svg class="mr-3 h-6 sm:h-9" width={35} height={35}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173 173">
            <path fill="#b10439" d="M0 173.1h151.5V21.6H0v151.5z"></path>
            <path fill="#f9a51b" d="M43.3 129.8h129.9V0H43.3v129.8z"></path>
            <path fill="#e2671d" d="M43.3 129.8h108.2V21.6H43.3v108.2z"></path>
            <path fill="#fff" d="M133.8 38.4h-5c-.5 0-1 .4-1 .9v35.5c0 .6.5 1 1 1h5c.6 0 1-.4 1-1V39.3c0-.5-.4-.9-1-.9zM115 50.1c0 4-2.1 6-7.6 6L103 56V44a62 62 0 0 1 4.4-.2c5.1 0 7.6 1.6 7.6 5.8v.5zM107.4 38c-3.6 0-7.2.2-9.8.6-1 .2-1.7.5-1.7 1.5v34.7c0 .6.5 1 1.1 1h5c.6 0 1-.4 1-1V61.7l4.4.2c7.8 0 14.6-2.9 14.6-11.8v-.5c0-8.9-6.8-11.6-14.6-11.6zm-20.1.4h-5c-.6 0-1 .4-1 .9v13.9H67V39.3c0-.5-.5-.9-1-.9h-5c-.6 0-1 .4-1 .9v35.5c0 .6.4 1 1 1h5c.5 0 1-.4 1-1V59.4h14.3v15.4c0 .6.4 1 1 1h5c.5 0 1-.4 1-1V39.3c0-.5-.5-.9-1-.9z"></path>
        </svg>
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Vendor Management</span>
    </a>
    <div class="flex md:order-2">
        <label for="checked-toggle" class="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="checked-toggle" class="sr-only peer" checked>
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark mode</span>
        </label>
        <button data-collapse-toggle="mobile-menu-4" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-4" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
    <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
        <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
                <a href="#" class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white" aria-current="page">Home</a>
            </li>
            <li>
                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
        </ul>
        </div>
    </div>
</nav>

<script>
    import Logo from "./Logo.svelte"
</script>