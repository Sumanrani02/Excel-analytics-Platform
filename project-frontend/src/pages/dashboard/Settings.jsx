import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Trash, Watch } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { user, fetchUserData, updateUser, deleteAccount, loading } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

// Fetch user if not already fetched
useEffect(() => {
  if (!user) {
    fetchUserData();
  }
}, [user, fetchUserData]);

// When user is updated, populate form values
useEffect(() => {
  if (user) {
    setValue("name", user.name);
    setValue("email", user.email);
  }
}, [user, setValue]);


  const onSubmit = (data) => {
    updateUser(data);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-green-100 flex flex-col items-center">
      <div className="bg-white w-full max-w-5xl p-6 shadow-md rounded-lg flex">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-green-600 mb-5">
            Account Settings
          </h1>

          <div className="flex mb-6">
            <div className="bg-green-200 p-4 rounded-full">
              <User size={48} className="text-green-800" />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="text-sm font-medium text-green-700 mb-1 flex items-center">
                <User className="mr-2" size={16} /> Name:
              </label>
              <input
                {...register("name")}
                type="text"
                readOnly
                className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="text-sm font-medium text-green-700 mb-1 flex items-center">
                <Mail className="mr-2" size={16} /> Email:
              </label>
              <input
                {...register("email")}
                type="email"
                readOnly
                className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="text-sm font-medium text-green-700 mb-1 flex items-center">
                <Lock className="mr-2" size={16} /> New Password:
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                type="password"
                placeholder="Enter new password"
                className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Save Changes Button */}
            <button
              type="submit"
              className="mt-6 w-40 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 focus:outline-none"
            >
              Save Changes
            </button>
          </form>

          {/* Delete Account Button */}
          <button
            onClick={deleteAccount}
            className="ml-64 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 focus:outline-none"
          >
            <Trash className="inline-block mr-2" size={16} /> Delete Account
          </button>
          <p className="text-sm text-red-600 mt-2">
            If you delete your account, you will permanently lose access to your
            data.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 pl-6 border-l border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Security Tips
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Use a strong password with a mix of letters, numbers, and symbols.
            </li>
            <li>Regularly update your password to keep your account secure.</li>
            <li>Enable two-factor authentication if available.</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
            Notifications
          </h2>
          <p className="text-gray-600">
            You will receive email updates about changes to your account
            settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
