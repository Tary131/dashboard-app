import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginUser, registerUser } from '../../redux/slices/auth/authSlice.ts';
import { useTranslation } from 'react-i18next';

type AuthFormValues = {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>();
  const dispatch = useAppDispatch();
  const authError = useAppSelector((state) => state.auth.error);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { t } = useTranslation();

  useEffect(() => {
    if (isLoggedIn) {
      reset();
      onClose();
    }
  }, [isLoggedIn, reset, onClose]);

  const onSubmit = (data: AuthFormValues) => {
    if (isRegister) {
      if (data.password === data.confirmPassword) {
        dispatch(
          registerUser({
            email: data.email,
            password: data.password,
            name: data.name || '',
          })
        );
      } else {
        return; // Handle password mismatch if needed
      }
    } else {
      dispatch(loginUser(data));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-lg w-96 p-5 relative">
        <h2 className="text-2xl font-bold mb-4">
          {isRegister ? t('auth.register') : t('auth.login')}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              {t('auth.email')}
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: t('auth.required.email') })}
              className="border dark:border-gray-700 p-2 w-full bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              {t('auth.password')}
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: t('auth.required.password'),
              })}
              className="border dark:border-gray-700 p-2 w-full bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {isRegister && (
            <>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-2">
                  {t('auth.confirmPassword')}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: t('auth.required.confirmPassword'),
                    validate: (value) =>
                      value === watch('password') || t('auth.passwordMismatch'),
                  })}
                  className="border dark:border-gray-700 p-2 w-full bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                  {t('auth.name')}
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: t('auth.required.name') })}
                  className="border dark:border-gray-700 p-2 w-full bg-gray-50 dark:bg-gray-700 text-black dark:text-white"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
            </>
          )}

          {authError && <p className="text-red-500">{t('auth.authError')}</p>}

          <button
            type="submit"
            className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded w-full mt-4"
          >
            {isRegister ? t('auth.register') : t('auth.login')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 dark:text-blue-300"
          >
            {isRegister
              ? t('auth.toggle.toLogin')
              : t('auth.toggle.toRegister')}
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-400"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
