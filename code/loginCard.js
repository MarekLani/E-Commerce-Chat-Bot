login: function (session) {
	var locale = getLocale(session);
	//using messenger native card template
	var message = new builder.Message(session)
		.sourceEvent({
		facebook: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'generic',
					elements: [{
							title: session.localizer.gettext(locale, "eshopLogin"),
							// image_url: FRONTEND_URL + '/static/linking.png',
							buttons: [{
									type: 'account_link',
									url: LOGIN_URL
								}]
						}]
				}
			}
		}
	});
	session.endDialog(message);
}