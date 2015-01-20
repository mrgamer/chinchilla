var $ = require('jquery');

// parseHash retrives the access_token from the URL hash
function parseHash() {
  var accessTokenregex = /access_token=([\s\S]{64}).*(uid=\d*)/;
  var regexResult;
  if (regexResult = accessTokenregex.exec(window.location.hash), regexResult.length === 3) {
    return {
      accessToken: regexResult[1],
      uid: regexResult[2]
    };
  }
}

function openDropBoxAuth() {
  var DropboxAuthURL = 'https://www.dropbox.com/1/oauth2/authorize';
  window.location.href = DropboxAuthURL + '?client_id=pe3r68lcz7jt12e' + '&response_type=token' + '&redirect_uri=' + window.location.href;
}

$.ready(function () {
  var h1 = $('#jsMessage');
  var authBtn = $('#chiAuth');
  // In case the page has an hash, check if it's valid
  if (window.location.hash !== '') {
    if (AT = parseHash(), !!AT) {
      h1.text('Access Token received!');
      // TODO: call server!
    } else { // bad hash, clear it
      window.location.hash = '';
      h1.text('Access Token provided was BAD :(');
      setTimeout(function () { h1.text(''); }, 5000);
    }
  }

  var chiUserID;
  if (chiUserID = localStorage.getItem('user'), !!chiUserID) {
    // TODO: AJAX TO VALIDATE chiUserID
    h1.text('Wow you\'re an actual user, that\'s.. just...WOW!');
  }
  authBtn.on('click', openDropBoxAuth);
});
