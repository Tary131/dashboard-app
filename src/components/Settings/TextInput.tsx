import { FC, ChangeEvent } from 'react';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<TextInputProps> = ({
  label,
  name,
  value,
  handleChange,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="font-semibold">
      {label}:
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      className="border p-2 rounded-md"
    />
  </div>
);

export default TextInput;
