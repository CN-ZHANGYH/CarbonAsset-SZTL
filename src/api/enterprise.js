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

// 上传头像
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


// 更新头像
export function updateAvatar(data){
    return request({
        url: `/enterprise/updateAvatar?enterprise=${data.enterprise}&avatar=${data.avatar}`,
        method: 'post'
    })
}

// 重置密码
export function updateUserPassword(data){
    return request({
        url: '/enterprise/updatePass',
        method: 'post',
        data: data
    })
}

// 更新用户信息
export function updateEnterpriseInfo(data){
    return request({
        url: '/enterprise/updateInfo',
        method: 'post',
        data: data
    })
}


export function buyProduct(data){
    return request({
        url: '/enterprise/buy',
        method: 'post',
        data: data
    })
}


export function addSign(query){
    return request({
        url: '/addSign',
        method: 'post',
        params: query

    })
}


export function getNoticeInfo(query){
    return  request({
        url: '/getNoticeInfo',
        method: 'get',
        params: query
    })
}


export function updateEnterpriseTotalEmission(query){
    return request({
        url: '/enterprise/updateTotalEmission',
        method: 'post',
        params: query
    })
}