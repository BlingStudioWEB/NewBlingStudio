window.onload = startUp();
window.onload = start();
window.onload = loader();
window.onload = msgPopUp();

var mobile = false;
var contactPage = false;

function startUp(){
    var vw = window.innerWidth;    
    if(vw>=991){
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
        return true;
    }
    else{
        document.querySelector("body").classList.add("mobile");
        return false;
        
    }
}

function start(){ //Start settings
    var vw = window.innerWidth;
    
    document.querySelector("#contact #bubbleClose").onclick = function() { 
         var bubble = document.querySelector("#contact #bubble");
         bubble.classList.remove('bubbleFadeIn');
         bubble.classList.add('bubbleFadeOut');
         document.querySelector("#contact #contactCircle").classList.remove('shake');
     };
    
    document.querySelector("#contact #contactCircle").onclick = contactPageShow;
    
    if(vw>=991){
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

            function resize(){
            var vw = window.innerWidth;
                if(vw<991){

                }
                else{

                }
            }//RESIZE

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
              var p = ".dotContainer:nth-of-type(" + elem + ") p";
              document.querySelector(p).style = "height: 32px; width: 200px;";

          } 
          function hideMAdnotation(elem){
              var p = ".dotContainer:nth-of-type(" + elem + ") p";
              document.querySelector(p).style = "height: 0px; width: 0px;";



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
        return true;
    }
    else{
        return false;
    }
    
}

function loader(){
    var wrap = document.querySelector("#loaderWrap");
    setTimeout(function(){
    wrap.style.opacity = 0;
        setTimeout(function(){
            wrap.style.display = "none";
        }, 1000);
    }, 1000);
}

function msgPopUp(){
    setTimeout(function(){ 
        if(contactPage == false){
            var bubble = document.querySelector("#contact #bubble");
            bubble.classList.remove('bubbleFadeOut');     
            bubble.classList.add('bubbleFadeIn');
            document.querySelector("#contact #contactCircle").classList.add('shake');
        }
    }, 5000);
}

function contactPageShow(){
    contactPage = true;
    var last = document.querySelector("#contact #contactCircle img:last-of-type");
    var first = document.querySelector("#contact #contactCircle img:first-of-type");
    var bubble = document.querySelector("#contact #bubble");
    bubble.classList.remove('bubbleFadeIn');
    bubble.classList.add('bubbleFadeOut');
    document.querySelector("#contact #contactCircle").classList.remove('shake');
    
    
    
    
    setTimeout(function(){ 
    
        setTimeout(function(){     
            last.classList.remove("invisible");
            last.classList.add("visible");
        }, 200);     
        
    first.classList.add("disp");
    last.classList.remove("disp");
        
    }, 200);    
    
    document.querySelector("#contactPage").classList.remove('contactPageHide');
    document.querySelector("#contactPage").classList.add('contactPageShow');
    document.querySelector("#contact #contactCircle").onclick = contactPageHide;
}

function contactPageHide(){
    var last = document.querySelector("#contact #contactCircle img:last-of-type");
    var first = document.querySelector("#contact #contactCircle img:first-of-type");
    

    
    setTimeout(function(){ 
    
        setTimeout(function(){
            first.classList.remove("invisible");
            first.classList.add("visible");
        }, 200);      
            
    last.classList.add("disp");
    first.classList.remove("disp");
                          
    }, 200);  
    
    document.querySelector("#contactPage").classList.remove('contactPageShow');
    document.querySelector("#contactPage").classList.add('contactPageHide');
    document.querySelector("#contact #contactCircle").onclick = contactPageShow;
}