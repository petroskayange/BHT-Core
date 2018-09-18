# BHT - Core Application

## Index 
1. [Description](#Description)
2. [Folder Structure](#Folder-Structure)
3. [Core Application Setup](#Core-Application-Setup)
    * [Pre Requisites](#Pre-Requisites)
    * [Setup Process](#Set-up-Process)
4. [Modules](#Modules)
    * [Module Application Setup](#Module---Application-Setup)
5. [Debugging](#Debugging)


## Description
The BHT core application is designed to be the heart of the BHT 3-tier architecture with it being the logical control structure for all other applications that will run under it. 

The application is built using
 
	1. HTML for markup
	2. CSS for styling
	3. Javascript for logic 

## Folder Structure
<pre><font color="#729FCF"><b>.</b></font>
├── <font color="#729FCF"><b>apps</b></font>
│   ├── <font color="#729FCF"><b>Example Application</b></font>
│   │   ├── application.json
│   │   ├── <font color="#729FCF"><b>assets</b></font>
│   │   │   ├── <font color="#729FCF"><b>css</b></font>
│   │   │   ├── <font color="#729FCF"><b>images</b></font>
│   │   │   └── <font color="#729FCF"><b>js</b></font>
│   │   └── index.html
│   ├── <font color="#729FCF"><b>config</b></font>
│   │   ├── apps.json
│   └── <font color="#729FCF"><b>core</b></font>
│       ├── <font color="#8AE234"><b>administration.json.example</b></font>
│       ├── application.json
│       ├── <font color="#8AE234"><b>application.json.example</b></font>
│       ├── <font color="#729FCF"><b>assets</b></font>
│       │   ├── <font color="#729FCF"><b>css</b></font>
│       │   ├── <font color="#729FCF"><b>docs</b></font>
│       │   ├── <font color="#729FCF"><b>images</b></font>
│       │   └── <font color="#729FCF"><b>js</b></font>
│       ├── <font color="#8AE234"><b>index.html</b></font>
│       └── <font color="#729FCF"><b>views</b></font>
│           ├── location.html
│           ├── <font color="#8AE234"><b>login.html</b></font>
│           ├── <font color="#729FCF"><b>patient</b></font>
│           │   ├── <font color="#8AE234"><b>new.html</b></font>
│           │   ├── <font color="#8AE234"><b>search.html</b></font>
│           │   ├── <font color="#8AE234"><b>search_results.html</b></font>
│           │   └── <font color="#8AE234"><b>vitals.html</b></font>
│           ├── <font color="#8AE234"><b>patient_dashboard.html</b></font>
│           └── <font color="#729FCF"><b>users</b></font>
│               ├── <font color="#8AE234"><b>change_password.html</b></font>
│               ├── change_role.html
│               ├── <font color="#8AE234"><b>edit_user.html</b></font>
│               ├── <font color="#8AE234"><b>new.html</b></font>
│               ├── <font color="#8AE234"><b>show.html</b></font>
│               └── <font color="#8AE234"><b>view_users.html</b></font>
├── index.html
├── <font color="#729FCF"><b>public</b></font>
│   ├── application.json.example
│   └── <font color="#729FCF"><b>assets</b></font>
│       └── <font color="#729FCF"><b>images</b></font>
│           ├── <font color="#AD7FA8"><b>launcher.png</b></font>
│           └── <font color="#AD7FA8"><b>no_image.png</b></font>
├── README.md
└── <font color="#729FCF"><b>touchscreentoolkit</b></font>
    

</pre>
## Core Application Setup

### Pre Requisites
    * Clone the Backend API application from the [Repository](https://github.com/BaobabHealthTrust/BHT-EMR-API)
    * The backend EMR API running 
    * A server environment e.g PHP, NGINX, node
    * Text editor for edditing of JSON files 
    * Keyboard available for in browser debugging


### Set up process
    1. Clone the application from github at the [Repository](https://github.com/BaobabHealthTrust/BHT-Core) 
        *NOTE if the repository page gives you a 404 error make sure you have been added to the repository page by the admins
    
    2. Chang directories into the /apps/config folder 
    
    3. copy the config.json.example file and rename it to config.json
    
    4. input where the IP address of where the backend EMR API is running
        * NOTE Use the actual IP address of the machine e.g. 192.168.0.0 instead of localhost or 0.0.0.0 as the application is a client side applciation and not being served directly from the server. 

    5. Input the port on which the application is running
    
    6. Input the protocol scheme in which the application e.g. HTTP or HTTPS in the event that it does run on the internet and needs and encrypted connection at all times. 

    7. At this point the application is ready to run. This can be achieved by using any http server available at the time. 

## Modules
By default the application comes with 2 folders in the apps folder namely the apps folder and the config folder. these 2 folders contain generic functionality such as user management and patient registration. To add extra functionality, new core modules are to be introduced into the apps/ folder. For the applciation to know the a new application is available and to add it to the application go through the application set up process documented below. 

### Module - Application Setup
    1. Clone the repository from github into the apps/ folder. 
        *links for all available applications will be added 
    2. Change directory to the apps/config/ folder and open the config.json file you were editing earlier
    3. in the apps hash, add a new entry with the following.
        * applicationName
        * applicationFolder
        * applicationIcon
        * applicationDescription
            examples are available in the config.json.example file
    4. Copy the applciation.json.example from the /public/ folder and paste it in the core application folder. 
    5. rename the application.json.example to application.json and fill in the required fields 
    6. The module is now ready to be run, it will be available by going to the home page after logging in or after clicking the applications button in the bottom right hand of the page. 

## Debugging
    If the application is running abnormally, check the console by going to inspect in the console or by pressing ctrl+shift+i which achieves the same purpose.

    The console is where all the errors will be logged. Most errors encountered so far have to do with the fact that the backend EMR API is not set up properly or is not running, the link is not properly defined in the config.json. please verify the configurations if any of these appear. 
