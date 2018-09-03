var express = require('express')
const jwt = require('jsonwebtoken');
var request = require('request');
var app = express()

var mysql = require('mysql')
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
const config = require('./config.json');

const dbconfig = config.db_props;
var con = mysql.createConnection({
  host: dbconfig['hostname'],
  user: dbconfig['username'],
  password: dbconfig['password'],
  database: dbconfig['db_name'],
  dateStrings: true
});

con.connect(function (err) {
  if (err)
    throw err;
  else
    console.log('Connected with database!');
});

app.use(bodyParser.json());  // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));  // support encoded bodies

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Host, Connection, Accept, Authorization, Content-Type, X-Requested-With, User-Agent, Referer, Methods');
  next();
});


var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
});



/* /////////////////// */
/* //// ENDPOINTS //// */
/* /////////////////// */

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username == undefined || password == undefined) {
    res.sendStatus(403);
  }


  let user = {}

  // check if user exists
  checkUserSql =
    'SELECT * FROM `users` WHERE `username`=\'' + username + '\' LIMIT 1';

  con.query(checkUserSql, function (err, result) {
    if (err) {
      console.log('QUERY ERR');
      throw err;
    } else {
      console.log('QUERY OK');
      if (result.length > 0) {
        // user exists
        user = result[0];

        if (user.password == password) {
          // password ok
          console.log('passwd ok')

          jwt.sign(
            { user }, 'secretkey',
            (err, token) => {  // fix expires and localstorage
              res.json({ token });
            });

        } else {
          console.log('passwd wrong')
          res.json({ log_err: 'Nieprawidłowe hasło!' })
        }

      } else {
        res.json({ log_err: 'Nieprawidłowy login lub hasło!' });
      }
    }
  });
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  console.log(req.headers)

  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.get('/checkIfUserIsLogged', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.json({ 'result': false });
    } else {
      res.json({ 'result': true });
    }
  });
});

app.post('/register', (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const email = req.body.email;
  const recaptcha = req.body.recaptchaResponse;

  let errors = {};

  if (username == '') {
    errors['user_err'] = 'Nie podano nazwy użytkownika!';
  } else {
    if (username.length >= 4 && username.length <= 50) {
      if (!/^[a-z0-9]+$/i.test(username)) {
        errors['user_err'] =
          'Nazwa użytkownika musi zawierać znaki alfanumeryczne!';
      }
    } else {
      errors['user_err'] = 'Nazwa użytkownika musi zawierać od 4 do 50 znaków!';
    }
  }

  if (password == '') {
    errors['password_err'] = 'Nie podano hasła!';
  } else {
    if (password.length < 8 || password.length > 20) {
      errors['password_err'] = 'Hasło musi zawierać od 8 do 20 znaków! ';
    } else if (password !== password2) {
      errors['password_err'] = 'Hasła nie są takie same!';
    }
  }

  if (email == '') {
    errors['email_err'] = 'Nie podano adresu e-mail!';
  } else {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      errors['email_err'] = 'Niepoprawny adres e-mail!';
    }
  }

  if (recaptcha != 'true') {
    errors['captcha_err'] = 'Nie zaznaczono captcha!';
  } else {
    let secretKey = '6Lc930YUAAAAAPMB6yeZbRA4J1mB1_D0opaXJifu';

    const verificationUrl =
      'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey +
      '&response=' + recaptcha + '&remoteip=' + req.connection.remoteAddress;

    request(verificationUrl, (error, response, body) => {
      body = JSON.parse(body);

      if (body.success !== undefined && !body.success) {
        errors['captcha_err'] = 'Jesteś botem! Wynocha!';
      }
    });
  }

  if (Object.keys(errors).length !== 0) {
    console.log('Sa bledy');
    res.json(errors);
    return;
  } else {
    console.log('check if username already exists');
    // check if username already exists
    const checkUserSql =
      'SELECT * FROM `users` WHERE `username`=\'' + username + '\' LIMIT 1';

    con.query(checkUserSql, (err, result) => {
      if (err) {
        throw err;
      } else if (result.length != 0) {
        errors['user_err'] =
          'Użytkownik o podanej nazwie już istnieje. Proszę wybrać inną nazwę.';
        res.json(errors);
        return;
      }

      const addUserSql =
        'INSERT INTO `users` (`username`,`password`,`mail_address`) VALUES(\'' +
        username + '\', \'' + password + '\', \'' + email + '\')';

      con.query(addUserSql, (err, result) => {
        if (err)
          throw err;
        else {
          console.log('zarejestrowano');
          res.json({});
        }
      });
    });
  }
})

app.get('/getLastAllPagesStatus', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const getPagesSql =
        'SELECT site.`url`, last_status.*, `status_codes`.`short_desc`,`status_codes`.`long_desc` FROM `pages` site JOIN `pages_status` last_status ON site.`id` = last_status.`site_id` LEFT JOIN `status_codes` ON `status_codes`.`status_code`=`last_status`.`status_code` LEFT JOIN `pages_status` not_last_status ON ( site.`id` = `not_last_status`.`site_id` AND last_status.`last_checked` < not_last_status.`last_checked` ) WHERE not_last_status.`site_id` IS NULL ORDER BY status_code, site.`url`';

      con.query(getPagesSql, function (err, result) {
        if (err)
          throw err;
        else
          res.json({ 'result': result });
      });
    }
  });
})

app.post('/getLastPageStatus', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const site_id = req.body.id;

      const getLastPageStatusSql =
        'SELECT `pages`.`url`, `pages_status`.*, `status_codes`.`short_desc`,`status_codes`.`long_desc` FROM `pages`,`pages_status` LEFT JOIN `status_codes` ON `status_codes`.`status_code`=`pages_status`.`status_code` WHERE `pages_status`.`site_id`=`pages`.`id` AND `pages`.`id`=\'' +
        site_id + '\' ORDER BY `last_checked` DESC LIMIT 1';

      con.query(getLastPageStatusSql, function (err, result) {
        if (err)
          throw err;
        else
          res.json({ 'result': result });
      });
    }
  });
})

app.post('/addSinglePage', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const url = req.body.url;

      const addPageSql = 'INSERT INTO `pages` (`url`) VALUES (\'' + url + '\')';

      con.query(addPageSql, function (err, result) {
        if (err)
          throw err;
        else
          res.json({ result: true });
      });
    }
  });
})

app.post('/addMultiplePages', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const sites = req.body.sites;

      let nonAddedPages = []

      sites.forEach(site => {
        let insertPageSql =
          'INSERT INTO `pages` (`url`) VALUES (\'' + site + '\')';

        con.query(insertPageSql, function (err, result) {
          if (err) nonAddedPages.push(site);
        });
      });

      res.json({ 'errors': nonAddedPages });
    }
  });
})

app.post('/removePage', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const id = req.body.id;

      if (id != undefined) {
        const removePageSql = 'DELETE FROM `pages` WHERE `pages`.`id` = ' + id;

        con.query(removePageSql, function (err, result) {
          if (err)
            throw err;
          else
            res.json({ result: true });
        });
      } else
        res.json({ result: false });
    }
  });
})

app.get('/refreshAllPagesStatus', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      exec('/usr/bin/python2 updatePagesStatus.py', function (err, stdout, stderr) {
        if (err) {
          //console.log('err', stderr);
          res.send(err);
        } else {
          //console.log('no err', stdout);
          res.send(stdout.toString())
        }
      });
    }
  });
})


app.post('/refreshSinglePageStatus', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const site_id = req.body.id;

      exec('/usr/bin/python2 updatePagesStatus.py ' + site_id, function (err, stdout, stderr) {
        if (err) {
          // console.log("err", stderr);
          res.json({ result: false });
        } else {
          // console.log("no err", stdout);
          res.send(stdout.toString())
        }
      });
    }
  });
})


app.post('/getResponseTimeForPeriod', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const site_id = req.body.id;
      const period = req.body.period;

      const getResponseTimeSql =
        'SELECT * FROM `pages_status` LEFT JOIN `pages` ON `pages`.`id`=`site_id` WHERE `pages`.`id`=\'' +
        site_id +
        '\' AND `pages_status`.`last_checked`>=DATE_SUB(NOW(),INTERVAL ' +
        period + ' HOUR)';

      con.query(getResponseTimeSql, function (err, result) {
        if (err)
          throw err;
        else
          res.json({ 'result': result });
      });
    }
  });
})



app.post('/getReports', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const period = req.body.period;

      const getReportsSql =
        'SELECT * FROM `reports` WHERE `generated_time`>=DATE_SUB(NOW(),INTERVAL ' +
        period + ' HOUR) ORDER BY `generated_time` DESC';

      con.query(getReportsSql, function (err, result) {
        if (err)
          throw err;
        else
          res.json({ 'result': result });
      });
    }
  });
})

app.post('/receiveReport', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const report_id = req.body.report_id;

      const receiveReportSql =
        'UPDATE `reports` SET `is_seen`=1 WHERE `id`=' + report_id;

      con.query(getReportsSql, function (err, result) {
        if (err) {
          throw err;
          res.json({ result: false });
        } else
          res.json({ result: true });
      });
    }
  });
})

app.get('/getNewReportsCounter', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const getNewReportsCounterSql =
        'SELECT count(*) as `counter` FROM `reports` WHERE `is_seen`=0';

      con.query(getNewReportsCounterSql, function (err, result) {
        if (err)
          throw err;
        else
          res.json({ 'result': result });
      });
    }
  });
})

app.get(
  '/runCheckingStatusPagesPeriodically', verifyToken, function (req, res) { })