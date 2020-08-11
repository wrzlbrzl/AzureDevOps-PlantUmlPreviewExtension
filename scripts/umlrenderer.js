var umlRenderer = (function () {
    "use strict";
    return {
        renderContent: function(rawContent, options) {
            //console.log("******** umlRenderer ************ ");
            //console.log(rawContent);

            try 
            {
                let res = compress(rawContent);
                document.getElementById("diagram-img").src=res
                console.log(res);
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