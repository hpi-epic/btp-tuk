<script>
    import Logo from './_logo.svelte'
</script>
<footer class="p-4 bg-white shadow md:px-6 md:py-8 dark:bg-gray-800">
    <div class="sm:flex sm:items-center sm:justify-between">
        <a href="/" class="flex items-center mb-4 sm:mb-0">
            <div class="mr-3 h-8">
                <Logo size={40}/>
            </div>
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vendor Management</span>
        </a>
        <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
                <a href="/" class="mr-4 hover:underline md:mr-6 ">Home</a>
            </li>
            <li>
                <a href="https://github.com/hpi-epic/btp-tuk" class="hover:underline">GitHub</a>
            </li>
        </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="/" class="hover:underline">HPI</a>. All Rights Reserved.
    </span>
</footer>