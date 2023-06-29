import { ValueTransformer } from "typeorm";

export class ArrayObjectTransformer implements ValueTransformer {
  to(value: object[]): string {
    return JSON.stringify(value);
  }

  from(value: string): object[] {
    return JSON.parse(value);
  }
}
