class Weight {

  Units = {
    GRAM: 'gram',
    KG: 'kg',
    OZ: 'oz'
  };

  static convert(value, inputUnit, outputUnit) {
    if (inputUnit == Units.GRAM) return this.convertGram(value, outputUnit);
    if (inputUnit == Units.KG) return this.convertKg(value, outputUnit);
    if (inputUnit == Units.OZ) return this.convertOz(value, outputUnit);
  }

  static convertGram(value, outputUnit) {
    if (outputUnit == Units.GRAM) return parseInt(value);
    else if (outputUnit == Units.KG) return (parseInt(value) / 1000).toFixed(3);
    else if (outputUnit == Units.OZ) return (parseInt(value) / 28.35).toFixed(2);
  }

  static convertKg(value, outputUnit) {
    if (outputUnit == Units.GRAM) return (parseInt(value) * 1000).toFixed(0);
    else if (outputUnit == Units.KG) return parseInt(value);
    else if (outputUnit == Units.OZ) return (parseInt(value) * 35.274).toFixed(1);
  }

  static convertOz(value, outputUnit) {
    if (outputUnit == Units.GRAM) return (parseInt(value) * 28.35).toFixed(2);
    else if (outputUnit == Units.KG) return (parseInt(value) / 35.274).toFixed(3);
    else if (outputUnit == Units.OZ) return parseInt(value);
  }
}

// export default Weight;