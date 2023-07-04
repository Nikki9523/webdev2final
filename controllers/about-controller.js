export const aboutController = {
  index(request, response) {
    const viewData = {
      title: "About weathertop app",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};
