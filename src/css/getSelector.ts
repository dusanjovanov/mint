export const getSelector = (classSelector: string, key: string) => {
  if (key.indexOf("&") === 0) {
    return key.replace(/&/g, classSelector);
  }
  //
  else if (key.indexOf(":") === 0) {
    return `${classSelector}${key}`;
  }
  //
  else if (key.indexOf("*") === 0) {
    return `${classSelector} *`;
  }
  //
  else {
    return `${classSelector} ${key}`;
  }
};
