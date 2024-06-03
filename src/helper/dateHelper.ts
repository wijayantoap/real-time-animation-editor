export const formatDate = (value: Date) => {
  const date = new Date(value);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDateTime = (time: Date): string => {
  const date = new Date(time);
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  const formattedDay: string = day < 10 ? '0' + day : String(day);
  const formattedMonth: string = month < 10 ? '0' + month : String(month);
  const formattedHours: string = hours < 10 ? '0' + hours : String(hours);
  const formattedMinutes: string = minutes < 10 ? '0' + minutes : String(minutes);

  return `${formattedHours}:${formattedMinutes} ${formattedDay}/${formattedMonth}/${year}`;
};
