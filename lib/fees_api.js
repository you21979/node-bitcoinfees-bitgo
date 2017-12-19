'use strict'
var rp = require('request-promise');
var constant = require('./constant');

var createGetOption = function(url, param) {
    return {
        url: url,
        qs: param,
        method: 'GET',
        timeout: Math.floor(constant.OPT_TIMEOUT_SEC * 1000),
        transform2xxOnly : true,
        transform: function(body){
            return JSON.parse(body)
        },
    };
}

var get = function(method, param) {
    return rp(createGetOption(constant.API_BASE_URL + method, param || {}))
}

var recommended = exports.recommended = function() {
    return get('/api/v1/tx/fee', { numBlocks: '2' }).then(function(res){
        var spb1 = res.feeByBlockTarget[1]
        var spb2 = res.feeByBlockTarget[2]
        var spb3 = res.feeByBlockTarget[3]
        return {
            "fastestFee": spb1, "halfHourFee": spb2, "hourFee": spb3
        }
    })
}

