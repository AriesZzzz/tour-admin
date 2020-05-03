import axios from 'axios'
import { Message } from 'element-ui'

let serve = axios.create({
    baseURL: '',
    withCredentials: false,
    timeout: 5000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    }
})
export default function request(url, data = {}, method = "GET") {
    return new Promise((resolve) => {
        let promise
        if (method === "GET" || method === "DELETE") {
            promise = serve({
                url,
                method,
                params: data
            })
        } else if (method === "POST" || method === "PUT") {
            promise = serve({
                url,
                method,
                data
            })
        }
        // 统一捕获错误，避免大量try catch 在外部函数
        promise.then(res => {
            resolve(res)
        }).catch(err => {
            Message('请求出错'+ err.msg)
        })
    })
}

