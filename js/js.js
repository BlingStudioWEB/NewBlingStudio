window.onload = startUp();
window.onload = start();

function startUp(){
  var elems = document.querySelectorAll('.holder');
  var len = elems.length;
  for (var i = 0; i < len; i++ ){
    elem = elems[i];
    elem.classList.add('inactive');
  }

  elems = document.querySelectorAll('#controll .controllDot');
  len = elems.length;
  for (var i = 0; i < len; i++ ){
    elem = elems[i];
    if(i==0){
      elem.classList.add('dotActive');
    }
    else {
      elem.classList.add('dotInactive');
    }
  }


  return false;
}

function start(){ //Start settings
  var activePage = 2;
  var isAnimating = false;

  function scroll(dir) {

    if (dir == 'down') {

        nextPage();

    }
    else {

        prevPage();

    }

    return false;

  }

  window.addEventListener('mousewheel', function(e){

      wDelta = e.wheelDelta < 0 ? 'down' : 'up'; //Checking scroll direction
      if(isAnimating==false){
        scroll(wDelta);
      }

    },{passive:true}); //Scroll Event

  document.onkeydown = function(evt) {
      evt = evt || window.event;
      if(isAnimating==false){
        switch (evt.keyCode) {
            case 37:
                scroll('up');
                break;
            case 38:
                scroll('up');
                break;
            case 39:
                scroll('down');
                break;
            case 40:
                scroll('down');
                break;
        }
      }
  };

  function nextDot(pg){
    var aPage = pg-1;
    var dot ='#controll .dotContainer:nth-of-type('+ aPage + ') .controllDot';
    var item = document.querySelector(dot);
    item.classList.add('dotActive');
    item.classList.remove('dotInactive');

    return false;
  }

  function prevDot(pg){
    var aPage = pg-1;
    var dot ='#controll .dotContainer:nth-of-type('+ aPage + ') .controllDot';
    var item = document.querySelector(dot);
    item.classList.remove('dotActive');
    item.classList.add('dotInactive');

    return false;
  }

  function nextPage(){

    isAnimating = true;
    setTimeout(function(){ isAnimating = false; }, 900); //Preventing animation spam

    if(activePage>6){
      activePage = 6;
    }                 //Setting maximum pages number

    var ex = '.holder:nth-of-type('+ activePage + ')';
    document.querySelector(ex).classList.add('before'); //Adding 'before' class

    prevDot(activePage);

    activePage++;
    ex = '.holder:nth-of-type('+ activePage + ')';
    var item = document.querySelector(ex);
    item.classList.add('active');
    item.classList.remove('inactive'); //Adding 'active' class

    nextDot(activePage);

  }

  function prevPage(){
    var activeDot = activePage - 1;

    isAnimating = true;
    setTimeout(function(){ isAnimating = false; }, 900); //Preventing animation spam

    if(activePage<3){
      activePage = 3;
    }                 //Setting maximum pages number

    var ex = '.holder:nth-of-type('+ activePage + ')';
    var item = document.querySelector(ex);
    item.classList.remove('active');
    item.classList.add('inactive'); //Adding 'inactive' class

    prevDot(activePage);

    activePage--;
    ex = '.holder:nth-of-type('+ activePage + ')';
    document.querySelector(ex).classList.remove('before'); //Removing 'before' class

    nextDot(activePage);


    return false;
  }
  
  var controllDots = document.querySelectorAll(".dotContainer .controllDot");
    for(var i = 2; i < 8; i++){
    
      controllDots[i-2].addEventListener('click',(function (i) {
          return function () {
            buttonMenu(i);
          };
        }(i)));
  }
    
  var dotContainer = document.querySelectorAll(".dotContainer");
    for(var i = 1; i < 7; i++){
    
      dotContainer[i-1].addEventListener('mouseenter',(function (i) {
          return function () {
            showMAdnotation(i);
          };
        }(i)));
        
        dotContainer[i-1].addEventListener('mouseleave',(function (i) {
          return function () {
            hideMAdnotation(i);
          };
        }(i)));
  }
    
  function showMAdnotation(elem){
      var dot = ".dotContainer:nth-of-type(" + elem + ") p";
      console.log(elem);
      document.querySelector(dot).style = "height: 32px; width: auto;";
  } 
  function hideMAdnotation(elem){
      var dot = ".dotContainer:nth-of-type(" + elem + ") p";
      console.log(elem);
      document.querySelector(dot).style = "height: 0; width: 0;";
  }    
    
  function buttonMenu(nr){

    var pages = nr - activePage;
    if (pages > 0){
      for(var i = 0; i < pages; i++){
        nextPage()
      }
    }
    else if(pages < 0){
      pages = pages * -1;
      for(var i = 0; i < pages; i++){
        prevPage()
      }
    }
  } //Gets 'nr' from HTML
}
