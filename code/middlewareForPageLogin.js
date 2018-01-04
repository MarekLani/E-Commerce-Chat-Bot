bot.use({

    botbuilder: function (session, next) {
        session.sendTyping();
        //Check whether user is logged in on the eshop page
        if (!session.userData.token && (session.message.address.channelId === 'directLine')) {
            var data = session.message.user.userid.split(';')

            session.userData.token = data[0];
            session.userData.refreshToken = data[1];
            session.userData.tokenGeneratedAt = data[2];
        }
...
});