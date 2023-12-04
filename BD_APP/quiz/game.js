const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    /*{
        question: "Tohle je první otázka",
        choice1: "odpověd 1",
        choice2: "odpověd 2",
        choice3: "odpověd 3",
        choice4: "odpověd 4",
    },
    {
        question: "Tohle je druhá otázka",
        choice1: "odpověd 1",
        choice2: "odpověd 2",
        choice3: "odpověd 3",
        choice4: "odpověd 4",
    },*/
];

/*fetch("https://opentdb.com/api.php?amount=5&category=19&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };
            const answerChoices = [...loadedQuestion.incorrect_answers]
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            })

            return formattedQuestion;
        });
        startGame();
    })
    .catch(err => {
        console.log(err);
    });
*/
fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.log(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    /*game.classList.remove("hidden");
    loader.classList.add("hidden");*/
}

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the main page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        /*const classToAply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
                classToAply = 'correct'
        }*/
        const classToAply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        //Zvýší skóre, pokud je odpověď správná
        if (classToAply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        //.parentElement = vyberu parent element (celý řádek, ne jenom text odpovědi)
        //.classList.add = přidám class tomu elementu 
        selectedChoice.parentElement.classList.add(classToAply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToAply)
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


