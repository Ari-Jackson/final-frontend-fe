import { camelCase, snakeCase } from "change-case";
import { type Inputs, type Outputs } from "../components/Form";

export function caseChanger<T extends Inputs | Outputs>(
  args: T,
  endingType?: "camelCase" | "snakeCase"
): T extends Inputs ? Outputs : Inputs {
  const mapped = Object.entries(args).map((keyValue) => [
    endingType === "camelCase"
      ? camelCase(keyValue[0])
      : snakeCase(keyValue[0]),
    keyValue[1],
  ]);

  const mappedAsObj = Object.fromEntries(mapped);

  return mappedAsObj;
}
