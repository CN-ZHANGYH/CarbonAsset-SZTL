import request from "/src/utils/request";


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

export function applyEmissionResource(data){
    return request({
        url: '/emissions/upload',
        method: 'post',
        data: data
    })
}


export function getEnterpriseIsNotApplyEmission(query){
    return request({
        url: '/query/enterpriseIsNotApplyEmission',
        method: 'get',
        params: query
    })
}

export function getEnterpriseIsApplyEmission(query){
    return request({
        url: '/query/enterpriseIsApplyEmission',
        method: 'get',
        params: query
    })
}


export function getEnterpriseEmissionRanking(query){
    return request({
        url: '/emissions/getResourceRanking',
        method: 'get',
        params: query
    })
}


export function getRankingByEmission(query){
    return request({
        url: '/emissions/rankingByEmission',
        method: 'get',
        params: query
    })
}
