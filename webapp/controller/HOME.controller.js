sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
], (Controller,MessageToast,MessageBox) => {
    "use strict";

    return Controller.extend("com.sap.northwind.controller.HOME", {
        onInit: function() {
            // sending the request to read the data from odata service entityset.
            this.getOwnerComponent().getModel().read("/Orders",{

                success:function(orderData) {
                 //CREATE LOCAL VARIABLE TO STORE THE DATA FROM ODATA SERVICE
                 var lv_d1=orderData.results;
                 // create json model.
                 var oJsonModel=new sap.ui.model.json.JSONModel();
                 // assign the data from the local variable to the json model.
                 oJsonModel.setData(lv_d1);
                 this.getView().setModel(oJsonModel,"oJsonForView");

                }.bind(this),
                error:function(oError) {

                }
            })
        }, 

        onPress: function (evt) {
			MessageToast.show(evt.getSource().getId() + " Pressed"); 
		},

        saveFunc: function() {
            
            var cNameRef = this.getView().byId("custName").getValue();
            var street = this.getView().byId("street").getValue();

            if (cNameRef !== "" && street !== "" && cNameRef.trim() !== "" && street.trim() !== "") {
                MessageBox.confirm("The fields are filled");
            }else{
                MessageBox.warning("The fields aren't filled");
            }
        },

        custFunc: function () {
            MessageToast.show("This is the message toast!!!");
        },

        f4HelpForCustId: function(){
            //Customer.fragments
            if (!this.custID) { 
                this.custID=sap.ui.xmlfragment("com.sap.northwind.fragments.Customer",this);
                this.getView().addDependent(this.custID);
            }
            //Open fragment  
            this.custID.open();
        },
        
		onValueHelpDialogClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem"),
				oInput = this.byId("_IDGenInput3");

			if (!oSelectedItem) {
				oInput.resetProperty("value");
				return;
			}
 
			oInput.setValue(oSelectedItem.getTitle());
		}        
    });
});