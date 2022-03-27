import { Mof } from "./mof";

describe('MofTest', () => {

    const mock1 = new class {
        callExample = jest.fn()
    };
    const mock2 = new class {
        callExample = jest.fn()
    };
    const mock3 = new class {
        callExample = jest.fn()
    };

    const when1 = jest.fn();
    const when2 = jest.fn();
    const when3 = jest.fn();

    const verify1 = jest.fn();
    const verify2 = jest.fn();
    const verify3 = jest.fn();

    describe('Builder', () => {

        const verifyNoInteractionLambda = jest.fn();

        test('staticMethod_success', () => {
            Mof.builder()
                .add(
                    mock1,
                    when1,
                    verify1
                )
                .build();
        });

        test('constructor_success', () => {
            new Mof.Builder()
                .add(
                    mock1,
                    when1,
                    verify1
                )
                .build();
        });

        test('constructor_success', () => {
            new Mof.Builder()
                .add(
                    mock1,
                    when1,
                    verify1
                )
                .build();
        });

        test('withVerifyNoInteractions_success', () => {
            new Mof.Builder()
                .add(
                    mock1,
                    when1,
                    verify1
                )
                .enableVerifyNoInteractions(verifyNoInteractionLambda)
                .build();
        });

        test('withTwoMocks_success', () => {
            new Mof.Builder()
                .add(
                    mock1,
                    when1,
                    verify1
                )
                .add(
                    mock2,
                    when2,
                    verify2
                )
                .build();
        });

        test('withThreeMocks_success', () => {
            new Mof.Builder()
                .add(
                    mock1,
                    when1,
                    verify1
                )
                .add(
                    mock2,
                    when2,
                    verify2
                )
                .add(
                    mock3,
                    when3,
                    verify3
                )
                .build();
        });
    });
});