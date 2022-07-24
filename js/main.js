/*
Keywords:
Hangman
Word, Find, Guess, Fill, Complete, Solve
Play, IQ, Puzzle

Examples:
Word Scrabble
Scrab Word
Wordle

Description: Fill in the blanks to complete word

Suggestions:
Guess Fill Find
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
const lifespanElem = document.getElementById("lifespan") // health, lifespan, lives, maxChance, mistakes

const hintContainerElem = document.querySelector('.hint-container')
const hintContentElem = document.querySelector('.hint-content');
const hintButton = document.querySelector('.hint-btn'); //
const restartButton = document.querySelector('.restart-btn'); //Give Up, Restart, Play Again, Reset

const popupContainerElem = document.querySelector('.popup-container') // isOver, popup, popover, gameStatus, gameDialog, 
const popupMsgElem = document.querySelector('.popup-msg');
const showAnswerElem = document.querySelector('.show-answer');
const playAgainButton = document.querySelector('.play-again');

define(["jquery", "fetch", "methods", "modals"], function($, dataset, methods, modals) {

    // $('#test_button').on('click', function() {
        // modals.gameStatusModal();
    // })
     $('.play-again').on('click', function() {
        init('restart')
    })

    $('a.modal-trigger').trigger("click")
    
    $('a.modal-trigger').click(function(e) {
        var target = $(this).attr('href');
        // $(target).addClass('j-modal--open');
        console.log(target)
    });

    // Test Dataset
    // const dataset = new Map([
    //     ['test', 'a procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use.'],
    //     ['study', 'the time devoted by a particular person to gaining knowledge of an academic subject, typically at school, college, or university.'],
    //     ['lion', 'a large tawny-coloured cat that lives in prides, found in Africa and north-western India. The male has a flowing shaggy mane and takes little part in hunting, which is done cooperatively by the females.'],
    //   ]);
    // const wordsList = ['government', 'ostrich', 'history', 'literature', 'knowledge', 'society', 'temperature', 'community', 'management', 'equipment', 'strategy', 'university', 'medicine', 'success', 'moment', 'customer', 'opinion']

    // creating a list of words from dataset
    // const wordsList = [...dataset.keys()];
    const wordsList = dataset.map(item => item.word);
    let selectedId
    let selectedWord
    let hint
    let isHint
    let keyboardLettersButton // keyboard button letters
    let maxChance = 5
    let mistakes = 0
    let lifespan
    let currentScore
    let totalScore
    let previousResult = false
    
    // userInputElem.focus()
    // userInputElem.select()
    // userInputElem.addEventListener('change', play)
    // methods.displayBlanks(wordBlanks)

    document.addEventListener("keydown", (e) => {
        if(popupContainerElem.classList.contains('hidden')) {
            if(e.key.replace(/[^a-zA-Z]+/g, '')) {
                // console.log(e.key)
                $("#" + e.key).click()
            }
        }
    })

    // Star game
    init('start');
    
    function init(currentState) {

        wordDisplayElem.innerHTML = ''
        document.getElementById('hangmanImages').src = './img/0.jpg';
        const selectedWordList = methods.getRandom(wordsList)
        // let selectedId = [...selectedWordList.keys()]
        selectedId = selectedWordList[0]
        selectedWord = selectedWordList[1]
        // let selectedWord = methods.getRandom(wordsList)
        const wordLength = selectedWord.length // wordCount
        // const wordBlanks = "_".repeat(wordLength) // wordStatus
        // const updatedBlanks = wordBlanks
        const findMatchList = dataset.filter(item => item.id === selectedId)
        const category = methods.titleCase(findMatchList[0].category)
        categoryElem.innerHTML = category
        hint = findMatchList[0].hint
        isHint = false
        lifespan = maxChance
        mistakes = 0
        currentScore = 0
        if(!previousResult) {
            totalScore = 0
        }
        
        console.log(selectedWord)

        methods.display(WordLengthElem, wordLength)
        methods.display(scoreElem, totalScore)

        if (currentState === 'start') {
          for (const i of 'abcdefghijklmnopqrstuvwxyz') {
            const html = `<button id="${i}" class="btn btn-primary key">${i.toUpperCase()}</button>`;
            keyboardElem.insertAdjacentHTML('beforeend', html);
          }
        } else if (currentState === 'restart') {
            keyboardLettersButton.forEach(btn => {
            btn.classList.remove('disabled', 'correct', 'incorrect');
            methods.addClass(hintContainerElem, 'hidden') // Hide Hint
            methods.addClass(popupContainerElem, 'hidden') // Hide Popup
          });
        }

        // capturing letters div
        keyboardLettersButton = document.querySelectorAll('.key');
        
        // lifespanElem.textContent = lifespan;
        lifespanElem.textContent = '';
        for (let i = 0; i < lifespan; i++) {
            const html = `<i class="fa-solid fa-heart"></i>`;
            lifespanElem.insertAdjacentHTML('beforeend', html)
          }
        
        // putting selected word
        for (let i = 0; i < selectedWord.length; i++) {
          const html = `<span class="blank" style="--i:${i+1}">_</span>`;
          wordDisplayElem.insertAdjacentHTML('beforeend', html);
        }
      };

/*
**************************************************
**************************************************
*/
    function play() {
        let findIndex = selectedWord.indexOf(this.value)
        const findIndexes = [...selectedWord.matchAll(new RegExp(this.value, 'gi'))].map(a => a.index)
        let findMatch = updatedBlanks.includes(this.value)

        if(findMatch) {
            alert("Already in the list")
        } else if(findIndex !== -1) {
            for (let i = 0; i < findIndexes.length; i++) {
                updatedBlanks = methods.replaceIndex(updatedBlanks, findIndexes[i], this.value)
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
    
    // lives = 3;
  };
  
  // decrease life
  const decreaseLife = function () {
    lifespan--;
    mistakes++;
    updateHangmanImage(mistakes);
    //   console.log(lives);
    // lifespanElem.textContent = lifespan;
    lifespanElem.textContent = '';
    for (let i = 0; i < lifespan; i++) {
        const html = `<i class="fa-solid fa-heart"></i>`;
        lifespanElem.insertAdjacentHTML('beforeend', html)
      }
      
    if (lifespan === 0) {
        lifespanElem.textContent = 0;
        previousResult = false
        showNotif('lost');
    }
  };

  function updateHangmanImage(mistakes) {
    document.getElementById('hangmanImages').src = './img/' + mistakes + '.jpg';
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
    const letter = this.textContent.toLowerCase();
  
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
  
  // listening to letter buttons presses
  keyboardLettersButton.forEach(btn => {
    btn.addEventListener('click', letterPress);
  });
  
  // Listening to hint btn
  hintButton.addEventListener('click', function () {
    if(isHint) {
        methods.addClass(hintContainerElem, 'hidden') // Hide Hint
        isHint = false
    } else {
        methods.removeClass(hintContainerElem, 'hidden') // Show Hint
        // hintContentElem.textContent = dataset.get(selectedWord);
        hintContentElem.textContent = hint;
        isHint = true
    }
  });
  
  // listening to reset btn
  restartButton.addEventListener('click', function () {
    previousResult = false
    // display popup again with selected word
    init('restart');
  });
  
  // listening to play again button
  playAgainButton.addEventListener('click', function () {
    init('restart');
  });
  
})


