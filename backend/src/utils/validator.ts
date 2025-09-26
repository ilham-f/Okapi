export const isEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isEmpty = (value: string | undefined | null) => {
  return !value || value.trim() === "";
};

export const minLength = (value: string, length: number) => {
  return value.length >= length;
};
