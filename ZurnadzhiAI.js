const fetch = require("cross-fetch");
const robotjs = require("robotjs");
const clipboard = require("copy-paste");

const bodymethodsGPT = {
    "model": "gpt-3.5-turbo",
    "provider": "Liaobots",
    "stream": 'False',
    "messages": [
	    {"role": "system", "content": "Speak only in russian. You're a comedian telling jokes about any topic."}, 
        {"role": "user", "content": "Tell a funny joke please"} // !!! should catch the chat messages via robotjs
    ]
}

async function GPTPostCall() {
  const postcall = await fetch(
'http://localhost:1337/v1/chat/completions', { // http://localhost:1337/v1/chat/completions
	method: 'POST',
	headers: {
      "Content-Type": "application/json",
    },
	body: JSON.stringify(bodymethodsGPT)
}
)
const response = await postcall.json();
let answer = response.choices[0].message.content;
clipboard.copy(answer);
// console.log(answer);
robotjs.keyTap('t');
robotjs.keyToggle('control', 'down');
robotjs.keyTap('v');
robotjs.keyToggle('control', 'up'); // Used to post an answer from the neuralink(from GPTPostCall)
robotjs.keyTap('enter');
// PasteAnswer();
}

function PasteAnswer() {
    try {
    robotjs.moveMouse(1701, 858);
    robotjs.mouseClick("right");
    robotjs.moveMouse(1746, 886);
    robotjs.mouseClick("left");
    robotjs.moveMouse(1750, 890);
    robotjs.mouseClick("left");
    robotjs.moveMouse(1701, 858);
    robotjs.mouseClick("left");
    /* robotjs.keyTap('t');
    robotjs.keyToggle('control', 'down');
    robotjs.keyTap('v');
    robotjs.keyToggle('control', 'up'); // Used to post an answer from the neuralink(from GPTPostCall)
    robotjs.keyTap('enter');
    console.log('checking');
    */
     let text = clipboard.paste();
     console.log(text);

     if (text.includes("Леонид Зурнаджи")) {
        robotjs.moveMouse(2031, 602);
        robotjs.mouseClick();
        robotjs.moveMouse(2002, 732);
        robotjs.mouseClick();
        robotjs.mouseClick();
        robotjs.moveMouse(2031, 602);
        robotjs.mouseClick();
        GPTPostCall();
     }

} finally {
    setTimeout(PasteAnswer, 5000);
}   
}

/*let znanie = robotjs.getMousePos();
console.log(znanie);
*/

PasteAnswer();