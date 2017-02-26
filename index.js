'use strict';

var _ = require('lodash');
var alexa = require('alexa-app');
var app = new alexa.app('stocks-recommendation');

var helper = require('./logic_helper')();

var DEFAULT_PROMPT = 'What stock ticket do you want me to check.';
var REPROMPT = 'Please tell me the stock tick you want me to check.'
var HELP_PROMPT = 'Help prompt';


var defaultIntentHandler = function(req, res) {
    res.say(DEFAULT_PROMPT).reprompt(REPROMPT).shouldEndSession(false);
};

var defaultExitHandler = function(req, res) {
    res.say('Good bye! Please do not take this recommendation seriously.'),shouldEndSession(true);
};

var helpIntentHandler = function(req, res) {
    res.say(HELP_PROMPT).reprompt(REPROMPT).shouldEndSession(false);
};

// Default Intents
app.launch(defaultIntentHandler);
app.intent('AMAZON.StartOverIntent', defaultIntentHandler);
app.intent('AMAZON.RepeatIntent', defaultIntentHandler);
app.intent('AMAZON.HelpIntent', helpIntentHandler);
app.intent('AMAZON.StopIntent', defaultExitHandler);
app.intent('AMAZON.CancelIntent', defaultExitHandler);

// Custom intents
app.intent(
    'recommend',
    {
        'slots': {
            'tick': 'string'
        },
        'utterances': [
            'get recommendation for {tick}',
            'what is the recommendation for {tick}'
        ]
    },
    function(req, res) {
        console.log('Intent ' + req.data.request.intent.name);
        console.log('Slot Value ' + req.slot('tick'));
        var intent = _.get(req, 'data.request.intent.name');
        var tick = req.slot('tick');

        if (_.isEmpty(intent)) {
            res.say(DEFAULT_PROMPT).reprompt(REPROMPT).shouldEndSession(false);
            return true;
        }

        if (intent !== 'recommend') {
            var NOT_SUPPORTED_PROMPT = 'I\'m sorry, I could not found ' + intent + ' as part of my skills. What else I can help with?';
            res.say(NOT_SUPPORTED_PROMPT).reprompt(REPROMPT).shouldEndSession(false);
            return true;
        }

        if (_.isEmpty(tick)) {
            var PROMPT_EMPTY = 'I\'m sorry, In order to give you a recommendation I need the tick of the stock. ';
            res.say(PROMPT_EMPTY).reprompt(REPROMPT).shouldEndSession(false);
            return true;
        }

        return helper.getData(tick).then(function(result) {
            if (result.isCorrect) {
                res.say(result.message).send();
            } else {
                res.say(result.message).reprompt(REPROMPT).shouldEndSession(false).send();
            }
        });
    }
);

module.exports = app;
