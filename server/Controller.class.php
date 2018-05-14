<?php
require_once('connection.php');

class Controller {

    private $db_connection;

    public function __construct() {
        global $conn;
        $this->db_connection = $conn;
    }

    function refreshAllPagesStatus() {    
        $command = '/usr/bin/python2 /home/michal/monitor_stron/engine/updatePagesStatus.py 2>&1';
        $output = exec($command);
        echo json_encode(array("output" => $output));
    }

    function refreshSinglePageStatus($site_id) {
        $command = '/usr/bin/python2 /home/michal/monitor_stron/engine/updatePagesStatus.py '.$site_id.' 2>&1';
        $output = '';
        exec($command, $output);
        echo json_encode(array("output" => $output));
    }

    function addSinglePage($site_url) {

        $addPageSql = "INSERT INTO `pages` (`url`) VALUES ('$site_url')";

        if(!$this->db_connection->query($addPageSql)) {
            //echo "Cannot insert page '$site_url' to database.";
            echo json_encode(array('result' => false)); 
        }
        else {
            echo json_encode(array('result' => true));
        }
    }


    function addMultiplePages() {
        $sites = $_POST['sites'];

        $nonAddedPages = array();

        foreach ($sites as $site) {
            
            $insertPageSql = "INSERT INTO `pages` (`url`) VALUES ('$site')";

            if(!$this->db_connection->query($insertPageSql)) {
                //echo "Cannot insert page '$site' to database.";
                array_push($nonAddedPages, $site);
            }   
        }

        $res = array(
            "errors" => $nonAddedPages
        );
        echo json_encode($res);
    }


    function getLastAllPagesStatus() {

        # get last pages status
        $getPagesSql = "SELECT site.`url`, last_status.*, `status_codes`.`short_desc`,`status_codes`.`long_desc` FROM `pages` site JOIN `pages_status` last_status ON site.`id` = last_status.`site_id` LEFT JOIN `status_codes` ON `status_codes`.`status_code`=`last_status`.`status_code` LEFT JOIN `pages_status` not_last_status ON ( site.`id` = `not_last_status`.`site_id` AND last_status.`last_checked` < not_last_status.`last_checked` ) WHERE not_last_status.`site_id` IS NULL ORDER BY status_code, site.`url`";

        $res = array();
        $rows = array();
        if($getPagesRes = $this->db_connection->query($getPagesSql)) {
            if ($getPagesRes->num_rows > 0) {

                while($getPagesRow = $getPagesRes->fetch_assoc()){
                    $rows[] = $getPagesRow;
                }
                
            } else $res = array('result' => []);
        } else $res = array('result' => false);

        $res['result'] = $rows;
        
        echo json_encode($res);
    }

    function getLastPageStatus($url) {
        $getLastPageStatusSql = "SELECT `pages`.`url`, `pages_status`.*, `status_codes`.`short_desc`,`status_codes`.`long_desc` 
        FROM `pages`,`pages_status` 
        LEFT JOIN `status_codes` ON `status_codes`.`status_code`=`pages_status`.`status_code` 
        WHERE `pages_status`.`site_id`=`pages`.`id` AND `pages`.`url`='$url' 
        ORDER BY `last_checked` DESC LIMIT 1";

        $res = array();
        $rows = array();

        if($getLastPageStatusRes = $this->db_connection->query($getLastPageStatusSql)) {
            if ($getLastPageStatusRes->num_rows > 0) {

                while($getLastPageStatusRow = $getLastPageStatusRes->fetch_assoc()){
                    $rows[] = $getLastPageStatusRow;
                }
                
            } else $res = array('result' => []);
        } else $res = array('result' => false);

        $res['result'] = $rows;

        echo json_encode($res);
    }

    function loginUser() {
        if(isset($_POST["username"]) && isset($_POST["password"])) {
            require_once('Authorization.class.php');

            // user data from form
            $user = strip_tags(trim($_POST["username"]));
            $password = strip_tags(trim($_POST["password"]));

            $auth = new Authorization($user, $password);

            // validate user
            if ($auth->validateUser()) {
                if (!$auth->login()) {
                    echo json_encode(array("log_err" => "Nieprawidłowy login lub hasło!"));
                } else {
                    // if user is logged then return empty array of errors
                    echo json_encode(array());
                }
            } else {
                echo json_encode(array("log_err" => "Wprowadź login i hasło!"));
            }
        }
    }

    function logoutUser() {
        session_start();
        session_unset(); // usuniecie sesji
        session_destroy();
        header('Location: /monitor_stron/login.php?action=logout_success');
    }


    function registerUser() {
        if(isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["password2"]) && isset($_POST["email"]) && isset($_POST['g-recaptcha-response'])) {
            require_once('Registration.class.php');
        
            // user data from form
            $user = strip_tags(trim($_POST["username"]));
            $password = strip_tags(trim($_POST["password"]));
            $password2 = strip_tags(trim($_POST["password2"]));
            $email = strip_tags(trim($_POST["email"]));
            $captcha = $_POST['g-recaptcha-response'];
        
            $reg = new Registration($user, $password, $password2, $email, $captcha);
        
            // validate user
            $reg_validation_errors_array = $reg->validateData();
            if (empty($reg_validation_errors_array)) {
                if($reg->register()) {
                    echo json_encode($reg_validation_errors_array);
                } else {
                    echo json_encode(array("reg_err" => "Rejestracja nie powiodła się! Użytkownik o podanej nazwie już istnieje lub wystąpił błąd serwera."));
                }
            }
            else {
                echo json_encode($reg_validation_errors_array);
            }
        }
    }

    function removeSinglePage($site_id) {       
        $removePageSql = "DELETE FROM `pages` WHERE `pages`.`id` = $site_id";

        if(!$this->db_connection->query($removePageSql)) {
            echo "Cannot remove page with id '$site_id' from database.";
            return false; 
        }
        return true;    
    }

    function getResponseTimeForPeriod($period, $url) {
        $getResponseTimeSql = "SELECT * FROM `pages_status` LEFT JOIN `pages` ON `id`=`site_id` WHERE `pages`.`url`='$url' AND `pages_status`.`last_checked`>=DATE_SUB(NOW(),INTERVAL $period HOUR)";

        $res = array();
        $rows = array();
        
        if($getResponseTimeRes = $this->db_connection->query($getResponseTimeSql)) {
            if ($getResponseTimeRes->num_rows > 0) {

                while($getResponseTimeRow = $getResponseTimeRes->fetch_assoc()){
                    $rows[] = $getResponseTimeRow;
                }
                
            } else $res = array('result' => []);
        } else $res = array('result' => false);

        $res['result'] = $rows;

        echo json_encode($res);
    }
}
?>