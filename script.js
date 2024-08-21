let c = document.querySelector('.content p');
let input = document.getElementById('typespace');
let index = mistakes = isTyping = 0;
let time;
let time_left = document.querySelector('.time-left');
let error = document.querySelector('.error');
let cpm = document.querySelector('.cpm'); 
let wpm = document.querySelector('.wpm'); 
let maxTime = 60;
let timeLeft = maxTime;
let resetBtn = document.querySelector('.bottom button');
let soundBtn = document.querySelector('.sound input');

let correctType = new Audio('correct.mp3');
let incorrectType = new Audio('incorrect.mp3');


const playSound = () =>{
        correctType.pause();
        incorrectType.pause();
    }
soundBtn.addEventListener('click', () => {
    playSound();
});

// Define LoadPara function
const loadpara = () => {
    let random_para = Math.floor(Math.random() * paragraph.length);
    c.innerHTML = "";
    paragraph[random_para].split('').forEach(element => {
        let RealData = `<span>${element}</span>`;
        c.innerHTML += RealData;
    });
    c.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('click', ()=>{
        input.focus();
    });
    c.addEventListener('click', ()=>{
        input.focus();
    });
}
loadpara();
input.addEventListener('input', (e) => {
    let char = c.querySelectorAll('span');
    let inputValue = e.target.value.split('')[index];
    if(!isTyping){
        time = setInterval(timeSetup, 1000);
        isTyping = true;
    }
    if (index < char.length-1) {
        if (inputValue == null) {
            if(index > 0){
                index--;
                if(char[index].classList.contains('incorrect')){
                    mistakes--;
                }
                char[index].classList.remove('correct','incorrect');
            }
        } else {
            if (char[index].innerText == inputValue) {
                char[index].classList.add('correct');
                correctType.play();
                // playSound();
            } else {
                char[index].classList.add('incorrect');     
                mistakes++;      
                incorrectType.play();  
                // playSound();
            }
        }
        index++;
        char.forEach(element=>{
            element.classList.remove('active');

        });
        char[index].classList.add('active');
        error.innerText = `Mistakes : ${mistakes}`;
        cpm.innerText = `CPM : ${index - mistakes}`;
    } else {
        clearInterval(time);
        input.value = "";
        isTyping = false;

    }
});
const timeSetup = () =>{
    if(timeLeft > 0){
        timeLeft--;
        time_left.innerText = `Time Left : ${timeLeft}s`;
        let wpmTab = Math.round((index-mistakes) / 5 /(maxTime-timeLeft)*60);
        wpm.innerText = `WPM : ${wpmTab}`;
    }else{
        clearInterval(time);
        input.value = "";
    }
};

resetBtn.addEventListener('click',()=>{
    loadpara();
    clearInterval(time);
    wpm.innerText = `WPM : 0`;
    error.innerText = `Mistakes : 0`;
    cpm.innerText = `CPM : 0`;
    timeLeft = maxTime;
    time_left.innerText = `Time Left : ${maxTime}s`;
    input.value = "";
    index = mistakes = isTyping = 0;
});