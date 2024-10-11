// Function to get the formatted date
export const getFormattedDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return (
    <p className="text-center text-3xl font-bold mt-9 text-cyan-700">{`${day}.${month}.${year}`}</p>
  );
};
