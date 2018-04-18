<?php 
    session_start();
    require_once("opt.php"); 

    $user_logged = false;

    if(!isset($_SESSION['user_login'])) {
        if(isset($_SERVER['REQUEST_URI'])) {
            if($_SERVER['REQUEST_URI'] != "/monitor_stron/login.php" && $_SERVER['REQUEST_URI'] != "/monitor_stron/register.php" && $_SERVER['REQUEST_URI'] != "/monitor_stron/register_success.php") {
                header('Location: /monitor_stron/login.php');
            }
        }
    } else $user_logged = true;
?>

<!DOCTYPE html>
<html lang="pl-PL">

<head>
    <title><?php echo $title; ?></title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<?php echo $desc; ?>" />
    <meta name="robots" content="<?php echo $bots; ?>" />
    <link rel="icon" href="img/favicon.png" sizes="32x32">

    <!-- bootstrap 4.0 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css">

    <!-- fontawesome 4.7.0 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700&amp;subset=latin-ext" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto:400,700&amp;subset=latin-ext" rel="stylesheet"> 

    <!-- datatables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/plug-ins/1.10.16/integration/font-awesome/dataTables.fontAwesome.css">

    <!-- chart.js -->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js'></script>

    <!-- custom scripts and css -->
    <link rel="stylesheet" href="css/style.css" type="text/css" />
    
    <!-- google recaptcha -->
    <script src='https://www.google.com/recaptcha/api.js'></script>
</head>

<body>
<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/monitor_stron"><i class="fa fa-globe" aria-hidden="true"></i>
 Monitor stron internetowych</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse">
    <?php if($user_logged) { ?>
        <ul class="navbar-nav mr-auto" id="mobile-nav">
            <li class="nav-item<?php if($active_id == 0) echo " active"; ?>">
                <a href="/monitor_stron" class="nav-link">
                    <i class="fa fa-home" aria-hidden="true"></i> Kokpit
                </a>
            </li>

            <li class="nav-item<?php if($active_id == 1) echo " active"; ?>">
                <a href="addPage.php" class="nav-link">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i> Dodaj witrynę
                </a>
            </li>

            <li class="nav-item">
                <a href="http://dnscheck.pingdom.com/" target="_blank" class="nav-link">
                    <i class="fa fa-cogs" aria-hidden="true"></i> Testuj witrynę
                </a>
            </li>

            <li class="nav-item<?php if($active_id == 2) echo " active"; ?>">
                <a href="settings.php" class="nav-link">
                    <i class="fa fa-wrench" aria-hidden="true"></i> Ustawienia
                </a>
            </li>

            <li class="nav-item<?php if($active_id == 3) echo " active"; ?>">
                <a href="reports.php" class="nav-link">
                    <i class="fa fa-bullhorn" aria-hidden="true"></i> Raporty <span class="badge badge-danger">5</span>
                </a>
            </li>
            <li class="nav-item<?php if($active_id == 4) echo " active"; ?>">
                <a class="nav-link"href="stats.php">
                    <i class="fa fa-pie-chart" aria-hidden="true"></i> Statystyki
                </a>
            </li>
        </ul>
    <?php } ?>
        <ul class="navbar-nav ml-auto">

            <?php if($user_logged) { ?>
                <span class="navbar-text">Zalogowano jako</span>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 1rem;"><i class="fa fa-user-circle" aria-hidden="true"></i> <?php echo $_SESSION['user_login']; ?></a>
                
                    <div class="dropdown-menu" style="right: 0px; left: -100%;" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/monitor_stron/settings.php">Ustawienia</a>
                        <a class="dropdown-item" href="/monitor_stron/engine/controller.php?action=logout"><i class="fa fa-sign-out" aria-hidden="true"></i> Wyloguj</a>
                    </div>
                </li>
            <?php } else { ?>

                <li class="nav-item">
                    <a class="nav-link" href="/monitor_stron/login.php"><i class="fa fa-sign-in" aria-hidden="true"></i> Zaloguj</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link btn btn-sm btn-primary" style="color: #fff" href="/monitor_stron/register.php"><i class="fa fa-user-plus" aria-hidden="true"></i> Zarejestruj się</a>
                </li>

            <?php } ?>
        </ul>
    </div>
</nav>