var express = require('express')
const jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');
var request = require('request');
var app = express()

var mysql = require('mysql')
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
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
  if (err) {
    console.log('Cannot connect with database!');
    throw err;
  }
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

var port = process.env.PORT || config.api_port;

app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
});



// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {

  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, 'secretkey', (err, authData) => {
      if (err) res.sendStatus(403);

      const user_id = authData.user.id;
      // check if user id exists
      const checkUserIdSql =
        'SELECT * FROM `users` WHERE `id`=\'' + user_id + '\' LIMIT 1';

      con.query(checkUserIdSql, (err, result) => {
        if (err) {
          res.sendStatus(500);
          throw err;
        } else if (result.length != 0) {
          // user exists
          // Set the token
          req.token = bearerToken;
          // Next middleware
          next();
        } else {
          // user id not exists
          res.sendStatus(403);
        }
      });
    });

  } else {
    // Forbidden
    res.sendStatus(403);
  }
}


const fixUrlFormat = (url) => {
  // fix url format
  if (url.startsWith('http') || url.startsWith('https')) {
    // good format, remove '/' from end of url if any is
    let lastChar = url.charAt(url.length - 1);
    if (lastChar == '/') url = url.slice(0, -1);
  } else {
    url = 'http://' + url;
    let lastChar = url.charAt(url.length - 1);
    if (lastChar == '/') url = url.slice(0, -1);
  }

  return url;
}

Array.prototype.contains = function (element) {
  return this.indexOf(element) > -1;
};


/* /////////////////// */
/* //// ENDPOINTS //// */
/* /////////////////// */

app.post('/login', (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;

  if (mail == undefined || password == undefined) {
    res.sendStatus(403);
  }

  let user = {}

  // check if user exists
  checkUserSql =
    'SELECT * FROM `users` WHERE `mail_address`=\'' + mail + '\' LIMIT 1';

  con.query(checkUserSql, function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    } else {
      if (result.length > 0) {
        // user exists
        user = result[0];

        if (passwordHash.verify(password, user.password)) {
          // password ok

          jwt.sign(
            { user }, 'secretkey',
            (err, token) => {  // fix expires and localstorage
              res.json({ token });
            });

        } else {
          res.json({ log_err: 'Nieprawidłowe hasło!' })
        }

      } else {
        res.json({ log_err: 'Nieprawidłowy login lub hasło!' });
      }
    }
  });
})

app.post('/register', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  const recaptcha = req.body.recaptchaResponse;

  let errors = {};

  if (email == '') {
    errors['email_err'] = 'Nie podano adresu e-mail!';
  } else {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      errors['email_err'] = 'Niepoprawny adres e-mail!';
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

  if (recaptcha == '') {
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
    res.json(errors);
    return;
  } else {
    // check if username already exists
    const checkUserSql =
      'SELECT * FROM `users` WHERE `mail_address`=\'' + email + '\' LIMIT 1';

    con.query(checkUserSql, (err, result) => {
      if (err) {
        res.sendStatus(500);
        throw err;
      } else if (result.length != 0) {
        errors['email_err'] =
          'Użytkownik o podanym adresie e-mail już istnieje. Proszę wybrać inny adres e-mail.';
        res.json(errors);
        return;
      }

      const addUserSql =
        'INSERT INTO `users` (`mail_address`,`password`) VALUES(\'' +
        email + '\', \'' + passwordHash.generate(password) + '\')';

      con.query(addUserSql, (err, result) => {
        if (err) {
          res.sendStatus(500);
          throw err;
        }
        else {
          res.json({
            res: true
          });
        }
      });
    });
  }
})

app.get('/getLastAllPagesStatus', verifyToken, function (req, res) {

  const user_id = jwt_decode(req.token).user.id;
  const getPagesSql =
    'SELECT site.`url`, last_status.*, `status_codes`.`short_desc`,`status_codes`.`long_desc` FROM `pages` site JOIN `pages_status` last_status ON site.`id` = last_status.`site_id` AND site.`user_id` = ' + user_id + ' LEFT JOIN `status_codes` ON `status_codes`.`status_code`=`last_status`.`status_code` LEFT JOIN `pages_status` not_last_status ON ( site.`id` = `not_last_status`.`site_id` AND last_status.`last_checked` < not_last_status.`last_checked` ) WHERE not_last_status.`site_id` IS NULL ORDER BY status_code, site.`url` ';

  con.query(getPagesSql, function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json({ 'result': result });
  });
})

app.post('/getLastPageStatus', verifyToken, function (req, res) {

  const site_id = req.body.id;
  const user_id = jwt_decode(req.token).user.id;

  const getLastPageStatusSql =
    'SELECT `pages`.`url`, `pages_status`.*, `status_codes`.`short_desc`,`status_codes`.`long_desc` FROM `pages`,`pages_status` LEFT JOIN `status_codes` ON `status_codes`.`status_code`=`pages_status`.`status_code` WHERE `pages_status`.`site_id`=`pages`.`id` AND `pages`.`id`=\'' +
    site_id + '\' AND `pages`.`user_id`=' + user_id + ' ORDER BY `last_checked` DESC LIMIT 1';

  con.query(getLastPageStatusSql, function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    else
      res.json({ 'result': result });
  });
})

app.post('/addSinglePage', verifyToken, function (req, res) {

  let url = fixUrlFormat(req.body.url);
  const user_id = jwt_decode(req.token).user.id;

  let currentPages = [];
  let getPagesSql = 'SELECT `url` FROM `pages` WHERE `user_id`=' + user_id;
  con.query(getPagesSql, function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    else {
      result.map(dataRow => {
        currentPages.push(dataRow['url'])
      })

      // remove duplicates
      if (!currentPages.contains(url)) {
        const addPageSql = 'INSERT INTO `pages` (`url`, `user_id`) VALUES (\'' + url + '\', ' + user_id + ')';

        con.query(addPageSql, function (err, result) {
          if (err) {
            res.sendStatus(500);
            throw err;
          }
          else
            res.json({ result: true });
        });
      } else {
        res.json({ result: false });
      }
    }
  });

})

app.post('/addMultiplePages', verifyToken, function (req, res) {

  const sites = req.body.sites;
  const user_id = jwt_decode(req.token).user.id;

  let currentPages = [];
  let getPagesSql = 'SELECT `url` FROM `pages` WHERE `user_id`=' + user_id;

  con.query(getPagesSql, function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    else {
      result.map(dataRow => {
        currentPages.push(dataRow['url'])
      });

      let nonAddedPages = [];

      sites.forEach(url => {

        url = fixUrlFormat(url);

        // remove duplicates
        if (currentPages.contains(url)) {
          nonAddedPages.push(url);
          return;
        } else {
          let insertPageSql = 'INSERT INTO `pages` (`url`, `user_id`) VALUES (\'' + url + '\', ' + user_id + ')';

          con.query(insertPageSql, function (err, result) {
            if (err) {
              res.sendStatus(500);
              throw err;
            }
          });
        }
      });

      res.json({ 'errors': nonAddedPages });
    }
  });

})

app.post('/removePage', verifyToken, function (req, res) {

  const id = req.body.id;
  const user_id = jwt_decode(req.token).user.id;

  if (id != undefined) {
    const removePageSql = 'DELETE FROM `pages` WHERE `pages`.`id`=' + id + ' AND `pages`.`user_id`=' + user_id;

    con.query(removePageSql, function (err, result) {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      else
        res.json({ result: true });
    });
  } else
    res.json({ result: false });

})

app.get('/refreshAllPagesStatus', verifyToken, function (req, res) {

  const user_id = jwt_decode(req.token).user.id;

  exec('/usr/bin/python updatePagesStatus.py -u ' + user_id + ' > update_all_user_' + user_id + '.log 2>&1', function (err, stdout, stderr) {
    if (err) {
      res.sendStatus(500);
      //console.log('err', stderr);
      res.send(err);
    } else {
      //console.log('no err', stdout);
      res.send(stdout.toString())
    }
  });

})


app.post('/refreshSinglePageStatus', verifyToken, function (req, res) {

  const site_id = req.body.id;
  const user_id = jwt_decode(req.token).user.id;

  exec('/usr/bin/python updatePagesStatus.py -u ' + user_id + ' ' + site_id + ' > update_single_user_' + user_id + '.log 2>&1', function (err, stdout, stderr) {
    if (err) {
      res.sendStatus(500);
      // console.log("err", stderr);
      res.json({ result: false });
    } else {
      // console.log("no err", stdout);
      res.send(stdout.toString())
    }
  });

})


app.post('/getResponseTimeForPeriod', verifyToken, function (req, res) {

  const site_id = req.body.id;
  const period = req.body.period;
  const user_id = jwt_decode(req.token).user.id;

  const getResponseTimeSql =
    'SELECT * FROM `pages_status` LEFT JOIN `pages` ON `pages`.`id`=`site_id` WHERE `pages`.`id`=\'' + site_id + '\' AND `pages_status`.`last_checked`>=DATE_SUB(NOW(),INTERVAL ' + period + ' HOUR) AND `pages`.`user_id`=' + user_id;

  con.query(getResponseTimeSql, function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    else
      res.json({ 'result': result });
  });

})