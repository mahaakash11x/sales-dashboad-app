sap.ui.define([
  "sap/ui/core/mvc/Controller"

], function (Controller,) {
  "use strict";

  return Controller.extend("salesdashboardapp.controller.App", {
    onInit:  function () {

     
    },


    onNavToCustomer: function () {
      this.getOwnerComponent().getRouter().navTo("Customer");

    },
    onNavToProduct: function () {
      this.getOwnerComponent().getRouter().navTo("Product");
    },

    onNavToRegionSales: function () {
      this.getOwnerComponent().getRouter().navTo("RegionSales");
    },

onNavToMaster: function () {
  this.getOwnerComponent().getRouter().navTo("Master");
}
  });
});
