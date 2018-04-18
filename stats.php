
<?php require_once("templates-parts/header.php"); ?>

<div id="page">
    <!-- LEFT SIDEBAR -->
    <?php include_once("templates-parts/sidebar.php"); ?>

    <!-- PAGE CONTENT -->
    <div class="content">
    <div class="row justify-content-center">
        <div class="col-sm-12">
            <h3><i class="fa fa-pie-chart" aria-hidden="true"></i> Statystyki witryny <small style="color: #73808c">www.example.com</small></h3>
            
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col-sm-4">
                                    <div class="statsOverview mb-3" id="averageResponseTimeIndicator">
                                        <span class="badge badge-info">2.343 s</span><br>
                                        Średni czas odpowiedzi serwera
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="statsOverview mb-3" id="workFromIndicator">
                                        <span class="badge badge-success">2d 5h 34min</span><br>
                                        Działa bez awarii
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="statsOverview mb-3" id="notWorkFromIndicator">
                                        <span class="badge badge-danger">Nie dotyczy</span><br>
                                        Nie działa od
                                    </div>
                                </div>
                            </div>

                            <div id="select-period-wrapper">
                                <div class="form-group row">
                                    <label for="exampleSelect2" class="col-sm-4">Pokaż dane z: </label>
                                    <div class="col-sm-8">
                                        <select class="form-control form-control-sm mb-3" id="exampleSelect2">
                                            <option>ostatnich 6 godzin</option>
                                            <option>ostatnich 12 godzin</option>
                                            <option>ostatnich 24 godzin</option>
                                            <option>ostatnich 48 godzin</option>
                                            <option>ostatniego tygodnia</option>
                                            <option>ostatniego miesiąca</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <h4><i class="fa fa-check-circle-o" aria-hidden="true"></i> Dostępność strony</h4>
                            <div id="page-service-status" class="my-3"></div>
                            <hr>
                            <h4><i class="fa fa-clock-o" aria-hidden="true"></i> Czas odpowiedzi serwera</h4>
                            <canvas id="responseTimeChart" width="700" height="250"></canvas>
                            <script>
                                var ctx = document.getElementById("responseTimeChart").getContext('2d');
                                var myChart = new Chart(ctx, {
                                    type: 'line',
                                    data: {
                                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                                        datasets: [{
                                            label: 'Czas odpowiedzi serwera',
                                            data: [12, 19, 3, 5, 2, 3, 8]
                                        }]
                                    },
                                    options: {
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero:true
                                                }
                                            }]
                                        }
                                    }
                                });
                            </script>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

<?php require_once("templates-parts/footer.php"); ?>