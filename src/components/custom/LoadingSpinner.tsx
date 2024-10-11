const LoadingSpinner = ({
  size = '8',
  color = 'blue-500',
  borderColor = 'gray-200',
  borderWidth = '4',
}) => {
  const sizeClass = `w-${size} h-${size}`;
  const borderClass = `border-${borderWidth} border-t-${color} border-${borderColor}`;

  return (
    <div
      className={`animate-spin rounded-full ${sizeClass} ${borderClass}`}
    ></div>
  );
};

export default LoadingSpinner;
