const getRandomHslColor = () => {
    const getRandomNumber = (min, max) =>
        Math.round(Math.random() * (max - min) + min);
    const { hue, saturation, lightness } = {
        hue: getRandomNumber(0, 360),
        saturation: getRandomNumber(0, 100),
        lightness: getRandomNumber(0, 100),
    };
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

var message = document.querySelector('#message');
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammer = '#JSGF V1.0';

var recognition = new SpeechRecognition();
var speechRecognitionGrammerList = new SpeechGrammarList();
speechRecognitionGrammerList.addFromString(grammer, 1);

recognition.grammers = speechRecognitionGrammerList;
recognition.lang = 'sr-SP';
recognition.interimResult = false;

recognition.onresult = function (event) {
    const color = getRandomHslColor();
    document.body.style.backgroundColor = color;
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    message.textContent = 'Речено је: ' + command + '.';
    console.log(command);
}
recognition.onspeachend = function () {
    document.body.style.backgroundColor = "white";
    message.textContent = 'Чича мича, мора да се прича!';
    recognition.start();
};
recognition.onerror = function (event) {
    console.log(event.error);
    message.textContent = 'Чича мича, мора да се прича!';
}
document.querySelector('#btnGiveCommand').addEventListener('click', function () {
    recognition.start();
});