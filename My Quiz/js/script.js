// getting all required elements 

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
//show questions function 
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

// if start quiz button clicked

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");    // show info box
}

// if exit button clicked

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");   // hide info box 
}

// if continue button clicked

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");   // hide info box 
    quiz_box.classList.add("activeQuiz");   // show quiz box
    showQuestions(0);   // to call function showQuestions()
    queCounter(1);    // to show numbering of question
    startTimer(15);  // to start timer after clicking continue
    startTimerLine(0);  // timeline
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn =  quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// quit quiz button

quit_quiz.onclick = ()=>{
    window.location.reload();
};

// if restart quitz button clicked

// quit quiz button

restart_quiz.onclick = ()=>{

    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");

    let que_count = 0;
    let que_numb = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;

    showQuestions(que_count);
    queCounter(que_numb); 
    clearInterval(counter);
    startTimer(timeValue);  // start time from starting again
    clearInterval(counterLine);
    startTimerLine(widthValue); 
    next_btn.style.display = "none";  // remove next button
    timeOff.textContent = "Time Left"; 

    window.location.reload();
}


// if next button clicked 
next_btn.onclick = ()=>{
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb); 
        clearInterval(counter);
        startTimer(timeValue);  // start time from starting again
        clearInterval(counterLine);
        startTimerLine(widthValue); 
        next_btn.style.display = "none";  // remove next button
        timeOff.textContent = "Time Left";  
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions Completed");
        showResultBox();
    }
}

// getting questions and options from array

function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " +
                questions[index].question +'</span>';

    // const option_list = document.querySelector(".option_list");
    let option_tag = '<div class="option">'+ questions[index].options[0]
                +'<span></span></div>'
                + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';

    que_text.innerHTML = que_tag;   // display questions from array
    option_list.innerHTML = option_tag;  // display options from array

    const option = option_list.querySelectorAll(".option");
    for(let i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// styling of answer
function optionSelected(answer){
    clearInterval(counter); // to stop timer after selecting option
    clearInterval(counterLine); // to stop timeline after chosing option

    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    
    if(userAns==correctAns){
        userScore += 1;    // to set score of user
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
    }
    else{
        answer.classList.add("incorrect");
        console.log("Answer is Incorrect");

// if answer is incorrect auto select right answer

        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
            }         
            
        }
    }

// after clicking one option disable all other options
    
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display = "block";
}

// result box

function showResultBox(){
    info_box.classList.remove("activeInfo");   // hide info box 
    quiz_box.classList.remove("activeQuiz");   // hide quiz box
    result_box.classList.add("activeResult");  // show result box
    const scoreText = result_box.querySelector(".score_text");

    // to set declarations of congo/sorry/nice
    if (userScore > 10) {
        let scoreTag = '<span>and Congratulation!, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 5) {
        let scoreTag = '<span>and Nice!, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>and Sorry!, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

// timer 

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if (time < 9) {  // to add zero like 09
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {   // to stop timer in negative values
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time OFF";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

        // no option checked auto ans declared
            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class","option correct");
                }         
                
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}


function startTimerLine(time){     // to increase timeline with solving Q
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {   
            clearInterval(counterLine);
        }
    }
}


// getting questions no
function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' +index+ '</p> Of <p>' 
                    +questions.length+ '</p> Questions</span>';

    bottom_ques_counter.innerHTML = totalQuesCountTag;
}

