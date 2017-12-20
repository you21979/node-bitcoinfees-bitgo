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
        var kb = 1000
        var list = Object.keys(res.feeByBlockTarget).map(k => ({nblocks: k, spb : Math.floor(res.feeByBlockTarget[k] / kb)}))
        var spb1 = list[0].spb
        var spb2 = list[1].spb || spb1
        var spb3 = list[2].spb || spb2
        return {
            "fastestFee": spb1, "halfHourFee": spb2, "hourFee": spb3
        }
    })
}

