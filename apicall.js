{
  "eula": "",
  "vendor": "SAP",
  "license": "",
  "id": "com.sap.sac.sample.apicall",
  "version": "2.0.0",
  "name": "REST API Call",
  "newInstancePrefix": "APICall",
  "description": "Custom widget to call Rest API",
  "webcomponents": [
    {
      "kind": "main",
      "tag": "com-sap-sample-apicall",
      "url": "http://localhost:8080/apicall/apicall.js", 
      "integrity": "",
      "ignoreIntegrity": true
    }
  ],
  "properties": {
		"width": {
			"type": "integer",
			"default": 600
		},
		"height": {
			"type": "integer",
			"default": 420
		}
  },
  "methods": {
	  "render": {
			  "description": "Render",
			  "parameters": [
				  {
					  "name": "searchValue",
					  "type": "string",            
					  "description": "Enter BOM Search value"
				  },
          {
					  "name": "expandTree",
					  "type": "boolean",            
					  "description": "Enter True if tree to expand"
          }
			  ]
		  }
  },
  "events": {
  }
}
