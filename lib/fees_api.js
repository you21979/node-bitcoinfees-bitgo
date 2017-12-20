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

var prepareResult = function(feeByBlockTarget){
    var kb = 1000
    var list = Object.keys(feeByBlockTarget).
        map(function(k){ return Math.floor(feeByBlockTarget[k] / kb) })
    return list
}

var recommended = exports.recommended = function() {
    return get('/api/v1/tx/fee', { numBlocks: '2' }).then(function(res){
        var list = prepareResult(res.feeByBlockTarget)
        var n = 0
        var spb1 = list.length > n ? list[n++] : 0
        var spb2 = list.length > n ? list[n++] : spb1
        var spb3 = list.length > n ? list[n++] : spb2
        return {
            "fastestFee": spb1, "halfHourFee": spb2, "hourFee": spb3
        }
    })
}

