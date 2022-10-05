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

      pokeApp.fillMarkups = function (){
        // first we have to fill 4 buttons with 4 pokemon names, then add them to ul.Then figure out which one is right and then display the image of that pokemon. After this is set up, we set up event listeners.
        // option button is a new button that we've created.
        // const optionButton = document.createElement('button');
        // // we will have to get the right pokemon from pokeArray.
        // optionButton.innerText=pokeApp.pokeArray[0].name;
        // console.log(optionButton)
        // trying a forEach approach here. forEach pokemon in pokeArray generate one button with thier name.
    
    //    pokeApp.pokeArray =  Array.from(pokeApp.pokeArray)
    //    console.log(typeof(pokeApp.pokeArray))
        pokeApp.pokeArray.forEach((item) => {
            console.log(item);
        });
        // console.log(pokeApp.pokeArray);
        // console.log(pokeApp);
      };
      
    // writing the function to populate the image and four options.
    pokeApp.populate = function(){
        const indexes = [];
      for (i = 1; i <= 4; i++) {
        //generate 1 random number
        const num = Math.ceil(Math.random() * 150);
        // push these to the pokeArray array.
        indexes.push(num);
      }
        for (i = 1; i <= 4; i++) {
            // putting the API URL into a variable that can change based on the numbers we feed to it from the array.
            let pokeURL = "https://pokeapi.co/api/v2/pokemon/";
            // we feed the array to the url, this adds a number at the end of the url (example:https://pokeapi.co/api/v2/pokemon/150 fetchs all info it has on Metwo). 
            pokeURL += indexes.pop();
            fetch(pokeURL)
              .then((response) => {
                return response.json();
                //at this stage, the loop is returning the data that we can more easily parse through, and returning specific data on the four numbers from he array. To continue from the earlier example, we can now see that 150 returns Mewtwo and all associated info of that pokemon.
              })
              .then((data) => {
                // call the name extractor function here
                pokeApp.saveNameAndImage(data);
                // the function below has the code to fill the buttons and the image tag.
              });
              pokeApp.fillMarkups(pokeApp.pokeArray);
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



