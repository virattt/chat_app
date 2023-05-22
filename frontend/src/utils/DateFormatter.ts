export const formatDate = (datetime: string) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  const date = new Date(datetime);

  // Format the time using toLocaleTimeString
  const time = date.toLocaleTimeString('en-US', options);

  // Format the date manually
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();

  return `${time} on ${month} ${day}, ${year}`;
};
