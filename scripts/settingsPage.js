const settings = {};
    settings.range=0;
    settings.sliderImgs = {
    'beginner': "../assets/placeHolderSprites/pichu.png",
    'intermediate': "../assets/placeHolderSprites/pikachu.png",
    'advanced': "../assets/placeHolderSprites/raichu.png"
}

settings.handleUpdate = function(e){
    console.log(settings.range)
    //set the css variable slider img
    let entry = "";
    if(this.value<151){
        entry = settings.sliderImgs['beginner'];
        
    }
    else if(this.value<300){
        entry = settings.sliderImgs['intermediate'];
        
    }
    else{
        entry= settings.sliderImgs['advanced'];
    }
    document.documentElement.style.setProperty(`--sliderImg`,`url(${entry})`);
    settings.range=this.value;
};

settings.init = function(){
    settings.bar = document.querySelector(".difficultyRange");
    settings.bar.addEventListener('mousemove',settings.handleUpdate);
    //once the Go button is clicked, then initialise this.
  };
      
settings.init();