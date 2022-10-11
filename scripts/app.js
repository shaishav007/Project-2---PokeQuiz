
    const pokeApp ={};

    /*targets the counter div*/ 
    let correctScore = 0;
    const counter = document.getElementById('streakCounter')
    pokeApp.range = 151;


    pokeApp.pokeArray = new Array();
    pokeApp.init = function(){
        // first, we fetch pokemon and populate the elements
        pokeApp.populate();

        //contact us opens pokedex
        const contactUsLink = document.querySelector(".contactUsLink");
        contactUsLink.addEventListener('click',function(){

          pokeApp.makePokedexAppear();
        });

        //settings range
        const bar = document.querySelector(".difficultyRangeMini");
        bar.addEventListener('mousemove',pokeApp.handleUpdate);

        //makers audio
        const colmButton = document.querySelector(".colm");
        const shaishavButton = document.querySelector(".shaishav");
        colmButton.addEventListener('click',pokeApp.playAudioAndDisplayText);
        shaishavButton.addEventListener('click',pokeApp.playAudioAndDisplayText);
    };

    //play audio
    pokeApp.playAudioAndDisplayText = function(e){
      // let audioToPlay = document.querySelector(audioClassName);
      const colmAudio = new Audio(src="./sounds/ColmIntro.mp3");
      const shaishavAudio = new Audio(src="./sounds/ShaishavIntro.mp3");

      const innerDisplay = document.querySelector(".innerDisplay");
      
      innerDisplay.textContent="Reach Out to "+this.className+" on Linkedin?";
      
      //create a yes button
      const yesButton = document.createElement('a');
      yesButton.textContent='Yes';
      yesButton.style.padding = `1rem`;
      yesButton.style.display = "block";

      //no button
      const noButton = document.createElement('a');
      noButton.textContent='No Thanks';
      noButton.style.padding = `1rem`;
      noButton.style.display = "block";

      if(this.className=="colm"){
        colmAudio.play();
        yesButton.href = "https://www.linkedin.com/in/colm-o-sullivan-9163baa6/";
        noButton.href='#';
        
      }
      if(this.className=="shaishav"){
        shaishavAudio.play();
        yesButton.href = "https://www.linkedin.com/in/shaishavvashi/";
        noButton.href='#';
      }
      
      innerDisplay.appendChild(yesButton);
      innerDisplay.appendChild(noButton);
    }

   pokeApp.sliderImgs = {
      'beginner': "../assets/placeHolderSprites/pichu.png",
      'intermediate': "../assets/placeHolderSprites/pikachu.png",
      'advanced': "../assets/placeHolderSprites/raichu.png"
  }

    pokeApp.handleUpdate = function(e){
      //set the css variable slider img
      //add the difficulty in label
      const label = document.querySelector(".settings label");
      label.textContent= "Difficulty :"+pokeApp.range;

      let entry = "";
      // console.log(this.value);
      if(this.value<151){
          entry = pokeApp.sliderImgs['beginner'];
          
      }
      else if(this.value<300){
          entry = pokeApp.sliderImgs['intermediate'];
          
      }
      else{
          entry= pokeApp.sliderImgs['advanced'];
      }
      document.documentElement.style.setProperty(`--sliderImg`,`url(${entry})`);
      pokeApp.range=this.value;
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

    //animation of lights
    pokeApp.animateLights = function(){
      //animation effects of light

      let i=0;
      const animation = setInterval(function(){
          document.documentElement.style.setProperty(`--blurMultiplier`,Math.random()*1.5);
          console.log("delay works",i);
      },150);
      setTimeout(()=>{clearInterval(animation)},3000);
      
    }

    //PLAY the audio of the correct Pokemon
    pokeApp.playText = function (pokeMon){
      pokeApp.animateLights();
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
          
          //display in innerdisplay
          const innerDisplay = document.querySelector(".innerDisplay");
          innerDisplay.textContent = item.descriptionText;
        }
      });
      //add a timeout before it resets
      setTimeout(() => {
        pokeApp.reset();
        pokeApp.populate();
      },3000);
    };

    pokeApp.makeSettingsAppear = function(e){
      const settingsContainer = document.querySelector('.settings');
      console.log(settingsContainer);
      settingsContainer.classList.toggle("openSettings");
    }


    pokeApp.makePokedexAppear = function(e){
      const pokedexContainer = document.querySelector('.pokedex');
      pokedexContainer.classList.toggle("openDex");
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

        //
        const settingsButton = document.querySelector(".settingsButton");
        settingsButton.addEventListener("click",pokeApp.makeSettingsAppear);
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

        const num = Math.ceil(Math.random() * pokeApp.range);

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

