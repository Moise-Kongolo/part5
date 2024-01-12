import Notification from "./Notification";

const LoginForm = ({
  handleLogin,
  message,
  color,
  username,
  setUsername,
  setPassword,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Login to the application</h2>
      <Notification message={message} color={color} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  );
};

export default LoginForm;
