import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import axios from "axios";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", data);

      // Save the role to localStorage
      const { role } = response.data.data;
      localStorage.setItem("role", role);

      // Navigate to the appropriate homepage
      if (role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/");
      }

      setMessage(response.data.msg); // Success message from API
      reset();
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong. Please try again.");
    }
  };

  return (
    <Card>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg mt-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-lg text-2xl">
            X
          </div>
          <h1 className="ml-3 text-2xl font-bold text-gray-800">
            Excel Analytics
          </h1>
        </div>
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
          Sign Up Your Account
        </h2>

        {message && <div className="mb-4 text-green-700 bg-green-100 p-2 rounded">{message}</div>}
        {error && <div className="mb-4 text-red-700 bg-red-100 p-2 rounded">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="mt-1 w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
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
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                // pattern: {
                //   value:
                //     /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                //   message:
                //     "Password must include uppercase, number, and special character",
                // },
              })}
              className="mt-1 w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to={"/login"} className="text-green-600 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </Card>
  );
};

export default SignUp;
