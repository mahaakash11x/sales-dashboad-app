sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/thirdparty/jquery"
  ], function (Controller, JSONModel,jQuery) {
    "use strict";
  
    return Controller.extend("salesdashboardapp.controller.RegionSales", {
      onInit: function () {
        jQuery.sap.includeStyleSheet("css/RegionSales.style.css");

        var oModel = new JSONModel();
        oModel.loadData("model/RegionSales.json"); 
        this.getView().setModel(oModel, "regionSalesModel");
      }
    });
  });
  