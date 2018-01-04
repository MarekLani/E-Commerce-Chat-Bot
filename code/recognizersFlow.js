var commands = require('./recognizers/commands');
...
var intents = new builder.IntentDialog({
    recognizers: [
        commands,
        new builder.RegExpRecognizer("showCart", { sk: /^((zobraz(i(t|t))?|uk(á|a)(z|ž)(a(t|t))?)\s*)?(n(a|á)kupn(y|ý)\s*)?(ko(š|s)(í|i)k)/i, en: /^((shopping\s*)?cart)/i }),
        new builder.RegExpRecognizer("faqSearch", { sk: /^((c|c)asto kladen(e|é) ot(a|á)zky|faq)/i, en: /^(frequently asked questions|faq)/i }),
        new builder.RegExpRecognizer("login", { sk: /^(login|prihl(a|á)si(t|t)(\s*sa)?|prihl(a|á)senie)/i, en: /^(login)/i }),
        ...other regexp recognizes
        otherCustomRecognizers
    ],
    intentThreshold: 1,
    recognizeOrder: builder.RecognizeOrder.series
});

bot.dialog('/', intents);