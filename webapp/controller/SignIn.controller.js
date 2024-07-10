sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/BusyDialog"],
  function (Controller, MessageToast, BusyDialog) {
    "use strict";

    return Controller.extend("com.dhenskript.defecttracker.controller.SignIn", {
      onInit: function () {},

      onNavSignUpPage: function () {
        var that = this;
        var oRouter = that.getOwnerComponent().getRouter();
        oRouter.navTo("RouteSignUp", {}, true);
      },

      onSignIn: function () {
        var that = this;
        var userName = that.getView().byId("userName").getValue();
        var isAuth = that
          ._handleAuthenticateUser(userName)
          .then((isAuth) => {
            if (isAuth) {
              var oBusyDialog = new BusyDialog({
                text: "Signing In...",
              });
              oBusyDialog.open();
              setTimeout(() => {
                oBusyDialog.close();
                var oRouter = that.getOwnerComponent().getRouter();
                oRouter.navTo("RouteHome", {}, true);
              }, 2000);
            } else {
              new MessageToast.show("You are not a user, Please sign up!");
            }
          })
          .catch((err) => {});
      },

      _handleAuthenticateUser: async function (sUser) {
        var that = this;
        var isAuth = false;
        var users = await that._handleGetUsers();
        var user = users.filter((user) => {
          return user.name === sUser;
        });
        if (user.length > 0) {
          isAuth = true;
        }
        return isAuth;
      },
      _handleGetUsers: async function () {
        var hostName = "http://localhost:3000";
        var entitySet = "/users";
        var res = await fetch(`${hostName}${entitySet}`);
        var users = await res.json();
        return users;
      },
    });
  }
);
