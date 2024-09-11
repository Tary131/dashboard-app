import { ReactNode, FC } from 'react';

interface CardProps {
  title: string;
  content: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ title, content, className = '' }) => {
  return (
    <div
      className={`shadow-lg rounded-lg p-4 bg-white border border-gray-200 transform transition-transform duration-300 hover:scale-105 ${className} overflow-hidden`}
    >
      <h2 className="flex justify-center text-xl font-semibold mb-2">
        {title}
      </h2>
      <div className="flex justify-center overflow-auto">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Card;
