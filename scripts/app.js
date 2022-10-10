// we're going to prompt the user with a question 4 options to choose from.
    // dummy question and 4 dummy answers
    // one has to be correct, others have to be incorrect.
    // dummy array: 4 objects
    // make another random generator with value 0-3
    const pokeApp ={};

    

    pokeApp.pokeArray = new Array();
    // we need to populate pokeArray with objects that have a name and image associated with them.
    

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

    //PLAY the audio of the correct Pokemon
    pokeApp.playText = function (pokeMon){
      const description = pokeMon.descriptionText;
      const utterance = new SpeechSynthesisUtterance(description);
      utterance.rate = 1;
      speechSynthesis.speak(utterance);
    }

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

          
          //find the image and set the brightness to 1
          const img = document.querySelector(".spriteContainer img");
          img.style.filter=`brightness(1)`;
        }
        
        //pokedex entry for the correct answer
        if(item.isCorrect){
          pokeApp.playText(item);
        }
      });
      //add a timeout before it resets
      setTimeout(() => {
        pokeApp.reset();
        pokeApp.populate();
      },3000);
      
    };

    pokeApp.makePokedexAppear = function(e){
      const pokedexContainer = document.querySelector('.pokedex');

      pokedexContainer.classList.toggle("open");
    }
      
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

        const pokeDexButton = document.querySelector('.submitAnswer');
        pokeDexButton.addEventListener('click',pokeApp.makePokedexAppear);
      };
      
       pokeApp.getThePokemon = async function(url){
        //write the fetch request
        const response = await fetch(url);
        const data = await response.json();
        return data;
      };
    
      //get the description
      pokeApp.getDescription = async function(url){
        //write the fetch request
        const response = await fetch(url);
        const data = await response.json();
        return data;
      };
    //PokeApp range 
    // pokeApp.range = document.querySelector('.difficultyRange').value;
    
    // writing the function to populate the image and four options.

    
    pokeApp.populate = function(){
        const indexes = [];
      for (i = 1; i <= 4; i++) {
        // console.log("Range",pokeApp.range);
        //this is flawed because it can generate the same pokemon number twice...134.4  and 134.5  will both result in vaporeon. Screenshot saved
        const num = Math.ceil(Math.random() * 151);

        //stop repeating numbers code
        //if the index array so far already has num then this i is wasted so i--
        if(indexes.includes(num)){
          i--;
        }
        else{
          //this means that num is not in the index so lets add it
          indexes.push(num);
        }
      }

      pokePromise = [];
      
        for (i = 1; i <= 4; i++) {
            
            let pokeURL = "https://pokeapi.co/api/v2/pokemon/";
            pokeURL += indexes.pop();

            //call an async function that has fetch functionality
            pokePromise.push(pokeApp.getThePokemon(pokeURL));

          
            
          }
          //pending promises been saved in the array pokePromise
          //run the promiseAll command to actually get the final array
          Promise.all(pokePromise)
                  .then((data)=>{
                    //the data contains the entire pokeApp.pokeArray
                    //for each pokemon in data fill in the proper values in pokeapp.pokeArray - name, image and isCorrect
                    data.forEach((item)=>{
                      console.log(data);
                      //call a function to shorten the code or keep this code like this
                      pokeApp.pokeArray.push({
                        'name':item.name,
                        'image':item.sprites.front_default,
                        'isCorrect':false,
                        'type':item.types[0].type.name,
                        'descriptionText':`${item.name}, ${item.types[0].type.name} type pokemon, loves to eat `
                      });
                    });
                    //our array is filled now fill buttons and image
                    pokeApp.fillMarkups();

                    //run the game
                    pokeApp.runGame();
                  });

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



