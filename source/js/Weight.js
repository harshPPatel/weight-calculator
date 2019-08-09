/**
 * Represent weight in the project
 *
 * @class Weight
 */
class Weight {
  
  // Convert the value from inputUnit to outputUnit
  static convert(value, inputUnit, outputUnit) {
    if (inputUnit == 'gram') return this.convertGram(value, outputUnit);
    if (inputUnit == 'kg') return this.convertKg(value, outputUnit);
    if (inputUnit == 'oz') return this.convertOz(value, outputUnit);
  }

  // Converts the gram value into provided outputUnit
  static convertGram(value, outputUnit) {
    if (outputUnit == 'gram') return parseInt(value);
    else if (outputUnit == 'kg') return (parseInt(value) / 1000).toFixed(3);
    else if (outputUnit == 'oz') return (parseInt(value) / 28.35).toFixed(2);
  }
  
  // Converts the Kg value into provided outputUnit
  static convertKg(value, outputUnit) {
    if (outputUnit == 'gram') return (parseInt(value) * 1000).toFixed(0);
    else if (outputUnit == 'kg') return parseInt(value);
    else if (outputUnit == 'oz') return (parseInt(value) * 35.274).toFixed(1);
  }
  
  // Converts the Oz value into provided outputUnit
  static convertOz(value, outputUnit) {
    if (outputUnit == 'gram') return (parseInt(value) * 28.35).toFixed(2);
    else if (outputUnit == 'kg') return (parseInt(value) / 35.274).toFixed(3);
    else if (outputUnit == 'oz') return parseInt(value);
  }
}