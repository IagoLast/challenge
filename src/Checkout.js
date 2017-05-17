export default class Checkout {
    constructor(pricingRules) {
        this.pricingRules = pricingRules;
        this.cart = this._initCart(pricingRules);
    }

    scan(productName) {
        this.cart[productName]++;
        return this;
    }

    total() {
        let total = 0;
        for (let productName in this.cart) {
            total += this._computeParcial(productName);
        }
        return total;
    }

    // Return an empty shopping cart for each product in the rules.
    _initCart(pricingRules) {
        let cart = {};
        for (let key in pricingRules) {
            cart[key] = 0;
        }
        return cart;
    }

    // Get the total cost of a product in the cart
    _computeParcial(productName) {
        const amount = this.cart[productName];
        const price = this.pricingRules[productName].price;
        const getCost = this.pricingRules[productName].getCost;
        return getCost(amount, price);
    }
}