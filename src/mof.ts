/* eslint-disable @typescript-eslint/no-unused-vars */
import { FirstOrLast } from "./first-or-last";
import { AllOrRemaining } from "./all-or-remaining";

export interface MofBuilder {
  add(m: unknown, w: (() => void), v: (() => void)): MofBuilder;
  enableVerifyNoInteractions(verifyNoInteractionLambda: (() => void)): MofBuilder;
  build(): Mof;
}

export interface MofBuilderConstructor {
  new(): MofBuilder
}

export class Mof {
  public static ALL = AllOrRemaining.ALL;
  public static REMAINING = AllOrRemaining.REMAINING;
  public static FIRST = FirstOrLast.FIRST;
  public static LAST = FirstOrLast.LAST;

  private mocks: unknown[];
  private whenLambdas: (() => void)[];
  private verifyLambdas: (() => void)[];

  private verifyNoInteractionLambda: (() => void) | null;

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
   */
  public verify(aor: AllOrRemaining): void {
    console.log("Unimplemented");
  }

  /**
   * Runs all verifies up to, and including, the mock.
   * 
   * @param mock - Any mock within mocks. Note: Excludes ambiguous first/last mock in a Simple Closed Curve (In case of ambiguity, use FIRST or LAST enum).
   * @throws Calling with object not in mocks.
   * @throws Calling with ambiguous first or last mock. Example: In a Simple Closed Curve `A -> B -> A`, when calling with A, do you mean the first or lack mock? Instead of passing A, Use FIRST or LAST instead.
   */
  public verifyThrough(mock: unknown): void {
    console.log("Unimplemented");
  }

  /**
   * Runs all verifies up to, **not** including, the mock.
   * 
   * @param mock - Any mock within mocks. Note: Excludes ambiguous first/last mock in a Simple Closed Curve (In case of ambiguity, use FIRST or LAST enum).
   * @throws Calling with object not in mocks.
   * @throws Calling with ambiguous first or last mock. Example: In a Simple Closed Curve `A -> B -> A`, when calling with A, do you mean the first or lack mock? Instead of passing A, Use FIRST or LAST instead.
   */
  public verifyBefore(mock: unknown): void {
    console.log("Unimplemented");
  }

  /**
   * Runs all verifies after, **not** including, the mock.
   * 
   * @param mock - Any mock within mocks. Note: Excludes ambiguous first/last mock in a Simple Closed Curve (In case of ambiguity, use FIRST or LAST enum).
   * @throws Calling with object not in mocks.
   * @throws Calling with ambiguous first or last mock. Example: In a Simple Closed Curve `A -> B -> A`, when calling with A, do you mean the first or lack mock? Instead of passing A, Use FIRST or LAST instead.
   */
  public verifyAfter(mock: unknown): void {
    console.log("Unimplemented");
  }

  private enableVerifyNoInteractions(verifyNoInteractionLambda: (() => void) | null): Mof {
    this.verifyNoInteractionLambda = verifyNoInteractionLambda;
    return this;
  }

  /**
   * Runs no interaction lambda for ALL or REMAINING mocks.
   * 
   * @param aor - ALL or REMAINING enum.
   * @throws Calling this method when verifyNoInteractions is not enabled.
   * @throws Not calling with ALL or REMAINING enum.
   */
  public verifyNoInteractions(aor: AllOrRemaining): void {
    console.log("Unimplemented");
  }

  /**
   * Runs no interaction lambda for all mocks that are **only** after, but not including, mock passed into method.
   * 
   * @param mock - Any mock within mocks. Note: Excludes ambiguous first/last mock in a Simple Closed Curve (In case of ambiguity, use FIRST or LAST enum).
   * @throws Calling this method when verifyNoInteractions is not enabled.
   * @throws Calling with object not in mocks.
   * @throws Calling with ambiguous first or last mock. Example: In a Simple Closed Curve `A -> B -> A`, when calling with A, do you mean the first or lack mock? Instead of passing A, Use FIRST or LAST instead.
   */
  public verifyNoInteractionsAfter(mock: unknown): void {
    console.log("Unimplemented");
  }

  public static Builder: MofBuilderConstructor = class Builder implements MofBuilder { 
    
    private mocks: unknown[];
    private whens: (() => void)[];
    private verifies: (() => void)[];

    private verifyNoInteractionLambda: (() => void) | null;

    /**
     * Creates a builder for Mof.
     */
    public constructor() {
      this.mocks = [];
      this.whens = [];
      this.verifies = []; 
      this.verifyNoInteractionLambda = null;
    }

    public add(m: unknown, w: (() => void), v: (() => void)): MofBuilder {
        this.mocks.push(m);
        this.whens.push(w);
        this.verifies.push(v);
        return this;
    }

    public enableVerifyNoInteractions(verifyNoInteractionLambda: (() => void)): MofBuilder {
      this.verifyNoInteractionLambda = verifyNoInteractionLambda;
      return this;
    }

    public build(): Mof {
      const mof: Mof = new Mof(
        this.mocks,
        this.whens,
        this.verifies
      );
      mof.enableVerifyNoInteractions(this.verifyNoInteractionLambda);

      return mof;
    }
  };

  public static builder(): MofBuilder {
    return new Mof.Builder();
  }
}