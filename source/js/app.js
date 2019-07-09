// import Weight from './Weight';

const fromForm = document.getElementById('--js-from-form');
const toForm = document.getElementById('--js-to-form');
const fromInput = document.getElementById('from_input');
const toInput = document.getElementById('to_input');

const Units = {
  GRAM: 'gram',
  KG: 'kg',
  OZ: 'oz'
};

const Forms = {
  INPUT: '',
  OUTPUT: ''
};

const Unit = {
  INPUT: '',
  OUTPUT: ''
};

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

const getWeight = () => {
  const inputValue = Forms.INPUT == 'from' ? fromInput.value : toInput.value;
  const weight = Weight.convert(inputValue, Unit.INPUT, Unit.OUTPUT);
  return weight;
};

const outputTarget = () => {
  if (Forms.OUTPUT == 'from') {
    return fromInput;
  } else if (Forms.OUTPUT == 'to') {
    return toInput;
  }
};

const setValues = (e) => {
  setUnits(e);
  outputTarget().value = getWeight();
};

const setEventListeners = () => {
  fromInput.oninput = e => setValues(e);
  toInput.oninput = e => setValues(e);
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

window.onload = setEventListeners;