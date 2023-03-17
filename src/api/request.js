import axios from 'axios';
// 192.168.31.253:19000

const inst = axios.create();

inst.interceptors.response.use((resp) => resp.data);

const COMMON_URL = 'http://192.168.31.253:3010/api';

export const apiGet = (opts) => {
    return inst({
        method: 'get',
        ...opts,
        url: `${COMMON_URL}/${opts.url}`
    })
}