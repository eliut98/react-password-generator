function generateCharacters(min, max) {
  let result = "";
  for (let i = min; i <= max; i++) {
    result += String.fromCharCode(i);
  }
  return result;
}

export const numbers = generateCharacters(48, 57);
export const symbols =
  generateCharacters(32, 47) +
  generateCharacters(58, 64) +
  generateCharacters(91, 96);
export const capitalLetters = generateCharacters(65, 90);
export const lowercase = generateCharacters(97, 122);