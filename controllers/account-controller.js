import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    const password = request.body.password;
    if (user && password === user.password) {
      response.cookie("station", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },


  async userDetails(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "View User Details",
      user: loggedInUser,
    };
    response.render("account-view", viewData);
  },

  async editUserDetails(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "Edit User Details",
      user: loggedInUser,
    };
    response.render("user-details", viewData);
  },

  async updateUserDetails(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const userId = await userStore.getUserById(loggedInUser._id);
    const updatedUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: request.body.password,
    };
    await userStore.updateUser(userId._id, updatedUser);
    response.redirect("/Account");
  },

  async deleteUser(request, response){
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const user = await userStore.getUserById(loggedInUser._id);
    await userStore.deleteUserById(user._id);
    response.redirect("/");
  },
};