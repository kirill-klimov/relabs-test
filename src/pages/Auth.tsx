import { useContext, useEffect, useState } from "react";
import { IUserContext, UserContext } from "../context/UserContext";
import { useLocation } from "wouter";
import Spinner from "../components/Spinner";
import { delay } from "../helpers/utils";

export default function Auth() {

  const { setUser, user } = useContext(UserContext) as IUserContext;
  const [_, setLocation] = useLocation();

  const initState = { email: '', password: '' };
  const [credentials, setCredentials] = useState(initState);
  const [errors, setErrors] = useState(initState);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUser(false);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setCredentials({
      ...credentials,
      [e.target.name]: value
    });
    if (e.target.name === 'email') {
      setErrors({
        ...errors,
        email: e.target.validity.typeMismatch ? 'Неверный адрес электронной почты' : ''
      });
    }
    if (e.target.name === 'password') {
      setErrors({
        ...errors,
        password: e.target.validity.patternMismatch ? 'Пароль должен содержать минимум 8 символов' : ''
      });
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const err = Object.values(errors).reduce((acc, curr) => acc += curr, '');
    if (err.length) return;

    setLoading(true);
    await delay(2000);

    setLoading(false);
    setUser(true);
    setLocation('/');
  }


  return (
    <div className="canvas bg-neutral-100 grid place-items-center">
      <form className={`w-full max-w-xs flex flex-col justify-stretch bg-white 
      px-6 py-8 rounded-md box-content border`}>
        <h2 className="text-center text-xl mb-6 font-medium">Авторизация</h2>
        <label className="mb-4">
          <span className="block mb-2">
            <span className="text-red-500">*{` `}</span>
            Электронная почта
          </span>
          <input 
          autoComplete="email"
          disabled={loading}
          name="email"
          value={credentials.email}
          onChange={handleChange}
          className="input"
          placeholder="Электронная почта" 
          type="email" />
          {
            !errors.email.length ? <></> :
            <span className="error-text mt-2">{errors.email}</span>
          }
        </label>
        <label className="mb-6">
          <span className="block mb-2">
            <span className="text-red-500">*{` `}</span>
            Пароль
          </span>
          <input
          autoComplete="password"
          disabled={loading}
          pattern="^(?=.*[A-Z]).{8,}$"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className="input"
          placeholder="Пароль" 
          type="password" />
          {
            !errors.password.length ? <></> :
            <span className="error-text mt-2">{errors.password}</span>
          }
        </label>
        <button
        disabled={loading}
        onClick={handleSubmit} 
        className="button">
          { loading ? <Spinner /> : 'Войти' }
        </button>
      </form>
    </div>
  );
}