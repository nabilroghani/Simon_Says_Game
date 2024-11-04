let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let btns = ['red', 'yellow', 'green', 'purple'];
let h2 = document.querySelector('h2');

document.addEventListener('keypress', function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 250);
}

function userFlash(btn) {
    btn.classList.add('userflash');
    setTimeout(function () {
        btn.classList.remove('userflash');
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkBtn() {
    // Iterate over the user sequence and compare each input with the game sequence
    for (let i = 0; i < userSeq.length; i++) {
        if (userSeq[i] !== gameSeq[i]) {
            // Game over if any input doesn't match the corresponding sequence
            h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start.`;
            document.querySelector('body').style.backgroundColor = "red";
            setTimeout(() => {
                document.querySelector('body').style.backgroundColor = 'white';
            }, 250);
            reset();
            return;
        }
    }

    // If the entire sequence matches, move to the next level
    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
    }
}


function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);

    checkBtn();
}

let allBtns = document.querySelectorAll('.btn');
for (let btn = 0; btn < allBtns.length; btn++) {
    allBtns[btn].addEventListener('click', btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
