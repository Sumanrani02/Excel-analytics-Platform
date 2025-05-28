import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/AuthContext";

const ForgotPassword = () => {
  const { forgotPassword, message, error } = useAuth(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await forgotPassword(data.email);
  };

  return (
    <Card>
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
          Forgot Password
        </h2>
        {message && (
          <div className="mb-4 text-green-700 bg-green-100 p-2 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-700 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
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
          <Button type="submit">Send Reset Link</Button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-sm text-green-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ForgotPassword;
