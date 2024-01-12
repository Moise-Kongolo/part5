const CreateBlogForm = ({
  handleCreateBlog,
  title,
  url,
  author,
  setTitle,
  setUrl,
  setAuthor,
}) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <ul>
        <li style={{ listStyleType: "none" }}>
          <label>
            title{" "}
            <input
              type="text"
              onChange={({ target }) => setTitle(target.value)}
              name="title"
              value={title}
              id = "title-input"
            />
          </label>
        </li>
        <li style={{ listStyleType: "none" }}>
          <label>
            author{" "}
            <input
              type="text"
              onChange={({ target }) => setAuthor(target.value)}
              name="author"
              value={author}
              id = "author-input"
            />
          </label>
        </li>
        <li style={{ listStyleType: "none" }}>
          <label>
            url{" "}
            <input
              type="text"
              onChange={({ target }) => setUrl(target.value)}
              name="url"
              value={url}
              id = "url-input" />
          </label>
        </li>
        <li style={{ listStyleType: "none" }}>
          <button id="create-button" type="submit">create</button>
        </li>
      </ul>
    </form>
  );
};

export default CreateBlogForm;
