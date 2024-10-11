import { FC, MouseEventHandler, ReactNode } from 'react';

type CardModalProps = {
  onClose: () => void;
  children: ReactNode;
};

const CardModal: FC<CardModalProps> = ({ onClose, children }) => {
  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-4 rounded-lg w-1/3 text-gray-900 dark:text-gray-100"
        onClick={stopPropagation}
      >
        {children}
      </div>
    </div>
  );
};

export default CardModal;
