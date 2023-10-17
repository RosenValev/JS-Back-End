exports.viewPaymentMethod = function (paymentMethod) {
    const titles = [
        'crypto-wallet',
        'credit-card',
        'debit-card',
        'paypal',
    ];

    const options = titles.map(title => ({
        value: title,
        selected: paymentMethod === title,
    }));

    return options;
}