let hidePanel = document.getElementById("hide-panel");
let showPanel = document.getElementById("panel-show");
let letPanel = document.getElementById("left-panel");

hidePanel.addEventListener('click',hideLeftPanel);
showPanel.addEventListener('click',showLeftPanel);

function showLeftPanel(){
    if(letPanel.style.display == "none"){
        letPanel.style.display = "";
        showPanel.style.display = 'none';
    }
}

function hideLeftPanel(){
    if(letPanel.style.display == ""){
        letPanel.style.display = "none";
        showPanel.style.display = "inline-block";
    }
}

//========================================
// Conversation Starts

let startConv = document.getElementById('start-conv');

let userPrompt;

const synth = window.speechSynthesis;

let convStarted = false;

startConv.addEventListener('click', () => {
    if(convStarted){
        convStarted = false;
    } else {
        startConversation();
        convStarted = true;
    }
});

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synth.speak(utterance);
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {

  console.log('Speech Recognition API supported');
  
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;

} else {
    console.error('Speech recognition not supported in this browser.');
    alert('Speech recognition not supported in this browser. Use Chrome');
}


function startConversation() {


  console.log("Lana - Hello, I am Lana, how can i help you today?");
  const robotIntro = "Hello, I am Lana, how can i help you today?";
  speak(robotIntro);

  setTimeout(() => {
    speak("Thats great,but I'm just a dummy voice over");  
  }, 8000);  
}

// ==============================================================================================


function userSpeech (){

    console.log('Starting recognition');
    recognition.start();

    recognition.onstart = function() {
     console.log('Speech recognition started');
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        console.log('Transcript: ', transcript);

        userPrompt = transcript;
        
        setTimeout(() => {
            console.log("Going to generate function");
            generate();
        }, 1000);

    };

    recognition.onspeechend = function() {
        console.log('Speech end detected');
        recognition.stop();
    };

    recognition.onerror = function(event) {
        console.error('Recognition error:', event.error);
    };

    recognition.onnomatch = function() {
        console.log('No match found');
        transcriptDiv.innerText = 'No match found';
    };
  
}

