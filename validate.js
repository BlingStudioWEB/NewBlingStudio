var activeInput = 1; 


//On click FIRST BUTTON

var prevInput = document.querySelectorAll(".prevInputBox");

for(var i = 0; i< prevInput.length; i++){
    prevInput[i].onclick = function() { inputBox(-1) };
}


document.querySelector("#writeMSG").onclick = function(){
    inputBox(1);
    return false;
};

//On click FIRST NEXT BUTTON

document.querySelector("#firstCheck").onclick = function () {
    var name = document.querySelector("#name").value;
    var surname = document.querySelector("#surname").value;
    var nameTrim = name.trim();
    var surnameTrim = surname.trim();
    
    if (surnameTrim.length == 0 || nameTrim.length == 0) {
         document.querySelector("#formCompleteFirst").classList.remove("CFhidden"); 
    }
    else{
        document.querySelector("#formCompleteFirst").classList.add("CFhidden"); 
        inputBox(1);
    }
    return false;
};

//On click SECOND NEXT BUTTON

document.querySelector("#secondCheck").onclick = function () {
    var email = document.querySelector("#email").value;
    var phone = document.querySelector("#phone").value;
    email = email.trim();
    phone = phone.trim();
    
    var filterEmail = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    
    if (email.length == 0 || phone.length == 0) {
         document.querySelector("#formCompleteSecond").classList.remove("CFhidden");       
    }
    else{
        document.querySelector("#formCompleteSecond").classList.add("CFhidden");
        if(filterEmail.test(email)==false){
            document.querySelector("#emailWrong").classList.remove("CFhidden"); 
        }
        else{
            document.querySelector("#emailWrong").classList.add("CFhidden");
            inputBox(1);
        }
    }
    return false;
};

//On click SUBMIT BUTTON

document.querySelector("#submit").onclick = function () {
    var message = document.querySelector("#message").value;
    var messageTrim = message.trim();
    
     if (messageTrim.length == 0) {
         document.querySelector("#formCompleteThird").classList.remove("CFhidden");       
    }
    
    else{
        document.querySelector("#formCompleteThird").classList.add("CFhidden");
        var name = document.querySelector("#name").value;
        var surname = document.querySelector("#surname").value;
        var email = document.querySelector("#email").value;
        var phone = document.querySelector("#phone").value;
        var token = document.querySelector("#g-recaptcha-response").value;
 
        
        
        var request = new XMLHttpRequest();
        var url = "mail.php";
        var data = "name="+name+"&surname="+surname+"&phone="+phone+"&email="+email+"&message="+message+"&token="+token;
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                var return_data = request.responseText;
                if(return_data.search("001MailWorks")!= -1 ){
                    setTimeout( null , 500);
                    document.querySelector("#msgSent").classList.remove("CFhidden");
                    inputBox(1);
                }
                else if(return_data.search("003FillCaptcha")!= -1 ){
                    document.querySelector("#FillCaptcha").classList.remove("CFhidden");
                   
                }
                else {
                    setTimeout( null , 500);
                    document.querySelector("#msgFailed").classList.remove("CFhidden");
                    inputBox(1);
                   
                }
            }
            else if( request.readyState == 4 && (request.status == 400 || request.status == 401 || request.status == 402 || request.status == 403 || request.status == 404)){
                setTimeout( null , 500);
                document.querySelector("#msgFailed").classList.remove("CFhidden");
                inputBox(1);
            }
            
        }
        request.send(data);
        
    }
    return false;
};

//Input Box Switcher

function inputBox(param){
    document.querySelector('.inputBox:nth-of-type(' +activeInput+ ')').classList.add('invisible');
    document.querySelector('.inputBox:nth-of-type(' +activeInput+ ')').classList.remove('visible');
    
    activeInput += param;
    
    setTimeout( null , 500);
    
    document.querySelector('.inputBox:nth-of-type(' +activeInput+ ')').classList.remove('invisible');
    document.querySelector('.inputBox:nth-of-type(' +activeInput+ ')').classList.add('visible');
    
    return false;
}



