import { FC, forwardRef, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

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
            block w-full py-2 px-4 mt-1
            dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:hover:border-blue-700 bg-white text-gray-900 border-gray-300
            hover:border-blue-400 border rounded-md shadow-sm
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 
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
