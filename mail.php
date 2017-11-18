<?php

    //----------------------------------------------------------------//

    //COMPLETE HERE

        $to = "brikogaming@gmail.com"; //Here put your Email adress ex. email@email.com

        $secret = "6LeQdycUAAAAAJN4j27-4COpf3BQ42kVDRFV5w7P";  //Here put your Captcha secret code

    //----------------------------------------------------------------//

    $response = $_POST['token'];

    $remoteip = $_SERVER['REMOTE_ADDR'];
    
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $full_url = $url.'?secret='.$secret.'&response='.$response.'&remoteip='.$remoteip;
    
    $data = json_decode(file_get_contents($full_url));
    
    if(isset($data->success) && $data->success == true){
        

        if (isset($_POST["name"],$_POST["surname"], $_POST["phone"], $_POST["email"], $_POST["message"])){
            $name = $_POST["name"];
            $surname = $_POST["surname"];
            $phone = $_POST["phone"];
            $email = $_POST["email"];
            $message = $_POST["message"];

            $subject = "Message from " . $name . " " . $surname . " ( " . $email . " )";
            $headers = "From: " . $email . " Phone: " . $phone . "\r\n";

            if (mail($to, $subject, $message, $headers)){
                echo "001MailWorks";
            }
            else{
                echo "002MailError";
            }

        }
        else{
            echo "002MailError";    
        }
        
    }


    else{
    echo "003FillCaptcha"; 
    }

?>
