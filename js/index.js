const boxes = document.querySelectorAll(".box");
const child = document.querySelector(".child");
var ready ="ok";
const wrong = document.getElementById("wrong");
const right = document.getElementById("right");
const allMedia = document.querySelectorAll("video,audio")
var loadedmedia = 0;
const username = document.getElementById("user");
const hs = document.getElementById("hs");
const s = document.getElementById("s")
const over = document.querySelector(".over");


const arr = []

const buttom = document.querySelector(".buttom");

var score = 0;
var highScore = (getCookie("highscore")) ? Number(getCookie("highscore")) : 0 ;

const userInput = document.getElementById("userInput");
const promptBox = document.querySelector(".alertbox");

function gameOver(){
    const bgs = document.getElementById("bgs");
    bgs.pause();
    bgs.currentTime = 0;
    const end = document.getElementById("end");
    end.play()
    over.style.top = "0";
    over.querySelector(".overuser").innerHTML = getCookie("username");
    over.querySelector(".yscore h3").innerHTML = score;
    over.querySelector(".tscore h3").innerHTML = getCookie("highscore");
    over.querySelector(".rbtn").addEventListener("click", () => {
        end.pause();
        end.currentTime = 0;
        window.location.href = "/";
    })
}


function loadArr(){
    for(var i=0; i<15; i++){
        const ele = `<div class="counter">${(i + 1)}</div>`;
        arr.push(ele);
    }
}

function showArr(){
   const joined = arr.join("")
   buttom.innerHTML = joined;
  // alert(buttom.innerHTML)
}

function remArr(){
    arr.pop();
    showArr();
}
function countArr(){
    if(arr.length <= 5){
        buttom.querySelectorAll(".counter").forEach((card) => {
           // alert(card.innerHTML)
             card.style.background = "red";
    })
    }
    if(arr.length > 5 && arr.length <= 7){
        buttom.querySelectorAll(".counter").forEach((card) => {
           // alert(card.innerHTML)
             card.style.background = "yellow";
    })
    }
    if(arr.length < 1){
        gameOver();
    }
    
}

function loadedComplete(){
    if(loadedmedia === allMedia.length){
        const startbtn = document.getElementById("startbtn");
        startbtn.style.display = "inline";
        startbtn.addEventListener("click", () => {
            document.querySelector(".before").style.top = "-100%";
        })
        if(!getCookie("username")){
            promptBox.style.display = "flex";
            
        }
        else{
            promptBox.style.display = "none";
            document.querySelector(".before").style.display = "flex";
        }
        getDetails();
        updateuser();
        getUsername();
        updateScore();
        loadArr();
        showArr();
        updateHighscore();
        
        boxes.forEach((box) => {
            box.style.display = "block";
            play(box)
        })
    }
    else if(!loadedmedia === allMedia.length){
        boxes.forEach((box) => {
            box.style.display = "none"
        })
    }
}

function updateHighscore(){
    highscore = Number(getCookie("highscore"))
    hs.innerHTML = highscore;
}

function checkLoaded(){
    allMedia.forEach((media) => {
        media.load();
        media.addEventListener("canplaythrough",() => {
            loadedmedia ++ ;
            loadedComplete();
        })
    })
}

function updateScore(){
    s.innerHTML = score;
}

function getDetails(){
    promptBox.addEventListener("click", () => {
            userInput.focus();
            
            
        })
}

function updateuser(){
    
            userInput.addEventListener("keyup", (e) => {
                var value = userInput.value;
            promptBox.querySelector("h3").innerHTML = value;
            if(e.keyCode === 13){
                setCookie("username", value.trim(), 30);
                promptBox.style.top = "-100%";
                getUsername();
            }
            
            
            })
}

function getUsername(){
    username.innerHTML = getCookie("username")
}

function setCookie(name,value, days){
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expiry = "expiry="+date.toUTCString();
    
    document.cookie = `${name}=${value}; ${expiry}; path=/`;
}

function getCookie(name){
    var cookieValue = null;
    if(document.cookie && document.cookie !== ""){
        const cookies = document.cookie.split("; ")
        for(var i=0; i<cookies.length; i++){
            const cookie = cookies[i].split("=")
            if(cookie[0] === name){
                cookieValue = cookie[1];
                break;
            }
            
        }
    }
    return cookieValue;
}


function play(box){
    
        box.addEventListener("click", (e) => {
            if(ready === "ok"){
                ready = null;
                remArr();
                countArr();
                const target = e.currentTarget;
                if(target.innerHTML === child.outerHTML){
                    right.play();
                    score ++;
                    updateScore();
                    if(score>highScore){
                        setCookie("highscore",score, 30);
                        
                    }
                    updateHighscore();
                    // alert("wow");
                    child.style.display = "block";
                    setTimeout(() => {
                        child.style.display = "none"
                        changePos();
                        ready = "ok";
                },1000);
                    
                    play(box)
                }
                else{
                    // alert("arrrw !");
                    wrong.play();
                    child.style.display = "block";
                    setTimeout(() => {
                        child.style.display = "none"
                        changePos();
                        ready = "ok";
                },1000);
                    
                    play(box)
                }
            }
            
        })
    }
    


function changePos(){

    const parent = child.parentNode;
    parent.removeChild(child);
    const i = getRandom();
    if(!boxes[i].firstChild){
        boxes[i].appendChild(child)
    }
}

function getRandom(){
    const a = Math.floor(Math.random()*boxes.length)
    return a;
}

window.onload = () => {
    promptBox.querySelector("h3").innerHTML = getCookie("username")
    //loadedComplete();
    checkLoaded();
}
