import request from "../utils/request.js";


export function getEnterpriseEmissionList(query){
    return request({
        url: '/query/enterpriseErList',
        method: 'get',
        params: query
    })
}

export function getEmissionMethods(){
    return request({
        url: '/emissionMethods',
        method: 'get'
    })
}

export function getTypes(){
    return request({
        url: '/types',
        method: 'get'
    })
}