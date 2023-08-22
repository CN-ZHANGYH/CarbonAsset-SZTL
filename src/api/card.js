import request from "../utils/request.js";

export function getEnterpriseHasCardList(query){
    return request({
        url: '/card/hasCardList',
        method: 'post',
        params: query
    })
}
