import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import CreateBlogForm from "./CreateBlogForm";

describe("render blog", () => {
  const blog = {
    id: "198293884123498123",
    title: "Walk in love",
    author: "Moise",
    url: "www.google.com",
    likes: 10,
    user: {
      id: "18912341239841234123",
      username: "moses",
      name: "moses",
    },
  };

  test("render blog title and author by default", () => {
    const { container } = render(
      <Blog key={blog.id} blog={blog} user={blog.user} />,
    );

    const div = container.querySelector(".blog");

    expect(div).toHaveTextContent("Walk in love Moise");
  });

  test("show url and number of likes when view button clicked", () => {
    const { container } = render(
      <Blog key={blog.id} blog={blog} user={blog.user} />,
    );

    const div = container.querySelector(".blog");

    expect(div).toHaveTextContent("www.google.com");
    expect(div).toHaveTextContent(10);
  });

  test("when the like button is clicked twice", async () => {
    const mockHandler = jest.fn();

    render(
      <Blog
        key={blog.id}
        blog={blog}
        user={blog.user}
        increaseLikes={mockHandler}
      />,
    );

    const user = userEvent.setup();
    const button = screen.getByText("like");
    // screen.debug(button);
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("create new blog form", async () => {
    // const mockHandler = jest.fn();
    // const user = userEvent.setup();
    // render(<CreateBlogForm handleCreateBlog={mockHandler} />);
    // const createButton = screen.getByText("create");
    // await user.click(createButton);
    // expect(mockHandler.mock.calls).toHaveLength(1);

    const mockHandler = jest.fn();
    const user = userEvent.setup();
    const { container } = render(
      <CreateBlogForm handleCreateBlog={mockHandler} />,
    );

    const titleInput = container.querySelector("#title-input");
    const authorInput = container.querySelector("#author-input");
    const urlInput = container.querySelector("#url-input");
    const createButton = screen.getByText("create");

    user.type(titleInput, "Walk on the moon");
    user.type(authorInput, "Kongolo");
    user.type(urlInput, "www.google.com");

    await user.click(createButton);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
