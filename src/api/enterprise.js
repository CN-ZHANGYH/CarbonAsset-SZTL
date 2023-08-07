import request from "/src/utils/request";

export function getEnterpriseInfo(query){
    return request({
        url: '/query/enterpriseInfo/',
        method: 'POST',
        params: query
    })
}

export function getEnterpriseInfoToLogin(query){
    return request({
        url: '/getEnterpriseInfo',
        method: 'GET',
        params: query
    })
}
