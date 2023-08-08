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


export function uploadAvatar(data) {
    return request({
        url: '/enterprise/uploadAvatar',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}


export function updateAvatar(data){
    return request({
        url: `/enterprise/updateAvatar?enterprise=${data.enterprise}&avatar=${data.avatar}`,
        method: 'post'
    })
}
