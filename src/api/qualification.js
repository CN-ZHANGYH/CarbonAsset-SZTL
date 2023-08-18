import request from "../utils/request.js";

export function uploadQualification(data){
    return request({
        url: '/carbon/qualification/upload',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}


export function getQualificationInfo(query){
    return request({
        url: '/query/qualificationInfo',
        method: 'post',
        params: query
    });
}


export function getIndustryList(){
    return request({
        url: '/industrys',
        method: 'post',
    });
}


export function uploadQualificationInfo(data){
    return request({
        url: '/carbon/qualification',
        method: 'post',
        data: data
    })
}

export function updateBalance(carbonEnterprise) {
    return request({
        url: '/enterprise/updateBalance',
        method: 'put',
        data:carbonEnterprise
    });
}
