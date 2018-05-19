<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
if($_SERVER["REQUEST_METHOD"]== "OPTIONS"){
    echo "";die;
}

require_once('Controller.class.php');


if(isset($_GET['action']) && !empty($_GET['action'])) {
    $action = $_GET['action'];

    $ctrl = new Controller();

    if($action == 'removePage') {
        if(!isset($_POST['id']) || empty($_POST['id']) || !$_POST['id']) {
            return false;
        }
        $site_id = $_POST['id'];
        $ctrl->removeSinglePage($site_id);
    }

    else if($action == 'getLastAllPagesStatus') {
        return $ctrl->getLastAllPagesStatus();
    }

    else if($action == 'getLastPageStatus') {
        if (isset($_POST['url']) && !empty($_POST['url'])) {
            return $ctrl->getLastPageStatus($_POST['url']);
        }
    }

    else if($action == 'addSinglePage') {
        if (isset($_POST['url']) && !empty($_POST['url'])) {
            return $ctrl->addSinglePage($_POST['url']);
            //return $ctrl->refreshSinglePageStatus($_POST['url']);
        }
    }

    else if($action == 'addMultiplePages') {
        return $ctrl->addMultiplePages();
    }

    else if($action == 'login') {
        return $ctrl->loginUser();
    }

    else if($action == 'logout') {
        return $ctrl->logoutUser();
    }

    else if($action == 'register') {
        return $ctrl->registerUser();
    }

    else if($action == 'refreshAllPagesStatus') {
        return $ctrl->refreshAllPagesStatus();
    }

    else if ($action == 'refreshSinglePageStatus') {
        if (isset($_POST['id']) && !empty($_POST['id'])) {
            //echo json_encode(array("ok" => $action." -> url: ".$_POST['url']));
            return $ctrl->refreshSinglePageStatus($_POST['id']);
        }
        else echo json_encode(array("err" => $action." -> site id not defined"));
    }

    else if ($action == 'getResponseTimeForPeriod') {
        if (isset($_POST['period']) && !empty($_POST['period']) && isset($_POST['url']) && !empty($_POST['url'])) {
            return $ctrl->getResponseTimeForPeriod($_POST['period'], $_POST['url']);
        }
    }

    else if($action == 'getReports') {
        if (isset($_POST['period']) && !empty($_POST['period'])) {
            return $ctrl->getReports($_POST['period']);
        }
    }

    else if($action == 'receiveReport') {
        if (isset($_POST['id']) && !empty($_POST['id'])) {
            return $ctrl->receiveReport($_POST['id']);
        }
    }

    else if($action == 'getNewReportsCounter') {
        return $ctrl->getNewReportsCounter();
    }

    else {
        echo json_encode(array("err"=>"Error - Unknown action"));
    }
}
else {
    echo json_encode(array("err" => "FATAL ERROR - Action is not defined!"));
}
?>