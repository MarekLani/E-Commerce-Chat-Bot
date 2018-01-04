import appInsights = require("applicationinsights");

//Set Log Auto Collection
appInsights.setup('InstrumentationKey')
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .start();
	
// Helper for manual log collections
var appInsightsClient = appInsights.getClient('InstrumentationKey');

export =  
{
    trackException: function(session,error)
    {
        appInsightsClient.trackException(error);
    },

    trackTrace: function(resumeAfterPromptTelemetry, message)
    {
        appInsightsClient.trackTrace(message, resumeAfterPromptTelemetry);
    },
    
    trackEvent: function(measuredEventTelemetry, eventName)
    {
        appInsightsClient.trackEvent(eventName, measuredEventTelemetry);
    },
    
    trackRequest: function(req, res)
    {
        appInsightsClient.trackRequest(req, res);
    }
}