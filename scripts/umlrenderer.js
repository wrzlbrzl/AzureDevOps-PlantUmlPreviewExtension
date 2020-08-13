var umlRenderer = (function () {
    "use strict";
    return {
        renderContent: function(rawContent, options) {

            try 
            {
                VSS.require(["TFS/ServiceEndpoint/ServiceEndpointRestClient"], function(serviceEndpointService){
                    console.log(serviceEndpointService.getClient())
                    serviceEndpointService.getClient().getServiceEndpoints(VSS.getWebContext().project.name,'plantuml')
                        .then((result) => {
                            let plant_uml_server = result[0].url;

                            let res = compress(rawContent);
                            
                            fetch(plant_uml_server+res)
                            .then((res3) => {
                                return res3.text()
                            })
                            .then((res2) => {
                                console.log("res2");
                                console.log(res2);
                                document.getElementById("container").innerHTML = res2
                            })
                            .catch((err) => {
                                console.error(err)
                            })                            

                            console.log('resultURL: ' + plant_uml_server+res);

                        })
                        .catch((err) => {console.error(err)});        
                });           
                
            }
            catch (err)
            {
                console.log(err);
                let errMsg;
                errMsg = "Fail render";
                
                render_ux = errMsg
            }
        }
    };
}());

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