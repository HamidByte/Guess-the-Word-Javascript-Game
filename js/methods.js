define(["jquery"], function($) {
    
    let methods = {}

    methods.getRandom = function(list) {
        let randomNumber = Math.floor(Math.random() * list.length)
        // return new Map([
        //     [randomNumber, list[randomNumber]]
        // ])
        return [randomNumber, list[randomNumber]]
    }

    methods.display = function(elem, value) {
        elem.innerHTML = value
    }

    methods.addClass = function(elem, value) {
        // elem.style.display = "block"
        elem.classList.add(value)
    }

    methods.removeClass = function(elem, value) {
        // elem.style.display = "none"
        elem.classList.remove(value);
    }

    // methods.displayWordLength = function(length) {
    //     WordLengthElem.innerHTML = length
    // }
    
    methods.displayBlanks = function(blanks) {
        wordDisplayElem.innerHTML = blanks.split('').join(' ')
    }
    
    // methods.displayScore = function(score) {
    //     if(score === undefined) {
    //         scoreElem.innerHTML = 0
    //     } else {
    //         scoreElem.innerHTML = score
    //     }
    // }

    methods.replaceIndex = function(string, at, replace) {
        return string.replace(/\S/g, function(match, i) {
             if( i === at ) return replace
             return match
         })
     }
     methods.titleCase = function(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
          str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
        }
        return str.join(' ');
      }

    return methods
})