const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const userLogin = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http:localhost:8081/user/user/login', // 替换为实际后端地址
      method: 'POST',
      data: params,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data); // 假设返回的数据在 `res.data` 中
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};


module.exports = {
  formatTime,
  userLogin
}


