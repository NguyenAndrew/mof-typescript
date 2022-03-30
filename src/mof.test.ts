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

    const verifyNoInteractionLambda = jest.fn();

    let mofSingleMockWithVerifyNoInteractions: Mof;
    let mofTwoMocksWithVerifyNoInteractions: Mof;
    let mofThreeMocksWithVerifyNoInteractions: Mof;

    let mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions: Mof;
    let mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions: Mof;

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


        mofSingleMockWithVerifyNoInteractions = new Mof.Builder()
            .add(
                mock1,
                when1,
                verify1
            )
            .enableVerifyNoInteractions(verifyNoInteractionLambda)
            .build();
        mofTwoMocksWithVerifyNoInteractions = new Mof.Builder()
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
            .enableVerifyNoInteractions(verifyNoInteractionLambda)
            .build();
        mofThreeMocksWithVerifyNoInteractions = new Mof.Builder()
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
            .enableVerifyNoInteractions(verifyNoInteractionLambda)
            .build();

        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions = new Mof.Builder()
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
            .enableVerifyNoInteractions(verifyNoInteractionLambda)
            .build();
        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions = new Mof.Builder()
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
            .enableVerifyNoInteractions(verifyNoInteractionLambda)
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

            describe('VerifyThrough', () => {

                describe('First', () => {

                    test('success', () => {
                        mofSingleMock.verifyThrough(FIRST);
                        mofSingleMock.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocks.verifyThrough(FIRST);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocks.verifyThrough(FIRST);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurve.verifyThrough(FIRST);
                        mofTwoMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.verifyThrough(FIRST);
                        mofThreeMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });
                });

                describe('Last', () => {

                    test('success', () => {
                        mofSingleMock.verifyThrough(LAST);
                        mofSingleMock.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocks.verifyThrough(LAST);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocks.verifyThrough(LAST);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurve.verifyThrough(LAST);
                        mofTwoMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.verifyThrough(LAST);
                        mofThreeMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });
                });

                describe('Mock', () => {

                    test('success', () => {
                        mofSingleMock.verifyThrough(mock1);
                        mofSingleMock.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocks_onFirstMock_success', () => {
                        mofTwoMocks.verifyThrough(mock1);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('twoMocks_onSecondMock_success', () => {
                        mofTwoMocks.verifyThrough(mock2);
                        mofTwoMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_onFirstMock_success', () => {
                        mofThreeMocks.verifyThrough(mock1);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_onSecondMock_success', () => {
                        mofThreeMocks.verifyThrough(mock2);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocks_onThirdMock_success', () => {
                        mofThreeMocks.verifyThrough(mock3);
                        mofThreeMocks.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurve.verifyThrough(mock2);
                        mofThreeMocksInASimpleClosedCurve.verify(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                    });
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

    describe('VerifyThrough', () => {

        describe('First', () => {

            test('success', () => {
                mofSingleMock.verifyThrough(FIRST);

                expect(verify1).toHaveBeenCalledTimes(1);
            });

            test('twoMocks_success', () => {
                mofTwoMocks.verifyThrough(FIRST);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.verifyThrough(FIRST);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.verifyThrough(FIRST);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.verifyThrough(FIRST);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'v1 throws an error! Please check your verifies.';

                verify1.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.verifyThrough(FIRST);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Last', () => {

            test('success', () => {
                mofSingleMock.verifyThrough(LAST);

                expect(verify1).toHaveBeenCalledTimes(1);
            });

            test('twoMocks_success', () => {
                mofTwoMocks.verifyThrough(LAST);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.verifyThrough(LAST);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(1);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.verifyThrough(LAST);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.verifyThrough(LAST);

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
                    mofThreeMocks.verifyThrough(LAST);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Mock', () => {

            test('success', () => {
                mofSingleMock.verifyThrough(mock1);

                expect(verify1).toHaveBeenCalledTimes(1);
            });

            test('twoMocks_onFirstMock_success', () => {
                mofTwoMocks.verifyThrough(mock1);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_onSecondMock_success', () => {
                mofTwoMocks.verifyThrough(mock2);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
            });

            test('threeMocks_onFirstMock_success', () => {
                mofThreeMocks.verifyThrough(mock1);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_onSecondMock_success', () => {
                mofThreeMocks.verifyThrough(mock2);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_onThirdMock_success', () => {
                mofThreeMocks.verifyThrough(mock3);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(1);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.verifyThrough(mock2);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('twoMocksAreInASimpleClosedCurve_onFirstLastMock_ThenThrowError', () => {
                const expectedMessage = 'Cannot call verifyThrough(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use verifyThrough(FIRST) or verifyThrough(LAST).';

                expect(() => {
                    mofTwoMocksInASimpleClosedCurve.verifyThrough(mock1);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_onFirstLastMock_ThenThrowError', () => {
                const expectedMessage = 'Cannot call verifyThrough(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use verifyThrough(FIRST) or verifyThrough(LAST).';

                expect(() => {
                    mofThreeMocksInASimpleClosedCurve.verifyThrough(mock1);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockNotInMocks_ThenThrowError', () => {
                const expectedMessage = 'Cannot call verifyThrough(Object mock) for mock not in mocks!';

                expect(() => {
                    mofThreeMocksInASimpleClosedCurve.verifyThrough(mockNotInMocks);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'v1 throws an error! Please check your verifies.';

                verify1.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.verifyThrough(mock3);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });
        });
    });

    describe('VerifyBefore', () => {

        describe('First', () => {

            test('success', () => {
                mofSingleMock.verifyBefore(FIRST);

                expect(verify1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_success', () => {
                mofTwoMocks.verifyBefore(FIRST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.verifyBefore(FIRST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.verifyBefore(FIRST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.verifyBefore(FIRST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Last', () => {

            test('success', () => {
                mofSingleMock.verifyBefore(LAST);

                expect(verify1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_success', () => {
                mofTwoMocks.verifyBefore(LAST);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.verifyBefore(LAST);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.verifyBefore(LAST);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.verifyBefore(LAST);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'v1 throws an error! Please check your verifies.';

                verify1.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.verifyBefore(LAST);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Mock', () => {

            test('success', () => {
                mofSingleMock.verifyBefore(mock1);

                expect(verify1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_onFirstMock_success', () => {
                mofTwoMocks.verifyBefore(mock1);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_onSecondMock_success', () => {
                mofTwoMocks.verifyBefore(mock2);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_onFirstMock_success', () => {
                mofThreeMocks.verifyBefore(mock1);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_onSecondMock_success', () => {
                mofThreeMocks.verifyBefore(mock2);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_onThirdMock_success', () => {
                mofThreeMocks.verifyBefore(mock3);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.verifyBefore(mock2);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('twoMocksAreInASimpleClosedCurve_onFirstLastMock_ThenThrowError', () => {
                const expectedMessage = 'Cannot call verifyBefore(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use verifyBefore(FIRST) or verifyBefore(LAST).';

                expect(() => {
                    mofTwoMocksInASimpleClosedCurve.verifyBefore(mock1);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_onFirstLastMock_ThenThrowError', () => {
                const expectedMessage = 'Cannot call verifyBefore(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use verifyBefore(FIRST) or verifyBefore(LAST).';

                expect(() => {
                    mofThreeMocksInASimpleClosedCurve.verifyBefore(mock1);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockNotInMocks_ThenThrowError', () => {
                const expectedMessage = 'Cannot call verifyBefore(Object mock) for mock not in mocks!';

                expect(() => {
                    mofThreeMocksInASimpleClosedCurve.verifyBefore(mockNotInMocks);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'v1 throws an error! Please check your verifies.';

                verify1.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.verifyThrough(mock3);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(1);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });
        });
    });

    describe('VerifyAfter', () => {

        describe('First', () => {

            test('success', () => {
                mofSingleMock.verifyAfter(FIRST);

                expect(verify1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_success', () => {
                mofTwoMocks.verifyAfter(FIRST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(1);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.verifyAfter(FIRST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(1);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.verifyAfter(FIRST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(1);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.verifyAfter(FIRST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(1);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'v2 throws an error! Please check your verifies.';

                verify2.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.verifyAfter(FIRST);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Last', () => {

            test('success', () => {
                mofSingleMock.verifyAfter(LAST);

                expect(verify1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_success', () => {
                mofTwoMocks.verifyAfter(LAST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_success', () => {
                mofThreeMocks.verifyAfter(LAST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurve.verifyAfter(LAST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.verifyAfter(LAST);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });
        });

        describe('Mock', () => {

            test('success', () => {
                mofSingleMock.verifyAfter(mock1);

                expect(verify1).toHaveBeenCalledTimes(0);
            });

            test('twoMocks_onFirstMock_success', () => {
                mofTwoMocks.verifyAfter(mock1);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(1);
            });

            test('twoMocks_onSecondMock_success', () => {
                mofTwoMocks.verifyAfter(mock2);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocks_onFirstMock_success', () => {
                mofThreeMocks.verifyAfter(mock1);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(1);
            });

            test('threeMocks_onSecondMock_success', () => {
                mofThreeMocks.verifyAfter(mock2);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(1);
            });

            test('threeMocks_onThirdMock_success', () => {
                mofThreeMocks.verifyAfter(mock3);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurve.verifyAfter(mock2);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(1);
            });

            test('twoMocksAreInASimpleClosedCurve_onFirstLastMock_ThenThrowError', () => {
                const expectedMessage = 'Cannot call verifyAfter(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use verifyAfter(FIRST) or verifyAfter(LAST).';

                expect(() => {
                    mofTwoMocksInASimpleClosedCurve.verifyAfter(mock1);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_onFirstLastMock_ThenThrowError', () => {
                const expectedMessage = 'Cannot call verifyAfter(Object mock) for ambiguous first/last mock in a simple closed curve! For mocks in a simple closed curve, use verifyAfter(FIRST) or verifyAfter(LAST).';

                expect(() => {
                    mofThreeMocksInASimpleClosedCurve.verifyAfter(mock1);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockNotInMocks_ThenThrowError', () => {
                const expectedMessage = 'Cannot call verifyAfter(Object mock) for mock not in mocks!';

                expect(() => {
                    mofThreeMocksInASimpleClosedCurve.verifyAfter(mockNotInMocks);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(0);
                expect(verify3).toHaveBeenCalledTimes(0);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'v2 throws an error! Please check your verifies.';

                verify2.mockImplementation(() => {
                    throw new Error();
                });

                expect(() => {
                    mofThreeMocks.verifyAfter(mock1);
                }).toThrow(expectedMessage);

                expect(verify1).toHaveBeenCalledTimes(0);
                expect(verify2).toHaveBeenCalledTimes(1);
                expect(verify3).toHaveBeenCalledTimes(0);
            });
        });
    });

    describe('VerifyNoInteractions', () => {

        describe('All', () => {

            test('success', () => {
                mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(ALL);

                expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                expect(verifyNoInteractionLambda).nthCalledWith(1, mock1);
            });

            test('twoMocks_success', () => {
                mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(ALL);

                expect(verifyNoInteractionLambda).toBeCalledTimes(2);
                expect(verifyNoInteractionLambda).nthCalledWith(1, mock1);
                expect(verifyNoInteractionLambda).nthCalledWith(2, mock2);
            });

            test('threeMocks_success', () => {
                mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(ALL);

                expect(verifyNoInteractionLambda).toBeCalledTimes(3);
                expect(verifyNoInteractionLambda).nthCalledWith(1, mock1);
                expect(verifyNoInteractionLambda).nthCalledWith(2, mock2);
                expect(verifyNoInteractionLambda).nthCalledWith(3, mock3);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(ALL);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(ALL);

                expect(verifyNoInteractionLambda).toBeCalledTimes(2);
                expect(verifyNoInteractionLambda).nthCalledWith(1, mock1);
                expect(verifyNoInteractionLambda).nthCalledWith(2, mock2);
            });

            test('calledWithMockThatThrowsError_ThenThrowError', () => {
                const expectedMessage = 'verifyNoInteractionLambda called with m1 throws an error! Please check your verifyNoInteractionLambda and mocks.';

                verifyNoInteractionLambda.mockImplementation((mock) => {
                    if (mock == mock1) {
                        throw new Error();
                    }
                });

                expect(() => {
                    mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(ALL);
                }).toThrow(expectedMessage);

                expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                expect(verifyNoInteractionLambda).nthCalledWith(1, mock1);
            });
        });

        describe('Remaining', () => {

            describe('VerifyAll', () => {

                test('success', () => {
                    mofSingleMockWithVerifyNoInteractions.verify(ALL);
                    mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                });

                test('twoMocks_success', () => {
                    mofTwoMocksWithVerifyNoInteractions.verify(ALL);
                    mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                    expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                });

                test('threeMocks_success', () => {
                    mofThreeMocksWithVerifyNoInteractions.verify(ALL);
                    mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                    expect(verify3).toHaveBeenCalledTimes(1);
                    expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                });

                test('twoMocksAreInASimpleClosedCurve_success', () => {
                    mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(ALL);
                    mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                    expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                });

                test('threeMocksAreInASimpleClosedCurve_success', () => {
                    mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(ALL);
                    mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);

                    expect(verify1).toHaveBeenCalledTimes(1);
                    expect(verify2).toHaveBeenCalledTimes(1);
                    expect(verify3).toHaveBeenCalledTimes(1);
                    expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                });
            });

            describe('RemainingNested', () => {

                describe('VerifyAll', () => {
    
                    test('success', () => {
                        mofSingleMockWithVerifyNoInteractions.verify(ALL);
                        mofSingleMockWithVerifyNoInteractions.verify(REMAINING);
                        mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
    
                    test('twoMocks_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verify(ALL);
                        mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
    
                    test('threeMocks_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verify(ALL);
                        mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
    
                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurve.verify(ALL);
                        mofTwoMocksInASimpleClosedCurve.verify(REMAINING);
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
    
                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(ALL);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
                });
    
                describe('VerifyRemaining', () => {
    
                    test('success', () => {
                        mofSingleMockWithVerifyNoInteractions.verify(REMAINING);
                        mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
    
                    test('twoMocks_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
    
                    test('threeMocks_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
    
                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
    
                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
                });
    
                describe('VerifyThrough', () => {
    
                    describe('First', () => {
    
                        test('success', () => {
                            mofSingleMockWithVerifyNoInteractions.verifyThrough(FIRST);
                            mofSingleMockWithVerifyNoInteractions.verify(REMAINING);
                            mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyThrough(FIRST);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyThrough(FIRST);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocksAreInASimpleClosedCurve_success', () => {
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyThrough(FIRST);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocksAreInASimpleClosedCurve_success', () => {
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyThrough(FIRST);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
                    });
    
                    describe('Last', () => {
    
                        test('success', () => {
                            mofSingleMockWithVerifyNoInteractions.verifyThrough(LAST);
                            mofSingleMockWithVerifyNoInteractions.verify(REMAINING);
                            mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyThrough(LAST);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyThrough(LAST);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocksAreInASimpleClosedCurve_success', () => {
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyThrough(LAST);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocksAreInASimpleClosedCurve_success', () => {
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyThrough(LAST);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
                    });
    
                    describe('Mock', () => {
    
                        test('success', () => {
                            mofSingleMockWithVerifyNoInteractions.verifyThrough(mock1);
                            mofSingleMockWithVerifyNoInteractions.verify(REMAINING);
                            mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_onFirstMock_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyThrough(mock1);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_onSecondMock_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyThrough(mock2);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_onFirstMock_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyThrough(mock1);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_onSecondMock_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyThrough(mock2);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_onThirdMock_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyThrough(mock3);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocksAreInASimpleClosedCurve_success', () => {
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyThrough(mock2);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
                    });
                });
    
                describe('VerifyBefore', () => {
    
                    describe('First', () => {
    
                        test('success', () => {
                            mofSingleMockWithVerifyNoInteractions.verifyBefore(FIRST);
                            mofSingleMockWithVerifyNoInteractions.verify(REMAINING);
                            mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyBefore(FIRST);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyBefore(FIRST);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocksAreInASimpleClosedCurve_success', () => {
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyBefore(FIRST);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocksAreInASimpleClosedCurve_success', () => {
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyBefore(FIRST);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
                    });
    
                    describe('Last', () => {
    
                        test('success', () => {
                            mofSingleMockWithVerifyNoInteractions.verifyBefore(LAST);
                            mofSingleMockWithVerifyNoInteractions.verify(REMAINING);
                            mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyBefore(LAST);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyBefore(LAST);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocksAreInASimpleClosedCurve_success', () => {
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyBefore(LAST);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocksAreInASimpleClosedCurve_success', () => {
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyBefore(LAST);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
                    });
    
                    describe('Mock', () => {
    
                        test('success', () => {
                            mofSingleMockWithVerifyNoInteractions.verifyBefore(mock1);
                            mofSingleMockWithVerifyNoInteractions.verify(REMAINING);
                            mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_onFirstMock_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyBefore(mock1);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_onSecondMock_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyBefore(mock2);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_onFirstMock_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyBefore(mock1);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_onSecondMock_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyBefore(mock2);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_onThirdMock_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyBefore(mock3);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocksAreInASimpleClosedCurve_success', () => {
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyBefore(mock2);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(1);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
                    });
                });
    
                describe('VerifyAfter', () => {
    
                    describe('First', () => {
    
                        test('success', () => {
                            mofSingleMockWithVerifyNoInteractions.verifyAfter(FIRST);
                            mofSingleMockWithVerifyNoInteractions.verify(REMAINING);
                            mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyAfter(FIRST);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyAfter(FIRST);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocksAreInASimpleClosedCurve_success', () => {
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyAfter(FIRST);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocksAreInASimpleClosedCurve_success', () => {
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyAfter(FIRST);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
                    });
    
                    describe('Last', () => {
    
                        test('success', () => {
                            mofSingleMockWithVerifyNoInteractions.verifyAfter(LAST);
                            mofSingleMockWithVerifyNoInteractions.verify(REMAINING);
                            mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyAfter(LAST);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyAfter(LAST);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verify3).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocksAreInASimpleClosedCurve_success', () => {
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyAfter(LAST);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocksAreInASimpleClosedCurve_success', () => {
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyAfter(LAST);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verify3).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
                    });
    
                    describe('Mock', () => {
    
                        test('success', () => {
                            mofSingleMockWithVerifyNoInteractions.verifyAfter(mock1);
                            mofSingleMockWithVerifyNoInteractions.verify(REMAINING);
                            mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_onFirstMock_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyAfter(mock1);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('twoMocks_onSecondMock_success', () => {
                            mofTwoMocksWithVerifyNoInteractions.verifyAfter(mock2);
                            mofTwoMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_onFirstMock_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyAfter(mock1);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(1);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_onSecondMock_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyAfter(mock2);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocks_onThirdMock_success', () => {
                            mofThreeMocksWithVerifyNoInteractions.verifyAfter(mock3);
                            mofThreeMocksWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verify3).toHaveBeenCalledTimes(0);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
    
                        test('threeMocksAreInASimpleClosedCurve_success', () => {
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyAfter(mock2);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verify(REMAINING);
                            mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);
    
                            expect(verify1).toHaveBeenCalledTimes(0);
                            expect(verify2).toHaveBeenCalledTimes(0);
                            expect(verify3).toHaveBeenCalledTimes(1);
                            expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                        });
                    });
                });
            });

            describe('VerifyThrough', () => {

                describe('First', () => {

                    test('success', () => {
                        mofSingleMockWithVerifyNoInteractions.verifyThrough(FIRST);
                        mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyThrough(FIRST);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyThrough(FIRST);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(2);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                        expect(verifyNoInteractionLambda).nthCalledWith(2, mock3);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyThrough(FIRST);
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyThrough(FIRST);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                    });
                });

                describe('Last', () => {

                    test('success', () => {
                        mofSingleMockWithVerifyNoInteractions.verifyThrough(LAST);
                        mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyThrough(LAST);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyThrough(LAST);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyThrough(LAST);
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyThrough(LAST);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
                });

                describe('Mock', () => {

                    test('success', () => {
                        mofSingleMockWithVerifyNoInteractions.verifyThrough(mock1);
                        mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocks_onFirstMock_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyThrough(mock1);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                    });

                    test('twoMocks_onSecondMock_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyThrough(mock2);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocks_onFirstMock_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyThrough(mock1);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(2);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                        expect(verifyNoInteractionLambda).nthCalledWith(2, mock3);
                    });

                    test('threeMocks_onSecondMock_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyThrough(mock2);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock3);
                    });

                    test('threeMocks_onThirdMock_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyThrough(mock3);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyThrough(mock2);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
                });
            });

            describe('VerifyBefore', () => {

                describe('First', () => {

                    test('success', () => {
                        mofSingleMockWithVerifyNoInteractions.verifyBefore(FIRST);
                        mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyBefore(FIRST);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyBefore(FIRST);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(2);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                        expect(verifyNoInteractionLambda).nthCalledWith(2, mock3);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyBefore(FIRST);
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyBefore(FIRST);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                    });
                });

                describe('Last', () => {

                    test('success', () => {
                        mofSingleMockWithVerifyNoInteractions.verifyBefore(LAST);
                        mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyBefore(LAST);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyBefore(LAST);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyBefore(LAST);
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyBefore(LAST);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
                });

                describe('Mock', () => {

                    test('success', () => {
                        mofSingleMockWithVerifyNoInteractions.verifyBefore(mock1);
                        mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocks_onFirstMock_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyBefore(mock1);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                    });

                    test('twoMocks_onSecondMock_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyBefore(mock2);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocks_onFirstMock_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyBefore(mock1);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(2);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                        expect(verifyNoInteractionLambda).nthCalledWith(2, mock3);
                    });

                    test('threeMocks_onSecondMock_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyBefore(mock2);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                        expect(verifyNoInteractionLambda).nthCalledWith(1, mock3);
                    });

                    test('threeMocks_onThirdMock_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyBefore(mock3);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyBefore(mock2);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(1);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
                });
            });

            describe('VerifyAfter', () => {

                describe('First', () => {

                    test('success', () => {
                        mofSingleMockWithVerifyNoInteractions.verifyAfter(FIRST);
                        mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyAfter(FIRST);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyAfter(FIRST);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyAfter(FIRST);
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyAfter(FIRST);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
                });

                describe('Last', () => {

                    test('success', () => {
                        mofSingleMockWithVerifyNoInteractions.verifyAfter(LAST);
                        mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocks_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyAfter(LAST);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocks_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyAfter(LAST);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocksAreInASimpleClosedCurve_success', () => {
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyAfter(LAST);
                        mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyAfter(LAST);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
                });

                describe('Mock', () => {

                    test('success', () => {
                        mofSingleMockWithVerifyNoInteractions.verifyAfter(mock1);
                        mofSingleMockWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocks_onFirstMock_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyAfter(mock1);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('twoMocks_onSecondMock_success', () => {
                        mofTwoMocksWithVerifyNoInteractions.verifyAfter(mock2);
                        mofTwoMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocks_onFirstMock_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyAfter(mock1);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(1);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocks_onSecondMock_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyAfter(mock2);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocks_onThirdMock_success', () => {
                        mofThreeMocksWithVerifyNoInteractions.verifyAfter(mock3);
                        mofThreeMocksWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(0);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });

                    test('threeMocksAreInASimpleClosedCurve_success', () => {
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyAfter(mock2);
                        mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractions(REMAINING);

                        expect(verify1).toHaveBeenCalledTimes(0);
                        expect(verify2).toHaveBeenCalledTimes(0);
                        expect(verify3).toHaveBeenCalledTimes(1);
                        expect(verifyNoInteractionLambda).toBeCalledTimes(0);
                    });
                });
            });
        });

        describe('Error', () => {

            test('calledWhenNoInteractionsIsNotEnabled_ThenThrowError', () => {
                const expectedMessage = 'Must enableVerifyNoInteractions before calling verifyNoInteractions.';

                expect(() => {
                    mofThreeMocks.verifyNoInteractions(ALL);
                }).toThrow(expectedMessage);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });
        });
    });

    describe('VerifyNoInteractionsAfter', () => {

        describe('First', () => {

            test('success', () => {
                mofSingleMockWithVerifyNoInteractions.verifyNoInteractionsAfter(FIRST);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });

            test('twoMocks_success', () => {
                mofTwoMocksWithVerifyNoInteractions.verifyNoInteractionsAfter(FIRST);

                expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
            });

            test('threeMocks_success', () => {
                mofThreeMocksWithVerifyNoInteractions.verifyNoInteractionsAfter(FIRST);
                
                expect(verifyNoInteractionLambda).toBeCalledTimes(2);
                expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                expect(verifyNoInteractionLambda).nthCalledWith(2, mock3);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractionsAfter(FIRST);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractionsAfter(FIRST);

                expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
            });
        });

        describe('Last', () => {

            test('success', () => {
                mofSingleMockWithVerifyNoInteractions.verifyNoInteractionsAfter(LAST);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });

            test('twoMocks_success', () => {
                mofTwoMocksWithVerifyNoInteractions.verifyNoInteractionsAfter(LAST);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });

            test('threeMocks_success', () => {
                mofThreeMocksWithVerifyNoInteractions.verifyNoInteractionsAfter(LAST);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });

            test('twoMocksAreInASimpleClosedCurve_success', () => {
                mofTwoMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractionsAfter(LAST);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractionsAfter(LAST);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });
        });

        describe('Mock', () => {

            test('success', () => {
                mofSingleMockWithVerifyNoInteractions.verifyNoInteractionsAfter(mock1);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });

            test('twoMocks_onFirstMock_success', () => {
                mofTwoMocksWithVerifyNoInteractions.verifyNoInteractionsAfter(mock1);

                expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
            });

            test('twoMocks_onSecondMock_success', () => {
                mofTwoMocksWithVerifyNoInteractions.verifyNoInteractionsAfter(mock2);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });

            test('threeMocks_onFirstMock_success', () => {
                mofThreeMocksWithVerifyNoInteractions.verifyNoInteractionsAfter(mock1);

                expect(verifyNoInteractionLambda).toBeCalledTimes(2);
                expect(verifyNoInteractionLambda).nthCalledWith(1, mock2);
                expect(verifyNoInteractionLambda).nthCalledWith(2, mock3);
            });

            test('threeMocks_onSecondMock_success', () => {
                mofThreeMocksWithVerifyNoInteractions.verifyNoInteractionsAfter(mock2);

                expect(verifyNoInteractionLambda).toBeCalledTimes(1);
                expect(verifyNoInteractionLambda).nthCalledWith(1, mock3);
            });

            test('threeMocks_onThirdMock_success', () => {
                mofThreeMocksWithVerifyNoInteractions.verifyNoInteractionsAfter(mock3);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });

            test('threeMocksAreInASimpleClosedCurve_success', () => {
                mofThreeMocksInASimpleClosedCurveWithVerifyNoInteractions.verifyNoInteractionsAfter(mock2);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });
        });

        describe('Error', () => {

            test('calledWhenNoInteractionsIsNotEnabled_ThenThrowError', () => {
                const expectedMessage = 'Must enableVerifyNoInteractions before calling verifyNoInteractionsAfter.';

                expect(() => {
                    mofThreeMocks.verifyNoInteractionsAfter(mock1);
                }).toThrow(expectedMessage);

                expect(verifyNoInteractionLambda).toBeCalledTimes(0);
            });
        });
    });
});