define(["jquery"], function($) {
    
    let methods = {}

    // Get random list containing id and word
    methods.getRandom = function(list) {
        let randomNumber = Math.floor(Math.random() * list.length)
        // return new Map([
        //     [randomNumber, list[randomNumber]]
        // ])
        return [randomNumber, list[randomNumber]]
    }

    // Accept letters only
    methods.lettersOnly = function(event) {
        var charCode = event.keyCode
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8) {
          return true
        } else {
          return false
        }
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
    
    // methods.displayBlanks = function(blanks) {
    //     wordDisplayElem.innerHTML = blanks.split('').join(' ')
    // }
    
    // methods.displayScore = function(score) {
    //     if(score === undefined) {
    //         scoreElem.innerHTML = 0
    //     } else {
    //         scoreElem.innerHTML = score
    //     }
    // }

    methods.updateHealth = function(elem, health) {
        elem.textContent = '';
        for (let i = 0; i < health; i++) {
            const html = `<i class="fa-solid fa-heart"></i>`;
            elem.insertAdjacentHTML('beforeend', html)
          }
    }

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