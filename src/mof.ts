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

  private verifyNoInteractionLambda: ((mock: unknown) => void) | null = null;

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
    this.mockMap = new Map<unknown, number>();

    this.containsMoreThanOneMock = mocks.length > 1;

    this.isMocksInCircleChain = mocks[0] == mocks[mocks.length - 1];

    const lengthOfMocksToCheck: number = this.isMocksInCircleChain && this.containsMoreThanOneMock ? mocks.length - 1 : mocks.length;
    for (let i = 0; i < lengthOfMocksToCheck; i++) {
      const potentiallyDuplicateMock: unknown = this.mockMap.get(mocks[i]);
      this.mockMap.set(mocks[i], i);
      const isDuplicateMock: boolean = potentiallyDuplicateMock != null;
      if (isDuplicateMock) {
        throw new Error(`m${i + 1} cannot be the same as a previous mock in mocks!`);
      }
    }

    this.mocks = mocks;
    this.whenLambdas = whenLambdas;
    this.verifyLambdas = verifyLambdas;
  }

  /**
   * Runs ALL or REMAINING whens.
   *
   * @param aor - ALL or REMAINING enum.
   * @throws Not calling with ALL or REMAINING enum.
   */
  public when(aor: AllOrRemaining): void {
    if (aor == AllOrRemaining.ALL) {
      for (let i = 0; i < this.mocks.length; i++) {
        try {
          this.whenLambdas[i]();
        } catch (e) {
          throw new Error(`w${i + 1} throws an exception! Please check your whens.`, { cause: e as Error });
        }
      }
      this.remainingWhenIndex = this.mocks.length;
      return;
    }

    if (aor == AllOrRemaining.REMAINING) {
      for (let i = this.remainingWhenIndex; i < this.mocks.length; i++) {
        try {
          this.whenLambdas[i]();
        } catch (e) {
          throw new Error(`w${i + 1} throws an exception! Please check your whens.`, { cause: e as Error });
        }
      }
      this.remainingWhenIndex = this.mocks.length;
      return;
    }

    throw new Error("aor must be ALL or REMAINING.");
  }

  /**
   * Runs all whens up to, **not** including, the mock.
   * 
   * @param mock - Any mock within mocks. Note: Excludes ambiguous first/last mock in a Simple Closed Curve (In case of ambiguity, use FIRST or LAST enum).
   * @throws Calling with object not in mocks.
   * @throws Calling with ambiguous first or last mock. Example: In a Simple Closed Curve `A -> B -> A`, when calling with A, do you mean the first or lack mock? Instead of passing A, Use FIRST or LAST instead.
   */
  public whenBefore(mock: unknown): void {
    if (mock == FirstOrLast.FIRST) {
      // Note: This flow exists, because it creates a better user experience when refactoring between simple closed and simple open curves.
      this.remainingWhenIndex = 1;
      return;
    }

    if (mock == FirstOrLast.LAST) {
      const indexOfLastMock: number = this.mocks.length - 1;
      for (let i = 0; i < indexOfLastMock; i++) {
        try {
          this.whenLambdas[i]();
        } catch (e) {
          throw new Error(`w${i + 1} throws an exception! Please check your whens.`, { cause: e as Error });
        }
      }
      this.remainingWhenIndex = this.mocks.length;
      return;
    }

    if (this.containsMoreThanOneMock && this.isMocksInCircleChain && mock == this.mocks[0]) {
      throw new Error('Cannot call whenBefore(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use whenBefore(FIRST) or whenBefore(LAST).');
    }

    const objectIndexOfMock: number | undefined = this.mockMap.get(mock);

    if (objectIndexOfMock == null) {
      throw new Error('Cannot call whenBefore(Object mock) for mock not in mocks!')
    }

    const indexOfMock = objectIndexOfMock;

    for (let i = 0; i < indexOfMock; i++) {
      try {
        this.whenLambdas[i]();
      } catch (e) {
        throw new Error(`w${i + 1} throws an exception! Please check your whens.`, { cause: e as Error });
      }
    }

    this.remainingWhenIndex = indexOfMock + 1;
  }

  /**
   * Runs all whens after, **not** including, the mock.
   * 
   * @param mock - Any mock within mocks. Note: Excludes ambiguous first/last mock in a Simple Closed Curve (In case of ambiguity, use FIRST or LAST enum).
   * @throws Calling with object not in mocks.
   * @throws Calling with ambiguous first or last mock. Example: In a Simple Closed Curve `A -> B -> A`, when calling with A, do you mean the first or lack mock? Instead of passing A, Use FIRST or LAST instead.
   */
  public whenAfter(mock: unknown): void {
    if (mock == FirstOrLast.FIRST) {
      for (let i = 1; i < this.mocks.length; i++) {
        try {
          this.whenLambdas[i]();
        } catch (e) {
          throw new Error(`w${i + 1} throws an exception! Please check your whens.`, { cause: e as Error });
        }
      }
      this.remainingWhenIndex = this.mocks.length;
      return;
    }

    if (mock == FirstOrLast.LAST) {
      // Note: This flow exists, because it creates a better user experience when refactoring between simple closed and simple open curves.
      this.remainingWhenIndex = this.mocks.length;
      return;
    }

    if (this.containsMoreThanOneMock && this.isMocksInCircleChain && mock == this.mocks[0]) {
      throw new Error('Cannot call whenAfter(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use whenAfter(FIRST) or whenAfter(LAST).');
    }

    const objectIndexOfMock: number | undefined = this.mockMap.get(mock);

    if (objectIndexOfMock == null) {
      throw new Error('Cannot call whenAfter(Object mock) for mock not in mocks!');
    }

    for (let i = objectIndexOfMock + 1; i < this.mocks.length; i++) {
      try {
        this.whenLambdas[i]();
      } catch (e) {
        throw new Error(`w${i + 1} throws an exception! Please check your whens.`, { cause: e as Error });
      }
    }

    this.remainingWhenIndex = this.mocks.length;
  }

  /**
   * Runs ALL or REMAINING verifies.
   * 
   * @param aor ALL or REMAINING enum.
   * @throws Not calling with ALL or REMAINING enum.
   */
  public verify(aor: AllOrRemaining): void {
    if (aor == AllOrRemaining.ALL) {
      for (let i = 0; i < this.mocks.length; i++) {
        try {
          this.verifyLambdas[i]();
        } catch (e) {
          throw new Error(`v${i + 1} throws an exception! Please check your verifies.`, { cause: e as Error });
        }
      }
      this.remainingVerifyIndex = this.mocks.length;
      return;
    }

    if (aor == AllOrRemaining.REMAINING) {
      for (let i = this.remainingVerifyIndex; i < this.mocks.length; i++) {
        try {
          this.verifyLambdas[i]();
        } catch (e) {
          throw new Error(`v${i + 1} throws an exception! Please check your verifies.`, { cause: e as Error });
        }
      }
      this.remainingVerifyIndex = this.mocks.length;
      return;
    }

    throw new Error("aor must be ALL or REMAINING.");
  }

  /**
   * Runs all verifies up to, and including, the mock.
   * 
   * @param mock - Any mock within mocks. Note: Excludes ambiguous first/last mock in a Simple Closed Curve (In case of ambiguity, use FIRST or LAST enum).
   * @throws Calling with object not in mocks.
   * @throws Calling with ambiguous first or last mock. Example: In a Simple Closed Curve `A -> B -> A`, when calling with A, do you mean the first or lack mock? Instead of passing A, Use FIRST or LAST instead.
   */
  public verifyThrough(mock: unknown): void {
    if (mock == FirstOrLast.FIRST) {
      try {
        this.verifyLambdas[0]();
      } catch (e) {
        throw new Error(`v${1} throws an exception! Please check your verifies.`, { cause: e as Error });
      }
      this.remainingVerifyIndex = 1;
      return;
    }

    if (mock == FirstOrLast.LAST) {
      for (let i = 0; i < this.mocks.length; i++) {
        try {
          this.verifyLambdas[i]();
        } catch (e) {
          throw new Error(`v${i + 1} throws an exception! Please check your verifies.`, { cause: e as Error });
        }
      }
      this.remainingVerifyIndex = this.mocks.length;
      return;
    }

    if (this.containsMoreThanOneMock && this.isMocksInCircleChain && mock == this.mocks[0]) {
      throw new Error('Cannot call verifyThrough(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use verifyThrough(FIRST) or verifyThrough(LAST).');
    }

    const objectIndexOfMock: number | undefined = this.mockMap.get(mock);

    if (objectIndexOfMock == null) {
      throw new Error('Cannot call verifyThrough(Object mock) for mock not in mocks!');
    }

    const indexOfMock: number = objectIndexOfMock;

    for (let i = 0; i <= indexOfMock; i++) {
      try {
        this.verifyLambdas[i]();
      } catch (e) {
        throw new Error(`v${i + 1} throws an exception! Please check your verifies.`, { cause: e as Error });
      }
    }

    this.remainingVerifyIndex = indexOfMock + 1;
  }

  /**
   * Runs all verifies up to, **not** including, the mock.
   * 
   * @param mock - Any mock within mocks. Note: Excludes ambiguous first/last mock in a Simple Closed Curve (In case of ambiguity, use FIRST or LAST enum).
   * @throws Calling with object not in mocks.
   * @throws Calling with ambiguous first or last mock. Example: In a Simple Closed Curve `A -> B -> A`, when calling with A, do you mean the first or lack mock? Instead of passing A, Use FIRST or LAST instead.
   */
  public verifyBefore(mock: unknown): void {
    if (mock == FirstOrLast.FIRST) {
      // Note: This flow exists, because it creates a better user experience when refactoring between simple closed and simple open curves.
      this.remainingVerifyIndex = 1;
      return;
    }

    if (mock == FirstOrLast.LAST) {
      for (let i = 0; i < this.mocks.length - 1; i++) {
        try {
          this.verifyLambdas[i]();
        } catch (e) {
          throw new Error(`v${i + 1} throws an exception! Please check your verifies.`, { cause: e as Error });
        }
      }
      this.remainingVerifyIndex = this.mocks.length;
      return;
    }

    if (this.containsMoreThanOneMock && this.isMocksInCircleChain && mock == this.mocks[0]) {
      throw new Error('Cannot call verifyBefore(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use verifyBefore(FIRST) or verifyBefore(LAST).');
    }

    const objectIndexOfMock: number | undefined = this.mockMap.get(mock);

    if (objectIndexOfMock == null) {
      throw new Error('Cannot call verifyBefore(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use verifyBefore(FIRST) or verifyBefore(LAST).');
    }

    const indexOfMock: number = objectIndexOfMock;

    for (let i = 0; i < indexOfMock; i++) {
      try {
        this.verifyLambdas[i]();
      } catch (e) {
        throw new Error(`v${i + 1} throws an exception! Please check your verifies.`, { cause: e as Error });
      }
    }

    this.remainingVerifyIndex = indexOfMock + 1;
  }

  /**
   * Runs all verifies after, **not** including, the mock.
   * 
   * @param mock - Any mock within mocks. Note: Excludes ambiguous first/last mock in a Simple Closed Curve (In case of ambiguity, use FIRST or LAST enum).
   * @throws Calling with object not in mocks.
   * @throws Calling with ambiguous first or last mock. Example: In a Simple Closed Curve `A -> B -> A`, when calling with A, do you mean the first or lack mock? Instead of passing A, Use FIRST or LAST instead.
   */
  public verifyAfter(mock: unknown): void {
    if (mock == FirstOrLast.FIRST) {
      for (let i = 1; i < this.mocks.length; i++) {
        try {
          this.verifyLambdas[i]();
        } catch (e) {
          throw new Error(`v${i + 1} throws an exception! Please check your verifies.`, { cause: e as Error });
        }
      }
      this.remainingVerifyIndex = this.mocks.length;
      return;
    }

    if (mock == FirstOrLast.LAST) {
      // Note: This flow exists, because it creates a better user experience when refactoring between simple closed and simple open curves.
      this.remainingVerifyIndex = this.mocks.length;
      return;
    }

    if (this.containsMoreThanOneMock && this.isMocksInCircleChain && mock == this.mocks[0]) {
      throw new Error('Cannot call verifyAfter(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use verifyAfter(FIRST) or verifyAfter(LAST).');
    }

    const objectIndexOfMock: number | undefined = this.mockMap.get(mock);

    if (objectIndexOfMock == null) {
      throw new Error('Cannot call verifyAfter(Object mock) for mock not in mocks!');
    }

    for (let i = objectIndexOfMock + 1; i < this.mocks.length; i++) {
      try {
        this.verifyLambdas[i]();
      } catch (e) {
        throw new Error(`v${i + 1} throws an exception! Please check your verifies.`, { cause: e as Error });
      }
    }

    this.remainingVerifyIndex = this.mocks.length;
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
    if (this.verifyNoInteractionLambda == null) {
      throw new Error('Must enableVerifyNoInteractions before calling verifyNoInteractions.');
    }

    let stoppingIndex: number;

    if (this.isMocksInCircleChain) {
      if (this.mocks.length == 1) {
        stoppingIndex = this.mocks.length;
      } else if (this.mocks.length == 2) {
        stoppingIndex = 0;
      } else {
        stoppingIndex = this.mocks.length - 1;
      }
    } else {
      stoppingIndex = this.mocks.length;
    }

    if (aor == AllOrRemaining.ALL) {
      for (let i = 0; i < stoppingIndex; i++) {
        try {
          this.verifyNoInteractionLambda(this.mocks[i]);
        } catch (e) {
          throw new Error(`verifyNoInteractionLambda called with m${i + 1} throws an exception! Please check your verifyNoInteractionLambda and mocks.`, { cause: e as Error });
        }
      }
      this.remainingVerifyIndex = this.mocks.length;
      return;
    }

    if (aor == AllOrRemaining.REMAINING) {
      for (let i = this.remainingVerifyIndex; i < stoppingIndex; i++) {
        try {
          this.verifyNoInteractionLambda(this.mocks[i]);
        } catch (e) {
          throw new Error(`verifyNoInteractionLambda called with m${i + 1} throws an exception! Please check your verifyNoInteractionLambda and mocks.`, { cause: e as Error });
        }
      }
      this.remainingVerifyIndex = this.mocks.length;
      return;
    }

    throw new Error('aor must be ALL or REMAINING.');
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
    if (this.verifyNoInteractionLambda == null) {
      throw new Error('Must enableVerifyNoInteractions before calling verifyNoInteractionsAfter.');
    }

    let stoppingIndex: number;

    if (this.isMocksInCircleChain) {
      if (this.mocks.length == 1) {
        stoppingIndex = this.mocks.length;
      } else if (this.mocks.length == 2) {
        stoppingIndex = 0;
      } else {
        stoppingIndex = this.mocks.length - 1;
      }
    } else {
      stoppingIndex = this.mocks.length;
    }

    if (mock == FirstOrLast.FIRST) {
      for (let i = 1; i < stoppingIndex; i++) {
        try {
          this.verifyNoInteractionLambda(this.mocks[i]);
        } catch (e) {
          throw new Error(`verifyNoInteractionLambda called with m${i + 1} throws an exception! Please check your verifyNoInteractionLambda and mocks.`, { cause: e as Error });
        }
      }
      this.remainingVerifyIndex = this.mocks.length;
      return;
    }

    if (mock == FirstOrLast.LAST) {
      // Note: This flow exists, because it creates a better user experience when refactoring between simple closed and simple open curves.
      this.remainingVerifyIndex = this.mocks.length;
      return;
    }

    if (this.containsMoreThanOneMock && this.isMocksInCircleChain && mock == this.mocks[0]) {
      throw new Error('Cannot call verifyNoInteractionsAfter(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use verifyNoInteractionsAfter(FIRST) or verifyNoInteractionsAfter(LAST).');
    }

    const objectIndexOfMock: number | undefined = this.mockMap.get(mock);

    if (objectIndexOfMock == null) {
      throw new Error('Cannot call verifyNoInteractionsAfter(Object mock) for mock not in mocks!');
    }

    for (let i = objectIndexOfMock + 1; i < stoppingIndex; i++) {
      try {
        this.verifyNoInteractionLambda(this.mocks[i]);
      } catch (e) {
        throw new Error(`verifyNoInteractionLambda called with m${i + 1} throws an exception! Please check your verifyNoInteractionLambda and mocks.`, { cause: e as Error });
      }
    }

    this.remainingVerifyIndex = this.mocks.length;
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