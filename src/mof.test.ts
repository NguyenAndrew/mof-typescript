/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mof, ALL, REMAINING } from "./mof";

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

    let mofSingleMock: Mof;

    beforeEach(() => {
        jest.resetAllMocks();

        mofSingleMock = new Mof.Builder()
            .add(
                mock1,
                when1,
                verify1
            )
            .build();
    });

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

        test('whenTwoMocksAreInASimpleClosedCurve_success', () => {
            new Mof.Builder()
                .add(
                    mock1,
                    when1,
                    verify1
                )
                .add(
                    mock1,
                    when2,
                    verify2
                )
                .build();
        });

        test('whenThreeMocksAreInASimpleClosedCurve_ThenSuccess', () => {
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
                    mock1,
                    when3,
                    verify3
                )
                .build();
        });

        test('whenMocksIsNull_ThenThrowError', () => {
            const expectedMessage = 'Cannot add null Mock to Mof Builder!';

            expect(() => {
                new Mof.Builder()
                    .add(
                        null,
                        when1,
                        verify1
                    )
                    .build();
            }).toThrow(expectedMessage);
        });

        test('whenBuilding_WithNoMocksAdded_ThenThrowError', () => {
            const expectedMessage = 'Must add at least one mock before calling build on Mof Builder!';

            expect(() => {
                new Mof.Builder().build();
            }).toThrow(expectedMessage);
        });

        test('whenMocksInANonSimpleCurve_ThenThrowIllegalArgumentException', () => {
            const expectedMessage = 'm3 cannot be the same as a previous mock in mocks!';

            expect(() => {
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
                        mock2,
                        when3,
                        verify3
                    )
                    .build()
            }).toThrow(expectedMessage);
        });
    });

    describe('When', () => {

        describe('All', () => {

            test('success', () => {
                mofSingleMock.when(ALL);

                expect(when1).toHaveBeenCalledTimes(1);
            });
        });
    });
});