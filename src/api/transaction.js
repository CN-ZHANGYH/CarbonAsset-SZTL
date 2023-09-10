import request from "../utils/request.js";


export function getEnterpriseTxList(query){
    return request({
        url: '/query/enterpriseTxList',
        method: 'get',
        params: query
    })
}

export function getNewTxList(){
    return request({
        url: '/carbon/data/newTxListLimitFive',
        method: 'get'
    })
}

export function getEnterpriseTxRecord(query) {
    return request({
        url: "/query/searchTxRecord",
        method: 'post',
        params: query
    })
}