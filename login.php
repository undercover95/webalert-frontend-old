<?php require_once("templates-parts/header.php"); ?>

<div id="page">
    <!-- PAGE CONTENT -->
    <div class="content" style="margin-left: 0px;">
    <div class="row justify-content-md-center">
        <div class="col-md-12 col-lg-6 col-xl-4">
            <?php 
                if(!empty($_GET['action']) && $_GET['action'] == 'logout_success') {
                    echo "Wylogowano pomyślnie."; 
                }
            ?>
            <div id="login-panel" class="card customCard my-5">
                <div class="card-body">
                    <h3 class="text-center mb-3"><i class="fa fa-user" aria-hidden="true"></i><br>Zaloguj się</h3>
                    <form id="login-form">

                        <div class="form-group">
                            <label for="usernameInput">Nazwa użytkownika:</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="username-addon" style="min-width: 50px;"><i class="fa fa-user" aria-hidden="true"></i>
</span>
                                </div>
                                <input type="text" class="form-control" id="usernameInput" name="username" placeholder="Nazwa użytkownika" aria-describedby="username-addon">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="passwordInput">Hasło:</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="password-addon" style="min-width: 50px;"><i class="fa fa-lock" aria-hidden="true"></i>
</span>
                                </div>
                                <input type="password" class="form-control" id="passwordInput" name="password" placeholder="Hasło" aria-describedby="password-addon">
                            </div>
                        </div>

                        <div class="form-group float-sm-right">
                            <a href="#" class="px-2">Zapomniałeś hasła?</a>
                            <button id="login-form-submit" type="submit" class="btn btn-primary">Zaloguj</button>
                        </div>
                        <div style="clear: both"></div>
                        <div id="invalid_data_err_container"></div>
                    </form>
                    <hr>
                    <p class="text-center">Nie masz jeszcze swojego konta?<a href="/monitor_stron/register.php" class="px-2"><br>Załóż nowe konto!</a></p>
                </div>
            </div>
        </div> 
    </div>

<?php require_once("templates-parts/footer.php"); ?>