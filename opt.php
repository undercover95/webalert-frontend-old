<?php

$title = '';        //ustawiam zmienna do tytulu
$desc =  '';        //ustawiam zmienna do description
$bots = 'noindex, nofollow';
$url = $_SERVER['REQUEST_URI']; //ustawiam pomocnicza zmienna do uri

switch($url) { //switchuję po uri

    case '/monitor_stron/':
    case '/monitor_stron/index.php':
        $title = 'Kokpit - Monitoring Stron Internetowych';
        $desc = 'Monitorowanie stanu witryn internetowych.';
        $active_id = 0;
    break;
    case '/monitor_stron/addPage.php':
        $title = 'Dodawanie witryny do monitora - Monitoring Stron Internetowych';
        $desc = 'Monitorowanie stanu witryn internetowych';
        $active_id = 1;
    break;
    case '/monitor_stron/settings.php':
        $title = 'Ustawienia - Monitoring Stron Internetowych';
        $desc = 'Monitorowanie stanu witryn internetowych';
        $active_id = 2;
    break;
    case '/monitor_stron/reports.php':
        $title = 'Raporty - Monitoring Stron Internetowych';
        $desc = 'Monitorowanie stanu witryn internetowych';
        $active_id = 3;
    break;
    case '/monitor_stron/stats.php':
        $title = 'Statystyki - Monitoring Stron Internetowych';
        $desc = 'Monitorowanie stanu witryn internetowych';
        $active_id = 4;
    break;

    // default
    case '':
        $title = '';
        $desc = '';
        $nobots = '';
    break;
}

?>
