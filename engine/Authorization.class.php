<?php
require_once('connection.php');

class Authorization {
    private $user;
    private $password;

    public function __construct($user, $password) {
        $this->user = $user;
        $this->password = $password;
    }

    public function getUser() {
        return $this->user;
    }

    public function getPassword() {
        return $this->password;
    }

    private function hashPassword() {
        return password_hash($this->password, PASSWORD_DEFAULT);
    }

    public function validateUser() {
        if($this->user !== "" && $this->password !== "") {
            return true;
        }
        else {
            return false;
        }
    }

    public function login() {
        $password = $this->getPassword();
        $user = $this->getUser();

        // check if user exists
        $checkUserSql = "SELECT * FROM `users` WHERE `username`='$user' LIMIT 1";

        global $conn;
        if($checkUserRes = $conn->query($checkUserSql)) {
            if($checkUserRes->num_rows > 0) {

                $checkUserResRow = $checkUserRes->fetch_assoc();

                // if user exists then check password
                if(password_verify($password, $checkUserResRow['password'])) {
                    session_start();
        
                    $_SESSION['user_id'] = $checkUserResRow['id'];
                    $_SESSION['user_login'] = $checkUserResRow['username'];
        
                    // prevent from session fixation
                    ini_set('session.cookie_httponly',1);
                    return true;
                } else {
                    return false;
                }
            }
            else return false;
        }
        else {
            return false;
        }

        // TO DO: zamknac polaczenie (przejsc na PDO)
    }

    public function logout() {
        session_start();
        session_unset(); // usuniecie sesji
        session_destroy();
    }
}

?>