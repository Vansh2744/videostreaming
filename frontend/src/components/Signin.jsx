import React, { useState } from "react";
import axios from "axios";

function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/signin",
        user
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Signin</button>
      </form>
    </div>
  );
}

export default Signin;
