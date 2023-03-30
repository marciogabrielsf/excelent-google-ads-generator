import { parseAndConcatNames } from "@/app/utils/titleCase";
import { ConstTitles } from "../../constants/adTitles";
import { carTitleType } from "./models";

export function parseTitle(carName: string) {
  const shuffled = ConstTitles.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 15);
  const parsedCarName = parseAndConcatNames(carName);

  let parsedCarData: carTitleType[] = [];

  selected.map(({ id, title }) => {
    const parsedTitle = title.replace(/{([^{}]*)}/g, parsedCarName);
    parsedCarData.push({
      id,
      title: parsedTitle,
    });
  });

  return parsedCarData;
}
