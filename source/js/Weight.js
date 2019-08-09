/**
 * Represent weight in the project
 *
 * @class Weight
 */
class Weight {

  // All weight units
  Units = {
    GRAM: 'gram',
    KG: 'kg',
    OZ: 'oz'
  };

  // Convert the value from inputUnit to outputUnit
  static convert(value, inputUnit, outputUnit) {
    if (inputUnit == Units.GRAM) return this.convertGram(value, outputUnit);
    if (inputUnit == Units.KG) return this.convertKg(value, outputUnit);
    if (inputUnit == Units.OZ) return this.convertOz(value, outputUnit);
  }

  // Converts the gram value into provided outputUnit
  static convertGram(value, outputUnit) {
    if (outputUnit == Units.GRAM) return parseInt(value);
    else if (outputUnit == Units.KG) return (parseInt(value) / 1000).toFixed(3);
    else if (outputUnit == Units.OZ) return (parseInt(value) / 28.35).toFixed(2);
  }
  
  // Converts the Kg value into provided outputUnit
  static convertKg(value, outputUnit) {
    if (outputUnit == Units.GRAM) return (parseInt(value) * 1000).toFixed(0);
    else if (outputUnit == Units.KG) return parseInt(value);
    else if (outputUnit == Units.OZ) return (parseInt(value) * 35.274).toFixed(1);
  }
  
  // Converts the Oz value into provided outputUnit
  static convertOz(value, outputUnit) {
    if (outputUnit == Units.GRAM) return (parseInt(value) * 28.35).toFixed(2);
    else if (outputUnit == Units.KG) return (parseInt(value) / 35.274).toFixed(3);
    else if (outputUnit == Units.OZ) return parseInt(value);
  }
}