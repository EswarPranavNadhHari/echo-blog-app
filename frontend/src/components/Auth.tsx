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
      <div className="font-medium pb-1 pt-2 ">
        <label htmlFor={label}>{label}</label>
      </div>
      <input className="w-full border-[1px] border-accent rounded-md bg-primary px-3 py-2 text-secondary shadow-sm focus:border-primary focus:ring-primary" type={type} required placeholder={placeholder} id={label} onChange={onChange} />
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
    <div className="h-dvh w-full flex flex-col justify-center items-center ">
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
      <div className="w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%] py-5">
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
        <div className={`flex justify-center pt-4 ${isDarkened ? 'opacity-70 cursor-none' : 'cursor-pointer opacity-100'}`}>
          <button
            onClick={isDarkened ? undefined : sendRequest}
            type="button"
            className="mt-4 border-2 w-full shadow-xl bg-secondary text-primary hover:opacity-80 transition-all duration-200 outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 font-medium rounded-md text-sm px-5 py-2.5"
          >
            {type === 'signup' ? 'sign up' : 'sign in'}
          </button>
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
