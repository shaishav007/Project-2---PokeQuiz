/*Code for the function of the Pokedex begins here*/ 
const pokeApp ={};
let correctScore = 0;
const counter = document.getElementById('streakCounter')
pokeApp.pokeArray = new Array();

pokeApp.init = function(){
    pokeApp.populate();
};

/*this function randomly assigns a name to a button, while keeping track of correct/incorrect selections*/
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

/*reset function called after the click has been done*/
pokeApp.reset =function(){
  //empty the array and all the list elements
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

/*This function checks if the input is correct/incorrect and tabulates the streak.*/ 
pokeApp.checkAnswer=function(e){
  const selectedPokemon = this.textContent;
  e.preventDefault()
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
    }
  });
  //add a timeout before it resets
  setTimeout(() => {
    pokeApp.reset();
    pokeApp.populate();
  },4000);
};

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
  // const pokeDexButton = document.querySelector('.submitAnswer');
  // pokeDexButton.addEventListener('click',pokeApp.makePokedexAppear);
};

pokeApp.getThePokemon = async function(url){
  //write the fetch request
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/*get the description*/
pokeApp.getDescription = async function(url){
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
    
pokeApp.populate = function(){
    const indexes = [];
  for (i = 1; i <= 4; i++) {
    const num = Math.ceil(Math.random() * 151);
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
          /*the data contains the entire pokeApp.pokeArray. For each pokemon in data fill in the proper values in pokeapp.pokeArray - name, image and isCorrect*/
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
          //run the game
          pokeApp.runGame();
        });
    };


    pokeApp.init();
    
    /*MODAL SCRIPT*/ 
    var modalBtns = document.querySelectorAll(".modalOpen");

    modalBtns.forEach(function(btn) {
      btn.onclick = function() {
        var modal = btn.getAttribute("data-modal");
        document.getElementById('modal').style.display = "block";
      };
    });
    
    var closeBtns = document.querySelectorAll('.modalClose');
    
    closeBtns.forEach(function(btn) {
      btn.onclick = function(){
        var modal = (btn.closest(".modal").style.display="none");
      };
    });
    
    window.onclick = function(event){
        if(event.target.className === 'modal'){
            event.target.style.display = "none";
        }
    }



