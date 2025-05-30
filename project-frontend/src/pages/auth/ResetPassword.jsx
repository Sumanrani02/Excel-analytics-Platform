import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { resetPassword, error, message, loading } = useAuth();

  const onSubmit = async (data) => {
    try {
      await resetPassword(token, data.password);
      setTimeout(() => navigate("/login"), 1500); // Redirect after successful reset
    } catch (err) {
      console.error("Password reset failed.");
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

        {/* Display messages */}

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

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-1 font-medium text-gray-600">
            New Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full rounded-lg border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500 mb-4"
            placeholder="Enter your new password"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mb-4">
              {errors.password.message}
            </p>
          )}
          <Button type="submit" disabled={loading}>
            Reset Password
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ResetPassword;
