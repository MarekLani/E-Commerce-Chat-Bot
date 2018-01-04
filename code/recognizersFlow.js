var commands = require('./recognizers/commands');
...
var intents = new builder.IntentDialog({
    recognizers: [
        commands,
        new builder.RegExpRecognizer("showCart", { sk: /^((zobraz(i(t|t))?|uk(�|a)(z|�)(a(t|t))?)\s*)?(n(a|�)kupn(y|�)\s*)?(ko(�|s)(�|i)k)/i, en: /^((shopping\s*)?cart)/i }),
        new builder.RegExpRecognizer("faqSearch", { sk: /^((c|c)asto kladen(e|�) ot(a|�)zky|faq)/i, en: /^(frequently asked questions|faq)/i }),
        new builder.RegExpRecognizer("login", { sk: /^(login|prihl(a|�)si(t|t)(\s*sa)?|prihl(a|�)senie)/i, en: /^(login)/i }),
        ...other regexp recognizes
        otherCustomRecognizers
    ],
    intentThreshold: 1,
    recognizeOrder: builder.RecognizeOrder.series
});

bot.dialog('/', intents);