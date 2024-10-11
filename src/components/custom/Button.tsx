import { FC, ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const Button: FC<ButtonProps> = ({ label, className = '', ...props }) => {
  return (
    <button
      className={`w-full py-2 px-4 bg-blue-500 dark:bg-indigo-700 text-gray-100 font-semibold rounded-lg shadow-md 
        transition-transform duration-300 ease-in-out 
        hover:scale-105 hover:shadow-lg focus:outline-none 
        focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50 
        active:scale-95 active:bg-blue-600 dark:active:bg-indigo-600 
        ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
