const unrecognized = {
    entities: [],
    intent: null,
    intents: [],
    score: 0
};

const parse = {
    parse: function (context, text) {
        const parts = text.split(':').map(function(item) {
                        return item.trim();
                      });;
        const command = parts[0];

        console.log('Resolved [%s] as [%s] command', text, command);

        const action = this[command] || this[command.slice(1)];
        if (!action) {
            return unrecognized;
        } else {
            return action.call(this, context, parts.slice(1));
        }
    },
    showCart: () => ({
        intent: ("showCart"),
        score: 1
    }),
    showCategories: () => ({
        intent: ("showCategories"),
        score: 1
    }),
    showProducts: (context, parent) => ({
        entities: [{
            entity: parent,
            score: 1,
            type: 'Category'
        }],
        intent: ('showProducts'),
        score: 1
    }),
    addToCart: (context, parent) => ({
        entities: [{
            entity: parent,
            score: 1,
            type: 'AddToCartUrl'
        }],
        intent: ('addToCart'),
        score: 1
    }),
	//...other commands
};


module.exports = {
    recognize: function (context, callback) {
        const text = context.message.text;

        if (!text || (!text.startsWith('@')) {
            callback.call(null, null, unrecognized);
        } else {
            callback.call(null, null, parse.parse(context, text));
        }
    }
};