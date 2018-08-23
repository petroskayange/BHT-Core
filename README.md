# BHT - Core Application

## Description
The BHT core application is designed to be the heart of the BHT 3-tier architecture with it being the logical control structure for all other modules that will run under it. 

The application is built using
 
>	1. HTML for markup
>	2. CSS for styling
>	3. Javascript for logic 

## Folder Structure
<pre><font color="#729FCF"><b>.</b></font>
├── <font color="#729FCF"><b>apps</b></font>
│   ├── <font color="#729FCF"><b>Application</b></font>
│   │   ├── application.json
│   │   └── <font color="#729FCF"><b>assets</b></font>
│   │       └── <font color="#729FCF"><b>images</b></font>
│   │           └── <font color="#AD7FA8"><b>aids.png</b></font>
│   ├── <font color="#729FCF"><b>config</b></font>
│   │   ├── apps.json
│   │   └── apps.json.example
│   └── <font color="#729FCF"><b>core</b></font>
│       ├── administration.json.example
│       ├── application.json
│       ├── application.json.example
│       ├── <font color="#729FCF"><b>assets</b></font>
│       │   ├── <font color="#729FCF"><b>css</b></font>
│       │   │   ├── application.css
│       │   │   ├── <font color="#729FCF"><b>bootstrap</b></font>
│       │   │   │   └── bootstrap.min.css
│       │   │   ├── custom.css
│       │   │   └── <font color="#729FCF"><b>maindashboard</b></font>
│       │   │       ├── footer.css
│       │   │       └── header.css
│       │   ├── <font color="#729FCF"><b>docs</b></font>
│       │   ├── <font color="#729FCF"><b>images</b></font>
│       │   │   ├── <font color="#AD7FA8"><b>aids.png</b></font>
│       │   │   ├── <font color="#8AE234"><b>BaobabHealth.png</b></font>
│       │   │   └── <font color="#AD7FA8"><b>barcode.png</b></font>
│       │   └── <font color="#729FCF"><b>js</b></font>
│       │       ├── application.js
│       │       ├── <font color="#729FCF"><b>bootstrap</b></font>
│       │       │   └── bootstrap.min.js
│       │       ├── client-scan-barcode.js
│       │       ├── core.js
│       │       └── jquery.min.js
│       ├── index.html
│       └── <font color="#729FCF"><b>views</b></font>
│           └── login.html
├── index.html
├── <font color="#729FCF"><b>public</b></font>
│   ├── application.json.example
│   └── <font color="#729FCF"><b>assets</b></font>
│       └── <font color="#729FCF"><b>images</b></font>
│           └── <font color="#AD7FA8"><b>no_image.png</b></font>
└── README.md

</pre>
## Application setup

> 1. Clone the repository into a folder 
> 2. Copy application.example form the root/public folder into the folder of the module. 
> 3. go to config/ folder and copy the apps.json.example to apps.json and fill in the template to declare a new application
> 4. run the application in a serer environment e.g. PHP server
	
