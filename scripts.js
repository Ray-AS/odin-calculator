let add = function(operand1, operand2)
{
  return operand1 + operand2;
}

let subtract = function(operand1, operand2)
{
  return operand1 - operand2;
}

let multiply = function(operand1, operand2)
{
  return operand1 * operand2;
}

let divide = function(operand1, operand2)
{
  return operand1 / operand2;
}

let operations = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
};