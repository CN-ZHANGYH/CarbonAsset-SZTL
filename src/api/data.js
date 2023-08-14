import request from "/src/utils/request";


export function getOwnerTxAndSellerList(query){
    return request({
        url: '/carbon/data/ownerTxAndSeList',
        method: 'get',
        params: query
    })
}

export function getOwnerWorkProgress(query){
    return request({
        url: '/carbon/data/ownerWorkProgress',
        method: 'get',
        params: query
    })
}