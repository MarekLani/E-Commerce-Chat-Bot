import builder = require('botbuilder');
...

createCategoriesCards: function(session, jsonObject)
{
    var cards = [];
    var locale = getLocale(session);
    
    jsonObject.categories.forEach(function(item,index){

      var command = "@showProducts:"+item.slug;
        cards.push(new builder.HeroCard(session)
            .title(item.name)
            .text('')
            .images([new builder.CardImage().url(ac.BACKEND_URL+item.img).alt(item.name)])
            .buttons([
				//creates command postback button
                builder.CardAction.postBack(session, command, session.localizer.gettext(locale, "showProducts"))
            ])
        );       
      }); 
    return cards;
 }
