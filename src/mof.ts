/* eslint-disable @typescript-eslint/no-unused-vars */
import { FirstOrLast } from "./first-or-last";
import { AllOrRemaining } from "./all-or-remaining";

export class Mof {
  public static ALL = AllOrRemaining.ALL;
  public static REMAINING = AllOrRemaining.REMAINING;
  public static FIRST = FirstOrLast.FIRST;
  public static LAST = FirstOrLast.LAST;

  private mocks: unknown[];
  private whenLambdas: (() => void)[];
  private verifyLambdas: (() => void)[];

  private verifyNoInteractionLambda: () => void;

  private mockMap: Map<unknown, number>;

  private containsMoreThanOneMock: boolean;

  private isMocksInCircleChain: boolean;

  private remainingWhenIndex = 0;
  private remainingVerifyIndex = 0;

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

  /**
   * Runs all whens up to, **not** including, the mock.
   * 
   * @param mock - Any mock within mocks. Note: Excludes ambiguous first/last mock in a Simple Closed Curve (In case of ambiguity, use FIRST or LAST enum).
   * @throws Calling with object not in mocks.
   * @throws Calling with ambiguous first or last mock. Example: In a Simple Closed Curve `A -> B -> A`, when calling with A, do you mean the first or lack mock? Instead of passing A, Use FIRST or LAST instead.
   */
  public whenBefore(mock: unknown): void {
    console.log("Unimplemented");
  }

  /**
   * Runs all whens after, **not** including, the mock.
   * 
   * @param mock - Any mock within mocks. Note: Excludes ambiguous first/last mock in a Simple Closed Curve (In case of ambiguity, use FIRST or LAST enum).
   * @throws Calling with object not in mocks.
   * @throws Calling with ambiguous first or last mock. Example: In a Simple Closed Curve `A -> B -> A`, when calling with A, do you mean the first or lack mock? Instead of passing A, Use FIRST or LAST instead.
   */
  public whenAfter(mock: unknown): void {
    console.log("Unimplemented");
  }

  /**
   * Runs ALL or REMAINING verifies.
   * 
   * @param aor ALL or REMAINING enum.
   * @throws Not calling with ALL or REMAINING enum.
   * 
   */
  public verify(aor: AllOrRemaining) {
    console.log("Unimplemented");
  }

  public static Builder = class { };
}
