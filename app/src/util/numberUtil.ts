export const pad = (number: number | string) => {
    if (typeof number === 'string') {
        number = parseInt(number);
    }

    if (number < 10) {
        number = "0" + number;
    }

    return number;
}