export function fixDate (date) {
  if (date) {
    if (date.includes(" ")) {
      return date.substring(0, date.indexOf(" "));
    } else if (date.includes("T")) {
      return date.substring(0, date.indexOf("T"));
    }
  }
  return date;
}

export function checkIfValidDate (str) {
  const regexExp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

  return regexExp.test(str);
}