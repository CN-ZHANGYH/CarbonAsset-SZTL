import request from "../utils/request.js";

export function getEnterpriseHasCardList(query){
    return request({
        url: '/card/hasCardList',
        method: 'post',
        params: query
    })
}

export function getEnterpriseCollectCard(query){
    return request({
        url: '/card/collect',
        method: 'post',
        params: query
    })
}

