import { parseAndConcatNames } from "@/app/utils/titleCase";
import { constDescriptions } from "../../constants/adDescriptions";
import { carDescriptionType } from "./models";

export function parseDescription(carDescription: string) {
  const shuffled = constDescriptions.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 4);

  const parsedCarDescription = parseAndConcatNames(carDescription);

  let parsedDescriptionData: carDescriptionType[] = [];

  selected.map(({ id, description }) => {
    const parsedDescription = description.replace(
      /{([^{}]*)}/g,
      parsedCarDescription
    );
    parsedDescriptionData.push({
      id,
      description: parsedDescription,
    });
  });
  return parsedDescriptionData;
}
