import { request } from '../utils/require'//导入request
export function allcategories() {
   return request({
      url: '/category/allcategories',//此处为自己请求地址
      method: 'get',//请求类型
   })
}
export function login(listData: object) {
   return request({
      url: '/user/login',
      method: 'post',
      data: listData
   })
}
export function allalgorithms(condition1: string) {
   return request({
      url: `/selectVideo/getVideoByCondition?condition=${condition1}`,
      method: 'get',
   })
}
export function getVideoByConditions(condition1: string, condition2: string) {
   return request({
      url: `/selectVideo/getVideoByConditions?condition1=${condition1}&condition2=${condition2}`,
      method: 'get',
   })
}

export function getComparisonVideo(name: string) {
   return request({
      url: `/comparisonVideo/getComparisonVideo?name=${name}`,
      method: 'get',
   })
}
export function upload(data: object) {
   return request({
      url: '/upload/Image',
      method: 'post',
      data: data,
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   })
}

export function getAllmap() {
   return request({
      url: `/map/allmap`,
      method: 'get',
   })
}

export function getStarNode(name: string) {
   return request({
      url: `/map/getStarNode?mapName=${name}`,
      method: 'get',
   })
}
export function getEndNode(name: string) {
   return request({
      url: `/map/getEndNode?mapName=${name}`,
      method: 'get',
   })
}

export function getCoordinate(data: object) {
   return request({
      url: '/upload/coordinate',
      method: 'post',
      data: data
   })
}