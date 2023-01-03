// lower display max 15 chars
let num1 = '';
let num2 = '';
let operation = '';
let lowerCounter = 0;
const LOWER_LIMIT = 14;

const buttons = document.querySelectorAll('button');

const add = function(operand1, operand2)
{
  return +operand1 + +operand2;
};

const subtract = function(operand1, operand2)
{
  return operand1 - operand2;
};

const multiply = function(operand1, operand2)
{
  return operand1 * operand2;
};

const divide = function(operand1, operand2)
{
  return operand1 / operand2;
};

const operations = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
};

function operate(operator, operand1, operand2)
{
  return operations[operator](operand1, operand2);
}

function updateLowerText(element)
{
  const lower = document.querySelector('.lower-display');
  lower.textContent = element;
}

function updateUpperText(element, operation, element2 = undefined)
{
  const upper = document.querySelector('.upper-display');
  if(!element2)
  {
    if(element != '√' && operation != '^2')
      upper.textContent = `${element} ${operation}`;
    else
      upper.textContent = `${element}${operation}`;
  }
  else
  {
    upper.textContent = `${element} ${operation} ${element2}`;
  }
}

function clearLowerText()
{
  const lower = document.querySelector('.lower-display');
  lower.textContent = '';
  lowerCounter = 0;
}

function clearUpperText()
{
  const upper = document.querySelector('.upper-display');
  upper.textContent = '';
}

const clear = function()
{
  num1 = '';
  num2 = '';
  operation = '';
  clearLowerText();
  clearUpperText();
};

const addValue = function(character)
{
  if(lowerCounter < LOWER_LIMIT)
  {
    let element;

    if(!operation)
    {
      num1 += character;
      element = num1;
    }
    else
    {
      num2 += character;
      element = num2;
    }

    updateLowerText(element);

    if(character == '.')
    {
      document.getElementById('decimal').disabled = true;
    }
  }
  lowerCounter++;
};

const negation = function()
{
  let element;

  if(!operation && num1)
  {
    num1 = (num1 * -1).toString();
    element = num1;
  }
  else if (operation && num2)
  {
    num2 = (num2 * -1).toString();
    element = num2;
  }

  if(element)
  {
    updateLowerText(element);
  }
};

const deleteLastChar = function()
{
  let element;
  let lengthReduced = false;
  if(!operation)
  {
    num1 = num1.slice(0, -1);
    element = num1;
    lengthReduced = true;
  }
  else
  {
    num2 = num2.slice(0, -1);
    element = num2;
    lengthReduced = true;
  }

  updateLowerText(element);

  if(lengthReduced)
    lowerCounter--;
};

const updateWithOperation = function(operator)
{
  if(num1 && !num2)
  {
    operation = operator;
    updateUpperText(num1, operation);
    clearLowerText();
    document.getElementById('decimal').disabled = false;
  }
  if (num1 && num2)
  {
    callOperate(operator);
  }
}

function error()
{
  document.getElementById('error').textContent = 'The answer has been rounded.';
  setTimeout(() => {
    document.getElementById('error').textContent = ''
  }, 5000);
}

function round(num)
{
  if(num.includes('e'))
    {
      let length = num.length;
      let index = num.indexOf('e');
      let section1 = num.substring(0, 14 - (length - index));
      let section2 = num.substring(index, length);
      num = section1 + section2;
      error();
    }
    else if(num.length > 14)
    {
      num = num.substring(0, 14);
      error();
    }
    return num;
}

const callOperate = function(newOperation = null)
{
  if(num1 && num2 && operation)
  {
    if(!newOperation)
    {
      updateUpperText(num1, operation, num2);
      num1 = round(operate(operation, num1, num2).toString());
      updateLowerText(num1);
      num2 = '';
      operation = '';
      document.getElementById('decimal').disabled = false;
    }
    else
    {
      updateUpperText(num1, newOperation);
      num1 = round(operate(operation, num1, num2).toString());
      num2 = '';
      operation = newOperation;
    }
  }
};

const square = function()
{
  if(num1)
  {
    updateUpperText(num1, '^2');
    num1 = round(Math.pow(num1, 2).toString());
    updateLowerText(num1);
  }
}

const sqrt = function()
{
  if(num1)
  {
    updateUpperText('√', num1);
    num1 = round(Math.sqrt(num1).toString());
    updateLowerText(num1);
  }
}

const actions = {
  'clear': clear,
  'delete': deleteLastChar,
  'negation': negation,
  '=': callOperate,
  '.': addValue,
  '0': addValue,
  '1': addValue,
  '2': addValue,
  '3': addValue,
  '4': addValue,
  '5': addValue,
  '6': addValue,
  '7': addValue,
  '8': addValue,
  '9': addValue,
  '+': updateWithOperation,
  '-': updateWithOperation,
  '*': updateWithOperation,
  '/': updateWithOperation,
  'square': square,
  'sqrt': sqrt,
};

function updateDisplay(character)
{
  const noParameters = ['clear', 'delete', 'negation', '=', 'square', 'sqrt'];
  if(noParameters.includes(character))
  {
    actions[character]();
  }
  else
  {
    actions[character](character);
  }
}

buttons.forEach(button => {
  button.addEventListener('click', button => {
    updateDisplay(button.currentTarget.value);
  });
});