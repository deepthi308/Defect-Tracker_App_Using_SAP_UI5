sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.dhenskript.defecttracker.controller.SignUp", {
      onInit: function () {},

      onNavSignInPage: function () {
        var that = this;
        var oRouter = that.getOwnerComponent().getRouter();
        oRouter.navTo("RouteSignIn", {}, true);
      },

      onSignUp: function (e) {
        e.preventDefault();
        var that = this;
        var oView = that.getView();
        var sName = oView.byId("userName").getValue();
        var sEmailId = oView.byId("emailId").getValue();
        var sPassword = oView.byId("password").getValue();
        var sAvatarUrl = oView.byId("avatarUrl").getValue();
        var oUser = {};
        if (sName && sEmailId && sPassword) {
          oUser.name = sName;
          oUser.emailId = sEmailId;
          oUser.password = sPassword;
          oUser.avatarUrl = sAvatarUrl;
          that._handleAddUser(oUser);
          var oRouter = that.getOwnerComponent().getRouter();
          oRouter.navTo("RouteHome");
        } else {
          new MessageToast.show("Please provide all the required fields");
          return;
        }
      },

      _handleGetUsers: async function () {
        const hostName = "http://localhost:3000";
        const entitySet = "/users";
        var res = await fetch(`${hostName}${entitySet}`);
        var users = await res.json();
        return users;
      },

      _handleAddUser: function (oUser) {
        var that = this;
        const hostName = "http://localhost:3000";
        const entitySet = "/users";

        var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
        xmlhttp.open("POST", `${hostName}${entitySet}`, true);
        xmlhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        xmlhttp.send(
          JSON.stringify({
            oUser,
          })
        );
      },
    });
  }
);
