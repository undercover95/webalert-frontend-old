<?php
require_once("templates-parts/header.php");
?>

<div id="page">
    <!-- PAGE CONTENT -->
    <div class="content" style="margin-left: 0px;">
    <div class="row justify-content-md-center">
        <div class="col-lg-6 col-xl-4">
            <div id="register-panel" class="card customCard mt-5">
                <div class="card-body">
                    <h3 class="text-center mb-3"><i class="fa fa-user-plus" aria-hidden="true"></i><br>Zarejestruj się</h3>
                    <form id="register-form">

                        <div class="form-group">
                            <label for="usernameInput">Nazwa użytkownika:</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="username-addon" style="min-width: 50px;">
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <input type="text" class="form-control" id="usernameInput" name="username" placeholder="Nazwa użytkownika" aria-describedby="username-addon">
                            </div>
                        </div>
                        <div id="user_err_container"></div>

                        <div class="form-group">
                            <label for="emailInput">Adres email:</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="email-addon" style="min-width: 50px;">
                                        <i class="fa fa-envelope" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <input type="email" class="form-control" id="emailInput" name="email" placeholder="Adres email" aria-describedby="email-addon">
                            </div>
                        </div>
                        <div id="email_err_container"></div>

                        <div class="form-group">
                            <label for="passwordInput">Hasło:</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="password-addon" style="min-width: 50px;">
                                        <i class="fa fa-lock" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <input type="password" class="form-control" id="passwordInput" name="password" placeholder="Hasło" aria-describedby="password-addon">
                            </div>
                        </div>
                        <div id="password_err_container"></div>

                        <div class="form-group">
                            <label for="password2Input">Powtórz hasło:</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="password-addon" style="min-width: 50px;">
                                        <i class="fa fa-lock" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <input type="password" class="form-control" id="password2Input" name="password2" placeholder="Powtórz hasło" aria-describedby="password2-addon">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="touInput" name="tou">
                                <label class="form-check-label" for="touInput">Akceptuję regulamin</label>
                            </div>
                        </div>
                        <div id="tou_err_container"></div>

                        <div class="form-group">
                            <div class="g-recaptcha" data-sitekey="6Lc930YUAAAAAOlx_32fI-4NhrBktZRK3vPxGqMp"></div>
                        </div>
                        <div id="captcha_err_container"></div>

                        <button id="registration-form-submit" type="submit" class="btn btn-block btn-primary">Zarejestruj</button>

                    </form>
                    <div id="invalid_data_err_container" class="my-3"></div>
                    <div class="d-inline pr-3">
                            <a href="/monitor_stron">Powrót na stronę główną</a><br>
                            <a href="/monitor_stron/login.php">Powrót do strony logowania</a>
                    </div>
                </div>
            </div>
        </div> 
    </div>

<?php require_once("templates-parts/footer.php"); ?>