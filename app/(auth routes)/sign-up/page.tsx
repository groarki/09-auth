'use client';
import css from "./SignUp.module.css"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe, register } from '@/lib/api/clientApi';
import { RegisterRequest } from '@/types/user';
import { useAuth } from "@/lib/store/authStore";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { setIsAuthenticated, setUser } = useAuth.getState();

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);
      if (res) {
        setIsAuthenticated(true);
        const user = await getMe();
        setUser(user);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log('error', error);
      setError('Invalid email or password');
    }
  };

  return (
    <main className={css.mainContent}>
    <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" className={css.input} required />
      </div>
  
      <div className={css.formGroup}>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" className={css.input} required />
      </div>
  
      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Register
        </button>
      </div>
     {error && <p>{error}</p>}
    </form>
  </main>
  );
};

export default SignUp;
