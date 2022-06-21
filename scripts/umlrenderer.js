var umlRenderer = (function () {
    "use strict"
    return {
        renderContent: function(rawContent, options) {

            try 
            {
                VSS.require(["TFS/ServiceEndpoint/ServiceEndpointRestClient"], function(serviceEndpointService){
                    console.log(serviceEndpointService.getClient())
                    serviceEndpointService.getClient().getServiceEndpoints(VSS.getWebContext().project.name,'plantuml')
                        .then((result) => {
                            let plant_uml_server = result[0].url

                            let diagramUrl = plant_uml_server+compress(rawContent)
                            fetch(diagramUrl)
                            .then((res3) => {
                                return res3.text()
                            })
                            .then((res2) => {
                                document.getElementById("spinner").style.display = "none"
                                document.getElementById("container").innerHTML = res2
                            })
                            .catch((err) => {
                                document.getElementById("container").innerHTML = `<h2 style=" color: red;">Не удалось загурзить диаграмму:</h2> ${diagramUrl}`
                                console.error(err)
                                document.getElementById("spinner").style.display = "none"
                            }) 
                            console.log('resultURL: ' + diagramUrl)
                        })
                        document.getElementById("container").innerHTML = 'Failed to get PlantUML server address'
                        .catch((err) => {console.error(err)})     
                        document.getElementById("spinner").style.display = "none"
                })          
                
            }
            catch (err)
            {
                console.log(err)
                errMsg = "Fail render"
                document.getElementById("spinner").style.display = "none"
            }
        }
    }
}())

VSS.init({
    usePlatformScripts: true, 
    usePlatformStyles: true, 
    explicitNotifyLoaded: true 
});

VSS.ready(function () {
    VSS.register("plant_uml_renderer", function (context) {
        return umlRenderer;
    });

	VSS.notifyLoadSucceeded();
});