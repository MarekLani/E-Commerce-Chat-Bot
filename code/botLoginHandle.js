server.get('/authorize', restify.queryParser(), function (req, res, next) {
    if (req.query && req.query.redirect_uri && req.query.token) {
        var token = req.query.token;
        var refreshToken = req.query.refresh_token;
        var userName = req.query.user_name;
        // The authorization_code query string
        // argument is an arbitrary pass-through value that could be stored as well
        // to enable verifying it once Facebook sends the `Account Linking webhook event
        // In this case, we are passing the API token, refresh token and username via the authorization_code, while token server as verification value
        var redirectUri = req.query.redirect_uri + '&authorization_code=' + token + ';' + refreshToken + ';' + tokenGeneratedAt + ';' + userName;
        return res.redirect(redirectUri, next);
    } else {
        return res.send(400, 'Request did not contain redirect_uri token or username in the query string');
    }
});