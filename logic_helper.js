'use strict';

var _ = require('lodash');
var DataHelper = require('./data_helper');
var helper = new DataHelper();

function logicHelper() {
    var getData = function(tick) {
        console.log('Getting data');
        return helper.getRecommendationData(tick).then(function(data) {
            if (data === 404) {
                console.log('404');
                return {
                    isCorrect: false,
                    message: 'Sorry, I could not found stock information for ' + tick
                };
            } else if (data === {}) {
                console.log('Empty');
                return {
                    isCorrect: false,
                    message: 'Sorry, I could not found recommendation data for ' + tick
                };
            } else {
                console.log('Complete');
                return {
                    isCorrect: true,
                    message: 'Recommendation for ' + tick + ' is ' + data.key + ' with a mean of ' + data.mean + '.'
                };
            }
        });
    };

    var getRecommendationMean = function() {
        return 2.4;
    };
    var getRecommendationKey = function() {
        return 'Buy';
    };

    return {
        getRecommendationMean: getRecommendationMean,
        getRecommendationKey: getRecommendationKey,
        getData: getData
    };
}
module.exports = logicHelper;