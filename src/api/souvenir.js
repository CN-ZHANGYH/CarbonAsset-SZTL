import request from "../utils/request.js";

export function getCardListByEnterpriseName(query){
    return request({
        url: '/card/enterprise',
        method: 'get',
        params: query
    })
}

export function getCardList(query){
    return request({
        url: '/souvenir/card/list',
        method: 'get',
        params: query
    })
}
