import { FC, useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/slices/auth/authSlice';
import AuthModal from '../Auth/AuthModal.tsx';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return element;
  }

  return (
    <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
  );
};

export default ProtectedRoute;
