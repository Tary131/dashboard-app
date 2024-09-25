// components/Input.tsx
import { FC, forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className, error, ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <input
          id={id}
          className={`
            block w-full py-2 px-4 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-green-500 focus:border-green-500
            dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400
            ${className} 
          `}
          ref={ref}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
