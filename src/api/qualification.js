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
