<?php 

class Settings {
    private static $instance;
    private function __construct() {}
    private function __clone() {}

    private $settings = array(
        "refreshPagesStatusFrequency" => 21600000,
        "userEmail" => "test@example.com"
    );

    public static function getInstance() {
        if(self::$instance === null) {
            self::$instance = new Settings();
        }
        return self::$instance;
    }

    public function setRefreshPagesStatusFrequency($freq) {
        $this->settings["refreshPagesStatusFrequency"] = $freq;
    }
    public function getRefreshPagesStatusFrequency() {
        return $this->settings["refreshPagesStatusFrequency"];
    }

    public function setUserEmail($email) {
        $this->settings["userEmail"] = $email;
    }
    public function getUserEmail() {
        return $this->settings["userEmail"];
    }
}

?>