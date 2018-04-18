
<?php require_once("templates-parts/header.php"); ?>

<div id="page">

<!-- LEFT SIDEBAR -->
<?php include_once("templates-parts/sidebar.php"); ?>

<!-- PAGE CONTENT -->
<div class="content">
<div class="row justify-content-center">
    <div class="col-sm-12">
        <h3><i class="fa fa-home" aria-hidden="true"></i> Kokpit</h3>
        
        <div class="overview mb-3">
            
                <div class="row">
                    <div class="col-md-4">
                        <div id="pages-count-wrapper" class="card overview-content mb-3">
                            <div class="card-body">
                                <i class="fa fa-2x fa-globe" aria-hidden="true"></i>
                                <span id="pages-count" class="overwiev-counter badge badge-primary">0</span><br>
                                <small>Monitorowanych witryn</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div id="working-count-wrapper" class="card overview-content working-text mb-3">
                            <div class="card-body">
                                <i class="fa fa-2x fa-check-circle" aria-hidden="true"></i>
                                <span id="working-count" class="overwiev-counter badge badge-success">0</span><br>
                                <small>Działających witryn</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div id="not-working-count-wrapper" class="card overview-content not-working-text mb-3">
                            <div class="card-body">
                                <i class="fa fa-2x fa-times-circle" aria-hidden="true"></i>
                                <span id="not-working-count" class="overwiev-counter badge badge-danger">0</span><br>
                                <small>Nie działających witryn</small>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div> <!-- overwiev end -->

        <div id="welcome-info" class="alert alert-primary alert-dismissible fade show" role="alert">
            <strong><i class="fa fa-2x fa-info-circle" aria-hidden="true"></i>
                Stan witryn jest automatycznie odświeżany co godzinę.
            </strong> 
            Korzystając z przycisku "Odśwież stan witryn teraz", możesz go odświeżyć w dowolnym momencie.<br>
            <strong>Powiadomienia email będą wysyłane na adres: <a href="mailto:mbularz95@interia.pl">mbularz95@interia.pl</strong></a>.<br>
            Obie te opcje możesz zmienić w <strong><a href="settings.php">ustawieniach</a></strong>.

            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
            
            
                
        <div class="card">
            <div class="card-header">Stan witryn</div>
            <div class="card-body">
                <div id="service-status-table-wrapper"></div>
            </div>
        </div>
        </div>
    </div>


<?php require_once("templates-parts/footer.php"); ?>