const PRICING_RULES = {
    VOUCHER: {
        price: 5,
        // Take two, pay one.
        getCost: (items, price) => {
            const noDiscount = items % 2;
            const withDiscount = items - noDiscount;
            return noDiscount * price + withDiscount * price * 0.5;
        },
    },
    TSHIRT: {
        price: 20,
        // Take more than 3 and pay 19€ instead
        getCost: (items, price) => {
            if (items >= 3) {
                price = 19;
            }
            return items * price;
        },
    },
    MUG: {
        price: 7.5,
        // No discount
        getCost: (items, price) => items * price
    }
};

export default PRICING_RULES;