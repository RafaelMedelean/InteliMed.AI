import axios from 'axios';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

type SignInFormInput = {
  username: string;
  password: string;
  email: string;
  gender: string;
  isMedic: boolean;
  university: string;
  rememberMe: boolean;
};

const SignupPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormInput>();
  const [genderValue, setGenderValue] = useState("");

  const onSubmit: SubmitHandler<SignInFormInput> = async data => {
    try {
      const response = await axios.post('http://localhost:8001/api/users/signup', data);
      console.log(response);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenderValue(e.target.value);
  };

  return (
    <div className="w-2/3 p-5 border border-gray-300 rounded-md">
      <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4">
          <label htmlFor='username' className='block mb-2'>Username</label>
          <input
            id='username'
            type='text'
            {...register('username', {required: 'Username is required'})}
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Username'
            />
          {errors.username && <p className='text-red-500 mt-1' > {errors.username.message} </p>}
        </div>

        <div className='mb-4'>
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder='Email'
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
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

        <div className="mb-4">
          <label htmlFor='university' className='block mb-2'>University</label>
          <input
            id='university'
            type='text'
            {...register('university', {required: 'University is required'})}
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='University'
            />
          {errors.university && <p className='text-red-500 mt-1' > {errors.university.message} </p>}
        </div>

        <div className="mb-4">
          <label htmlFor='gender' className='block mb-2'>Gender</label>
          <select
            id='gender'
            {...register('gender', { required: 'Gender is required' })}
            className={`w-full p-2 border border-gray-300 rounded ${!genderValue ? 'text-gray-400' : ''}`}
            onChange={handleGenderChange}
            value={genderValue}
          >
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className='text-red-500 mt-1'>{errors.gender.message}</p>}
        </div>

        <div className="mb-4 flex items-center">
          <input
            id="isMedic"
            type="checkbox"
            {...register('isMedic')}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="block">Are you a medic?</label>
        </div>

        <div className='mt-2 flex flex-col items-center'>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-2/3">
              Sign Up
            </button>
            <div className="mt-4 flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                {...register('rememberMe')}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="block">Remember Me</label>
            </div>
            <div className='my-2'>
              Already have an account? Login <NavLink to='/auth/login' className='text-blue-500'>here.</NavLink>
            </div>
        </div>
        
      </form>
    </div>
  );
};

export default SignupPage;
