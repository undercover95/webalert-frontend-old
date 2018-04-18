var datatable;

function getLastAllPagesStatusData() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'engine/controller.php?action=getLastAllPagesStatus',
            type: 'post',
            dataType: 'json',
            success: function(data) {
                resolve(data);
            },
            error: function(xhr, status) {
                reject(status);
            }
        });
    });
}

function getLastPageStatusData(url) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'engine/controller.php?action=getLastPageStatus',
            data: {
                "url": url
            },
            type: 'post',
            dataType: 'json',
            success: function(data) {
                resolve(data);
            },
            error: function(xhr, status) {
                reject(status);
            }
        });
    });
}

function displayPagesStatus(lastStatusData) {

    var table = document.createElement('table');
    $(table).attr('id', 'service-status-table');
    $(table).addClass("table table-striped table-hover");
    $('#service-status-table-wrapper').append(table);

    var workingCount = 0;
    var notWorkingCount = 0;

    console.log(lastStatusData);

    datatable = $(table).DataTable({
        data: lastStatusData,
        columns: [{
                render: function(data, type, row) {
                    return '<input class="select-site" type="checkbox" data-id="' + row['site_id'] + '">';
                },
                title: ""
            },
            {
                data: 'url',
                title: "Adres URL",
                render: function(url, type, row) {
                    return '<a href="http://' + url + '" title="Zobacz witrynę" target="_blank">' + url + '</a>'
                }
            },
            {
                data: 'status_code',
                title: "Stan usługi",
                render: function(code, type, row) {
                    NOT_DEFINED_STATUS = false;
                    // just added pages has no defined status, it needs to be checked
                    if (code == "" || code == null || code == undefined) {
                        NOT_DEFINED_STATUS = true;
                    }

                    if (NOT_DEFINED_STATUS) {
                        return '<span><i class="fa fa-question-circle" aria-hidden="true"></i> Nie określono</span>';
                    } else if ((code >= 400 && code < 600) || code == 310 || code < 0) {
                        //$(tableRow).addClass('table-danger');
                        notWorkingCount++;
                        return '<span class="not-working-text"><i class="fa fa-times-circle" aria-hidden="true"></i> Nie działa</span><br><small>Od ' + row['last_working_time'] + '</small>';
                    } else {
                        workingCount++;
                        return '<span class="working-text"><i class="fa fa-check-circle" aria-hidden="true"></i> Działa</span>';
                    }
                },
            },
            {
                data: 'status_code',
                title: "Odpowiedź serwera",
                render: function(code, type, row) {
                    badgeClass = "badge-light"
                    if (code >= 100 && code < 200) {
                        // informations
                        badgeClass = "badge-primary";
                    } else if (code >= 200 && code < 300) {
                        // successes
                        badgeClass = "badge-success";
                    } else if (code >= 300 && code < 400) {
                        // redirections
                        badgeClass = "badge-info";
                    } else if (code >= 400 && code < 500) {
                        // client errors
                        badgeClass = "badge-warning";
                    } else if ((code >= 500 && code < 600) || (code == -1 || code == -2)) {
                        // server errors + DNS errors + unknown errors
                        badgeClass = "badge-danger";
                    }

                    return '<span class="badge ' + badgeClass + '">' + (code == null || code == undefined ? '-' : code) + '</span> <span class="status-code-description"><small>' + (row['short_desc'] == null ? "" : row['short_desc']) + '</small>' +
                        (code == null || code == undefined ? '' : ' <a data-toggle="popover" title="' + (row['short_desc'] == null ? "NULL" : (code + " - " + row['short_desc'])) + '" data-content="' + (row['long_desc'] == null ? "NULL" : row['long_desc']) + '" data-trigger="focus" href="#!"><i class="fa fa-question-circle" aria-hidden="true"></i></a>') +
                        '</span>';
                }
            },
            {
                data: 'last_response_time',
                title: "Czas odp.",
                render: function(time, type, row) {
                    return (time == null || time == undefined ? '-' : ('<i class="fa fa-clock-o" aria-hidden="true"></i> ' + time + " s"));
                }
            },
            {
                data: 'last_checked',
                title: "Ostatnie sprawdzenie",
                render: function(data, type, row) {
                    return '<span class="last-checked-time">' + data + '</span>';
                }
            },
            {
                title: "",
                render: function(data, type, row) {
                    return '<div class="btn-group" role="group" aria-label="options">' +
                        '<button type="button" title="Odśwież stan tej witryny" onclick="updateSinglePageStatus(this)" data-url=' + row['url'] + ' class="btn btn-sm btn-info refresh-page-status"><i class="fa fa-refresh" aria-hidden="true"></i></button>' +

                        '<button type="button" class="btn btn-sm btn-light view-stats-btn" title="Pokaż statystyki dla tej witryny"><i class="fa fa-pie-chart" aria-hidden="true"></i></button>' +

                        '<button type="button" title="Usuń tę witrynę z monitora" onclick="removePage(this)" data-id=' + row['site_id'] + ' class="btn btn-sm btn-danger remove-page"><i class="fa fa-times" aria-hidden="true"></i></button>' +
                        '</div>';
                }
            }
        ],
        order: [
            [2, "desc"]
        ],
        columnDefs: [{
            "orderable": false,
            "targets": [0, 6]
        }],
        language: {
            "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Polish.json"
        },
        select: true,
        drawCallback: function() {
            $('[data-toggle="tooltip"]').tooltip();
            $('[data-toggle="popover"]').popover();

            $(this.api().table().container()).on('click', function() {
                $('[data-toggle="tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();
            });
        },
        footerCallback: function(row, data, start, end, display) {

        }
    });

    $('#pages-count').html(lastStatusData.length);
    $('#working-count').html(workingCount);
    $('#not-working-count').html(notWorkingCount);


    /*$("#service-status-table tbody tr td input[type=checkbox]").on('click', function() {
        $(this).parent().parent().toggleClass("selected-row");
    });*/

    var bottomToolbar = document.createElement("div");
    $(bottomToolbar).attr("class", "row");
    $(bottomToolbar).attr("id", "bottom-table-toolbar");

    var bottomToolbarLeft = document.createElement("div");
    var bottomToolbarRight = document.createElement("div");

    $(bottomToolbarLeft).attr("class", "col-sm-8");
    $(bottomToolbarLeft).html(
        '<form id="selected-items-action-form">' +
        '<input type="checkbox" id="select-all" name="select-all"> Zaznacz wszystkie widoczne<br>' +
        '<label for="selected-items-action">Z zaznaczonymi: </label>' +
        '<select class="form-control form-control-sm" name="selected-items-action" id="selected-items-action">' +
        '<option selected="selected">Wybierz działanie</option>' +
        '<option>Usuń</option>' +
        '</select>' +
        '<button type="submit" class="btn btn-primary btn-sm ml-2">Potwierdź</button>' +
        '</form>'
    );
    $(bottomToolbarRight).attr("class", "col-sm-4");
    $(bottomToolbarRight).html('<button id="refresh-pages-status" type="button" onclick="updatePagesStatus(this)" class="btn btn-info pull-right my-2"><i class="fa fa-refresh" aria-hidden="true"></i> Odśwież stan witryn teraz!</button>');

    $(bottomToolbar).append(bottomToolbarLeft);
    $(bottomToolbar).append(bottomToolbarRight);

    $("#service-status-table").parent().append(bottomToolbar);


    $('#select-all').on('change', function() {
        if ($('#select-all:checked').length > 0) {
            // check all in table
            $('.select-site').attr('checked', true);
        } else {
            // uncheck all in table
            $('.select-site').attr('checked', false);
        }
    });

    $('#selected-items-action-form').on('submit', function(e) {
        e.preventDefault();
        $('.select-site:checkbox:checked').each(function() {
            let site_id = $(this).attr("data-id");
            let checkbox = $(this);

            removePageRequest(site_id)
                .then(function() {
                    let pagesCount = $('#pages-count').html();
                    $('#pages-count').html(pagesCount - 1);
                    datatable.row($(checkbox).closest('tr')).remove().draw();
                    console.log("usunieto strone o id: " + site_id);
                })
                .catch(function(err) {
                    alert("Wystąpił błąd podczas usuwania witryny!");
                    console.log(err);
                });
        });
    });
}

function removePageRequest(site_id) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'engine/controller.php?action=removePage',
            data: {
                'id': site_id
            },
            type: 'post',
            success: function() {
                resolve();
            },
            error: function(xhr, status) {
                reject(status);
            }
        });
    });
}

function removePage(btn) {
    let site_id = $(btn).attr('data-id');
    let site_url = $(btn).parent().find('.refresh-page-status').attr('data-url');

    if (!confirm("Czy na pewno usunąć witrynę " + site_url + " z monitora?")) {
        return;
    }

    let lastCheckedTimeText = $(btn).parent().find('.last-checked-time');

    $(btn).attr('disabled', 'disabled');
    $(lastCheckedTimeText).html("Usuwanie...");

    removePageRequest(site_id)
        .then(function(res) {
            $(btn).removeAttr('disabled');
            let pagesCount = $('#pages-count').html();
            $('#pages-count').html(pagesCount - 1);

            datatable.row($(btn).closest('tr')).remove().draw();
            //alert("Witryna o adresie: " + site_url + " została pomyślnie usunięta.");

        })
        .catch(function(err) {
            alert("Wystąpił błąd podczas usuwania witryny!");
        });
}

function updatePagesStatusRequest() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'engine/controller.php?action=refreshAllPagesStatus',
            type: 'post',
            success: function() {
                resolve();
            },
            error: function(xhr, status) {
                reject(status);
            }
        });
    });
}

function updatePagesStatus(btn) {

    var text = $(btn).html();

    $(btn).attr('disabled', 'disabled');
    $(btn).html("<i class='fa fa-refresh fa-spin fa-fw'></i> Proszę czekać...");

    datatable.rows().every(function() {
        let data = this.data();
        data['last_checked'] = "<i class='fa fa-refresh fa-spin fa-fw'></i> Odświeżanie...";
        this.data(data).invalidate();
    });

    updatePagesStatusRequest()
        .then(function() {
            //alert("Aktualizowanie stanu witryn zakończone.");
            $(btn).html(text);
            $(btn).removeAttr('disabled');

            getLastAllPagesStatusData()
                .then(function(res) {
                    let i = 0;
                    datatable.rows().every(function() {
                        this.data(res[i]);
                        i++;
                    });

                    datatable.draw();
                })
                .catch(function(err) {
                    console.log("Promise error");
                    $('#service-status-table-wrapper').html("<p class='text-center'>Wystąpił błąd podczas pobierania danych do wyświetlenia.</p>");
                    console.log(err);
                });
        })
        .catch(function(err) {
            alert("Sorry, there was a problem!");
            console.log(err);
        });
}


function updateSinglePageStatusRequest(url) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'engine/controller.php?action=refreshSinglePageStatus',
            data: {
                'url': url
            },
            type: 'post',
            success: function() {
                resolve();
            },
            error: function(xhr, status) {
                reject(status);
            }
        });
    });
}

function updateSinglePageStatus(btn) {

    let url = $(btn).attr('data-url');
    //console.log("refresh status for: " + url);
    let getRowIndex = function() {
        return datatable.row($(btn).closest('tr')).index();
    };

    console.log("refresh status for: " + url);
    $(btn).attr('disabled', 'disabled');
    $(btn).closest('tr').find('.last-checked-time').html("<i class='fa fa-refresh fa-spin fa-fw'></i> Odświeżanie...");

    updateSinglePageStatusRequest(url)
        .then(function() {
            console.log("ajax success for " + url)
            getLastPageStatusData(url)
                .then(function(res) {
                    $(btn).removeAttr('disabled');
                    console.log("Replacing data in row " + getRowIndex() + " for url: " + url);
                    datatable.row(getRowIndex()).data(res[0]).invalidate();
                })
                .catch(function() {
                    console.log("Promise error");
                    //$(btn).closest('tr').find('.last-checked-time').html("<span style='color: red'></span>Wystąpił błąd podczas odświeżania witryny!");
                });

        }).catch(function(err) {
            $(btn).closest('tr').find('.last-checked-time').html("<span style='color: red'></span>Wystąpił błąd podczas odświeżania witryny!");
            console.log(err);
        });
}