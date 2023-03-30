import { ConstTitles } from "./../../constants/adTitles";
import { AdTitleType } from "./models";

function titleCase(string: string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function generateTitles(carName: string) {
  const shuffled = ConstTitles.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 15);
  const splittedCarName = carName.split(" ");
  const parsedCarName = titleCase(
    splittedCarName[0].concat(" ", splittedCarName[1])
  );

  let parsedAdTitle: AdTitleType[] = [];

  selected.map(({ id, description }) => {
    const parsedDescription = description.replace(/{([^{}]*)}/g, parsedCarName);
    parsedAdTitle.push({
      id,
      description: parsedDescription,
    });
  });

  return parsedAdTitle;
}
