import { FC, MouseEventHandler, ReactNode } from 'react';

interface CardModalProps {
  onClose: () => void;
  children: ReactNode;
}

const CardModal: FC<CardModalProps> = ({ onClose, children }) => {
  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="bg-white p-4 rounded-lg w-1/3" onClick={stopPropagation}>
        {children} {/* Specific modal content */}
      </div>
    </div>
  );
};

export default CardModal;
