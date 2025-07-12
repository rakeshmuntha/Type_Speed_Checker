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
    "setting realistic and measurable goals can keep you motivated during your typing journey instead of aiming to type one hundred words per minute right away start by improving your accuracy to near perfect or reaching forty words per minute with consistent results celebrate small milestones like reducing your error rate or typing without pauses progress may be slow at times but every step forward builds a stronger foundation making your typing faster and more reliable over time",
    "developing muscle memory is crucial for becoming a proficient typist when you practice regularly your fingers begin to remember the location of each key without conscious thought this automatic response is what separates skilled typists from beginners who still hunt and peck at individual keys to build muscle memory effectively you should practice typing without looking at the keyboard even if it feels uncomfortable at first the discomfort is temporary but the benefits of touch typing will last a lifetime proper finger placement on the home row keys is essential for developing this muscle memory",
    "many people underestimate the importance of proper posture while typing but your body position directly affects your typing speed and accuracy sit up straight with your feet flat on the floor and your wrists floating above the keyboard avoid resting your wrists on the desk or keyboard as this can lead to strain and slower typing speeds your monitor should be at eye level to prevent neck strain and your chair should support your lower back good ergonomics not only improve your typing performance but also help prevent repetitive strain injuries that can develop over time",
    "the home row method is the foundation of efficient typing technique place your left fingers on the keys a s d f and your right fingers on j k l semicolon these eight keys serve as the base position from which all other keys are reached each finger is responsible for specific keys and returning to the home row after each keystroke ensures consistent hand position while learning this method may initially slow down your typing speed the investment in proper technique will pay dividends as you progress always return your fingers to their home positions",
    "common typing mistakes include looking at the keyboard while typing using only a few fingers and neglecting proper finger assignments these bad habits can significantly limit your typing potential and are difficult to unlearn once established focus on using all ten fingers and resist the urge to peek at the keys even when you make mistakes correction should be done through feel rather than sight another frequent error is typing too fast without regard for accuracy which often results in more time spent correcting mistakes than the time saved by rapid typing",
    "rhythm and consistency are key elements of skilled typing much like playing a musical instrument typing benefits from maintaining a steady pace rather than bursts of speed followed by hesitation develop a comfortable rhythm that allows you to maintain accuracy while gradually increasing speed over time inconsistent typing patterns often lead to more errors and can make it difficult to build the muscle memory necessary for touch typing practice typing to a metronome or background music with a steady beat to help develop this rhythmic approach",
    "specialized typing exercises can target specific weaknesses in your technique number sequences require different finger movements than letters so practicing combinations like dates phone numbers and addresses can improve your overall versatility punctuation marks and special characters are often neglected in basic typing practice but are essential for real world applications spend time practicing sentences with quotation marks apostrophes and various punctuation to become a well rounded typist these skills are particularly important for programming and professional writing tasks",
    "keyboard shortcuts and hotkeys can dramatically increase your productivity beyond basic typing skills learning common shortcuts like copy paste undo and save can eliminate the need to reach for your mouse during typing sessions this seamless integration of shortcuts with typing creates a more fluid workflow many programs have specific keyboard combinations that can perform complex tasks instantly making the effort to learn these shortcuts worthwhile for frequent computer users the time invested in learning shortcuts pays back quickly through increased efficiency",
    "different types of keyboards can affect your typing experience mechanical keyboards provide tactile feedback that many typists prefer while membrane keyboards offer quieter operation the key travel distance and force required can vary significantly between keyboard types some typists perform better on keyboards with shorter key travel while others prefer the deeper press of traditional keyboards experimenting with different keyboard types can help you find the setup that maximizes your comfort and typing speed personal preference plays a large role in keyboard selection",
    "measuring your progress is important for maintaining motivation in your typing practice words per minute is the standard measurement but accuracy percentage is equally important a typing speed of forty words per minute with ninety five percent accuracy is more valuable than sixty words per minute with eighty percent accuracy most typing tests provide both metrics allowing you to track improvement in both areas set realistic goals and celebrate small improvements rather than expecting dramatic changes overnight consistent practice with measurable goals leads to steady improvement",
    "typing skills extend far beyond simple text entry in today digital world efficient typing is essential for email communication social media interaction online research and countless other daily activities whether you are a student completing assignments a professional writing reports or someone who enjoys online gaming and chatting improved typing skills enhance your ability to express ideas quickly and accurately the investment in developing these skills pays dividends in virtually every aspect of modern life where keyboards are involved",
    "Typing is not just about pressing keys quickly but about developing muscle memory and precision over time if you aim to improve your productivity as a developer or content creator practicing daily can help you reach your goals consistent repetition builds rhythm which eventually makes typing second nature for most professionals speed is important but accuracy should never be ignored track improvement in both areas set realistic goals and celebrate small improvements rather than expecting dramatic changes overnight consistent practice with measurable goals leads to steady improvement",
    "Learning to type efficiently can transform the way you work on a computer whether you’re coding drafting emails or writing essays better typing skills mean less time spent and fewer errors begin by correcting your posture place your fingers on the home row keys and try to avoid looking at the keyboard this might be difficult at first but it is the best way to build confidence  ideas quickly and accurately the investment in developing these skills pays dividends in virtually every aspect of modern life where keyboards are involved",
    "Many people overlook the importance of proper typing technique but it plays a critical role in productivity typing with two fingers may feel natural at first but touch typing allows you to focus more on your thoughts rather than the keyboard using online tools or games can make the learning process enjoyable and help track your progress over time track improvement in both areas set realistic goals and celebrate small improvements rather than expecting dramatic changes overnight consistent practice with measurable goals leads to steady improvement",
    "Typing tests are a fun and effective way to gauge your speed and accuracy over time they challenge you to push your limits and keep your focus sharp by practicing regularly you can see noticeable improvements within just a few weeks remember not to rush in the beginning slower and more accurate typing will always lead to better long term results track improvement in both areas set realistic goals and celebrate small improvements rather than expecting dramatic changes overnight consistent practice with measurable goals leads to steady improvement",
    "The more you type the more natural it becomes your fingers begin to move automatically without needing to think about each letter this is the magic of muscle memory once you reach this stage typing becomes effortless and allows you to concentrate fully on your ideas rather than how to express them on the screen shorter key travel while others prefer the deeper press of traditional keyboards experimenting with different keyboard types can help you find the setup that maximizes your comfort and typing speed personal preference plays a large role in keyboard selection",
    "A good typist can save hours of time over the course of a week especially if their job involves writing or data entry even students can benefit from improved typing speeds when writing essays or taking online exams mastering this skill early can give you a strong advantage in both academic and professional settings  ideas quickly and accurately the investment in developing these skills pays dividends in virtually every aspect of modern life where keyboards are involved",
    "The key to fast typing is rhythm and flow try listening to the sound of your keyboard as you type it can help you maintain a consistent pace and even reduce errors some people find that typing in short bursts with breaks in between helps prevent fatigue and keeps their performance sharp over longer sessions shorter key travel while others prefer the deeper press of traditional keyboards experimenting with different keyboard types can help you find the setup that maximizes your comfort and typing speed personal preference plays a large role in keyboard selection",
    "Practicing with varied content is crucial for developing balanced typing skills avoid repeating the same sentence again and again instead type emails blogs or even song lyrics to keep things interesting the more diverse your practice material the better your brain adapts to new patterns and vocabulary shorter key travel while others prefer the deeper press of traditional keyboards experimenting with different keyboard types can help you find the setup that maximizes your comfort and typing speed personal preference plays a large role in keyboard selection",
    "Typing is a lifelong skill once you learn it properly it stays with you forever even if you stop practicing for a while the basics remain in your memory and it only takes a short time to return to your previous speed this is why it is worth investing effort into learning the right way from the beginning  ideas quickly and accurately the investment in developing these skills pays dividends in virtually every aspect of modern life where keyboards are involved shorter key travel while others prefer the deeper press of traditional keyboards experimenting with different keyboard types can help you find the setup that maximizes your comfort and typing speed personal preference plays a large role in keyboard selection",
    "Improving your typing speed takes dedication but it does not have to be boring there are many online platforms that turn typing into a game where you earn points or race against others these activities not only help improve your typing but also make the process enjoyable which increases the chances that you will stick with it shorter key travel while others prefer the deeper press of traditional keyboards experimenting with different keyboard types can help you find the setup that maximizes your comfort and typing speed personal preference plays a large role in keyboard selection"
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
    console.log("the came startes");


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
