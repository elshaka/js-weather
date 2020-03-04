export const CELCIUS = 'CELCIUS';
export const FAHRENHEIT = 'FAHRENHEIT';

export const convert = (k, units) => {
  switch (units) {
    case CELCIUS:
      return Math.round(k - 273.15);
    case FAHRENHEIT:
      return Math.round(k * (9 / 5) - 459.67);
    default:
      throw new Error(`Unit "${units}" not supported`);
  }
};
