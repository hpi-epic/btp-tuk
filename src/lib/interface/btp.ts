// Interfaces for the environment variable VCAP_SERVICES accessible when the application
// is deployed on the SAP BTP 

export interface VCAPServices {
    connectivity: Connectivity[];
    destination:  Destination[];
}

export interface Connectivity {
    label:            string;
    provider:         null;
    plan:             string;
    name:             string;
    tags:             string[];
    instance_guid:    string;
    instance_name:    string;
    binding_guid:     string;
    binding_name:     null;
    credentials:      ConnectivityCredentials;
    syslog_drain_url: null;
    volume_mounts:    any[];
}

export interface ConnectivityCredentials {
    tenantmode:                  string;
    clientid:                    string;
    token_service_domain:        string;
    "credential-type":           string;
    token_service_url:           string;
    xsappname:                   string;
    onpremise_proxy_ldap_port:   string;
    onpremise_socks5_proxy_port: string;
    clientsecret:                string;
    onpremise_proxy_http_port:   string;
    url:                         string;
    onpremise_proxy_host:        string;
    uaadomain:                   string;
    onpremise_proxy_port:        string;
    verificationkey:             string;
    identityzone:                string;
    tenantid:                    string;
    onpremise_proxy_rfc_port:    string;
}

export interface Destination {
    label:            string;
    provider:         null;
    plan:             string;
    name:             string;
    tags:             string[];
    instance_guid:    string;
    instance_name:    string;
    binding_guid:     string;
    binding_name:     null;
    credentials:      DestinationCredentials;
    syslog_drain_url: null;
    volume_mounts:    any[];
}

export interface DestinationCredentials {
    tenantmode:        string;
    clientid:          string;
    "credential-type": string;
    xsappname:         string;
    clientsecret:      string;
    uri:               string;
    url:               string;
    uaadomain:         string;
    instanceid:        string;
    verificationkey:   string;
    identityzone:      string;
    tenantid:          string;
}

export interface ProxyConfig {
    access_token: string,

}
