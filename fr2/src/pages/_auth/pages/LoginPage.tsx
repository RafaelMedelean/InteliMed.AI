import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

type LoginFormInputs = {
  username: string;
  password: string;
  rememberMe: boolean;
};

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async data => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:8001/api/users/login', data);
      console.log(response);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="w-2/3 p-5 border border-gray-300 rounded-md">
      <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            id="email"
            type="email"
            {...register('username', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder='Email'
          />
          {errors.username && <p className="text-red-500 mt-1">{errors.username.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder='Password'
          />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-4 flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="block">Remember Me</label>
        </div>

        <div className='mt-2 flex flex-col items-center'>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-2/3">
              Login
            </button>
            <div className='my-2'>
              Don't have an account? Sign up <NavLink to='/auth/signup' className='text-blue-500'>here.</NavLink>
            </div>
        </div>
        
      </form>
    </div>
  );
};

export default LoginPage;
