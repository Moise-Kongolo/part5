import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  // const [loginVisible, setLoginVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState(null);
  const [reloadBlogs, setReloadBlogs] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, [reloadBlogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 4000);
      setUsername("");
      setPassword("");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    setUsername("");
    setPassword("");
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      createBlogFormRef.current.toggleVisibility();
      const blog = await blogService.create({ title, author, url });
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs(blogs.concat(blog));
      setMessage(`a new blog ${blog.title} ${blog.author} added`);
      setColor("green");
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    } catch (error) {
      setMessage(error);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  const handleRemoveBlog = async (id) => {
    try {
      await blogService.remove(id);
      setReloadBlogs(!reloadBlogs);
    } catch (error) {
      setMessage(error);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  const increaseLikes = async (idBlog, newBlog) => {
    try {
      await blogService.update(idBlog, newBlog);
      setReloadBlogs(!reloadBlogs);
    } catch (error) {
      setMessage(error);
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      message={message}
      password={password}
      color={color}
      username={username}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  );

  const createBlogFormRef = useRef();

  const blogsList = () => (
    <>
      <h2>blogs</h2>
      <Notification message={message} color={color} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout} type="submit">
          logout
        </button>
      </p>

      <Togglable buttonLabel="create new blog" ref={createBlogFormRef}>
        <CreateBlogForm
          handleCreateBlog={handleCreateBlog}
          title={title}
          url={url}
          author={author}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleRemoveBlog={handleRemoveBlog}
          increaseLikes={increaseLikes}
          user={user}
        />
      ))}
    </>
  );

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogsList()}
    </div>
  );
};

export default App;
