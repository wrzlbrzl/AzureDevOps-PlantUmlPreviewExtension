var umlRenderer = (function () {
    "use strict";
    return {
        renderContent: function(rawContent, options) {
            


            var render_ux = document.getElementById("notebook-display");

            try 
            {
            	render_ux = rawContent + "<br><br><br> COMPRESS: " + compress(rawContent)
            }
            catch (err)
            {
                console.log(err);

                var errMsg;
                
                // parsing failure
                errMsg = "Fail render";
                

                render_ux = errMsg
            }
            /*var validFormedJson = false;
            var jsonPayload;
                jsonPayload = JSON.parse(rawContent);
                validFormedJson = true;
                nbv.render(jsonPayload, render_ux);
            }*/
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