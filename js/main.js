/*
Keywords:
Javascript Game, Hangman, Word, Find, Guess, Fill, Complete, Solve, Play, IQ, Puzzle
Word Clue, Crossword Solver, Missing Letters, Word Scrabble, Scrab Word, Wordle

Description: Fill in the blanks to complete word
*/

'use strict';

// HTML Elements
const wordDisplayElem = document.getElementById("word_display") // blanks
// const wordDisplayElem = document.querySelector('.word-display'); // blanks
const keyboardElem = document.getElementById("keyboard")
// const userInputElem = document.getElementById("get_input")

const WordLengthElem = document.getElementById("word_length")
const scoreElem = document.getElementById("score")
const categoryElem = document.getElementById("category")
const healthElem = document.getElementById("health") // health, lifespan, lives, maxChance, mistakes

const hintContainerElem = document.querySelector('.hint-container')
const hintContentElem = document.querySelector('.hint-content');
const hintButton = document.querySelector('.hint-btn');
const restartButton = document.querySelector('.restart-btn'); //Give Up, Restart, Play Again, Reset

const popupContainerElem = document.querySelector('.popup-container') // popup, isOver, gameOver, gameStatus, gameDialog, 
const popupMsgElem = document.querySelector('.popup-msg');
const showAnswerElem = document.querySelector('.show-answer');
const playAgainButton = document.querySelector('.play-again');

define(["jquery", "fetch", "methods", "api"], function($, dataset, methods, api) {
    // Test Dataset
    // const dataset = new Map([
    //     ['test', 'a procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use.'],
    //     ['study', 'the time devoted by a particular person to gaining knowledge of an academic subject, typically at school, college, or university.'],
    //     ['lion', 'a large tawny-coloured cat that lives in prides, found in Africa and north-western India. The male has a flowing shaggy mane and takes little part in hunting, which is done cooperatively by the females.'],
    //   ]);
    // creating a list of words from dataset
    // const wordsList = [...dataset.keys()];
    // const wordsList = dataset.map(item => item.word);
    // const selectedWordList = methods.getRandomList(wordsList)
    // // let selectedId = [...selectedWordList.keys()]
    // selectedId = selectedWordList[0]
    // selectedWord = selectedWordList[1].toUpperCase()
    // // let selectedWord = methods.getRandomList(wordsList).toUpperCase()
    // const wordLength = selectedWord.length // wordCount
    // // const wordBlanks = "_".repeat(wordLength) // wordStatus
    // // const updatedBlanks = wordBlanks
    // methods.displayBlanks(wordBlanks)
    // const findMatchList = dataset.filter(item => item.id === selectedId)
    // const selectedCategory = methods.titleCase(findMatchList[0].category)
    // categoryElem.innerHTML = selectedCategory
    // selectedHint = findMatchList[0].hint
    // isHint = false

    let selectedId
    let selectedWord
    let selectedHint
    let isHint
    let keyboardLettersButton // keyboard button letters
    let maxChance = 7
    let mistakes
    let health
    let currentScore
    let totalScore // bestScore, highestScore
    let previousResult = false
    
    // userInputElem.focus()
    // userInputElem.select()
    // userInputElem.addEventListener('change', play)
    
    // Star game
    init('start');
    
    function init(currentState) {

        wordDisplayElem.innerHTML = ''
        document.getElementById('hangmanImages').src = './img/hangman/0.jpg';
        const randomProperty = methods.getRandomProperty(dataset)
        selectedId = randomProperty.id
        selectedWord = randomProperty.word.toUpperCase()
        const wordLength = selectedWord.length // wordCount
        const selectedCategory = randomProperty.category
        categoryElem.innerHTML = methods.titleCase(selectedCategory)
        selectedHint = randomProperty.hint
        isHint = false
        health = maxChance
        mistakes = 0
        currentScore = 0
        if (!previousResult) {
            totalScore = 0
        }
        methods.display(WordLengthElem, wordLength)
        methods.display(scoreElem, totalScore)

        console.log(selectedWord) //

        if (selectedHint === '') {
          api.getDictApiData(selectedWord).then(def => {
            if(def === undefined) {
              selectedHint = 'Sorry, there is no hint for this word. We will update it very soon.'
            }
            if (def.length > 0) {
              selectedHint = def
            }
          })
        }

        if (currentState === 'start') {
          for (const i of 'abcdefghijklmnopqrstuvwxyz') {
            const html = `<button id="${i.toUpperCase()}" class="btn btn-primary key">${i.toUpperCase()}</button>`;
            keyboardElem.insertAdjacentHTML('beforeend', html);
          }
        } else if (currentState === 'restart') {
            keyboardLettersButton.forEach(btn => {
            btn.classList.remove('disabled', 'correct', 'incorrect'); // Reset Keyboard
            methods.addClass(hintContainerElem, 'hidden') // Hide Hint
            methods.addClass(popupContainerElem, 'hidden') // Hide Popup
          });
        }

        // capturing letters div
        keyboardLettersButton = document.querySelectorAll('.key');
        
        // healthElem.textContent = health;
        methods.updateHealth(healthElem, health)

        // putting selected word
        for (let i = 0; i < selectedWord.length; i++) {
          const html = `<span class="blank" style="--i:${i+1}">_</span>`;
          wordDisplayElem.insertAdjacentHTML('beforeend', html);
        }

        // Display spaces and hyphens in blanks
        let matchedIndices
        const includeFromWords = [' ', '-']
        for (let i = 0; i < includeFromWords.length; i++) {
          matchedIndices = [...selectedWord.matchAll(new RegExp(includeFromWords[i], 'gi'))].map(a => a.index)
          if(matchedIndices.length > 0 && selectedWord.includes(includeFromWords[i])) {
            matchedIndices.forEach((val, index) => {
              if(includeFromWords[i] === ' ') {
                wordDisplayElem.children[val].textContent = String.fromCharCode(160);
              } else {
                wordDisplayElem.children[val].textContent = includeFromWords[i];
              }
              methods.addClass(wordDisplayElem.children[val], "space")
            });
          }
        }
    
      };

/*
**************************************************
**************************************************
*/
    function play() {
        let matchedIndex = selectedWord.indexOf(this.value)
        const matchedIndices = [...selectedWord.matchAll(new RegExp(this.value, 'gi'))].map(a => a.index)
        let findMatch = updatedBlanks.includes(this.value)

        if(findMatch) {
            alert("Already in the list")
        } else if(matchedIndex !== -1) {
            for (let i = 0; i < matchedIndices.length; i++) {
                updatedBlanks = methods.replaceIndex(updatedBlanks, matchedIndices[i], this.value)
            }
            methods.displayBlanks(updatedBlanks)
        } else {
            alert("Try again!")
        }

        if(selectedWord === updatedBlanks) {
            currentScore += 10
            totalScore += currentScore
            alert("You Win!")
            methods.displayScore(totalScore)
            window.location.reload()
        }
        // userInputElem.value = ''
    }
/*
**************************************************
**************************************************
*/

// show notification
const showNotif = function (msg) {
    methods.removeClass(popupContainerElem, 'hidden') // Show Popup
    showAnswerElem.textContent = selectedWord;
    popupMsgElem.textContent = `You ${msg}`;

    if(previousResult) {
        totalScore += 10
        methods.display(scoreElem, totalScore)
    }
  };
  
  // decrease life
  const decreaseLife = function () {
    health--;
    mistakes++;
    updateHangmanImage(mistakes);
    // healthElem.textContent = health;
    methods.updateHealth(healthElem, health)
      
    if (health === 0) {
      healthElem.textContent = 0;
        previousResult = false
        showNotif('lost');
    }
  };

  function updateHangmanImage(mistakes) {
    document.getElementById('hangmanImages').src = './img/hangman/' + mistakes + '.jpg';
  }

  // get multiple matching indexes of pressed letter
  // to the selected word
  const getindexes = function (letter) {
    let indexes = [];
    [...selectedWord].forEach((val, i) => {
      if (val === letter) {
        const index = i;
        indexes.push(index);
      }
    });
    //   console.log(indexes);
    return indexes;
  };
  
  // check if we get complete word
  const checkWord = function () {
    let val = true;
    for (let i = 0; i < wordDisplayElem.children.length; i++) {
      if (wordDisplayElem.children[i].textContent === '_') {
        val = false;
      }
    }
    return val;
  };
  
  // letters event listener function
  const letterPress = function () {
    const letter = this.textContent;
  
    if (selectedWord.includes(letter)) {
      const indexes_list = getindexes(letter);
      indexes_list.forEach((val, i) => {
        wordDisplayElem.children[val].textContent = this.textContent;
      });
              // new
              $("button#"+letter).addClass("correct")

      if (checkWord()) {
        previousResult = true
        showNotif('won')
      };
    } else {
      decreaseLife();
        // new
      $("button#"+letter).addClass("incorrect")

    }
    this.classList.add('disabled');
  };
  
  // Listening to virtual keyboard's button press
  keyboardLettersButton.forEach(btn => {
    btn.addEventListener('click', letterPress);
  })

  // Listening to physical keyboard's button press
  document.addEventListener("keydown", (event) => {
    if(methods.lettersOnly(event) && popupContainerElem.classList.contains('hidden') && !$('#' + event.key.toUpperCase()).hasClass('disabled')) {
        // console.log(event.key.toUpperCase())
        $("#" + event.key.toUpperCase()).click()
    }
  })

  // Listening to hint button
  hintButton.addEventListener('click', function () {
    if(isHint) {
        methods.addClass(hintContainerElem, 'hidden') // Hide Hint
        isHint = false
    } else {
        methods.removeClass(hintContainerElem, 'hidden') // Show Hint
        // hintContentElem.textContent = dataset.get(selectedWord)
        hintContentElem.textContent = selectedHint
        isHint = true
    }
  })

  // Listening to Reset / Give Up button
  restartButton.addEventListener('click', function () {
    previousResult = false
    // display popup again with selected word
    init('restart')
  })

  // $('.play-again').on('click', function() {
  //   init('restart')
  // })
  // Listening to Play Again / Next Word button when a round completed
  playAgainButton.addEventListener('click', function () {
    init('restart')
  })
  
})