import { Mof } from "./mof";

describe('MofTest', () => {

    const mock1 = new class {
        callExample = jest.fn()
    };

    const when1 = jest.fn();
    const verify1 = jest.fn();

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
    });
});