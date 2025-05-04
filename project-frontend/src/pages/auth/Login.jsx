import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const onSubmit = async (data) => {
    setMessage("");
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", data);
  
      // Save token, role, and user name in localStorage
      const { token, role, user } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userName", user.name); // Save the user's name
  
      // Redirect based on role
      if (role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/");
      }
  
      setMessage(response.data.msg); // Display success message
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid email or password. Please try again.");
    }
  };  

  return (
    <Card>
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-lg text-2xl">
            X
          </div>
          <h1 className="ml-3 text-2xl font-bold text-gray-800">Excel Analytics</h1>
        </div>
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
          Login Your Account
        </h2>
        {message && <div className="mb-4 text-green-700 bg-green-100 p-2 rounded">{message}</div>}
        {error && <div className="mb-4 text-red-700 bg-red-100 p-2 rounded">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit">Login</Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <NavLink to={"/register"} className="text-green-600 hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </Card>
  );
};

export default Login;
