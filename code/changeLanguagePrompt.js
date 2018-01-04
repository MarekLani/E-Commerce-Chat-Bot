 bot.dialog('/changeLanguage',[
        function (session) {
            var locale = getLocale(session);
            // Prompt the user to select their preferred locale
            builder.Prompts.choice(session, session.localizer.gettext(locale, "language"), session.localizer.gettext(locale, "languageOptions"));
    },
    function (session, results) {
        // Update preferred locale
        var locale;
        switch (results.response.entity) {
            case session.localizer.gettext(locale, "enoption"):
                locale = 'en';
                break;
            case session.localizer.gettext(locale, "skoption"):
                locale = 'sk';
                break;
        }
        session.preferredLocale(locale, function (err) {
            if (!err) {
                // Locale files loaded
                session.endDialog(session.localizer.gettext(locale, "preferedLanguage"), results.response.entity);
            } else {
                // Problem loading the selected locale
                session.error(err);
            }
        });
    }