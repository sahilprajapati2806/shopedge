import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
      name: "",
      email: "",
      password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/user/signup", data);

    alert("Signup Successful");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
