
<?php 
require_once("templates-parts/header.php"); 

require_once("engine/settingsData.php"); 
$settings = Settings::getInstance();
?>


<div id="page">
    <!-- LEFT SIDEBAR -->
    <?php include_once("templates-parts/sidebar.php"); ?>

    <!-- PAGE CONTENT -->
    <div class="content">
    <div class="row justify-content-center">
        <div class="col-sm-12">
            <h3><i class="fa fa-wrench" aria-hidden="true"></i> Ustawienia</h3>
            
            <div class="row">
                <div class="col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <ul class="nav nav-tabs" id="settings-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="account-settings-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="true">Ustawienia konta</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="monitor-settings-tab" data-toggle="tab" href="#monitor" role="tab" aria-controls="monitor" aria-selected="true">Ustawienia monitora</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="settings-tab-content">
                            <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                                <form class="mt-3">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Adres email</label>
                                        <input type="email" value="<?php echo $settings->getUserEmail(); ?>" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Wprowadź adres email">
                                        <small id="emailHelp" class="form-text text-muted">Adres email, na który będą wysyłane powiadomienia.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleSelect1">Częstotliwość sprawdzania stanu witryn</label>
                                        <select class="form-control" id="exampleSelect1">
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 300000) echo " selected"; ?>>co 5 minut</option>
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 900000) echo " selected"; ?>>co 15 minut</option>
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 1800000) echo " selected"; ?>>co 30 minut</option>
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 3600000) echo " selected"; ?>>co godzinę</option>
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 7200000) echo " selected"; ?>>co dwie godziny</option>
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 21600000) echo " selected"; ?>>co 6 godzin</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Zapisz</button>
                                </form>
                            </div>
                            <div class="tab-pane fade" id="monitor" role="tabpanel" aria-labelledby="monitor-tab">
                                <form class="mt-3">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Adres email</label>
                                        <input type="email" value="<?php echo $settings->getUserEmail(); ?>" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Wprowadź adres email">
                                        <small id="emailHelp" class="form-text text-muted">Adres email, na który będą wysyłane powiadomienia.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleSelect1">Częstotliwość sprawdzania stanu witryn</label>
                                        <select class="form-control" id="exampleSelect1">
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 300000) echo " selected"; ?>>co 5 minut</option>
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 900000) echo " selected"; ?>>co 15 minut</option>
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 1800000) echo " selected"; ?>>co 30 minut</option>
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 3600000) echo " selected"; ?>>co godzinę</option>
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 7200000) echo " selected"; ?>>co dwie godziny</option>
                                            <option<?php if($settings->getRefreshPagesStatusFrequency() == 21600000) echo " selected"; ?>>co 6 godzin</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Zapisz</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
            

        </div>
    </div>

<?php require_once("templates-parts/footer.php"); ?>