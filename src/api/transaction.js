import request from "../utils/request.js";


export function getEnterpriseTxList(query){
    return request({
        url: '/query/enterpriseTxList',
        method: 'get',
        params: query
    })
}
