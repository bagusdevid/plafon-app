export function thousandSeparator(amount) {
    const price2 = parseInt(amount);
    return 'IDR ' + price2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
