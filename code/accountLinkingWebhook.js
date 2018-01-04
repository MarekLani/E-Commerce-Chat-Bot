  ...
  //Account linking
  var accountLinking = session.message.sourceEvent.account_linking;
  if (accountLinking)
    // This is the handling for the `Account Linking webhook event` where we could
    // verify the authorization_code and that the linking was successful.
    var data = accountLinking.authorization_code;

    var authorizationStatus = accountLinking.status;
    if (authorizationStatus === 'linked') {
      var data = data.split(';');
      // Persist token and userName under the userData
      session.userData.token = data[0];
      session.userData.refreshToken = data[1];
      session.userData.tokenGeneratedAt = data[2];
      var name = data[3];
      session.userData.userName = name;
      var message = cards.CreateReplyWithMenuActions(session,session.localizer.gettext(locale, "loggedIn") + name);
      session.endDialog(message); 
      
	  //We need to save address for proactive messaging (send it to backend)
      am.saveAddress(session.message.address, data[0]);
      
      var eventTelemetry = telemetryModule.createTelemetry(session);
      aic.trackEvent(eventTelemetry,'AccountLinked');

    } else if (authorizationStatus === 'unlinked') {
      // Remove username from the userData
      delete session.userData.token;
      delete session.userData.userName;
      delete session.userData.tokenGeneratedAt;
      var message = cards.CreateReplyWithMenuActions(session,session.localizer.gettext(locale, "loggedOut"));
      session.endDialog(message); 
    } else {
      session.endDialog(session.localizer.gettext(locale, "loggedOutError"));
    }
    var eventTelemetry = telemetryModule.createTelemetry(session);
    aic.trackEvent(eventTelemetry,'AccountUnlinked');
  }

  ...
};