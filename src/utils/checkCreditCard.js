const luhnCheck = val => {
  var sum = 0;
  for (var i = 0; i < val.length; i++) {
    var intVal = parseInt(val.substr(i, 1));
    if (i % 2 === 0) {
      intVal *= 2;
    }
    sum += intVal;
  }
  return sum % 10 === 0;
};

const validateCardNumber = number => {
  var regex = new RegExp('^[0-9]{16}$');
  if (!regex.test(number)) return false;

  return luhnCheck(number);
};

export default validateCardNumber;
