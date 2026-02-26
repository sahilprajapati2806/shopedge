import { useState } from "react";
import axios from "axios";
import "./Auth.css";

const Auth = () => {

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isLogin) {

      const res = await axios.post(
        "http://localhost:4000/main/login",
        {
          email: form.email,
          password: form.password
        }
      );

      // 🔥 Save user properly
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      window.location.href = "/";   // redirect to home

    } else {

      const res = await axios.post(
        "http://localhost:4000/main/create",
        form
      );

      alert("Signup Successful");

      setIsLogin(true);
    }

  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>{isLogin ? "Login" : "Signup"}</h2>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className="toggle-text">
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
};

export default Auth;
