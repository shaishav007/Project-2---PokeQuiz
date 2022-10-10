
    const pokeApp ={};
    /*targets the counter div*/ 
    let correctScore = 0;
    const counter = document.getElementById('streakCounter')

    pokeApp.pokeArray = new Array();
    pokeApp.init = function(){
        // first, we fetch pokemon and populate the elements
        pokeApp.populate();
    };

    //this function should run only after all the markups have been filled
    pokeApp.runGame=function(){
      //figure out a correct answer
      const randomCorrectAnswer = Math.floor(Math.random()*4);
      const buttonList = document.querySelectorAll(".quizOptions button"); 
      const correctAnswerButton = buttonList[randomCorrectAnswer];
      const correctPokemon = correctAnswerButton.textContent;
      pokeApp.pokeArray.forEach((item)=>{
        if(item.name == correctPokemon){
          item.isCorrect = true;
          const spriteContainer = document.querySelector(".spriteContainer");
          const correctImg = document.createElement('img');
          correctImg.src=item.image;
          spriteContainer.appendChild(correctImg);
        }
      });


      //NOW that everything has added lets setup the eventListeners
      buttonList.forEach((item)=>{
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
      const selectedPokemon = this.textContent;
      pokeApp.pokeArray.forEach((item)=>{
        if(item.name==selectedPokemon){
          if(item.isCorrect){
            console.log('rightAnswer');
            correctScore ++
            counter.textContent= correctScore;
        console.log(correctScore)
          }
          else{
            console.log("wrongAnswer");
            alert(`You achieved a streak of ${correctScore}.`)
            correctScore -= correctScore
            console.log(correctScore)
            counter.textContent= correctScore;
            
            
          }
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
            //create a button for each item
            const optionButton  =  document.createElement("button");
            //add the text here
            optionButton.textContent = item.name;
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
        const response = await fetch(url);
        const data = await response.json();
        return data;
      };
    
    pokeApp.populate = function(){
        const indexes = [];
      for (i = 1; i <= 4; i++) {
        const num = Math.ceil(Math.random() * 150);
        //stop repeating numbers code
        if(indexes.includes(num)){
          i--;
        }
        else{
          /*Once it's determined the number isn't repeated, it's pushed.*/
          indexes.push(num);
        }
      }

      pokePromise = [];

        for (i = 1; i <= 4; i++) {
            let pokeURL = "https://pokeapi.co/api/v2/pokemon/";
            pokeURL += indexes.pop();
            pokePromise.push(pokeApp.getThePokemon(pokeURL));
          }
          Promise.all(pokePromise)
                  .then((data)=>{
                    //the data contains the entire pokeApp.pokeArray
                    //for each pokemon in data fill in the proper values in pokeapp.pokeArray - name, image and isCorrect
                    data.forEach((item)=>{
                      console.log(data);
                      pokeApp.pokeArray.push({
                        'name':item.name,
                        'image':item.sprites.front_default,
                        'isCorrect':false,
                        'type':item.types[0].type.name,
                        'descriptionText':`${item.name}, ${item.types[0].type.name} type pokemon, ID number ${item.id} `
                      });
                    });
                    pokeApp.fillMarkups();
                    //run the game
                    pokeApp.runGame();
                  });
          
        
    };
    

    pokeApp.init();

