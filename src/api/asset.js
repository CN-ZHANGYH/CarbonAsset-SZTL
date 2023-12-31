import request from "../utils/request.js";


export function getAllSellerAssetList(query){
    return request({
        url: '/carbon/asset/list',
        method: 'get',
        params: query
    })
}


export function uploadProductImage(data){
    return request({
        url: '/enterprise/uploadProductImage',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


export function addCarbonAsset(data){
    return request({
        url: '/enterprise/sell',
        method: 'post',
        data: data
    })
}

export function getEnterpriseNewSellerHistory(query){
    return request({
        url: '/query/enterpriseNewSellHistory',
        method: 'post',
        params: query
    })
}


export function getEnterpriseSellerHistory(query){
    return request({
        url: '/query/enterpriseAList',
        method: 'get',
        params: query
    })
}

export function getEnterpriseSellerRecordOfValue(query){
    return request({
        url: '/query/searchSellRecord',
        method: 'get',
        params: query
    })
}