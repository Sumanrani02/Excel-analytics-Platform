import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../components/Button';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password`, {
        token,
        password: data.password,
      });
      setMessage(res.data.msg);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to reset password.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block">New Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full border p-2 rounded"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>
        <Button type="submit">Reset Password</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
