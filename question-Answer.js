const questionNumber = document.getElementsByClassName("question-number");
const homeBox = document.getElementsByClassName("home-box");
const questionText = document.getElementsByClassName("question-text");
const optionChoice = document.getElementsByClassName("option-choice");
const mbtiBox = document.getElementsByClassName("mbti-box");
const resultBox = document.getElementsByClassName("result-box")
const detail = document.getElementsByClassName("detail");
const indicator = document.getElementsByClassName("indicator");
const btnNext = document.getElementsByClassName("btn-next-question");
const infoBox = document.getElementsByClassName("information-result")

let questionList = [];
let totalIndex = "";
let questionIndex = {};
let counter = 0;
let indexAnswer = {
    Extrovert: 0,
    Introvert: 0,
    Sensing: 0,
    Intuition: 0,
    Thinking: 0,
    Feeling: 0,
    Judging: 0,
    Perceiving: 0,
}
let index = '';

function setQuestionList(){
    for ( let i = 0; i < mbti.length; i++){
        questionList.push(mbti[i]);
    }
}


function getAllElementQuestion(){
    // set question Number
    questionNumber[0].innerHTML = `Question Number ${counter+1} Of ${mbti.length}`;
    // set random Question
    let indexQuestion = Math.floor(Math.random()*questionList.length);
    questionIndex = questionList[indexQuestion];
    // set question Text
    questionText[0].innerHTML = questionIndex.question;
    // delete list Question from selected Index
    questionList.splice(indexQuestion,1);
    let option = [0, 1];
    let index = 0;
    // set question Option
    for ( let i = 0; i < questionIndex.option.length; i++){
        const questionOption = document.createElement("div");
        let indexOption = Math.floor(Math.random()* option.length);
        index = option[indexOption]; 
        questionOption.innerHTML = questionIndex.option[index];
        option.splice(indexOption,1);
        questionOption.id = i;
        questionOption.className = "option";
        optionChoice[0].appendChild(questionOption);
        questionOption.setAttribute("onclick", "getResult(this)")
    }
    counter++; 
}
 
function getResult(answer) {  
    let id = answer.id;
    index = questionIndex[id];
    answer.classList.add("click");
    indexAnswer[index]++;
    btnNext[0].classList.add("already-clicked");
    unclickableAnswer();
}

function resetClick() {
    for ( let i = 0; i < optionChoice[0].children.length; i++){
        optionChoice[0].children[i].classList.remove("has-already-answered");
        optionChoice[0].children[i].classList.remove("click");
        btnNext[0].classList.remove("already-clicked");
    }
    indexAnswer[index]--;
}

function unclickableAnswer(){
    for ( let i = 0; i < optionChoice[0].children.length; i++){
        optionChoice[0].children[i].classList.add("has-already-answered")
    }
}

function nextClick() {
    if (counter === mbti.length){
        quizOver();
    } else {
        while (optionChoice[0].firstChild) {
            optionChoice[0].removeChild(optionChoice[0].firstChild);
          }
        btnNext[0].classList.remove("already-clicked");
        getAllElementQuestion();
    }
}

function quizOver() {
    mbtiBox[0].classList.add("hide");
    resultBox[0].classList.remove("hide");
    let fname = document.getElementById("fname").value;
    resultBox[0].querySelector(".name").innerHTML = fname;
    getDetail();
    getIndicator();
    document.getElementsByClassName(totalIndex)[0].classList.remove("hide");
}

function resetQuiz() {
    while (optionChoice[0].firstChild) {
        optionChoice[0].removeChild(optionChoice[0].firstChild);
    }

    while (indicator[0].firstChild) {
        indicator[0].removeChild(indicator[0].firstChild);
    } 

    for ( let i = 0; i < 4; i++){
        const indicatorMbti = document.createElement("div");
        indicatorMbti.className = "logo";
        indicator[0].appendChild(indicatorMbti);
    }

    indexAnswer = {
        Extrovert: 0,
        Introvert: 0,
        Sensing: 0,
        Intuition: 0,
        Thinking: 0,
        Feeling: 0,
        Judging: 0,
        Perceiving: 0,
    }
    counter = 0;
    document.getElementById("fname").value = "";
    fname = "";
    document.getElementsByClassName(totalIndex)[0].classList.add("hide");
}

function tryAgain() {
    resultBox[0].classList.add("hide");
    mbtiBox[0].classList.remove("hide");
    resetQuiz();
    goMbti();
}

function goHome() {
    resultBox[0].classList.add("hide");
    homeBox[0].classList.remove("hide");
    resetQuiz();
}

function getIndicator() {
    indicator[0]
    let key = Object.keys(indexAnswer);
    let index = "";
    
    for ( let i = 0; i < indicator[0].children.length; i++){
        let batas = i*2;
        if (indexAnswer[key[batas]] > indexAnswer[key[batas+1]]){
            if (batas === 0){
                index = "e";
            } else if (batas === 2){
                index = "s";
            } else if (batas === 4){
                index = "t";
            } else if (batas === 6){
                index = "j";
            }
        } else if (indexAnswer[key[batas]] < indexAnswer[key[batas+1]]){
            if (batas === 0){
                index = "i";
            } else if (batas === 2){
                index = "n";
            } else if (batas === 4){
                index = "f";
            } else if (batas === 6){
                index = "p";
            }
        }
        if (index === ""){
            index = "t";
        }
        totalIndex += index;
        indicator[0].children[i].classList.add(index);
        index = "";
    }
}

function getDetail() {
    let key = Object.keys(indexAnswer);
    let percentageIndex = 0;
    let percentage = []
    resultBox[0].querySelector(".total-question").innerHTML = counter;
    for ( let i = 0; i < 8; i+=2){
        for (let j = i; j < i+2; j++){
            percentageIndex = Math.round(indexAnswer[key[j]] / (indexAnswer[key[i]]+indexAnswer[key[i+1]]) * 100);
            percentage.push(percentageIndex);
        }
        percentageIndex = 0;
    }
    resultBox[0].querySelector(".extrovert").innerHTML = percentage[0] + '%';
    resultBox[0].querySelector(".introvert").innerHTML = percentage[1] + '%';
    resultBox[0].querySelector(".sensing").innerHTML = percentage[2] + '%';
    resultBox[0].querySelector(".intuition").innerHTML = percentage[3] + '%';
    resultBox[0].querySelector(".thinking").innerHTML = percentage[4] + '%';
    resultBox[0].querySelector(".feeling").innerHTML = percentage[5] + '%';
    resultBox[0].querySelector(".judging").innerHTML = percentage[6] + '%';
    resultBox[0].querySelector(".perceiving").innerHTML = percentage[7] + '%';
}

function goMbti() {
    let fname = document.getElementById("fname").value;
    if (fname.length > 10) {
        alert("Your username is too long, it should be less than 10 characters");
        document.getElementById("fname").value = "";
    } else if (fname.length === 0){
        alert("Please type your name on input box");
        document.getElementById("fname").value = "";
    } else {
        alert("Get Ready for The test !!!\n1. The test takes 10 minutes to finish\n2. You have to choose your answer to move on the next question\n3. Reset answer button to change the answer ")
        homeBox[0].classList.add("hide");
        mbtiBox[0].classList.remove("hide");
        setQuestionList();
        getAllElementQuestion();
    }
}

