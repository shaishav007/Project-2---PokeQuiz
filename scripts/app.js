
// const pokeApp ={};

// const pokeArray = [];
//       for (i = 1; i <= 4; i++) {
//         //generate 1 random number
//         const num = Math.ceil(Math.random() * 150);
//         // push these to the pokeArray array.
//         pokeArray.push(num);
//       }



// pokeApp.init = function(){
//     // query the pokemone API
//     pokeApp.getName();
//     pokeApp.getSprite();
// }

// pokeApp.init();

// we're going to prompt the user with a question 4 options to choose from.
    // dummy question and 4 dummy answers
    // one has to be correct, others have to be incorrect.
    // dummy array: 4 objects
    // make another random generator with value 0-3
    a=[55,66,77,88,];
    correctAnswer= Math.floor(Math.random() * 4);
    console.log(a[correctAnswer]);
    console.log(correctAnswer);

    const question = document.createElement("p");
    question.textContent="pokemon?"

    

    // buttons
    const buttonOne = document.createElement("button")
    buttonOne.textContent= a[0];

    const buttonTwo = document.createElement("button")
    buttonTwo.textContent=a[1];

    const buttonThree = document.createElement("button")
    buttonThree.textContent= a[2];

    const buttonFour = document.createElement("button")
    buttonFour.textContent=a[3];

    // On click of button, check if value === correctAnswer
    buttonOne.addEventListener('click',function(){
        console.log(this.textContent);
    })
    
    const gameSection = document.querySelector('.buttonBoard');
    gameSection.appendChild(buttonOne);
    gameSection.appendChild(buttonTwo);
    gameSection.appendChild(buttonThree);
    gameSection.appendChild(buttonFour);
    // based on our correctAnswer, we append to the DOM an image and a name to one button, we also
    // append the remaining 3 names to our buttons from the array.




// The user should select an option and then be told if they are correct.
// final version will be fancier than this.
// an array with 4 values that we generate randomly.
// assign one to be correct, three to be wrong. 
// tally input at bottom, 
// after user selects their answer, a new question is generated.



