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
        pokeApp.pokeArray.forEach((item) => {
            console.log(item);
        });
      };
      
    // writing the function to populate the image and four options.
    pokeApp.populate = function(){
        const indexes = [];
      for (i = 1; i <= 4; i++) {
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
                    pokeApp.fillMarkups(pokeApp.pokeArray);
                  };
              }); 
              //pokeApp.pokeArray needs data from the website to fill but the code below does not need that array to have data. so right now the length is still 0. The data hasn't come  yet. How do we make sure that the data is in? We move this statement inside the .then -> coz at some point we know that that array is going to end up being filled inside that bracket. 
              // if(pokeApp.pokeArray.length==4){
              //   pokeApp.fillMarkups(pokeApp.pokeArray);
              // };
              
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



