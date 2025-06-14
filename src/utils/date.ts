import dayjs from "dayjs";

type AddOrSubtractFromDate = (
  days: number,
  add?: boolean,
  startingDate?: Date,
) => Date;

export const addOrSubtractDaysFromDate: AddOrSubtractFromDate = (
  days,
  add,
  startingDate = new Date(),
) => {
  if (add) return new Date(new Date().setDate(startingDate.getDate() + days));
  else return new Date(new Date().setDate(startingDate.getDate() - days));
};

export const addOrSubtractMinutesFromDate: AddOrSubtractFromDate = (
  minutes,
  add,
  startingDate = new Date(),
) => {
  if (add)
    return new Date(new Date().setMinutes(startingDate.getMinutes() + minutes));
  else
    return new Date(new Date().setMinutes(startingDate.getMinutes() - minutes));
};

export const timeSince = (date: Date) => {
  if (typeof date !== "object") {
    date = new Date(date);
  }

  const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);
  let interval: number = 0;
  let intervalType: string = "";

  const intervals = {
    year: 31536000,
    mes: 2592000,
    dia: 86400,
    hora: 3600,
    minutos: 60,
    segundos: 1,
  };

  for (const [key, value] of Object.entries(intervals)) {
    interval = Math.floor(seconds / value);
    if (interval >= 1) {
      intervalType = key;
      break;
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += "s";
  }

  return `hace ${interval} ${intervalType}`;
};

export const formatDate = (date: string, format: string) => {
  return dayjs(date).format(format);
};
