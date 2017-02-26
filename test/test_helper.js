/* global describe, require, it */
'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var _ = require('lodash');
var expect = chai.expect;
var assert = chai.assert;

var logicHelper = require('../logic_helper')();
var DataHelper = require('../data_helper');

chai.config.includeStack = true;

describe('Stocks Recommendation', function() {
    it('Should return current recommendation mean for US stock', function() {
        var recommendation = logicHelper.getRecommendationMean('VLRS');
        var result = 2.4;

        return expect(recommendation).to.equal(result);
    });
    it ('Should return current recommendation key for MX stock', function() {
        var recommendation = logicHelper.getRecommendationKey('VLRS');
        var result = "Buy";

        return expect(recommendation).to.equal(result);
    });
});

describe('Data Helper', function() {
    var helper = new DataHelper();

    it('Should return correct recommendation JSON object with null values', function() {
        var recommendation = helper.getRecommendationData('VLRS');
        var expected = {
            'mean': '2.40',
            'key': 'buy'
        };
        return expect(recommendation).to.eventually.deep.equal(expected);
    });


    it('Should return null when requesting null stock tick', function() {
        var recommendation = helper.getRecommendationData('');

        return expect(recommendation).to.deep.equal({});
    });

    it('Should return null when requesting null stock tick', function() {
        var recommendation = helper.getRecommendationData('AGVAGV');

        return expect(recommendation).to.eventually.equal(404);
    });
});