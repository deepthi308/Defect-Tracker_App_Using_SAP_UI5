sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.dhenskript.defecttracker.controller.Home", {
      onInit: function () {
        var that = this;
        var usersModel = new JSONModel("./model/users.json");
        that.getView().setModel(usersModel);
      },

      onFileUpload: function (e) {
        var that = this;
        var uploadedFile = e.getParameter("files")[0];
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, {
            type: "array",
          });
          var worksheet = workbook.Sheets[workbook.SheetNames[1]];
          var jsonData = XLSX.utils.sheet_to_json(worksheet);
          var oDefectsModel = new JSONModel({
            defects: jsonData,
          });
          that.getView().setModel(oDefectsModel, "oDefectsModel");
        };

        fileReader.readAsArrayBuffer(uploadedFile);
      },

      onTilePress: function (e) {
        var that = this;
        var sPath = e
          .getSource()
          .getParent()
          .getParent()
          .getBindingContext().sPath;
        that._handleGetUser(sPath);
      },

      _handleGetUser: async function (sPath) {
        const hostName = "http://localhost:3000";
        const entity = sPath;

        var oUser = await fetch(`${hostName}${entity}`);
        var name = oUser.name;
      },
    });
  }
);
