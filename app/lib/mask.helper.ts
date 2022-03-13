export const onlyNumbers = (str: string) => str.replace(/\D/g, "");
export const phoneMask = (phone: string) => {
  const x: RegExpMatchArray | null = onlyNumbers(phone).match(
    /(\d{0,3})(\d{0,3})(\d{0,4})/
  );
  return x === null
    ? ""
    : !x[2]
      ? x[1]
      : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
};