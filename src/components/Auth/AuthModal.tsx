import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginUser, registerUser } from '../../redux/slices/auth/authSlice.ts';
import { useTranslation } from 'react-i18next'; // Import useTranslation

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
  const { t } = useTranslation(); // Use the translation hook

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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-5 relative">
        <h2 className="text-2xl font-bold mb-4">
          {isRegister ? t('auth.register') : t('auth.login')}{' '}
          {/* Translated Title */}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              {t('auth.email')} {/* Translated Email Label */}
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: t('auth.required.email') })}
              className="border p-2 w-full"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              {t('auth.password')} {/* Translated Password Label */}
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: t('auth.required.password'),
              })}
              className="border p-2 w-full"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {isRegister && (
            <>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-2">
                  {t('auth.confirmPassword')}{' '}
                  {/* Translated Confirm Password Label */}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: t('auth.required.confirmPassword'), // Translated Error Message
                    validate: (value) =>
                      value === watch('password') || t('auth.passwordMismatch'), // Translated Mismatch Message
                  })}
                  className="border p-2 w-full"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                  {t('auth.name')} {/* Translated Name Label */}
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: t('auth.required.name') })} // Translated Error Message
                  className="border p-2 w-full"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
            </>
          )}

          {authError && (
            <p className="text-red-500">
              {t('auth.authError')} {/* Translated Auth Error Message */}
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4"
          >
            {isRegister ? t('auth.register') : t('auth.login')}{' '}
            {/* Translated Button Text */}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500"
          >
            {isRegister
              ? t('auth.toggle.toLogin')
              : t('auth.toggle.toRegister')}{' '}
            {/* Translated Toggle Text */}
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
