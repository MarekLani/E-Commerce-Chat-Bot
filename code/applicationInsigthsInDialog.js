var rp = require('request-promise')
import ac = require('./../APICommunicator');
import cardsModule = require('../cards')
import builder = require('botbuilder');
import aic = require('./../appInsightsClient');
var telemetryModule = require('./../telemetryModule');

 

 module.exports = function(bot){
    bot.dialog('/showCategories',[
        function(session, args,next)
        {   
            var locale = getLocale(session);        
            session.sendTyping();
            
            res =  ac.showCategories(session)
            res.then(function(result)
            {
                //process resposne
				...

				//create json eventTelemetry
                var eventTelemetry = telemetryModule.createTelemetry(session);
                aic.trackEvent(eventTelemetry,'ShowCategories');
            },
            function(err)
            {
                var message = session.localizer.gettext(locale, "categoriesError");
                var reply = cardsModule.CreateReplyWithMenuActions(session,message);
                
				//track and end dialog
				session.endDialog(reply);
                aic.trackException(session,err);
            })
            .catch(err => {
               var message = session.localizer.gettext(locale, "categoriesError");
               var reply = cardsModule.CreateReplyWithMenuActions(session,message);
               
			   //track and end dialog
			   session.endDialog(reply);
               aic.trackException(session,err);
            });
        }
    ]);
 };