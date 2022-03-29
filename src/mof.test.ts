/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mof, ALL, REMAINING, FIRST, LAST } from "./mof";

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

    const mockNotInMocks = new class {
        callExample = jest.fn()
    };

    const when1 = jest.fn();
    const when2 = jest.fn();
    const when3 = jest.fn();

    const verify1 = jest.fn();
    const verify2 = jest.fn();
    const verify3 = jest.fn();

    let mofSingleMock: Mof;
    let mofTwoMocks: Mof;
    let mofThreeMocks: Mof;

    let mofTwoMocksInASimpleClosedCurve: Mof;
    let mofThreeMocksInASimpleClosedCurve: Mof;

    beforeEach(() => {
        jest.resetAllMocks();

        mofSingleMock = new Mof.Builder()
            .add(
                mock1,
                when1,
                verify1
            )
            .build();
        mofTwoMocks = new Mof.Builder()
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
        mofThreeMocks = new Mof.Builder()
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

        mofTwoMocksInASimpleClosedCurve = new Mof.Builder()
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
        mofThreeMocksInASimpleClosedCurve = new Mof.Builder()
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

        test('whenMocksInANonSimpleCurve_ThenThrowError', () => {
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

            test('twoMocks_success', () => {
                mofTwoMocks.when(ALL);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(1);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.when(ALL);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(1);
                expect(when3).toHaveBeenCalledTimes(1);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.when(ALL);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(1);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.when(ALL);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(1);
                expect(when3).toHaveBeenCalledTimes(1);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'w1 throws an error! Please check your whens.';

                when1.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.when(ALL);
                }).toThrow(expectedMessage);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Remaining', () => {

            describe('WhenAll', () => {

                test('success', () => {
                    mofSingleMock.when(ALL);
                    mofSingleMock.when(REMAINING);

                    expect(when1).toHaveBeenCalledTimes(1);
                });

                test('twoMocks_success', () => {
                    mofTwoMocks.when(ALL);
                    mofTwoMocks.when(REMAINING);

                    expect(when1).toHaveBeenCalledTimes(1);
                    expect(when2).toHaveBeenCalledTimes(1);
                });

                test('threeMocks_success', () => {
                    mofThreeMocks.when(ALL);
                    mofThreeMocks.when(REMAINING);

                    expect(when1).toHaveBeenCalledTimes(1);
                    expect(when2).toHaveBeenCalledTimes(1);
                    expect(when3).toHaveBeenCalledTimes(1);
                });

                test('twoMocksAreInASimpleClosedCurve_success', () => {
                    mofTwoMocksInASimpleClosedCurve.when(ALL);
                    mofTwoMocksInASimpleClosedCurve.when(REMAINING);

                    expect(when1).toHaveBeenCalledTimes(1);
                    expect(when2).toHaveBeenCalledTimes(1);
                });

                test('threeMocksAreInASimpleClosedCurve_success', () => {
                    mofThreeMocksInASimpleClosedCurve.when(ALL);
                    mofThreeMocksInASimpleClosedCurve.when(REMAINING);

                    expect(when1).toHaveBeenCalledTimes(1);
                    expect(when2).toHaveBeenCalledTimes(1);
                    expect(when3).toHaveBeenCalledTimes(1);
                });
            });

            describe('WhenRemaining', () => {

                test('success', () => {
                    mofSingleMock.when(REMAINING);

                    expect(when1).toHaveBeenCalledTimes(1);
                });

                test('twoMocks_success', () => {
                    mofTwoMocks.when(REMAINING);

                    expect(when1).toHaveBeenCalledTimes(1);
                    expect(when2).toHaveBeenCalledTimes(1);
                });

                test('threeMocks_success', () => {
                    mofThreeMocks.when(REMAINING);

                    expect(when1).toHaveBeenCalledTimes(1);
                    expect(when2).toHaveBeenCalledTimes(1);
                    expect(when3).toHaveBeenCalledTimes(1);
                });

                test('twoMocksAreInASimpleClosedCurve_success', () => {
                    mofTwoMocksInASimpleClosedCurve.when(REMAINING);

                    expect(when1).toHaveBeenCalledTimes(1);
                    expect(when2).toHaveBeenCalledTimes(1);
                });

                test('threeMocksAreInASimpleClosedCurve_success', () => {
                    ;
                    mofThreeMocksInASimpleClosedCurve.when(REMAINING);

                    expect(when1).toHaveBeenCalledTimes(1);
                    expect(when2).toHaveBeenCalledTimes(1);
                    expect(when3).toHaveBeenCalledTimes(1);
                });

                test('calledWithMockThatThrowsError_ThenThrowError', () => {
                    const expectedMessage = 'w1 throws an error! Please check your whens.';

                    when1.mockImplementation(() => {
                        throw new Error();
                    });

                    expect(() => {
                        mofThreeMocks.when(REMAINING);
                    }).toThrow(expectedMessage);

                    expect(when1).toHaveBeenCalledTimes(1);
                    expect(when2).toHaveBeenCalledTimes(0);
                    expect(when3).toHaveBeenCalledTimes(0);
                });
            });

            describe('WhenBefore', () => {

                describe('First', () => {

                    test('success', () => {
                        mofSingleMock.whenBefore(FIRST);
                        mofSingleMock.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocks.whenBefore(FIRST);
                        mofTwoMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocks.whenBefore(FIRST);
                        mofThreeMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                        expect(when3).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurve.whenBefore(FIRST);
                        mofTwoMocksInASimpleClosedCurve.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.whenBefore(FIRST);
                        mofThreeMocksInASimpleClosedCurve.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                        expect(when3).toHaveBeenCalledTimes(1);
                    });
                });

                describe('Last', () => {

                    test('success', () => {
                        mofSingleMock.whenBefore(LAST);
                        mofSingleMock.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocks.whenBefore(LAST);
                        mofTwoMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(1);
                        expect(when2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocks.whenBefore(LAST);
                        mofThreeMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(1);
                        expect(when2).toHaveBeenCalledTimes(1);
                        expect(when3).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurve.whenBefore(LAST);
                        mofTwoMocksInASimpleClosedCurve.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(1);
                        expect(when2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.whenBefore(LAST);
                        mofThreeMocksInASimpleClosedCurve.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(1);
                        expect(when2).toHaveBeenCalledTimes(1);
                        expect(when3).toHaveBeenCalledTimes(0);
                    });
                });

                describe('Mock', () => {

                    test('success', () => {
                        mofSingleMock.whenBefore(mock1);
                        mofSingleMock.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_onFirstMock_success', () => {
                        mofTwoMocks.whenBefore(mock1);
                        mofTwoMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocks_onSecondMock_success', () => {
                        mofTwoMocks.whenBefore(mock2);
                        mofTwoMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(1);
                        expect(when2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocks_onFirstMock_success', () => {
                        mofThreeMocks.whenBefore(mock1);
                        mofThreeMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                        expect(when3).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_onSecondMock_success', () => {
                        mofThreeMocks.whenBefore(mock2);
                        mofThreeMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(1);
                        expect(when2).toHaveBeenCalledTimes(0);
                        expect(when3).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_onThirdMock_success', () => {
                        mofThreeMocks.whenBefore(mock3);
                        mofThreeMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(1);
                        expect(when2).toHaveBeenCalledTimes(1);
                        expect(when3).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.whenBefore(mock2);
                        mofThreeMocksInASimpleClosedCurve.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(1);
                        expect(when2).toHaveBeenCalledTimes(0);
                        expect(when3).toHaveBeenCalledTimes(1);
                    });
                });
            });

            describe('WhenAfter', () => {

                describe('First', () => {

                    test('success', () => {
                        mofSingleMock.whenAfter(FIRST);
                        mofSingleMock.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocks.whenAfter(FIRST);
                        mofTwoMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocks.whenAfter(FIRST);
                        mofThreeMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                        expect(when3).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurve.whenAfter(FIRST);
                        mofTwoMocksInASimpleClosedCurve.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.whenAfter(FIRST);
                        mofThreeMocksInASimpleClosedCurve.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                        expect(when3).toHaveBeenCalledTimes(1);
                    });
                });

                describe('Last', () => {

                    test('success', () => {
                        mofSingleMock.whenAfter(LAST);
                        mofSingleMock.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocks.whenAfter(LAST);
                        mofTwoMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocks.whenAfter(LAST);
                        mofThreeMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(0);
                        expect(when3).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurve.whenAfter(LAST);
                        mofTwoMocksInASimpleClosedCurve.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.whenAfter(LAST);
                        mofThreeMocksInASimpleClosedCurve.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(0);
                        expect(when3).toHaveBeenCalledTimes(0);
                    });
                });

                describe('Mock', () => {

                    test('success', () => {
                        mofSingleMock.whenAfter(mock1);
                        mofSingleMock.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_onFirstMock_success', () => {
                        mofTwoMocks.whenAfter(mock1);
                        mofTwoMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocks_onSecondMock_success', () => {
                        mofTwoMocks.whenAfter(mock2);
                        mofTwoMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocks_onFirstMock_success', () => {
                        mofThreeMocks.whenAfter(mock1);
                        mofThreeMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(1);
                        expect(when3).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_onSecondMock_success', () => {
                        mofThreeMocks.whenAfter(mock2);
                        mofThreeMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(0);
                        expect(when3).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_onThirdMock_success', () => {
                        mofThreeMocks.whenAfter(mock3);
                        mofThreeMocks.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(0);
                        expect(when3).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.whenAfter(mock2);
                        mofThreeMocksInASimpleClosedCurve.when(REMAINING);

                        expect(when1).toHaveBeenCalledTimes(0);
                        expect(when2).toHaveBeenCalledTimes(0);
                        expect(when3).toHaveBeenCalledTimes(1);
                    });
                });
            });
        });
    });

    describe('WhenBefore', () => {

        describe('First', () => {

            test('success', () => {
                mofSingleMock.whenBefore(FIRST);

                expect(when1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_success', () => {
                mofTwoMocks.whenBefore(FIRST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.whenBefore(FIRST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.whenBefore(FIRST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.whenBefore(FIRST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Last', () => {

            test('success', () => {
                mofSingleMock.whenBefore(LAST);

                expect(when1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_success', () => {
                mofTwoMocks.whenBefore(LAST);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.whenBefore(LAST);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(1);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.whenBefore(LAST);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.whenBefore(LAST);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(1);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'w1 throws an error! Please check your whens.';

                when1.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.whenBefore(LAST);
                }).toThrow(expectedMessage);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Mock', () => {

            test('success', () => {
                mofSingleMock.whenBefore(mock1);

                expect(when1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_onFirstMock_success', () => {
                mofTwoMocks.whenBefore(mock1);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_onSecondMock_success', () => {
                mofTwoMocks.whenBefore(mock2);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_onFirstMock_success', () => {
                mofThreeMocks.whenBefore(mock1);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_onSecondMock_success', () => {
                mofThreeMocks.whenBefore(mock2);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_onThirdMock_success', () => {
                mofThreeMocks.whenBefore(mock3);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(1);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.whenBefore(mock2);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('twoMocksAreInASimpleClosedCurve_onFirstLastMock_ThenThrowError', () => {
                const expectedMessage = 'Cannot call whenBefore(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use whenBefore(FIRST) or whenBefore(LAST).';

                expect(() => {
                    mofTwoMocksInASimpleClosedCurve.whenBefore(mock1);
                }).toThrow(expectedMessage);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_onFirstLastMock_ThenThrowError', () => {
                const expectedMessage = 'Cannot call whenBefore(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use whenBefore(FIRST) or whenBefore(LAST).';

                expect(() => {
                    mofThreeMocksInASimpleClosedCurve.whenBefore(mock1);
                }).toThrow(expectedMessage);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockNotInMocks_ThenThrowError', () => {
                const expectedMessage = 'Cannot call whenBefore(Object mock) for mock not in mocks!';

                expect(() => {
                    mofThreeMocksInASimpleClosedCurve.whenBefore(mockNotInMocks);
                }).toThrow(expectedMessage);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'w1 throws an error! Please check your whens.';

                when1.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.whenBefore(mock3);
                }).toThrow(expectedMessage);

                expect(when1).toHaveBeenCalledTimes(1);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });
        });
    });

    describe('WhenAfter', () => {

        describe('First', () => {

            test('success', () => {
                mofSingleMock.whenAfter(FIRST);

                expect(when1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_success', () => {
                mofTwoMocks.whenAfter(FIRST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(1);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.whenAfter(FIRST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(1);
                expect(when3).toHaveBeenCalledTimes(1);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.whenAfter(FIRST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(1);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.whenAfter(FIRST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(1);
                expect(when3).toHaveBeenCalledTimes(1);
            });

            test('calledWithWhenThatThrowError_ThenThrowError', () => {
                const expectedMessage = 'w2 throws an error! Please check your whens.';

                when2.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.whenAfter(FIRST);
                }).toThrow(expectedMessage);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(1);
                expect(when3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Last', () => {

            test('success', () => {
                mofSingleMock.whenAfter(LAST);

                expect(when1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_success', () => {
                mofTwoMocks.whenAfter(LAST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.whenAfter(LAST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.whenAfter(LAST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.whenAfter(LAST);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Mock', () => {

            test('success', () => {
                mofSingleMock.whenAfter(mock1);

                expect(when1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_onFirstMock_success', () => {
                mofTwoMocks.whenAfter(mock1);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(1);
            });

            test('twoMocks_onSecondMock_success', () => {
                mofTwoMocks.whenAfter(mock2);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_onFirstMock_success', () => {
                mofThreeMocks.whenAfter(mock1);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(1);
                expect(when3).toHaveBeenCalledTimes(1);
            });

            test('threeMocks_onSecondMock_success', () => {
                mofThreeMocks.whenAfter(mock2);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(1);
            });

            test('threeMocks_onThirdMock_success', () => {
                mofThreeMocks.whenAfter(mock3);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.whenAfter(mock2);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(1);
            });

            test('twoMocksAreInASimpleClosedCurve_onFirstLastMock_ThenThrowError', () => {
                const expectedMessage = 'Cannot call whenAfter(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use whenAfter(FIRST) or whenAfter(LAST).';

                expect(() => {
                    mofTwoMocksInASimpleClosedCurve.whenAfter(mock1);
                }).toThrow(expectedMessage);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_onFirstLastMock_ThenThrowError', () => {
                const expectedMessage = 'Cannot call whenAfter(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use whenAfter(FIRST) or whenAfter(LAST).';

                expect(() => {
                    mofThreeMocksInASimpleClosedCurve.whenAfter(mock1);
                }).toThrow(expectedMessage);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockNotInMocks_ThenThrowError', () => {
                const expectedMessage = 'Cannot call whenAfter(Object mock) for mock not in mocks!';

                expect(() => {
                    mofThreeMocksInASimpleClosedCurve.whenAfter(mockNotInMocks);
                }).toThrow(expectedMessage);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(0);
                expect(when3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'w2 throws an error! Please check your whens.';

                when2.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.whenAfter(mock1);
                }).toThrow(expectedMessage);

                expect(when1).toHaveBeenCalledTimes(0);
                expect(when2).toHaveBeenCalledTimes(1);
                expect(when3).toHaveBeenCalledTimes(0);
            });
        });
    });

    describe('Verify', () => {

        describe('All', () => {

            test('success', () => {
                mofSingleMock.verify(ALL);

                expect(verify1).toHaveBeenCalledTimes(1);
            });

            test('twoMocks_success', () => {
                mofTwoMocks.verify(ALL);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.verify(ALL);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(1);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.verify(ALL);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.verify(ALL);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(1);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'v1 throws an error! Please check your verifies.';

                verify1.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.verify(ALL);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Remaining', () => {

            describe('VerifyAll', () => {

                test('success', () => {
                    mofSingleMock.verify(ALL);
                    mofSingleMock.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                });

                test('twoMocks_success', () => {
                    mofTwoMocks.verify(ALL);
                    mofTwoMocks.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                });

                test('threeMocks_success', () => {
                    mofThreeMocks.verify(ALL);
                    mofThreeMocks.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                    expect(verify3).toHaveBeenCalledTimes(1);
                });

                test('twoMocksAreInASimpleClosedCurve_success', () => {
                    mofTwoMocksInASimpleClosedCurve.verify(ALL);
                    mofTwoMocksInASimpleClosedCurve.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                });

                test('threeMocksAreInASimpleClosedCurve_success', () => {
                    mofThreeMocksInASimpleClosedCurve.verify(ALL);
                    mofThreeMocksInASimpleClosedCurve.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                    expect(verify3).toHaveBeenCalledTimes(1);
                });
            });

            describe('VerifyRemaining', () => {

                test('success', () => {
                    mofSingleMock.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                });

                test('twoMocks_success', () => {
                    mofTwoMocks.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                });

                test('threeMocks_success', () => {
                    mofThreeMocks.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                    expect(verify3).toHaveBeenCalledTimes(1);
                });

                test('twoMocksAreInASimpleClosedCurve_success', () => {
                    mofTwoMocksInASimpleClosedCurve.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                });

                test('threeMocksAreInASimpleClosedCurve_success', () => {
                    mofThreeMocksInASimpleClosedCurve.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                    expect(verify3).toHaveBeenCalledTimes(1);
                });

                test('calledWithMockThatThrowsError_ThenThrowError', () => {
                    const expectedMessage = 'v1 throws an error! Please check your verifies.';

                    verify1.mockImplementation(() => {
                        throw new Error();
                    });

                    expect(() => {
                        mofThreeMocks.verify(REMAINING);
                    }).toThrow(expectedMessage);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(0);
                    expect(verify3).toHaveBeenCalledTimes(0);
                });
            });

            describe('VerifyBefore', () => {

                describe('First', () => {

                    test('success', () => {
                        mofSingleMock.verifyBefore(FIRST);
                        mofSingleMock.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocks.verifyBefore(FIRST);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocks.verifyBefore(FIRST);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurve.verifyBefore(FIRST);
                        mofTwoMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.verifyBefore(FIRST);
                        mofThreeMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });
                });

                describe('Last', () => {

                    test('success', () => {
                        mofSingleMock.verifyBefore(LAST);
                        mofSingleMock.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocks.verifyBefore(LAST);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocks.verifyBefore(LAST);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurve.verifyBefore(LAST);
                        mofTwoMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.verifyBefore(LAST);
                        mofThreeMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(0);
                    });
                });

                describe('Mock', () => {

                    test('success', () => {
                        mofSingleMock.verifyBefore(mock1);
                        mofSingleMock.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_onFirstMock_success', () => {
                        mofTwoMocks.verifyBefore(mock1);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocks_onSecondMock_success', () => {
                        mofTwoMocks.verifyBefore(mock2);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocks_onFirstMock_success', () => {
                        mofThreeMocks.verifyBefore(mock1);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_onSecondMock_success', () => {
                        mofThreeMocks.verifyBefore(mock2);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_onThirdMock_success', () => {
                        mofThreeMocks.verifyBefore(mock3);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.verifyBefore(mock2);
                        mofThreeMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });
                });
            });

            describe('VerifyAfter', () => {

                describe('First', () => {

                    test('success', () => {
                        mofSingleMock.verifyAfter(FIRST);
                        mofSingleMock.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocks.verifyAfter(FIRST);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocks.verifyAfter(FIRST);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurve.verifyAfter(FIRST);
                        mofTwoMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.verifyAfter(FIRST);
                        mofThreeMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });
                });

                describe('Last', () => {

                    test('success', () => {
                        mofSingleMock.verifyAfter(LAST);
                        mofSingleMock.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocks.verifyAfter(LAST);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocks.verifyAfter(LAST);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurve.verifyAfter(LAST);
                        mofTwoMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.verifyAfter(LAST);
                        mofThreeMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                    });
                });

                describe('Mock', () => {

                    test('success', () => {
                        mofSingleMock.verifyAfter(mock1);
                        mofSingleMock.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                    });

                    test('twoMocks_onFirstMock_success', () => {
                        mofTwoMocks.verifyAfter(mock1);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocks_onSecondMock_success', () => {
                        mofTwoMocks.verifyAfter(mock2);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocks_onFirstMock_success', () => {
                        mofThreeMocks.verifyAfter(mock1);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_onSecondMock_success', () => {
                        mofThreeMocks.verifyAfter(mock2);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_onThirdMock_success', () => {
                        mofThreeMocks.verifyAfter(mock3);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.verifyAfter(mock2);
                        mofThreeMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });
                });
            });
        });
    });
});