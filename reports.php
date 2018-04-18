
<?php require_once("templates-parts/header.php"); ?>


<div id="page">
    <!-- LEFT SIDEBAR -->
    <?php include_once("templates-parts/sidebar.php"); ?>

    <!-- PAGE CONTENT -->
    <div class="content">
    <div class="row justify-content-center">
        <div class="col-sm-12">
            <h3><i class="fa fa-bullhorn" aria-hidden="true"></i> Raporty <span class="badge badge-danger">5</span></h3>
            
            <div class="row">
                <div class="col-sm-12">
                <div class="card">
                    <div class="card-body">

                        <label for="exampleSelect2">Pokaż raporty z: </label>
                        <select class="form-control form-control-sm mb-3" id="exampleSelect2">
                            <option>ostatnich 6 godzin</option>
                            <option>ostatnich 12 godzin</option>
                            <option>ostatnich 24 godzin</option>
                            <option>ostatnich 48 godzin</option>
                            <option>ostatniego tygodnia</option>
                            <option>ostatniego miesiąca</option>
                        </select>
                        

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Lp.</th>
                                <th>Opis</th>
                                <th>Data</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Strona <a href="#">example.pl</a> znowu działa. <span class="badge badge-success">200</span></td>
                                <td>12.05.2018 17:55</td>
                                <td><a href="#">Zobacz raport</a></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Strona <a href="#">example.pl</a> przestała działać! <span class="badge badge-danger">500</span></td>
                                <td>12.05.2018 17:45</td>
                                <td><a href="#">Zobacz raport</a></td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>Strona <a href="#">example.pl</a> przestała działać! <span class="badge badge-danger">500</span></td>
                            <td>12.05.2018 17:45</td>
                            <td><a href="#">Zobacz raport</a></td>
                            </tr>
                            <tr>
                            <th scope="row">4</th>
                            <td>Strona <a href="#">example.pl</a> przestała działać! <span class="badge badge-danger">500</span></td>
                            <td>12.05.2018 17:45</td>
                            <td><a href="#">Zobacz raport</a></td>
                            </tr>
                            <tr>
                            <th scope="row">5</th>
                            <td>Zakończono sprawdzanie stanu witryn.</td>
                            <td>12.05.2018 17:01</td>
                            <td><a href="#">Zobacz raport</a></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>

        </div>
    </div>

<?php require_once("templates-parts/footer.php"); ?>