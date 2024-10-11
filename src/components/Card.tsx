import { ReactNode, FC } from 'react';

type CardProps = {
  title: string;
  content: ReactNode;
  className?: string;
};

const Card: FC<CardProps> = ({ title, content, className = '' }) => {
  return (
    <div
      className={`shadow-lg rounded-lg p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transform transition-transform duration-300 hover:shadow-xl ${className} overflow-hidden`}
    >
      <h2 className="flex justify-center text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <div className="flex justify-center overflow-auto text-gray-800 dark:text-gray-300">
        {content}
      </div>
    </div>
  );
};

export default Card;
