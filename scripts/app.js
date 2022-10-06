// we're going to prompt the user with a question 4 options to choose from.
    // dummy question and 4 dummy answers
    // one has to be correct, others have to be incorrect.
    // dummy array: 4 objects
    // make another random generator with value 0-3
    const pokeApp ={};
    pokeApp.pokeArray = new Array();
    // we need to populate pokeArray with objects that have a name and image associated with them.
    pokeApp.saveNameAndImage = function (data) {
        // add pokemon object to pokeArray
        pokeApp.pokeArray.push({
            "name": data.name,
            "image": data.sprites.front_default,
            // by default it should be the wrong answer.
            // we will generate one correct answer and set the below property to true. Leaving ONE correct answer.
            "isCorrect":false
        });
        // const name = data.name;
        
      };
    pokeApp.init = function(){
        // first, we fetch pokemon and populate the elements
        pokeApp.populate();
        
    };

    //this function should run only after all the markups have been filled
    pokeApp.runGame=function(){
      //figure out a correct answer
      const randomCorrectAnswer = Math.floor(Math.random()*4);
      // console.log(randomCurrentAnswer);

      //now we gotta get all the buttons inside the quizOptions list, the code below should give us a nodelist of 4 elements.
      const buttonList = document.querySelectorAll(".quizOptions button"); 
      
      //correct button is going to be the randomCurrentAnswer index of that nodelist
      const correctAnswerButton = buttonList[randomCorrectAnswer];
      const correctPokemon = correctAnswerButton.textContent;
//      console.log(correctPokemon);

      //now that we have the correct answer here we will find its image and put it in the imageContainer
      pokeApp.pokeArray.forEach((item)=>{
        //so for each item in pokeArray check if its name is the same as correctPokemon
        //if yes then display its picture 
        if(item.name == correctPokemon){
          //now we know that this is the right item so we will select its isCorrect to true and use its picture
          item.isCorrect = true;
          
          //get the imageContainer
          const spriteContainer = document.querySelector(".spriteContainer");
          const correctImg = document.createElement('img');
          correctImg.src=item.image;
          //after we are done we gotta fill in the code below with its alt text which will be a mixture of type and abilities, attacks, something a combination
          //correctImg.alt="";
          spriteContainer.appendChild(correctImg);

        }
      });



      //NOW that everything has added lets setup the eventListeners
      buttonList.forEach((item)=>{
        //add an event listener for click events
        item.addEventListener('click',pokeApp.checkAnswer);
      });
    };

    //reset function called after the click has been done
    pokeApp.reset =function(){
      //empty the array and all the list elements
      const quizOptions = document.querySelector(".quizOptions");
      const spriteContainer = document.querySelector(".spriteContainer");
      quizOptions.innerHTML="";
      spriteContainer.innerHTML="";

      pokeApp.pokeArray=[];
    };

    pokeApp.checkAnswer=function(e){
      // console.log(this.textContent);
      const selectedPokemon = this.textContent;

      //we go back to pokeapp.pokearray and findout if this pokemon has a isCorrect set to true. 

      pokeApp.pokeArray.forEach((item)=>{
        if(item.name==selectedPokemon){
          if(item.isCorrect){
            console.log('rightAnswer');
          }
          else{
            console.log("wrongAnswer");
          }
          
        }
      });
      pokeApp.reset();
      pokeApp.populate();
    };
      
      pokeApp.fillMarkups = function (){
        pokeApp.pokeArray.forEach((item) => {
            // console.log(item);
            //create a button for each item
            const optionButton  =  document.createElement("button");
            //add the text here
            optionButton.textContent = item.name;
            //maybe add a class later here

            //add this button to the ul with a class quizOptions
            const quizOptions = document.querySelector(".quizOptions");
            quizOptions.appendChild(optionButton);
        });
      };
      
    // writing the function to populate the image and four options.
    pokeApp.populate = function(){
        const indexes = [];
      for (i = 1; i <= 4; i++) {
        //this is flawed because it can generate the same pokemon number twice...134.4  and 134.5  will both result in vaporeon. Screenshot saved
        const num = Math.ceil(Math.random() * 150);
        indexes.push(num);
      }
        for (i = 1; i <= 4; i++) {
            
            let pokeURL = "https://pokeapi.co/api/v2/pokemon/";
            pokeURL += indexes.pop();
            fetch(pokeURL)
              .then((response) => {
                return response.json();
                
              })
              .then((data) => {
                pokeApp.saveNameAndImage(data);
                if(pokeApp.pokeArray.length==4){
                    pokeApp.fillMarkups();
                    //now that the markups are filled, every option so wrong, lets select a correct answer and then set up the game accordingly
                    pokeApp.runGame();
                  };
              }); 
          }
    };
    

    pokeApp.init();

    // buttons
    // based on our correctAnswer, we append to the DOM an image and a name to one button, we also
    // append the remaining 3 names to our buttons from the array.




// The user should select an option and then be told if they are correct.
// final version will be fancier than this.
// an array with 4 values that we generate randomly.
// assign one to be correct, three to be wrong. 
// tally input at bottom, 
// after user selects their answer, a new question is generated.



