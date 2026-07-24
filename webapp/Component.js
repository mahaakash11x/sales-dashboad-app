sap.ui.define([
    "sap/ui/core/UIComponent",
    "salesdashboardapp/model/models",
    "sap/ui/model/resource/ResourceModel"  
], (UIComponent, models, ResourceModel) => {  
    "use strict";

    return UIComponent.extend("salesdashboardapp.Component", {
        metadata: {
            manifest: "json"
        },

        init() {
            
            // ✅ Set i18n model correctly now
            var i18nModel = new ResourceModel({
                bundleName: "salesdashboardapp.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");


            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

           
         

            // Initialize router
            this.getRouter().initialize();
        }
    });
});
