 logout: function(session){
          request({
                url: 'https://graph.facebook.com/v2.6/me/unlink_accounts',
                method: 'POST',
                qs: {
                    //You can obtain this in fb dev portal -> your bot app -> Products:Messenger -> settings
					access_token: 'FacebookPageAccessToken'  
                },
                body: {
                    psid: session.message.address.user.id
                },
                json: true
                }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    // In case of success no need to send anything to user
                    // since we respond only after
                    // we have received the account unlinking webhook
                    // event from Messenger
                    session.endDialog();
                } else {
                    var locale = getLocale(session);
                    session.endDialog(session.localizer.gettext(locale, "loggoutError"));
                }
            });
    }