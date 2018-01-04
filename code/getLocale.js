global.getLocale = function(session)
{
   var locale = session.preferredLocale()
	//currently support only for sk or en, we choose en for every other locales as Facebook Messenger sets preferredLocale to user's default language
	if (locale != 'sk')
		locale = 'en';
	return locale;
}