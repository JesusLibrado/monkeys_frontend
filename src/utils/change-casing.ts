export const snakeToTitleCase = (value: string) => {
  return value
    .split("_")
    .filter((x) => x.length > 0)
    .map((x) => x.charAt(0).toUpperCase() + x.toLowerCase().slice(1))
    .join(" ");
};

export const kebabToTitleCase = (value: string) => {
  return value
    .split("-")
    .filter((x) => x.length > 0)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
};

export const toSentenceCase = (value: string) => {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join(" ");
};

export const toAlphaNumber = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};

export const getFirstTwoLetters = (user: string) => {
  const names = user?.split(" ");
  const initials = names?.map((name) => name.charAt(0).toUpperCase()).join("");
  return initials?.substring(0, 2);
};
