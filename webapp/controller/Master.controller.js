sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("salesdashboardapp.controller.Master", {
        onInit: function () {

            const oModel = new JSONModel();
            oModel.loadData("model/customers.json");
            this.getView().setModel(oModel, "customerModel");


            const oProductModel = new JSONModel();
            oProductModel.loadData("model/products.json");
            this.getView().setModel(oProductModel, "productModel");

            const oRegionModel = new JSONModel();
            oRegionModel.loadData("model/RegionSales.json");
            this.getView().setModel(oRegionModel, "regionModel");


            // Initialize the comment model
            const oCommentModel = new JSONModel({
                comments: [] // <-- Array of comment strings
            });
            this.getView().setModel(oCommentModel, "commentModel");
        },




        onCustomerSelect: function (oEvent) {
            const oListItem = oEvent.getParameter("listItem");

            const sPath = oListItem.getBindingContext("customerModel").getPath();
            const oSplitApp = this.byId("SplitApp");
            const oDetailPage = oSplitApp.getDetailPages()[0];

            // Bind customer data
            oDetailPage.bindElement({ path: sPath, model: "customerModel" });


            // Get selected customer object //change oCustomer values
            const oCustomer = this.getView().getModel("customerModel").getProperty(sPath);
            this.getView().getModel("customerModel").refresh(true);


            // Update individual nested properties directly
            //     const oModel = this.getView().getModel("customerModel");
            //   oModel.setProperty(sPath + "/name", "Akash");
            //   oModel.setProperty(sPath + "/address/street", "Salt Lake Sector V");
            //   oModel.setProperty(sPath + "/address/city", "Kolkata");

            const productName = oCustomer.recentPurchase?.product;

            // Get full product data
            const aProducts = this.getView().getModel("productModel").getData();
            const oProduct = aProducts.find(p => p.name === productName);
            if (oProduct) {
                const oProductModel = new JSONModel(oProduct);
                this.byId("productPanel").setModel(oProductModel, "productModel");
                // console.log("Product Data:", oProduct);
            }

            // Get full regional sales data
            const aRegions = this.getView().getModel("regionModel").getData();
            const oRegion = aRegions.find(r => r.topProduct === productName);
            if (oRegion) {
                const oRegionModel = new JSONModel(oRegion);
                this.byId("regionPanel").setModel(oRegionModel, "regionModel");
                // console.log("Region Sales Data:", oRegion);
            }
        },



        /// comment add edit delete functionality



        onAddComment: function () {
            var oDialog = this.byId("addCommentDialog");
            if (oDialog) {
                oDialog.open();
            }
        },


        onCancelDialog: function () {
            this.byId("addCommentDialog").close();
        },

        onSubmitComment: function () {
            var sNewComment = this.byId("newCommentText").getValue().trim();
            if (!sNewComment) {
                sap.m.MessageToast.show("Please enter a comment.");
                return;
            }

            var oCommentModel = this.getView().getModel("commentModel");
            var aComments = oCommentModel.getProperty("/comments") || [];
            var iEditIndex = oCommentModel.getProperty("/selectedCommentIndex");

            if (iEditIndex !== null && iEditIndex !== undefined) {
                aComments[iEditIndex] = sNewComment; // edit
                oCommentModel.setProperty("/selectedCommentIndex", null);
                sap.m.MessageToast.show("Comment updated!");
            } else {
                aComments.push(sNewComment); // new comment
                sap.m.MessageToast.show("Comment added!");
            }

            oCommentModel.setProperty("/comments", aComments);
            this.byId("addCommentDialog").close();
            this.byId("newCommentText").setValue("");
        },



        onEditComment: function () {
            const oList = this.byId("commentList");
            const oSelectedItem = oList.getSelectedItem();

            if (!oSelectedItem) {
                sap.m.MessageToast.show("Please select a comment to edit.");
                return;
            }

            const sSelectedText = oSelectedItem.getTitle();
            this.byId("newCommentText").setValue(sSelectedText);
            this.getView().getModel("commentModel").setProperty("/selectedCommentIndex", oList.indexOfItem(oSelectedItem));

            this.byId("addCommentDialog").open();
        },



        onDeleteComment: function () {
            const oList = this.byId("commentList");
            const oSelectedItem = oList.getSelectedItem();

            if (!oSelectedItem) {
                sap.m.MessageToast.show("Please select a comment to delete.");
                return;
            }

            const oCommentModel = this.getView().getModel("commentModel");
            const aComments = oCommentModel.getProperty("/comments");

            const iIndex = oList.indexOfItem(oSelectedItem);
            aComments.splice(iIndex, 1); // remove from array

            oCommentModel.setProperty("/comments", aComments);
            sap.m.MessageToast.show("Comment deleted.");
        },

        onSelectComment: function (oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const iIndex = this.byId("commentList").indexOfItem(oItem);
            this.getView().getModel("commentModel").setProperty("/selectedCommentIndex", iIndex);
        },

        ////  Adding customer dialog box controller

        onOpenAddCustomerDialog: function () {
            this.byId("addCustomerDialog").open();
        },

        onCancelCustomerDialog: function () {
            this.byId("addCustomerDialog").close();
        },

        onSubmitCustomer: function () {
            var name = this.byId("newCustomerName").getValue();
            var email = this.byId("newCustomerEmail").getValue();
            var phone = this.byId("newCustomerPhone").getValue();
            var street = this.byId("newCustomerStreet").getValue();
            var city = this.byId("newCustomerCity").getValue();

            if (!name || !email) {
                MessageToast.show("Please fill in at least Name and Email.");
                return;
            }

            var oModel = this.getView().getModel("customerModel");
            var aData = oModel.getProperty("/");

            aData.push({
                name: name,
                contact: {
                    email: email,
                    primary: phone
                },
                address: {
                    street: street,
                    city: city
                },
                recentPurchase: {
                    product: ""
                },
                salesInsights: {
                    notes: ""
                },
                status: "New"
            });

            oModel.setProperty("/", aData);

            MessageToast.show("Customer added successfully.");
            this.byId("addCustomerDialog").close();

            // Optional: Clear input fields
            this.byId("newCustomerName").setValue("");
            this.byId("newCustomerEmail").setValue("");
            this.byId("newCustomerPhone").setValue("");
            this.byId("newCustomerStreet").setValue("");
            this.byId("newCustomerCity").setValue("");
        }


    });
});
