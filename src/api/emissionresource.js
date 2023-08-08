import request from "../utils/request.js";


export function getEnterpriseEmissionList(query){
    return request({
        url: '/query/enterpriseErList',
        method: 'get',
        params: query
    })
}
