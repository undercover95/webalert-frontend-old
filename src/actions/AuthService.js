import Dispather from '../Dispatcher';

const axios = require('axios');
const qs = require('qs');

const config = require('./config.json');
const apihost = config['apihost'];

const getHeaders = () => {
    return {
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }
}

export function registerUser(userData) {
    let data = qs.stringify({
        'password': userData.get('password'),
        'password2': userData.get('password2'),
        'email': userData.get('email'),
        'recaptchaResponse': userData.get('g-recaptcha-response')
    });

    axios.post(apihost + '/register', data, getHeaders())
        .then((res) => {
            Dispather.dispatch({
                type: 'REGISTER_REQUEST_COMPLETED',
                data: res
            })
        })
        .catch(
            (err) => {
                if (err.response) {
                    if (err.response.status == 403) alert('Nie można wykonać akcji registerUser! Nie jesteś zalogowany!')
                }
                else console.log('AXIOS registerUser FAILED', err)
            });
}

export function loginUser(userData) {
    let data = qs.stringify({
        'mail': userData.get('mail'),
        'password': userData.get('password')
    });

    axios.post(apihost + '/login', data, getHeaders())
        .then((res) => {

            Dispather.dispatch({
                type: 'LOGIN_REQUEST_COMPLETED',
                data: res
            })
        })
        .catch(
            (err) => {
                if (err.response) {
                    if (err.response.status == 403) alert('Nie można wykonać akcji loginUser! Nie jesteś zalogowany!')
                }
                else console.log('AXIOS loginUser FAILED', err)
            });
}

export function logoutUser() {
    localStorage.removeItem('authToken');

    localStorage.removeItem('siteData');
    localStorage.removeItem('statsData');
    localStorage.removeItem('checkedSites');
}

/*export function checkIfUserIsLogged() {
  axios.get(apihost + '/checkIfUserIsLogged', getHeaders())
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch(
      (err) => {
        console.log('AXIOS checkIfUserIsLogged FAILED', err)
      });
}*/

export function getToken() {
    return localStorage.getItem('authToken')
}