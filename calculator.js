//*** main focus of the project is in this section ***

let buffer = '0'; //initial display of 0 on the screen 

const screen = document.querySelector('.screen')

let runningTotal= 0;

//keep track of what operator you clicked 
//null is like the absence of anything
let previousOperator;

function init(){
    document.querySelector('.calc-buttons').addEventListener("click", function(event){
        buttonClick(event.target.innerText);
    })
}

function buttonClick(value){
    if (isNaN(parseInt(value))){ //see spaces for notes if want
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }

    //everytime someone clicks a button, you rerender
    rerender();
}

function handleSymbol(symbol){
    //SYMBOL TIME
    // 'C' -> will clear stuff out
    switch(symbol){
        case 'C':
            buffer = '0'
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            //see the running total in the UI
            buffer = "" + runningTotal; // buffer will maintain being a string
            runningTotal = 0;
            break;
        case '←': //delete the last thing that was there
            console.log('←');
            if(buffer.length === 1){
                buffer ='0';
            }else{
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
        case '÷':
            handleMath(symbol)
            break;
        case '+':
            handleMath(symbol)
            break;
        case '-':
            handleMath(symbol)
            break;
        case '×':
            handleMath(symbol)
            break;
    }
}

function handleMath(value){
    if(buffer === '0'){
        return;
    }
    //5 + 5 + do addition of the 1st two things
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }

    previousOperator = value;
    buffer = '0';
    console.log(runningTotal);
}

//keep track of what number is there on display 
function handleNumber(number){
    if(buffer === '0'){
        buffer = number;
    }
    //If you click the number 8 then original value of buffer=0 will be 8 (adding a number onto the end)
    else{
        buffer+= number
    }
}

// does the math 
function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer
    }
    else if(previousOperator === '÷'){
        runningTotal /= intBuffer
    }
    else if(previousOperator === '-'){
        runningTotal -= intBuffer
    }
    else if(previousOperator === '×'){
        runningTotal *= intBuffer
    }
}
function rerender(){
    screen.innerText = buffer;
}

init();
