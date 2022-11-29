export const formatDateString = (date: string): string => {
  const dateObj = new Date(date);

  return dateObj.toLocaleString("ru-RU", { month: "short", day: "numeric", year: "numeric" });
};

export const compareStringDate = (firstDate: string, secondDate: string | Date): boolean => {
  firstDate = new Date(firstDate).toISOString().slice(0, 10);
  secondDate = new Date(secondDate).toISOString().slice(0, 10);
  return new Date(firstDate) < new Date(secondDate);
};
