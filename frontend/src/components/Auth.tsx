import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  SignupType, SigninType, signupInput, signinInput,
} from '@eswar-pranav-nadh/common';
import axios from 'axios';
import BACKEND_URL from '../config';

function Helper({
  type, placeholder, label, onChange,
}: HelperType) {
  return (
    <div>
      <div className="font-medium pb-1 pt-2">
        <label htmlFor={label}>{label}</label>
      </div>
      <input className="w-full rounded-xl border-2 p-2" type={type} required placeholder={placeholder} id={label} onChange={onChange} />
    </div>
  );
}

export default function Auth({ type }: { type: 'signin' | 'signup' }) {
  const navigate = useNavigate();
  const [signInputs, setSignInputs] = useState(
    type === 'signup' ? {
      email: '',
      password: '',
      name: '',
    } as SignupType : {
      email: '',
      password: '',
    } as SigninType,
  );
  const [isDarkened, setIsDarkened] = useState(false);

  async function sendRequest() {
    setIsDarkened(true);
    try {
      const inputs = type === 'signup'
      // @ts-expect-error: Unreachable code error
        ? { name: signInputs.name, email: signInputs.email, password: signInputs.password }
        : { email: signInputs.email, password: signInputs.password };

      const validation = type === 'signup'
        ? signupInput.safeParse(inputs)
        : signinInput.safeParse(inputs);

      if (!validation.success) {
        alert(validation.error.errors[0].message);
        setIsDarkened(false);
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`, inputs);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.jwt);
        navigate('/blogs');
      }
    } catch {
      alert('Check inputs');
      setIsDarkened(false);
    }
  }

  return (
    <div className="h-dvh w-full flex flex-col justify-center items-center">
      <div className="text-3xl font-bold">
        {type === 'signup' ? 'Create an account' : 'Login'}
      </div>
      <div className="font-medium text-slate-400">
        {type === 'signup' ? (
          <span>
            Already have an account?
            {' '}
            <Link to="/Signin" className="underline">Login</Link>
          </span>
        ) : (
          <span>
            Don&apos;t have an account?
            {' '}
            <Link to="/Signup" className="underline">Signup</Link>
          </span>
        )}
      </div>
      <div className="w-1/2 py-5">
        {type === 'signup' && (
        <Helper
          type="text"
          placeholder="Enter your username"
          label="Username"
          onChange={(e) => {
            setSignInputs((c) => ({
              ...c, name: e.target.value,
            }));
          }}
        />
        )}
        <Helper
          type="email"
          placeholder="m@example.com"
          label="Email"
          onChange={(e) => {
            setSignInputs((c) => ({
              ...c, email: e.target.value,
            }));
          }}
        />
        <Helper
          type="password"
          placeholder=""
          label="Password"
          onChange={(e) => {
            setSignInputs((c) => ({
              ...c, password: e.target.value,
            }));
          }}
        />
        <div className={`pt-4 ${isDarkened ? 'opacity-70 cursor-none' : 'cursor-pointer opacity-100'}`}>
          <button type="submit" className="border p-2 w-full rounded-xl text-white bg-black" onClick={isDarkened ? undefined : sendRequest}>{type === 'signup' ? 'sign up' : 'sign in'}</button>
        </div>
      </div>
    </div>
  );
}

interface HelperType {
  type: string;
  placeholder: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
