import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectAuthError, selectIsLoggedIn } from '../../redux/selectors';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { thunks } from '../../redux/thunks';
import Button from '../custom/Button';
import Input from '../custom/Input';
import { AuthFormValues } from '../../types/types.ts';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

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
  const authError = useAppSelector(selectAuthError);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
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
          thunks.registerUser({
            email: data.email,
            password: data.password,
            name: data.name || '',
          })
        ).then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            toast.success(t('auth.registerSuccess'));
          }
        });
      } else {
        toast.error(t('auth.passwordMismatch'));
        return; //todo handle password miss-match
      }
    } else {
      dispatch(thunks.loginUser(data)).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success(t('auth.loginSuccess')); // Show success toast
        }
      });
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
            <Input
              id={isRegister ? 'registerEmail' : 'loginEmail'}
              type="email"
              label={t('auth.email')}
              {...register('email', { required: t('auth.required.email') })}
              error={errors.email?.message}
            />
          </div>

          <div className="mb-4">
            <Input
              id={isRegister ? 'registerPassword' : 'loginPassword'}
              type="password"
              label={t('auth.password')}
              {...register('password', {
                required: t('auth.required.password'),
              })}
              error={errors.password?.message}
            />
          </div>
          {isRegister && (
            <>
              <div className="mb-4">
                <Input
                  id="confirmPassword"
                  type="password"
                  label={t('auth.confirmPassword')}
                  {...register('confirmPassword', {
                    required: t('auth.required.confirmPassword'),
                    validate: (value) =>
                      value === watch('password') || t('auth.passwordMismatch'),
                  })}
                  error={errors.confirmPassword?.message}
                />
              </div>

              <div className="mb-4">
                <Input
                  id="name"
                  type="text"
                  label={t('auth.name')}
                  {...register('name', { required: t('auth.required.name') })}
                  error={errors.name?.message}
                />
              </div>
            </>
          )}

          {authError && <p className="text-red-500">{t('auth.authError')}</p>}

          <Button
            type="submit"
            label={isRegister ? t('auth.register') : t('auth.login')}
          />
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
      </div>
    </div>
  );
};
export default AuthModal;
