export const formatDateString = (date: string): string => {
  const dateObj = new Date(date);

  return dateObj.toLocaleString("ru-RU", { month: "short", day: "numeric", year: "numeric" });
};

export const compareStringDate = (firstDate: string, secondDate: string | Date): boolean => {
  if (typeof secondDate === "string") {
    return new Date(firstDate) < new Date(secondDate);
  }
  return new Date(firstDate) < secondDate;
};
