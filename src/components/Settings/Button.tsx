// components/Button.tsx
import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: FC<ButtonProps> = ({ label, className, ...props }) => {
  return (
    <button
      className={`w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
