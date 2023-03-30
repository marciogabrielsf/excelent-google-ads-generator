export function parseAndConcatNames(string: string) {
  const splittedCarName = string.split(" ");

  splittedCarName.forEach((text, index) => {
    splittedCarName[index] =
      text[0].toUpperCase() + text.slice(1).toLowerCase();
  });

  return splittedCarName[0].concat(" ", splittedCarName[1]);
}
