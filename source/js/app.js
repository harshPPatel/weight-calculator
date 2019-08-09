const fromForm = document.getElementById('--js-from-form');
const toForm = document.getElementById('--js-to-form');
const fromInput = document.getElementById('from_input');
const toInput = document.getElementById('to_input');

// Units
const Units = {
  GRAM: 'gram',
  KG: 'kg',
  OZ: 'oz'
};

// Forms
const Forms = {
  INPUT: '',
  OUTPUT: ''
};

// Input/Output Units
const Unit = {
  INPUT: '',
  OUTPUT: ''
};

// Returns selected unit of From Form
const getFromUnit = () => {
  const radios = fromForm.elements['from_units'];
  let unit;
  radios.forEach(radio => {
    console.log(radio.getAttribute('value') == 'kg');

    if (radio.checked == true && radio.getAttribute('value') == Units.GRAM) {
      unit = Units.GRAM;
    }
    if (radio.checked == true && radio.getAttribute('value') == Units.KG) {
      unit = Units.KG;
    }
    if (radio.checked == true && radio.getAttribute('value') == Units.OZ) {
      unit = Units.OZ;
    }
  });

  return unit;
};

// Returns unit of To Form
const getToUnit = () => {
  const radios = toForm.elements['to_units'];
  let unit;
  radios.forEach(radio => {
    console.log(radio.getAttribute('value') == 'kg');

    if (radio.checked == true && radio.getAttribute('value') == Units.GRAM) {
      unit = Units.GRAM;
    }
    if (radio.checked == true && radio.getAttribute('value') == Units.KG) {
      unit = Units.KG;
    }
    if (radio.checked == true && radio.getAttribute('value') == Units.OZ) {
      unit = Units.OZ;
    }
  });

  return unit;
};

// Sets the units according to the user input to the Unit object
const setUnits = e => {
  const input = e.target;
  if (input.getAttribute('name') == 'from_input') {
    Forms.INPUT = 'from';
    Forms.OUTPUT = 'to';
    Unit.INPUT = getFromUnit();
    Unit.OUTPUT = getToUnit();
  } else {
    Forms.INPUT = 'to';
    Forms.OUTPUT = 'from';
    Unit.INPUT = getToUnit();
    Unit.OUTPUT = getFromUnit();
  }
};

// Updates the units
const updateUnits = (e, form) => {
  if (form == fromForm) {
    Forms.INPUT = 'from';
    Forms.OUTPUT = 'to';
    Unit.INPUT = getFromUnit();
    Unit.OUTPUT = getToUnit();
  } else if (form == toForm) {
    Forms.INPUT = 'to';
    Forms.OUTPUT = 'from';
    Unit.INPUT = getToUnit();
    Unit.OUTPUT = getFromUnit();
  }
}

// Returns the weight
const getWeight = () => {
  const inputValue = Forms.INPUT == 'from' ? fromInput.value : toInput.value;
  const weight = Weight.convert(inputValue, Unit.INPUT, Unit.OUTPUT);
  return weight;
};

// Returns outputTarget according to user input target
const outputTarget = () => {
  if (Forms.OUTPUT == 'from') {
    return fromInput;
  } else if (Forms.OUTPUT == 'to') {
    return toInput;
  }
};

// Set the values
const setValues = (e) => {
  setUnits(e);
  outputTarget().value = getWeight();
};

// Sets event listeners
const setEventListeners = () => {
  fromInput.oninput = e => setValues(e);
  toInput.oninput = e => setValues(e);
  fromInput.onclick = (e) => e.target.select();
  toInput.onclick = (e) => e.target.select();
  fromForm.elements['from_units'].forEach(radio => {
    radio.addEventListener('change', e => {
      updateUnits(e, fromForm);
      outputTarget().value = getWeight();
    });
  });
  toForm.elements['to_units'].forEach(radio => {
    radio.addEventListener('change', e => {
      updateUnits(e, toForm);
      outputTarget().value = getWeight();
    });
  });
}

// Window's onload, adding event listeners to the elements
window.onload = setEventListeners;