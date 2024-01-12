const Notification = ({ message, color }) => {
  if (message === null) return null;
  // const value = message === null ? "none" : "";

  const messageStyle = {
    color: color === "green" ? "green" : "rgb(255, 0, 0)",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div className="message" style={messageStyle}>
      {message}
    </div>
  );
};

export default Notification;
