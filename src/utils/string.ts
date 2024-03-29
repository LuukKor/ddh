export function uppercaseFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeUnderscore(str: string): string {
  return str.replace(/_/g, ' ');
}
