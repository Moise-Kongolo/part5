import React, { useState } from 'react';

const Blog = ({ blog, increaseLikes, handleRemoveBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user === null ? null : blog.user.id,
    };
    increaseLikes(blog.id, newBlog);
  };

  const handleRemove = () => {
    const msg = `Remove blog ${blog.title} by ${blog.author}`;
    if (window.confirm(msg)) {
      handleRemoveBlog(blog.id);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  // to control the display of the remove blog button below
  const showButtonRemove = blog.user !== null && blog.user.id === user.id;

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <ul style={{ padding: 0, margin: 0 }}>
          <li style={{ listStyleType: 'none' }}>
            {blog.title} {blog.author}{' '}
            <button onClick={toggleVisibility}>hide</button>
          </li>
          <li style={{ listStyleType: 'none' }}>
            <a href={blog.url}>{blog.url}</a>
          </li>
          <li style={{ listStyleType: 'none' }}>
            likes {blog.likes} <button id="like-button" onClick={handleLike}>like</button>
          </li>
          <li style={{ listStyleType: 'none' }}>
            {blog.user !== null && blog.user.name}
          </li>
          {showButtonRemove && (
            <li style={{ listStyleType: 'none' }}>
              <button onClick={handleRemove}>remove</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
