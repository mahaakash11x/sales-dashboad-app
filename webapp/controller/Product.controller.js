sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
     "sap/ui/thirdparty/jquery"
  ], function (Controller, JSONModel, jQuery) {
    "use strict";
  
    return Controller.extend("salesdashboardapp.controller.Product", {
      onInit: function () {
        jQuery.sap.includeStyleSheet("css/Product.style.css");
        
        var oModel = new JSONModel();
        oModel.loadData("model/Products.json"); 
        this.getView().setModel(oModel, "productModel");
      }
    });
  });
  