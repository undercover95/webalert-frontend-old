
<?php require_once("templates-parts/header.php"); ?>


<div id="page">
    <!-- LEFT SIDEBAR -->
    <?php include_once("templates-parts/sidebar.php"); ?>

    <!-- PAGE CONTENT -->
    <div class="content">
    <div class="row justify-content-center">
        <div class="col-sm-12">
            <h3><i class="fa fa-plus-circle" aria-hidden="true"></i> Dodaj witrynę do monitora</h3>
            
            <div class="row">
                <div class="col-sm-12">
                    <div class="card mb-3">
                        <div class="card-header"><i class="fa fa-file-o" aria-hidden="true"></i>
 Dodaj pojedynczą stronę</div>
                        <div class="card-body">
                            <form id="add-single-page-form">
                                <div class="form-group">
                                    <label for="addPage">Adres witryny:</label>
                                    <input type="text" id="addPage" name="page" class="form-control" placeholder="Wpisz adres witryny" required>
                                </div>
                                <button type="submit" class="btn btn-primary"><i class="fa fa-plus-circle" aria-hidden="true"></i>
                Dodaj witrynę</button>
                            </form>
                            <div class="mt-3" id="add-single-page-results"></div>
                        </div>
                    </div> 
                </div>


                <div class="col-sm-12">
                    <div class="card mb-3">
                        <div class="card-header"><i class="fa fa-files-o" aria-hidden="true"></i>
 Dodaj wiele stron</div>
                        <div class="card-body">
                        <p><i class="fa fa-question-circle" aria-hidden="true"></i> Wpisz adresy witryn które chcesz dodać do monitora, <strong>wpisując je po przecinku.</strong><br>Przykład: <span style="font-style: italic;">example.com.pl, example2.pl, example.org</span></p>
                            <form id="add-multiple-pages-form">
                                <div class="form-group">
                                    <textarea rows="5" cols="50" class="form-control" type="text" id="addPagesInput" placeholder="Wpisz adresy witryn po przecinku..." required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary"><i class="fa fa-plus-circle" aria-hidden="true"></i>
                Dodaj wiele witryn</button>
                            </form>
                            <div id="add-multiple-pages-results"></div>
                        </div>
                     </div>
                </div>

            </div>
            

        </div>
    </div>

<?php require_once("templates-parts/footer.php"); ?>