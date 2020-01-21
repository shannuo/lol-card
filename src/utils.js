import axios from 'axios';
import dayjs from 'dayjs'

const axiosInstance = axios.create();

export async function sendMsg(msg) {
    let res = {};
    try {
        res = await axiosInstance({
            url: `http://www.tuling123.com/openapi/api?key=d54f6cfb3de042759090d4bf9f317dc9&info=${msg}`,
            method: 'post',
        });
    } catch(e) {
        return e.message;
    }
    return res.data.text;
};

export function getTime() {
    return dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
}

export function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }