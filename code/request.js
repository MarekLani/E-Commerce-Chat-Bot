 showCart: function (session) {
        return new Promise((resolve, reject) => {
            //check validity of authentication token, if invalid refresh
            checkTokenValidity(session).then(function (result) {
                //getData
                if (result) {
                    var storedToken = session.userData.token;
                    if (storedToken) {
                        var res = rp(BackendUrl + '/basket', { headers: { 'Authorization': 'Bearer ' + storedToken, 'ApiKey':API_KEY } })
						
                        res.then(function (err, result) {
                            if (err)
                                return reject(err);
                            return resolve(result);
                        });
                    }
                    else return reject("token error")
                }
            });
        });
    }