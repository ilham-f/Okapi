import dayjs from "dayjs";

export const formatDate = (date: Date | string, format: string = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs(date).format(format);
};

export const now = () => dayjs().toDate();

export const addDays = (date: Date | string, days: number) => {
  return dayjs(date).add(days, "day").toDate();
};
