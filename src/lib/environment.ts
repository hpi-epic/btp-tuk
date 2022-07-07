const getVariable = (key: string) => {
    if (process.env.NODE_ENV == 'production'){
        return process.env[key]
    }
    return import.meta.env[key]
}

export const ENV = {
    ODATA_HPI_HANA_USERNAME: getVariable('VITE_ODATA_HPI_HANA_USERNAME'),
    ODATA_HPI_HANA_PASSWORD: getVariable('VITE_ODATA_HPI_HANA_PASSWORD')
};

