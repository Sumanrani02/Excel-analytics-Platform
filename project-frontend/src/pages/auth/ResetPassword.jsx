import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";  // Import axios
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

const ResetPasswordTest = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Real API call to reset password
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await axios.post(
        `/api/auth/reset-password/${token}`, // Your backend route
        { password: newPassword }
      );
      return response.data; // Should contain { message: 'Password reset successfully' }
    } catch (error) {
      // Throw error to be caught in onSubmit
      throw error.response?.data || { message: 'Something went wrong' };
    }
  };

  const onSubmit = async (data) => {
    try {
      const result = await resetPassword(token, data.password);
      alert(result.message);

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      alert(err.message || "Password reset failed.");
      console.error("Password reset failed.", err);
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
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-600">
            New Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500 mb-4"
            placeholder="Enter your new password"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mb-4">{errors.password.message}</p>
          )}
          <Button type="submit">Reset Password</Button>
        </form>
      </div>
    </Card>
  );
};

export default ResetPasswordTest;
