// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

 export function getDigit(number, n) {
  return Math.floor((number / Math.pow(10, n - 1)) % 10);
}