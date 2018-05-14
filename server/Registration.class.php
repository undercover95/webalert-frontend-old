<?php
require_once('connection.php');

class Registration {
    private $user;
    private $password;
    private $password_repeated;
    private $mail_address;
    private $captcha;

    public function __construct($user, $password, $password_repeated, $mail_address, $captcha) {
        $this->user = $user;
        $this->password = $password;
        $this->password_repeated = $password_repeated;
        $this->mail_address = $mail_address;
        $this->captcha = $captcha;
    }

    public function getUser() {
        return $this->user;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getMailAddress() {
        return $this->mail_address;
    }

    private function hashPassword() {
        return password_hash($this->password, PASSWORD_DEFAULT);
    }

    public function validateData() {
        $errors = array();

        if($this->user == "") {
            $errors['user_err'] = "Nie podano nazwy użytkownika!";
        } else {
            if( (strlen($this->user)<3 || strlen($this->user)>50) ){
                if(!ctype_alnum($user)){
                    $errors['user_err'] = "Nazwa użytkownika musi zawierać znaki alfanumeryczne!";
                    //return false;
                }
                $errors['user_err'] = "Nazwa użytkownika musi zawierać od 3 do 50 znaków!";
                //return false;
            }
        }


        if ($this->password == "") {
            $errors['password_err']="Nie podano hasła!";
        } else {
            if(strlen($this->password)<8 || strlen($this->password)>20){
                $errors['password_err'] = "Hasło musi zawierać od 8 do 20 znaków! ";
                //return false;
            }
            else if ($this->password !== $this->password_repeated) {
                $errors['password_err'] = "Hasła nie są takie same!";
                //return false;
            }
        }

        if ($this->mail_address == "") {
            $errors['email_err']="Nie podano adresu e-mail!";
        } else {
            if(!filter_var($this->mail_address, FILTER_VALIDATE_EMAIL)) {
                $errors['email_err'] = "Niepoprawny adres e-mail!";
                //return false;
            }
        }

        if (!$this->captcha) {
            $errors['captcha_err']="Nie zaznaczono captcha!";
        } else {
            $secretKey = "6Lc930YUAAAAAPMB6yeZbRA4J1mB1_D0opaXJifu";
            $ip = $_SERVER['REMOTE_ADDR'];
            $response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$this->captcha."&remoteip=".$ip);
            $responseKeys = json_decode($response,true);

            if(intval($responseKeys["success"]) !== 1) {
                # spam
                $errors['captcha_err']="Jesteś botem! Wynocha!";
                //return false;

            }
        }
        
        return $errors;
    }

    public function register() {
        $password_hash = $this->hashPassword();
        $user = $this->getUser();
        $mail_address = $this->getMailAddress();

        // check if username already exists
        $checkUserSql = "SELECT * FROM `users` WHERE `username`='$user' LIMIT 1";

        // if is, then throw error. Otherwise register new user
        global $conn;
        if($checkUserRes = $conn->query($checkUserSql)) {
            if($checkUserRes->num_rows == 0) {

                $checkUserResRow = $checkUserRes->fetch_assoc();

                $addUserSql = "INSERT INTO `users` (`username`,`password`,`mail_address`) VALUES('$user', '$password_hash', '$mail_address')";

                if(!$conn->query($addUserSql)) {
                    return false;
                }

                return true;
            } 
            else return false;
        }
        else {
            echo "Blad podczas przetwarzania zapytania o sprawdzenie usera.";
            return false;
        }
    }

}

?>