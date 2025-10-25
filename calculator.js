// document.addEventListener("DOMContentLoaded", function() {

  let result = document.querySelector(".ans");
  let btns = document.querySelectorAll(".button");

  btns.forEach((btn) => {
    btn.addEventListener("click", function() {
      let value = btn.textContent;

      if ( value == "C" || result.textContent == "Error") {
        result.textContent = "0";
      } 
      else if( value == "=")
      {
        //taking the text line in result display eg:245+256*2;
        let expr = result.textContent;
        expr = expr.replace(/x/g, "*");
        result.textContent = evaluate(expr);
        
      }
      else {
        if(result.textContent === "0")
            result.textContent = value;
        else 
            result.textContent += value;
      }

      //to disaply the number when clicked
      result.scrollLeft = result.scrollWidth;

    });
  });

// });


function precedence(op) {
  if (op === '+' || op === '-') return 1;
  if (op === '*' || op === '/') return 2;
  return 0;
}

function applyOp(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
  }
}

function evaluate(expression) {
  let values = [];    
  let ops = [];     
  let i = 0;

 

  while (i < expression.length) {
    let ch = expression[i];


    // If it's a number
    if (!isNaN(ch)) {
      let val = 0;
      
      while (i < expression.length && !isNaN(expression[i]) && expression[i] !== ' ') {
        val = (val * 10) + (expression[i] - '0');
        i++;
      }
      values.push(val);
      continue;
    }

    // If it's an operator
    if (ch === '+' || ch === '-' || ch === '*' || ch === '/') {
     
      while (ops.length && precedence(ops[ops.length - 1]) >= precedence(ch)) {
        let val2 = values.pop();
        let val1 = values.pop();
        let op = ops.pop();
        values.push(applyOp(val1, val2, op));
      }
      ops.push(ch);
    }
    i++;
  }

  while (ops.length) {
    let val2 = values.pop();
    let val1 = values.pop();
    let op = ops.pop();
    values.push(applyOp(val1, val2, op));
  }

  return values.pop();
}
