var locale = getLocale(session);
session.send(session.localizer.gettext(locale, "LocalizedStringKey"));