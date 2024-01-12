describe("Blog app", () => {
  beforeEach(function () {
    // empty the user document
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    // create user 1
    const user = {
      username: "ryota",
      name: "ryota kise",
      password: "ryota",
    };

    // create user2
    const user2 = {
      username: "midorima",
      name: "midorima shintaro",
      password: "midorima",
    };

    // add users to the db
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.request("POST", "http://localhost:3001/api/users/", user2);
  });

  describe("Login", function () {
    it("shows the login form by default", function () {
      // launch the page
      cy.visit("http://localhost:5173");

      cy.contains("login");
    });

    it("succeeds with correct credentials", function () {
      // launch the page
      cy.visit("http://localhost:5173");

      cy.get("#username").type("ryota");
      cy.get("#password").type("ryota");
      cy.get("#login-button").click();

      cy.contains("ryota kise logged in");

      //logout
      cy.contains("logout").click();
    });

    it("fails with wrong credentials", function () {
      // launch the page
      cy.visit("http://localhost:5173");

      cy.get("#username").type("ryota");
      cy.get("#password").type("boum");
      cy.get("#login-button").click();

      // cy.contains("Login to the application");
      cy.get(".message")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      // log in
      cy.login({ username: "ryota", password: "ryota" });
    });
    afterEach(function () {
      //logout
      cy.contains("logout").click();
    });

    it("A blog can be created", function () {
      // cy.contains("ryota kise logged in");
      const id = Cypress.env("userId");

      const blog = {
        title: "Henoc walked with God",
        author: "moses",
        url: "www.youtube.com",
        likes: 0,
        user: id,
      };

      cy.createBlog({ blog });

      cy.visit("http://localhost:5173");

      cy.contains("Henoc walked with God");
    });

    it("A user can like a blog", function () {
      const id = Cypress.env("userId");

      const blog = {
        title: "Henoc walked with God",
        author: "moses",
        url: "www.youtube.com",
        likes: 0,
        user: id,
      };

      cy.createBlog({ blog });

      cy.visit("http://localhost:5173");

      cy.contains("view").click();
      cy.contains("0");
      cy.get("#like-button").click();
      cy.contains("1");
    });

    it("User can delete blog", function () {
      cy.visit("http://localhost:5173");

      const id = Cypress.env("userId");

      const blog = {
        title: "Henoc walked with God",
        author: "moses",
        url: "www.youtube.com",
        likes: 0,
        user: id,
      };
      cy.createBlog({ blog });

      cy.visit("http://localhost:5173");
      cy.contains("Henoc walked with God");
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("Henoc walked with God").should("not.exist");
    });

    it("only the creator can see the remove button", function () {
      cy.visit("http://localhost:5173");

      // ryota creates a blog
      const id = Cypress.env("userId");
      const blog = {
        title: "Henoc walked with God",
        author: "moses",
        url: "www.youtube.com",
        likes: 0,
        user: id,
      };
      cy.createBlog({ blog });

      // ryota can see the remove button
      cy.visit("http://localhost:5173");
      cy.contains("view").click();
      cy.contains("remove");

      // ryota logout
      cy.contains("logout").click();

      // midorima login
      cy.login({ username: "midorima", password: "midorima" });
      cy.visit("http://localhost:5173");

      // midorima cannot see the remove button
      cy.contains("Henoc walked with God");
      cy.contains("view").click();
      cy.contains("remove").should("not.exist");
    });

    it("blogs are ordered according to likes", function () {
      // ryota creates blogs
      const id = Cypress.env("userId");
      cy.visit("http://localhost:5173");
      const blogs = [
        {
          title: "Liked by 2",
          author: "moses",
          url: "www.youtube.com",
          likes: 2,
          user: id,
        },
        {
          title: "Liked by 3",
          author: "moses",
          url: "www.youtube.com",
          likes: 3,
          user: id,
        },
        {
          title: "Liked by 1",
          author: "moses",
          url: "www.youtube.com",
          likes: 1,
          user: id,
        },
      ];
      blogs.map(function (blog) {
        cy.createBlog({ blog });
      });
      cy.visit("http://localhost:5173");

      cy.get(".blog").eq(0).should("contain", "Liked by 3");
      cy.get(".blog").eq(1).should("contain", "Liked by 2");
      cy.get(".blog").eq(2).should("contain", "Liked by 1");
    });
  });
});
