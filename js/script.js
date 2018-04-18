function getElapsedTime(time) {
    var now = new Date();
    var ago = new Date(time);

    console.log("now " + now);
    console.log("ago " + ago);

    var diff = now - ago; // miliseconds
    diff /= 1000; // convert to seconds

    var seconds = Math.round(diff % 60);
    var minutes = Math.round(Math.floor(diff / 60) % 60); // remove seconds and get minutes
    var hours = Math.round(Math.floor(diff / 60) % 24); // remove minutes and get hours

    var strings = {
        'y': 'lat',
        'm': 'mies.',
        'w': 'tyg.',
        'd': 'dni',
        'h': 'godz.',
        'i': 'min.',
        's': 'sek.'
    }

    var result = "";
    result += hours + ' ' + strings['h'] + ' ' + minutes + ' ' + strings['i'] + ' ' + seconds + ' ' + strings['s'] + " temu";



    return result;
}


function arrayToStr(array, separator) {
    var res = "";
    array.forEach(function(elem) {
        res += elem + separator + " ";
    });

    return res.substr(0, res.length - 2);
}

$(document).ready(function() {

    //$('[data-toggle="popover"]').popover();

    getLastAllPagesStatusData()
        .then(function(res) {
            displayPagesStatus(res);
        })
        .catch(function(err) {
            console.log("Promise error");
            $('#service-status-table-wrapper').html("<p class='text-center'>Wystąpił błąd podczas pobierania danych do wyświetlenia.</p>");
            console.log(err);
        });



    // formularz do dodawania pojedynczej strony
    $('#add-single-page-form').on('submit', function(e) {
        e.preventDefault();

        // TO DO: zrobic obsluge bledow
        var formData = $(this).serializeArray();
        var site_url = formData[0].value;
        if (site_url == "") return;

        /*var checkUrl = function(str) {
            var pattern = new RegExp('/^(https?:\/\/)?' + // protocol
                '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|' + // domain name
                '((\d{1,3}\.){3}\d{1,3}))' + // OR ip (v4) address
                '(\:\d+)?(\/[-a-z\d%_.~+]*)*' + // port and path
                '(\?[;&a-z\d%_.~+=-]*)?' + // query string
                '(\#[-a-z\d_]*)?$/', 'i'); // fragment locater
            if (!pattern.test(str)) {
                return false;
            } else {
                return true;
            }
        }*/

        /*if (!checkUrl(site_url)) {
            let alertContent = 'Podany adres "' + site_url + '" jest niepoprawny. Wprowadź prawidłowy adres URL.';
            $('#add-single-page-results').html("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Zamknij'><span aria-hidden='true'>&times;</span></button>" + alertContent + "</div>");
            $('#add-single-page-results').fadeIn(500);
            return;
        }*/

        $.ajax({
            url: 'engine/controller.php?action=addSinglePage',
            data: {
                'url': site_url
            },
            type: 'post',
            beforeSend: function() {
                $('#add-single-page-results').html('<p><i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Trwa dodawanie strony <strong>"' + site_url + '"</strong> do monitora...</p>');
                $('#add-single-page-results').fadeIn(500);
            },
            success: function(data) {
                let alertContent = 'Pomyślnie dodano stronę <strong>"' + site_url + '"</strong> do monitora.';
                $('#add-single-page-results').html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Zamknij'><span aria-hidden='true'>&times;</span></button>" + alertContent + "</div>");
                $('#add-single-page-results').fadeIn(500);
            },
            error: function(xhr, status) {
                let alertContent = 'Dodanie strony "' + site_url + '" do monitora nie powiodło się!<br>Prawdopodobnie strona już istnieje w monitorze lub wystąpił błąd serwera.';
                $('#add-single-page-results').html("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Zamknij'><span aria-hidden='true'>&times;</span></button>" + alertContent + "</div>");
                $('#add-single-page-results').fadeIn(500);
            },
            complete: function() {
                setTimeout(function() {
                    $('#add-single-page-results').fadeOut(500);
                    $('#add-single-page-results').html("");
                }, 5000);
            }
        });
    });


    // formularz do dodawania wielu stron
    $('#add-multiple-pages-form').on('submit', function(e) {
        e.preventDefault();

        // TO DO: zrobic obsluge bledow

        var input = document.getElementById('addPagesInput');
        var inputStr = $(input).val();
        if (inputStr == "") return;

        var pages_array = inputStr.split(',');
        var pages = [];

        pages_array.forEach(function(page) {
            pages.push(page.replace(/\s/g, ''));
        });


        $.ajax({
            url: 'engine/controller.php?action=addMultiplePages',
            data: {
                'sites': pages
            },
            type: 'post',
            dataType: 'json',
            beforeSend: function() {
                $('#add-multiple-pages-results').html('<p><i class="fa fa-circle-o-notch fa-spin fa-fw"></i> Trwa dodawanie <strong>' + pages.length + '</strong> stron do monitora...</p>');
                $('#add-multiple-pages-results').fadeIn(500);
            },
            success: function(data) {
                $('#add-multiple-pages-results').html('');
                let alertContent;

                if (data["errors"].length == 0) {
                    alertContent = "Pomyślnie dodano <strong>" + pages.length + "</strong> stron do monitora.";

                    $('#add-multiple-pages-results').html("<div class='alert alert-success alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Zamknij'><span aria-hidden='true'>&times;</span></button>" + alertContent + "</div>");

                    $('#add-multiple-pages-results').fadeIn(500);

                } else {

                    if (data["errors"].length != pages.length) {
                        alertContent = "Pomyślnie dodano <strong>" + (pages.length - data["errors"].length) + "</strong> stron do monitora.";

                        alertContent += "<br><br>Dodanie stron <strong>" + arrayToStr(data["errors"], ',') + "</strong> do monitora nie powiodło się!<br>Prawdopodobnie strony istnieją już w monitorze lub wystąpił błąd serwera.";

                        $('#add-multiple-pages-results').append("<div class='alert alert-warning alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Zamknij'><span aria-hidden='true'>&times;</span></button>" + alertContent + "</div>");

                        $('#add-multiple-pages-results').fadeIn(500);
                    } else {
                        $('#add-multiple-pages-results').append("<div class='alert alert-danger alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Zamknij'><span aria-hidden='true'>&times;</span></button>" + alertContent + "</div>");

                        $('#add-multiple-pages-results').fadeIn(500);
                    }
                }
            },
            error: function(xhr, status) {
                alert("Błąd podczas dodawania stron do monitora!");
            }
        });

    });


    // formularz do logowania
    $('#login-form').on('submit', function(e) {
        e.preventDefault();

        $("#invalid_data_err_container").html('');
        $("#invalid_data_err_container").hide();

        var formData = $(this).serializeArray();

        console.log(formData);
        // TO DO: zaszyfrowanie informacji header
        console.log("ajax submit");
        $.ajax({
            url: 'engine/controller.php?action=login',
            data: formData,
            dataType: "json",
            type: 'post',
            beforeSend: function() {
                $('#login-form-submit').attr('disabled', 'disabled');
                $('#login-form-submit').html("<i class='fa fa-circle-o-notch fa-spin fa-fw'></i> Logowanie...");
            },
            success: function(data) {
                console.log("received");
                console.log(data);
                if (data.length != 0) {
                    $.each(data, function(key) {
                        if (key == "log_err") {
                            $("#invalid_data_err_container").html('<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + data[key] + '</div>');
                            $("#invalid_data_err_container").show();
                        }
                    });
                } else {
                    console.log("przeszło!");
                    window.location.replace("/monitor_stron/");
                }
            },
            error: function(xhr, status, text) {
                alert("Logowanie nie powiodło się.");
                console.log(status)
                console.log(text);
            },
            complete: function() {
                $('#login-form-submit').html("Zaloguj");
                $('#login-form-submit').removeAttr('disabled');
            }
        });
    });

    // registration form service
    $('#register-form').on('submit', function(e) {
        e.preventDefault();

        $("#user_err_container").html('');
        $("#user_err_container").hide();

        $("#password_err_container").html('');
        $("#password_err_container").hide();

        $("#email_err_container").html('');
        $("#email_err_container").hide();

        $("#captcha_err_container").html('');
        $("#captcha_err_container").hide();

        $("#invalid_data_err_container").html('');
        $("#invalid_data_err_container").hide();

        $.ajax({
            url: 'engine/controller.php?action=register',
            data: $(this).serializeArray(),
            dataType: "json",
            type: 'post',
            beforeSend: function() {
                $('#registration-form-submit').attr('disabled', 'disabled');
                $('#registration-form-submit').html("<i class='fa fa-circle-o-notch fa-spin fa-fw'></i> Rejestrowanie...");
            },
            success: function(data) {
                if (data.length != 0) {
                    grecaptcha.reset();
                    $.each(data, function(key) {
                        console.log(data[key]);
                        if (key == "user_err") {
                            $("#user_err_container").html('<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + data[key] + '</div>');
                            $("#user_err_container").show();
                        } else if (key == "password_err") {
                            $("#password_err_container").html('<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + data[key] + '</div>');
                            $("#password_err_container").show();
                        } else if (key == "email_err") {
                            $("#email_err_container").html('<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + data[key] + '</div>');
                            $("#email_err_container").show();
                        } else if (key == "captcha_err") {
                            $("#captcha_err_container").html('<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + data[key] + '</div>');
                            $("#captcha_err_container").show();
                        } else if (key == "reg_err") {
                            $("#invalid_data_err_container").html('<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + data[key] + '</div>');
                            $("#invalid_data_err_container").show();
                        }

                    });
                } else window.location.replace("register_success.php");
            },
            error: function(xhr, status, text) {
                alert("Rejestracja nie powiodła się.");
                console.log(text);
            },
            complete: function() {
                $('#registration-form-submit').html("Zarejestruj");
                $('#registration-form-submit').removeAttr('disabled');
            }
        });
    });

    //deleteCookie('sidebarHided');
    //console.log(getCookie('sidebarHided'));
    if (getCookie('sidebarHided') == 1) {
        console.log("init cookie");
        $('.sidebar').hide();
        $('.content').css("margin-left", "0px");
        //$('.content').css("max-width", "1200px");
        //$('.content').css('margin', "0px auto");
        $('#mobile-nav').css("visibility", "visible");
        $('#hide-sidebar-btn').html('<i class="fa fa-bars" aria-hidden="true"></i> <i class="fa fa-eye" aria-hidden="true"></i>');
        $('#hide-sidebar-btn').attr('title', 'Pokaż panel boczny');
    }

    $('#hide-sidebar-btn').on('click', function(e) {
        e.preventDefault();

        if (getCookie('sidebarHided') == 1) {
            $('.sidebar').show();
            $('.content').css("margin-left", $('.sidebar').width() + "px");
            //$('.content').css("max-width", "100%");
            $('#mobile-nav').css("visibility", "hidden");
            $(this).html('<i class="fa fa-bars" aria-hidden="true"></i> <i class="fa fa-eye-slash" aria-hidden="true"></i>');
            $(this).attr('title', 'Ukryj panel boczny');
            setCookie('sidebarHided', 0, 30);
        } else {
            $('.sidebar').hide();
            $('.content').css("margin-left", "0px");
            //$('.content').css("max-width", "1200px");
            //$('.content').css('margin', "0 auto");
            $('#mobile-nav').css("visibility", "visible");
            $(this).html('<i class="fa fa-bars" aria-hidden="true"></i> <i class="fa fa-eye" aria-hidden="true"></i>');
            $(this).attr('title', 'Pokaż panel boczny');
            setCookie('sidebarHided', 1, 30);
        }
        console.log(getCookie('sidebarHided'));
    });


    if (getCookie('welcomeInfoReaded') == 1) $('#welcome-info').remove();
    $('#welcome-info').on('closed.bs.alert', function() {
        setCookie('welcomeInfoReaded', 1);
    })


    $('#page-service-status').html('');

    for (let i = 0; i < 24; i++) {
        var serviceStatusIndicator = document.createElement('span');
        $(serviceStatusIndicator).addClass('serviceStatusIndicator');
        $('#page-service-status').append(serviceStatusIndicator);
    }



});