'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var data = {};

function DataHelper() {}

DataHelper.prototype.getRecommendationData = function(stockTick) {
    if (_.isEmpty(stockTick)) {
        return {};
    }

    return this.getStockResponse(stockTick).then(function(response) {
        var mean = _.get(response, 'quoteSummary.result[0].financialData.recommendationMean.fmt', null);
        var key = _.get(response, 'quoteSummary.result[0].financialData.recommendationKey', null);
        return {
            'mean': mean,
            'key': key
        };
    }).catch(function(error) {
        var message = _.get(error, 'statusCode', null);

        if (message !== null) {
            return message;
        }
    });
};

DataHelper.prototype.requestSaveData = function(stockTick) {
    // return this.getStockResponse(stockTick).then()
};

DataHelper.prototype.getStockResponse = function(stockTick) {
    var options = {
        method: 'GET',
        uri: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/' + stockTick + '?formatted=true&lang=en-US&region=US&modules=summaryProfile%2CfinancialData%2CrecommendationTrend%2CupgradeDowngradeHistory%2Cearnings%2CdefaultKeyStatistics%2CcalendarEvents&corsDomain=finance.yahoo.com',
        resolvedWithFullResponse: true,
        json: true
    };
    return rp(options);
};

module.exports = DataHelper;