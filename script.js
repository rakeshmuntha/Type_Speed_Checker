document.getElementById("startGame").addEventListener("click", startGame);

let tryagainbool = document.getElementById("tryAgain");
tryagainbool.disabled = true;

document.getElementById("tryAgain").addEventListener("click", resetGame);



// Add event listener for Tab + Enter combination to start game
document.addEventListener("keydown", function (event) {
    if (event.key === "Tab" && event.shiftKey === false) {

        window.tabPressed = true;

        event.preventDefault();
    }

    if (event.key === "Enter" && window.tabPressed === true) {

        window.tabPressed = false;

        startGame();

        event.preventDefault();
    }

    if (event.key !== "Tab" && event.key !== "Enter") {
        window.tabPressed = false;
    }
});

let maxwpm = 0;
let timerInterval;
let mistakes = 0;
let isGameOver = false;
let currentWordIndex = 0;
let correctChars = 0;
let wordMistake = false;
let paragraphsData = [
    "typing accurately and quickly is a skill that can only be developed through consistent practice whether you are a programmer a writer or simply someone who uses a keyboard frequently improving your typing skills can save you valuable time one of the best ways to practice typing is to focus on accuracy first and then work on speed remember making fewer mistakes often leads to better overall performance if you are struggling to type fast start with simple exercises and then gradually move to more complex sentences",
    "the quick brown fox jumps over the lazy dog is a well known pangram a sentence that contains every letter of the alphabet this makes it a great choice for typing practice especially for beginners while it may seem like a simple phrase focusing on each keystroke can help you identify weaknesses in your typing technique consider setting aside a few minutes each day to practice typing with purpose over time these small efforts can lead to significant improvements in both speed and accuracy making you a more efficient typist",
    "in the world of technology typing is a fundamental skill that is often overlooked many people focus on learning programming languages data analysis and other technical skills without realizing the importance of typing however being able to type quickly and accurately can give you a huge advantage imagine being able to code without constantly looking at the keyboard or write documentation effortlessly investing time in improving your typing can have long term benefits making you more productive and efficient in your work",
    "as technology advances the demand for quick and accurate typing has never been higher in todays fast paced world being able to communicate efficiently through digital platforms is crucial whether you are sending emails chatting with colleagues or writing reports your typing speed can make a difference it is not just about speed though accuracy is equally important typos can lead to miscommunication and even errors in professional documents practicing typing regularly can help you stay ahead in your career and handle the demands of modern workplaces",
    "developing good typing habits is not just about hitting the keys faster it is about typing smarter proper finger placement ergonomic posture and regular breaks can all contribute to better typing performance it is easy to get into bad habits especially if you are self taught but taking the time to learn the right way to type can pay off many people experience wrist pain or discomfort due to poor typing habits which can be avoided with the right techniques do not rush the process take your time to master the basics and gradually build up your speed",
    "one of the most effective ways to enhance your typing skills is to use online typing tests and games these tools provide instant feedback on your speed and accuracy helping you identify areas for improvement they also make practice more engaging and less monotonous by challenging yourself with timed exercises or accuracy based goals you can track your progress over time consistency is key just a few minutes of daily practice can lead to noticeable gains in your typing performance",
    "many people underestimate the impact of posture and workspace setup on their typing efficiency sitting with a straight back keeping your wrists elevated and placing your monitor at eye level can reduce strain and improve accuracy a clutter free desk and a comfortable chair also contribute to a better typing experience these small adjustments can prevent fatigue and increase focus making your practice sessions more productive and sustainable in the long run",
    "while touch typing is considered the gold standard not everyone starts off with this technique the goal should be to gradually wean yourself off looking at the keyboard begin by memorizing the home row keys and practice typing without glancing down even if it feels slow at first persistence will help you build muscle memory over time you will find that you can type fluidly and confidently with fewer distractions and greater efficiency",
    "different types of content can help you develop various aspects of your typing for example typing out code snippets can improve precision and symbol usage while copying paragraphs from novels can help with rhythm and punctuation mixing up your practice material keeps things interesting and targets different skill areas it also simulates real world typing tasks preparing you for a wide range of scenarios whether you are coding writing emails or taking notes",
    "setting realistic and measurable goals can keep you motivated during your typing journey instead of aiming to type one hundred words per minute right away start by improving your accuracy to near perfect or reaching forty words per minute with consistent results celebrate small milestones like reducing your error rate or typing without pauses progress may be slow at times but every step forward builds a stronger foundation making your typing faster and more reliable over time"
];
let currentParagraph = ""; // Store the current paragraph
document.getElementById("inputBox").disabled = true;

function loadNewParagraph() {
    // Select a random paragraph
    currentParagraph = paragraphsData[Math.floor(Math.random() * paragraphsData.length)];
    displayParagraph(currentParagraph);

    const inputBox = document.getElementById("inputBox");
    inputBox.removeEventListener("input", checkInput);
    inputBox.removeEventListener("keydown", handleKeyDown);

    inputBox.addEventListener("input", checkInput);
    inputBox.addEventListener("keydown", handleKeyDown);
}

function startTimer() {
    let timeLimit = parseInt(document.getElementById("timeLimit").value) || 60;
    document.getElementById("timer").innerText = timeLimit;

    timerInterval = setInterval(() => {
        if (timeLimit > 0) {
            timeLimit--;
            document.getElementById("timer").innerText = timeLimit;
        } else {
            endGame();
        }
    }, 1000);
}

function displayParagraph(paragraph) {
    const container = document.getElementById("paragraph");
    container.innerHTML = "";

    const words = paragraph.split(" ");
    words.forEach((word, index) => {
        const wordSpan = document.createElement("span");
        wordSpan.classList.add("word");
        wordSpan.id = `word-${index}`;

        word.split("").forEach((letter) => {
            const letterSpan = document.createElement("span");
            letterSpan.innerText = letter;
            letterSpan.classList.add("letter");
            wordSpan.appendChild(letterSpan);
        });

        container.appendChild(wordSpan);
        container.appendChild(document.createTextNode(" "));
    });
}
function startGame() {
    // Clear and focus the input box
    tryagainbool.disabled = false;


    isGameOver = false;
    currentWordIndex = 0;
    correctChars = 0;
    wordMistake = false;

    document.getElementById("inputBox").value = "";
    document.getElementById("inputBox").disabled = false;
    document.getElementById("inputBox").focus();

    clearInterval(timerInterval);
    resetStats();

    loadNewParagraph();
    startTimer();
}

function checkInput() {
    if (isGameOver) return;

    const words = document.getElementById("paragraph").children;
    const typedText = document.getElementById("inputBox").value.trim();

    if (currentWordIndex >= words.length) {
        endGame();
        return;
    }

    const currentWord = words[currentWordIndex];
    const currentWordText = Array.from(currentWord.children).map(span => span.innerText).join("");

    const typedChars = typedText.split("");

    currentWord.classList.remove("incorrect");

    let isMistake = false;
    Array.from(currentWord.children).forEach((span, index) => {
        if (typedChars[index] === span.innerText) {
            span.classList.add("correct-letter");
            span.classList.remove("incorrect-letter");
        } else if (typedChars[index] !== undefined) {
            span.classList.add("incorrect-letter");
            span.classList.remove("correct-letter");
            isMistake = true;
        } else {
            span.classList.remove("correct-letter", "incorrect-letter");
        }
    });

    if (isMistake && !wordMistake) {
        mistakes++;
        document.getElementById("mistakes").innerText = mistakes;
        wordMistake = true;
    } else if (!isMistake) {
        wordMistake = false;
    }
}

function handleKeyDown(event) {
    if (isGameOver) return;

    if (event.key === " ") {
        const words = document.getElementById("paragraph").children;

        if (currentWordIndex >= words.length) {
            event.preventDefault();
            return;
        }

        const currentWord = words[currentWordIndex];
        const typedText = document.getElementById("inputBox").value.trim();
        const currentWordText = Array.from(currentWord.children).map(span => span.innerText).join("");

        if (typedText.length > 0) {
            event.preventDefault(); // Prevent the space from being added to input

            if (typedText === currentWordText) {
                Array.from(currentWord.children).forEach(span => {
                    span.classList.add("correct-letter");
                    span.classList.remove("incorrect-letter");
                });
                correctChars += typedText.length;
            } else {
                currentWord.classList.add("incorrect");
            }

            currentWordIndex++;

            // Clear the input box
            document.getElementById("inputBox").value = "";
            wordMistake = false;

            // Check if we reached the end of the paragraph
            if (currentWordIndex === words.length) {
                endGame();
            }
        } else {
            event.preventDefault();
        }
    }
}

function calculateWPM() {
    const wordsTypedCorrectly = correctChars / 5; // 5 characters = 1 word
    const timeElapsed = parseInt(document.getElementById("timeLimit").value) - parseInt(document.getElementById("timer").innerText);

    if (timeElapsed > 0) {
        const wpm = Math.round((wordsTypedCorrectly / timeElapsed) * 60);
        maxwpm = Math.max(wpm, maxwpm);
        document.getElementById("wpm").innerText = wpm;
        document.getElementById("highest-wpm").innerText = maxwpm;
    } else {
        document.getElementById("wpm").innerText = 0;
        document.getElementById("wpm").innerText = 0;
    }
}

function endGame() {
    clearInterval(timerInterval);
    isGameOver = true;
    calculateWPM();
    document.getElementById("inputBox").removeEventListener("input", checkInput);
    document.getElementById("inputBox").removeEventListener("keydown", handleKeyDown);
    document.getElementById("inputBox").disabled = true;
}

function resetGame() {
    clearInterval(timerInterval);

    document.getElementById("inputBox").value = "";
    document.getElementById("inputBox").disabled = false;
    document.getElementById("inputBox").focus();

    isGameOver = false;
    currentWordIndex = 0;
    correctChars = 0;
    wordMistake = false;
    resetStats();

    if (currentParagraph) {
        displayParagraph(currentParagraph);

        const inputBox = document.getElementById("inputBox");
        inputBox.removeEventListener("input", checkInput);
        inputBox.removeEventListener("keydown", handleKeyDown);

        inputBox.addEventListener("input", checkInput);
        inputBox.addEventListener("keydown", handleKeyDown);

        startTimer();
    } else {
        // If no paragraph has been loaded yet, start the game
        startGame();
    }
}

function resetStats() {
    mistakes = 0;
    document.getElementById("mistakes").innerText = 0;
    document.getElementById("wpm").innerText = 0;
    document.getElementById("timer").innerText = parseInt(document.getElementById("timeLimit").value) || 60;
}