import request from "/src/utils/request";


export function getOwnerTxAndSellerList(query){
    return request({
        url: '/carbon/data/ownerTxAndSeList',
        method: 'get',
        params: query
    })
}
