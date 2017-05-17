/* eslint-env mocha */
import { expect } from 'chai';

import Checkout from '../src/Checkout.js';
import pricingRules from '../src/PricingRules.js';

describe('Checkout', () => {
    let co;
    beforeEach(() => {
        co = new Checkout(pricingRules);
    });
    describe('constructor', () => {
        it('should initialize an empty cart ', () => {
            const actual = co.cart;
            const expected = {
                VOUCHER: 0,
                TSHIRT: 0,
                MUG: 0,
            };
            expect(actual).to.deep.equal(expected);
        });
    });
    describe('scan()', () => {
        it('should return the Checkout object back ', () => {
            const actual = co.scan('VOUCHER');
            const expected = co;
            expect(actual).to.equal(expected);
        });
        it('should add a VOUCHER to the cart ', () => {
            co.scan('VOUCHER');
            const actual = co.cart;
            const expected = {
                VOUCHER: 1,
                TSHIRT: 0,
                MUG: 0,
            };
            expect(actual).to.deep.equal(expected);
        });
        it('should add a TSHIRT to the cart ', () => {
            co.scan('TSHIRT');
            const actual = co.cart;
            const expected = {
                VOUCHER: 0,
                TSHIRT: 1,
                MUG: 0,
            };
            expect(actual).to.deep.equal(expected);
        });
        it('should add a MUG to the cart ', () => {
            co.scan('MUG');
            const actual = co.cart;
            const expected = {
                VOUCHER: 0,
                TSHIRT: 0,
                MUG: 1,
            };
            expect(actual).to.deep.equal(expected);
        });
    });
    describe('_computeParcial', () => {
        describe('VOUCHER', () => {
            it('Should compute the parcial value for the given items: 1 VOUCHER', () => {
                co.scan('VOUCHER');
                const expected = 5;
                const actual = co._computeParcial('VOUCHER');
                expect(actual).to.deep.equal(expected);
            });
            it('Should compute the parcial value for the given items: 2 VOUCHER', () => {
                co.scan('VOUCHER').scan('VOUCHER');
                const expected = 5;
                const actual = co._computeParcial('VOUCHER');
                expect(actual).to.deep.equal(expected);
            });
            it('Should compute the parcial value for the given items: 3 VOUCHER', () => {
                co.scan('VOUCHER').scan('VOUCHER').scan('VOUCHER');
                const expected = 10;
                const actual = co._computeParcial('VOUCHER');
                expect(actual).to.deep.equal(expected);
            });
            it('Should compute the parcial value for the given items: 4 VOUCHER', () => {
                co.scan('VOUCHER').scan('VOUCHER').scan('VOUCHER').scan('VOUCHER');
                const expected = 10;
                const actual = co._computeParcial('VOUCHER');
                expect(actual).to.deep.equal(expected);
            });
        });
        describe('TSHIRT', () => {
            it('Should compute the parcial value for the given items: 1 TSHIRT', () => {
                co.scan('TSHIRT');
                const expected = 20;
                const actual = co._computeParcial('TSHIRT');
                expect(actual).to.deep.equal(expected);
            });
            it('Should compute the parcial value for the given items: 2 TSHIRT', () => {
                co.scan('TSHIRT').scan('TSHIRT');
                const expected = 40;
                const actual = co._computeParcial('TSHIRT');
                expect(actual).to.deep.equal(expected);
            });
            it('Should compute the parcial value for the given items: 3 TSHIRT', () => {
                co.scan('TSHIRT').scan('TSHIRT').scan('TSHIRT');
                const expected = 57;
                const actual = co._computeParcial('TSHIRT');
                expect(actual).to.deep.equal(expected);
            });
            it('Should compute the parcial value for the given items: 8 TSHIRT', () => {
                co.scan('TSHIRT').scan('TSHIRT').scan('TSHIRT').scan('TSHIRT')
                    .scan('TSHIRT').scan('TSHIRT').scan('TSHIRT').scan('TSHIRT');
                const expected = 152;
                const actual = co._computeParcial('TSHIRT');
                expect(actual).to.deep.equal(expected);
            });
        });
        describe('MUG', () => {
            it('Should compute the parcial value for the given items: 1 MUG', () => {
                co.scan('MUG');
                const expected = 7.5;
                const actual = co._computeParcial('MUG');
                expect(actual).to.deep.equal(expected);
            });
            it('Should compute the parcial value for the given items: 3 MUG', () => {
                co.scan('MUG').scan('MUG').scan('MUG');
                const expected = 22.5;
                const actual = co._computeParcial('MUG');
                expect(actual).to.deep.equal(expected);
            });
        });
    });
    describe('total()', () => {
        it('Should aggregate the partials: VOUCHER, TSHIRT, MUG', () => {
            co.scan('VOUCHER').scan('TSHIRT').scan('MUG');
            const expected = 32.50;
            const actual = co.total();
            expect(actual).to.equal(expected);
        });
        it('Should aggregate the partials: VOUCHER, TSHIRT, VOUCHER', () => {
            co.scan('VOUCHER').scan('TSHIRT').scan('VOUCHER');
            const expected = 25;
            const actual = co.total();
            expect(actual).to.equal(expected);
        });
        it('Should aggregate the partials: TSHIRT, TSHIRT, TSHIRT, VOUCHER, TSHIRT', () => {
            co.scan('TSHIRT').scan('TSHIRT').scan('TSHIRT').scan('VOUCHER').scan('TSHIRT');
            const expected = 81;
            const actual = co.total();
            expect(actual).to.equal(expected);
        });
        it('Should aggregate the partials: VOUCHER, TSHIRT, VOUCHER, VOUCHER, MUG, TSHIRT, TSHIRT', () => {
            co.scan('VOUCHER').scan('TSHIRT').scan('VOUCHER').scan('VOUCHER').scan('MUG').scan('TSHIRT').scan('TSHIRT');
            const expected = 74.50;
            const actual = co.total();
            expect(actual).to.equal(expected);
        });
    });
});