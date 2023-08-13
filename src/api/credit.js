import request from "/src/utils/request";


export function  getEnterpriseRanking(query){
    return request({
        url: '/credit/getERanking',
        method: 'get',
        params: query
    })
}

export function getRankingByCredit(query){
    return request({
        url: '/credit/rankingByCredit',
        method: 'get',
        params: query
    })
}
