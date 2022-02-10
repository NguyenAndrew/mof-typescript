/* eslint-disable @typescript-eslint/no-unused-vars */
import { FirstOrLast } from "./first-or-last";
import { AllOrRemaining } from "./all-or-remaining";

export class Mof {
  public static ALL = AllOrRemaining.ALL;
  public static REMAINING = AllOrRemaining.REMAINING;
  public static FIRST = FirstOrLast.FIRST;
  public static LAST = FirstOrLast.LAST;

  private constructor(
    mocks: unknown[],
    whenLambdas: (() => void)[],
    verifyLambdas: (() => void)[]
  ) {
    console.log("Unimplemented");
  }

  /**
   * Runs ALL or REMAINING whens.
   *
   * @param aor - ALL or REMAINING enum.
   * @throws Not calling with ALL or REMAINING enum.
   *
   */
  public when(aor: AllOrRemaining): void {
    console.log("Unimplemented");
  }

  public static Builder = class {};
}
