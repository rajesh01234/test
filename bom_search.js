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
  class SampleBom extends HTMLElement {
    constructor () {
      super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(bom.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')

      this._props = {}

      this.render()
    }

    onCustomWidgetResize (width, height) {
      this.render()
    }

    async render (searchValue, expandTree) {
      await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')

      const myChart = echarts.init(this._root)
	

			myChart.showLoading();
			$.get('https://1234mytestbucket1234.s3.amazonaws.com/R0568A.json', function (data) {
				myChart.hideLoading();



				//*******Remove empty nodes**** */
				function filter(obj) {
					for(let key in obj){
					  if (obj[key] === "" || obj[key] === null){
						  delete obj[key];
					  } else if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
							  filter(obj[key]);
					  } else if (Array.isArray(obj[key])) {
						  if(obj[key].length == 0){
							  delete obj[key];
						  }else{
							  for(let _key in obj[key]){
								  filter(obj[key][_key]);
							  }
							  obj[key] = obj[key].filter(value => Object.keys(value).length !== 0);
							  if(obj[key].length == 0){
								  delete obj[key];
							  }
						  }
					  }   
				  }};
				  
				 filter(data);
				//**** Filter JSON****** */								

				console.log('Search Value :', searchValue);
				
				let tempVar =searchValue && data && data.children && data.children.filter(function f(o) {
					if (o.name.includes(searchValue)) return true
				  
					if (o.children) {
					  return (o.children = o.children.filter(f)).length
					}
				  });
				  
				//********** */  

				//data.children.forEach(function (datum, index) {
				//	index % 2 === 0 && (datum.collapsed = true);
				//});

				//expandTree= true;
  
				const option = {
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove'
					},
					series: [
						{
							type: 'tree',

							data: [data],

							top: '1%',
							left: '7%',
							bottom: '1%',
							right: '20%',

							symbolSize: 7,
							
							label: {
								position: 'left',
								verticalAlign: 'bottom',
								align: 'right',
								fontSize: 9,			
								color: '#fff',			
								backgroundColor: ''
							},

							leaves: {
								label: {
									position: 'right',
									verticalAlign: 'middle',
									align: 'left'
								}
							},

							emphasis: {
								focus: 'descendant'
							},

							expandAndCollapse: expandTree,
							animationDuration: 550,
							animationDurationUpdate: 750
						}
					]
				};
				
				myChart.setOption( option);
			});



	  // *****
    }
  }

  customElements.define('com-sap-sample-echarts-bom', SampleBom)
})()