import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./app.css";
import Navbar from "./components/navbar/Navbar";
import { posts } from "./data";
import Card from "./components/card/Card";
function App() {
  const [username, setusername] = useState("");
  const [user, setuser] = useState("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:8000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);
  console.log(user);
  return (
    <>
      <div className="container">
        {user ? (
          <>
            <Navbar socket={socket} />
            {posts.map((post) => (
              <Card key={post.id} post={post} socket={socket} user={user} />
            ))}
            <span className="username">{user}</span>
          </>
        ) : (
          <div className="login">
            <input
              type="text"
              name=""
              id=""
              placeholder="username"
              onChange={(e) => setusername(e.target.value)}
            />
            <button onClick={() => setuser(username)}>Login</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
