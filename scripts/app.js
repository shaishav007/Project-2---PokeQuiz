
const pokeApp ={};

/*targets the counter div*/ 
let correctScore = 0;
const counter = document.getElementById('streakCounter')
pokeApp.range = 151;


pokeApp.pokeArray = new Array();
pokeApp.init = function(){
    pokeApp.populate();
    const bar = document.querySelector(".difficultyRangeMini");
    bar.addEventListener('mousemove',pokeApp.handleUpdate);
};

pokeApp.sliderImgs = {
  'beginner': "../assets/placeHolderSprites/pichu.png",
  'intermediate': "../assets/placeHolderSprites/pikachu.png",
  'advanced': "../assets/placeHolderSprites/raichu.png"
};

pokeApp.handleUpdate = function(){
  const label = document.querySelector(".settings label");
  label.textContent= "Difficulty :"+pokeApp.range;
  let entry = "";
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

    /*figure out a correct answer*/
pokeApp.runGame=function(){
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
  buttonList.forEach((item)=>{
    item.addEventListener('click',pokeApp.checkAnswer);
  });
};

/*empty the array and all the list elements. reset function called after the click has been done*/
pokeApp.reset =function(){
  const quizOptions = document.querySelector(".quizOptions");
  const spriteContainer = document.querySelector(".spriteContainer");
  quizOptions.innerHTML="";
  spriteContainer.innerHTML="";
  pokeApp.pokeArray=[];
};

/*animation effects of lights*/
pokeApp.animateLights = function(){
  let i=0;
  const animation = setInterval(function(){
      document.documentElement.style.setProperty(`--blurMultiplier`,Math.random()*1.5);
  },150);
  setTimeout(()=>{clearInterval(animation)},4000);
}

/*Play the audio of the correct Pokemon*/
pokeApp.playText = function (pokeMon){
  pokeApp.animateLights();
  const description = pokeMon.descriptionText;
  const utterance = new SpeechSynthesisUtterance(description);
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

pokeApp.checkAnswer=function(){
  const selectedPokemon = this.textContent;
  pokeApp.pokeArray.forEach((item)=>{
    if(item.name==selectedPokemon){
      if(item.isCorrect){
        correctScore ++
        counter.textContent= correctScore;
      }
      else{
        alert(`You achieved a streak of ${correctScore}.`)
        correctScore -= correctScore
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
  /*Timer to delay reset, allows text to speech to complete.*/
  setTimeout(() => {
    pokeApp.reset();
    pokeApp.populate();
  },4000);
};

/*makes difficulty settings appear*/ 
pokeApp.makeSettingsAppear = function(){
  const settingsContainer = document.querySelector('.settings');
  settingsContainer.classList.toggle("openSettings");
}

/*Makes pokedex slider appear.*/ 
pokeApp.makePokedexAppear = function(){
  const pokedexContainer = document.querySelector('.pokedex');
  pokedexContainer.classList.toggle("openDex");
}

pokeApp.fillMarkups = function (){
  pokeApp.pokeArray.forEach((item) => {
      const optionButton  =  document.createElement("button");
      optionButton.textContent = item.name;
      const quizOptions = document.querySelector(".quizOptions");
      quizOptions.appendChild(optionButton);
  });
  const pokeDexButton = document.querySelector('.submitAnswer');
  pokeDexButton.addEventListener('click',pokeApp.makePokedexAppear);
  const settingsButton = document.querySelector(".settingsButton");
  settingsButton.addEventListener("click",pokeApp.makeSettingsAppear);
};

pokeApp.getThePokemon = async function(url){
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

pokeApp.getDescription = async function(url){
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
    
pokeApp.populate = function(){
  const indexes = [];
  for (i = 1; i <= 4; i++) {
    const num = Math.ceil(Math.random() * pokeApp.range);
    /*Stop repeating numbers code.Once it's determined the number isn't repeated, it's pushed.*/
    if(indexes.includes(num)){
      i--;
    }
    else{
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
        data.forEach((item)=>{
          pokeApp.pokeArray.push({
            'name':item.name,
            'image':item.sprites.front_default,
            'isCorrect':false,
            'type':item.types[0].type.name,
            'descriptionText':`${item.name}, ${item.types[0].type.name} type pokemon, ID number ${item.id} `
          });
        });
        pokeApp.fillMarkups();
        pokeApp.runGame();
      });
};

pokeApp.init();

