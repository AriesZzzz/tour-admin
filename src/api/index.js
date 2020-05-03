import request from './request';

// 管理员登录
export const adminLogin = (number, password) => request(`/travel/json/login/admin`, {
    number,
    password
}, "GET")

// 请求景点列表
export const reqTourList = (name, page, limit = 5) => request(`/travel/json/admin/scenicSpot/list`, {
    name,
    page,
    limit
})

// 根据ID查询景点详情信息
export const findTourInfoById = (id) => request(`/travel/json/admin/scenicSpot/findById`, {
    id
})

// 修改景点
export const updateTour = ({scenicSpotId, imgUrls, name, introduction, address, ticketPrice, remark}) => request(`/travel/json/admin/scenicSpot/update?scenicSpotId=${scenicSpotId}&name=${name}&introduction=${introduction}&address=${address}&ticketPrice=${ticketPrice}&remark=${remark}&imgUrls=${imgUrls.toString()}`, {

}, "PUT")

// 新增景点
export const addTour = ({name, introduction, address, ticketPrice, remark, imgUrls}) => request(`/travel/json/admin/scenicSpot/add?name=${name}&introduction=${introduction}&address=${address}&ticketPrice=${ticketPrice}&remark=${remark}&imgUrls=${imgUrls.toString()}`, {

}, "POST")

// 删除景点
export const deleteTour = (ids) => request(`/travel/json/admin/scenicSpot/delete`, {
    ids
}, "DELETE")

// 图片上传
export const uploadFiles = (multipartFile) => request(`/json/admin/file/addOne`, {
    multipartFile
}, "POST")

