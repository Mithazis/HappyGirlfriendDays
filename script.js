const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const container = document.getElementById('container');
const responseDiv = document.getElementById('response');
const buttonGroup = document.querySelector('.button-group');

const responseTextElement = document.getElementById('response-text');
const message = `Aaaaa, I like You too! \nHappy Girlfriend Days❤️`; //teks ini bisa diganti
const typingSpeed = 100;
let charIndex = 0;

let gameStarted = false;

function typeWriter() {
    if (charIndex < message.length) {
        responseTextElement.textContent += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        responseTextElement.style.borderRight = 'none';
    }
}

const startGame = () => {
    if (!gameStarted) {
        gameStarted = true;

        const yesBtnRect = yesBtn.getBoundingClientRect();
        const noBtnRect = noBtn.getBoundingClientRect();

        yesBtn.style.position = 'absolute';
        yesBtn.style.top = `${yesBtnRect.top}px`;
        yesBtn.style.left = `${yesBtnRect.left}px`;
        
        noBtn.style.position = 'absolute';
        noBtn.style.top = `${noBtnRect.top}px`;
        noBtn.style.left = `${noBtnRect.left}px`;

        buttonGroup.style.height = `${buttonGroup.offsetHeight}px`;
    }

    moveNoButton();
};

const moveNoButton = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    let newTop = Math.random() * (viewportHeight - btnHeight);
    let newLeft = Math.random() * (viewportWidth - btnWidth);

    const yesBtnRect = yesBtn.getBoundingClientRect();
    let attempts = 0;
    while(
        newLeft < yesBtnRect.right &&
        newLeft + btnWidth > yesBtnRect.left &&
        newTop < yesBtnRect.bottom &&
        newTop + btnHeight > yesBtnRect.top &&
        attempts < 100
    ) {
        newTop = Math.random() * (viewportHeight - btnHeight);
        newLeft = Math.random() * (viewportWidth - btnWidth);
        attempts++;
    }

    noBtn.style.top = `${newTop}px`;
    noBtn.style.left = `${newLeft}px`;
};

noBtn.addEventListener('mouseover', startGame);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    startGame();
});


yesBtn.addEventListener('click', () => {

    container.classList.add('hidden');
    yesBtn.classList.add('hidden');
    noBtn.classList.add('hidden');


    responseDiv.classList.remove('hidden');

    typeWriter();
});