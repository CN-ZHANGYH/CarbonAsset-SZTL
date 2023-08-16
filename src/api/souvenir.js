import request from "../utils/request.js";

export function getCardListByEnterpriseName(query){
    return request({
        url: '/card/enterprise',
        method: 'get',
        params: query
    })
}

// 查询所有的纪念卡
export function getCardList(query){
    return request({
        url: '/souvenir/card/list',
        method: 'get',
        params: query
    })
}


// 用户兑换纪念卡
export function getCredit(query){
    return request({
        url: '/credit/exchange',
        method: 'get',
        params: query
    })
}
