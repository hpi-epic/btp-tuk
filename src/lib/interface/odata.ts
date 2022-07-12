// Interfaces of SAP HANA OData requests for this exercise

export interface ODataRequest<T> {
    d: Data<T>;
}

export interface Data<T> {
    results: T[];
}

export interface Object {
    __metadata:    Metadata;
}

export interface PurchasingView extends Object {
    COMPANY:       string;
    TOTAL_EXPENSES: string;
}

export interface VendorsView extends Object {
    COMPANY:       string;
    VENDOR:        string;
    TOTAL_EXPENSES: string;
}

export interface Metadata {
    type: Type;
    uri:  string;
}

export enum Type {
    OdataserviceAPIPurchasingViewType = "odataservice.api.purchasing_viewType",
}
