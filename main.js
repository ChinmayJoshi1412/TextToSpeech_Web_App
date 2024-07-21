const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const pitch = document.querySelector('#pitch');

let voices=[];

function getVoices(){
    voices = synth.getVoices();

    voices.forEach(voice=>{
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option)
    })
}

getVoices();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}


function speak(){
    if(synth.speaking){
        console.error('Already speaking...');
        return;
    }
    if(textInput.value!==''){
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e =>{
            console.log('Done speaking...');
        }
    speakText.onerror = e=>{
        console.error("Something went wrong");
    }

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    voices.forEach(voice=>{
        if(voice.name===selectedVoice){
            speakText.voice = voice;
        }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    synth.speak(speakText);
}

}


textForm.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur(); 
});
voiceSelect.addEventListener('change',e=>speak());
