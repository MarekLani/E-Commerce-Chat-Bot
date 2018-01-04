server.use(restify.bodyParser());
server.post('/proactivemessage', function (req, res) {
    var address = req.body.address;
    var notification = req.body.notification;
    var msg = new builder.Message().address(address);
    msg.text(notification);
    bot.send(msg);
})