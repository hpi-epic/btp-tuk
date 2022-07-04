# BTP Exercise
## Goal of the Exercise

This exercise should guide you through the SAP business technology platform (BTP). The goal of the exercise is to give you an impression of cloud platforms based on the example of the BTP.

## Exercise

### Account creation

Before we can create services on the cloud platform, we have to create a free account on the SAP BTP.  

0. In case you do not have an SAP BTP Account: Please [register](https://www.sap.com/products/business-technology-platform/trial.html?trial=https%3A%2F%2Fwww.sap.com%2Fregistration%2Ftrial.908cb719-0e03-421c-a091-daca045f0acc.html) for a free trail account.
1. [Login](https://account.hana.ondemand.com/) into an account for the SAP BTP (You can skip the process of validating your phone number)
2. Select US East (VA) - AWS as region for our trail account.
3. Wait until your account was fully created. 
4. Go to *Go To Your Trial Account*.

### CLI Installation

In most cases you'll use the command line tool if you interact with cloud platforms since it is way faster than using the UI of AWS, Google Platform or Azure.
The BTP uses cloud foundry to deploy applications.

1. Follow the [instructions](https://github.com/cloudfoundry/cli/wiki/V8-CLI-Installation-Guide)
2. Open your terminal and execute following command to login into our account. 
````
> cf login
API endpoint: https://api.cf.us10.hana.ondemand.com
Email: <your account mail>
Password: <your pw>
````
# https://answers.sap.com/questions/13548322/getting-error-while-installing-hana-client.html
# use node 14
![](img/cf-api.png)

### Optional: Clean-up 
- delete account
- delete cli