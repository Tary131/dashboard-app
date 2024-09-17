import { FC, ChangeEvent } from 'react';

interface AvatarInputProps {
  avatarPreview: string;
  handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AvatarInput: FC<AvatarInputProps> = ({
  avatarPreview,
  handleAvatarChange,
}) => (
  <div className="flex flex-col items-center">
    <label className="font-semibold mb-2">Avatar:</label>
    <img
      src={avatarPreview || 'https://via.placeholder.com/150'}
      alt="Avatar Preview"
      className="w-24 h-24 rounded-full mb-2"
    />
    <input
      type="file"
      accept="image/*"
      onChange={handleAvatarChange}
      className="border p-2 rounded-md"
    />
  </div>
);

export default AvatarInput;
