var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}

(function () {
  const bom = document.createElement('template')
  bom.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `
  class SampleAPICall extends HTMLElement {
    constructor () {
      super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(bom.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')

      this._props = {}

	  this.APICall()

    }

    onCustomWidgetResize (width, height) {
      
	  this.APICall()
    }

	async APICall (){

		$.ajax({
			type: 'POST',
			dataType: 'text',
			url: 'https://vsystem.ingress.dh-v4q6kgjq.di-us-east.shoot.live.k8s-hana.ondemand.com/app/pipeline-modeler/openapi/service/workiva/v1/trigger',
			
			headers: {
				//"Authorization": "Basic " + btoa('default\GholapRa' + ":" + 'Bonjour01'),
                "X-Requested-With": "XMLHttpRequest"
			  },
			crossDomain: true,
			async: false,
			xhrFields: {
			  withCredentials: true,
			},
		  })
			.done(function (data) {
			  console.log('done');
			})
			.fail(function (xhr, textStatus, errorThrown) {
			  alert(xhr.responseText);
			  alert(textStatus);
			});
	}


  }

  customElements.define('com-sap-sample-apicall', SampleAPICall)
})()
