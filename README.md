# BTP Exercise

## Goal of the Exercise

This exercise should give a first impression of cloud platforms using the example of the SAP business technology platform (BTP). The SAP BTP is a Platform as a Service (PaaS) offering by SAP that helps you to connect data and business processes of your enterprise. This exercise aims to show you the basic functionalities of the SAP BTP before our block week.

> Note: We only use the SAP BTP as an example for cloud platforms. Other cloud platforms such as Google Platform, Microsoft Azure, and Amazon AWS are also capable of enhancing businesses.

## Exercise

Many enterprises use a hybrid setup using on-premise and cloud-based software simultaneously. Applications deployed in the cloud often access data persisted in the on-premise systems of a company. Imagine HPI's purchasing department wants to create a cloud application to visualize how much money they spend on every vendor, extending the functionality of their ERP system by using the SAP BTP.

In this exercise, we deploy a small application to a cloud platform that requests data from an on-premise SAP HANA instance. The instance is located at the HPI and only accessible within the network or via a VPN. You will learn how to deploy an application to the SAP BTP, which uses data relying on an on-premise SAP HANA database.

Most cloud applications consist of multiple microservices. The architecture of our exercise is divided into two parts: first, services and applications replying at the HPI, and second your applications deployed on the SAP BTP.
![](img/structure.png)

In the following, we briefly describe the functionality of each application/ service of the exercise architecture. 

**HPI1: SAP HANA** The SAP HANA is an in-memory database developed by SAP. The SAP HANA is hosted at ``vm-reset.eaalab.hpi.uni-potsdam.de``. The SAP HANA stores multiple tables from the ERP S/4HANA, which should be familiar to you from exercise 1. Instead of querying the database via TCP, this exercise uses a so-called OData Service to access data via HTTP.

**HPI2: OData Service**  An OData Service is a RESTful API that follows the [Open Data Protocol standard](https://www.odata.org/). The standard exists in multiple versions. However, we use OData version 2. For your convenience, the OData Service is already implemented as a so-called XS Service directly on the SAP HANA. The API is accessible via ``http://vm-he4-hana.eaalab.hpi.uni-potsdam.de:8000/odataservice/api.xsodata/``. Currently, we have two different collections: [purchasing_view](http://vm-he4-hana.eaalab.hpi.uni-potsdam.de:8000/odataservice/api.xsodata/purchasing_view/?$format=json) and [vendors_view](http://vm-he4-hana.eaalab.hpi.uni-potsdam.de:8000/odataservice/api.xsodata/vendors_view/?$format=json). We will use both in our application.

> Note: The address is only reachable within the HPI network.

**HPI3: SAP Cloud Connector**
[SAP Cloud Connector (SCC)](https://help.sap.com/docs/CP_CONNECTIVITY/cca91383641e40ffbe03bdc78f00f681/e6c7616abb5710148cfcf3e75d96d596.html) is software that connects the SAP BTP and existing on-premise systems. We have deployed one instance on the same machine as our SAP HANA. This exercise will connect your SAP BTP subaccount to the SCC to access the HPI on-premise SAP HANA. The SCC is accessible at ``https://vm-he4-hana.eaalab.hpi.uni-potsdam.de:8443/``.

**BTP1: SvelteKit Application**
[SvelteKit](https://kit.svelte.dev/) is a framework for building web applications. You will use it to develop an application that queries data from the on-premise SAP HANA and deploy it to the SAP BTP.

**BTP2: Connectivity Service**
SAP BTP's Connectivity service allows you to establish secure and reliable connectivity between your cloud applications and on-premise systems running in isolated networks.

In this exercise, we create one service (provided by SAP) and one application (that you have to program) on the SAP BTP. 

### Prerequisites
To work on the exercise you need:

- [Node 16 including NPM](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/)
- An editor (we recommend [Visual Studio Code](https://code.visualstudio.com/))
- A phone number (for the SAP BTP account creation)

### Account creation

Before creating services on the cloud platform, we have to create a free account on the SAP BTP.  

0. In case you do not have an SAP BTP Account: Please [register](https://www.sap.com/products/business-technology-platform/trial.html?trial=https%3A%2F%2Fwww.sap.com%2Fregistration%2Ftrial.908cb719-0e03-421c-a091-daca045f0acc.html) for a free trial account.
1. [Login](https://account.hana.ondemand.com/) into an account for the SAP BTP
2. Select *US East (VA) - AWS* as the region for your trial account.
3. Wait until your account has been created. 
4. Click on *Go To Your Trial Account*.

### Create Connectivity Service
To access the SAP HANA DB using the SAP Cloud Connector hosted at our research group, you need to create an instance of BTP's *Connectivity Service*.
1. After clicking on *Go To Your Trial Account*, you have to enter your subaccount:
    ![](img/trial-account.png)
2. Here, you can use the navigation bar to open the *Service Marketplace*:
    ![](img/service-marketplace.png)
3. Search for *Connectivity Service* and click on *Create*:
    ![](img/create-connectivity-service.png)
4. Follow the setup (you don't have to enter parameters) and remember the instance name (you will need it later):
    ![](img/setup.png)
5. Check the status under *Instances and Subscriptions* (status should be *created* after a few moments):
    ![](img/instances.png)
6. Voilà!

### Connect Your BTP Account To The On-prom Cloud Connector
As described above, we use the [SCC](https://blogs.sap.com/2022/02/03/cloud-connector-explained-in-simple-terms/) to enable SAP cloud products to connect to the on-premise systems in our landscape. It tunnels the requests.

Please follow these steps to configure the SCC to connect to your SAP BTP account:

> Please note that you all share one instance since the SAP Cloud Connector does not support proper user management. Do not delete the subaccounts of your fellow students!

1. Get your SAP BTP subaccount ID:
    1. In case you do not see your subaccount view: Go to your [BTP](https://account.hanatrial.ondemand.com) Trial Account: Click on your subaccount:
    ![](img/trial-account.png)
    1. Copy/ Remember/ save your subaccount ID:
    ![](img/subaccount-id.png)

2. Connect the SCC instance with your subaccount:

   1. The SCC instance running at EPIC is available [here](https://vm-he4-hana.eaalab.hpi.uni-potsdam.de:8443/). Please open the website and use the following credentials to log in:
    ````
    User Name:  student
    Password:   Student2022
    ````

    > Note: Remember that you have to be in the HPI network or use a VPN to access the instance.
    1. Click add subaccount:
    ![](img/add-subaccount-scc.png)
    1. Add a new subaccount by using your BTP credentials to log in. As 'Display name,' use a unique name (e.g., your firstname + lastname). You will need the name in the next step. The subaccount ID is the one you copied/ remembered/ saved before.
    ![](img/form-subaccount.png)
    1. In case your display name is not shown in the middle of the website as shown in the next screenshot, click on the small icon in the field 'Subaccount' to switch to your subaccount:
    ![](img/switch-subaccounts.png)
    1. On the left side of the website click on "Cloud To-On-Premise" (it should be right under your choosen display name). Connect the on-premise HANA to the cloud by providing a mapping from the virtual host (vm-he4-hana.eaalab.hpi.uni-potsdam.de) to the internal host (localhost):
    ![](img/add-subacc-1.png)
    Back-end type: ````SAP HANA````
    ![](img/add-subacc-2.png)
    Protocol: ````HTTP````
    ![](img/add-subacc-3.png)
    Change internal host to: ````localhost````, internal port: ````8000````
    ![](img/add-subacc-4.png)
    Change virtual host to: ````vm-he4-hana.eaalab.hpi.uni-potsdam.de````, virtual port: ````8000````
    ![](img/add-subacc-5.png)
    Principal type: ````None````
    ![](img/add-subacc-6.png)
    Host In Request Header: ````Use Virtual Host````
    ![](img/add-subacc-7.png)
    Description: ````<optional>````
    ![](img/add-subacc-8.png)
    Click the *Check Internal Host* checkbox:
    ![](img/add-subacc-9.png)
    Click on the newly created entry and press the *+* button: 
    ![](img/add-subacc-10.png)
    Add the corresponding ressources by adding the URL path ``/`` and save:
    ![](img/add-subacc-11.png)
    Back on the SAP BTP, you should now see our SAP HANA under *Cloud Connectors*:
    ![](img/btp-scc.png)    
3. You did it! We can leave the SCC now and start building our app.

> If you encounter this error message:
>
> ``417 Could not download configuration file. See "Log And Trace Files" and in particular Ijs_trace.log for details. Consult SAP note 2460641 for possible remedies.``
>
> ... please log in to https://account.sap.com/ and reset your password in the section "Reset Account Password":
> ![](img/reset-pw-1.png)
> ![](img/reset-pw-2.png)
> ![](img/reset-pw-3.png)
> Try to connect to SCC with the new password you will define in this section.
> In case your password is locked, just log out and use the "Forgot password?" link


### CLI Installation

In most cases, you'll use the command line tool if you interact with cloud platforms since it is way faster than using the UI of the BTP, AWS, Google Platform, or Azure.
The BTP uses [cloud foundry](https://www.cloudfoundry.org/) to deploy applications.

1. Follow the [instructions](https://github.com/cloudfoundry/cli/wiki/V8-CLI-Installation-Guide)
2. Open your terminal and execute the following command to login into your account. You can find the API endpoint in your trial account in section *Cloud Foundry Environment*.
    ![](img/cf-api.png)
    ````
    > cf login
    API endpoint: https://api.cf.us10.hana.ondemand.com
    Email: <your account mail>
    Password: <your pw>
    ````

### Clone the Git Repository

For your convenience, we prepared a small [Svelte](https://svelte.dev/) application using [SvelteKit](https://kit.svelte.dev/). You do not need to understand what Svelte is doing. However, it is a fantastic framework for frontend development. Clone the project via ``git clone`` and install the dependencies.

````shell
> git clone git@github.com:hpi-epic/btp-tuk.git # or HTTPS: https://github.com/hpi-epic/btp-tuk.git
> cd btp-tuk
> npm install
````

If you want to start the application on your machine, you have to define two environment variables used by the app to connect to the SAP HANA OData Service.

Create a file ``.env.development`` with following content:

```shell
VITE_ODATA_HPI_HANA_USERNAME=STUDENT2021
VITE_ODATA_HPI_HANA_PASSWORD=Student2021
```

Now you can serve your application on ``localhost:3000`` by using 

```shell
> npm run dev
```

The application should look like that (maybe you see some other data, since we adjusted the content for the exercise)

![](img/website.png)

### Deploy Your Application
To deploy your application, you need to create a ``manifest.yml`` file in your project's root folder as described [here](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html):


```yaml
applications:
  - name: btp-tuk # Please do not change this name
    path: ./
    buildpacks:
      - nodejs_buildpack
    memory: 256M
    command: node dist/index.js
    random-route: true
    services:
      - <your connectivity service instance name>
    env:
        VITE_ODATA_HPI_HANA_USERNAME: STUDENT2021
        VITE_ODATA_HPI_HANA_PASSWORD: Student2021
```

> Remember to fill in your own connectivity service instance name instead of using *\<your connectivity service instance name\>*.

Before deploying the application to the SAP BTP, we first must build the app. Use the following commands to build and push your application to the BTP:

```shell
> npm run build
> cf push
```
In your Cloud Foundry spaces, you can find your deployed applications and access them:
![](img/cf-spaces-0.png)
![](img/cf-spaces-1.png)
![](img/cf-spaces-2.png)

### Submission
After finishing this exercise, please add us (Lukas and Tobias) as space developers, so we can access your deployed application. 
Currently, only your SAP BTP account is allowed to view and change applications and services in your space. To validate your exercise, we require access to your space.

1. Navigate to your ``dev`` space (where you can see your deployed application) and click on "Members".
![](img/add-member-1.png)
2. In the next window, click on "Add Members"
![](img/add-member-2.png)
3. Add ``lukas.boehme@hpi.de`` and ``tobis.wuttke@hpi.de`` in the field "E-mails" and assign the role "Space Developer" to your space.
![](img/add-member-3.png)
4. Now, we can view your space and check if you deployed the services correctly!

After adding us as space developers, please submit your subaccount's URL using Moodle:

1. Please go back to your subaccount as described [above](#create-connectivity-service).
1. Copy the URL:
![](img/get-url.png)
1. Submit the URL in the submission's text field.

The deadline is Wednesday, 3 August 2022, 11:59 PM.

### Optional: Clean-up
After the exercise and submitting your results, you can clean up your account and machine.
If you are using homebrew on macOS, you can use the following command to remove the Cloud Foundry CLI:
```shell
> brew uninstall cloudfoundry/tap/cf-cli@8
```
Also, you can delete your Cloud Foundry space in your BTP account.
