Page({
  data: {
    remarks: [] // 评论数据
 
  },

  onLoad() {
    this.loadRemarks(); // 页面加载时加载历史评论
  },

  // 加载历史评论
  loadRemarks() {
    wx.request({
      url: 'http://localhost:8081/user/remark/list',
      method: 'GET',
      header: { 'Authorization': wx.getStorageSync('token') },
      success: (res) => {
        if (res.statusCode === 200 && Array.isArray(res.data.data)) {
          console.log("开始加载评论");
          console.log(res.data.data);
          const remarks = res.data.data.map(item => {
            const formattedDate = item.date ? this.formatDateFromArray(item.date) : '未知'; // 格式化时间
            return {
              id: item.id,                 // 评论 ID
              detail: item.detail,         // 评论内容
              marketerUsername: item.marketerUsername,
              formattedDate                // 格式化后的时间
            };
          });
          console.log("格式化后的评论数据:", remarks);
          this.setData({ remarks });
        } else {
          wx.showToast({ title: '加载失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络错误', icon: 'none' });
      }
    });
  },

  // 格式化时间数组为字符串
  formatDateFromArray(dateArray) {
    if (!Array.isArray(dateArray) || dateArray.length !== 6) return '未知'; // 检查数组是否合法
    const [year, month, day, hour, minute, second] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ` +
           `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
  },


  // 删除评论
  onDeleteRemark(e) {
    const id = e.currentTarget.dataset.id;

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条评论吗？',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: `http://localhost:8081/user/remark?id=${id}`,
            method: 'DELETE',
            header: { 'Authorization': wx.getStorageSync('token') },
            success: (res) => {
              if (res.statusCode === 200 && res.data.code === 1) {
                wx.showToast({ title: '删除成功', icon: 'success' });
                this.loadRemarks();
              } else {
                wx.showToast({ title: '删除失败', icon: 'none' });
              }
            },
            fail: () => {
              wx.showToast({ title: '网络错误', icon: 'none' });
            }
          });
        }
      }
    });
  },

  // 添加评论
  // onAddRemark() {
  //   wx.showModal({
  //     title: '添加评论',
  //     placeholderText: '请输入评论内容',
  //     editable: true,
  //     success: (res) => {
  //       if (res.confirm && res.content) {
  //         wx.request({
  //           url: `http://localhost:8081/user/remark/save?detail=${encodeURIComponent(res.content)}`,
  //           method: 'POST',
  //           header: { 'Authorization': wx.getStorageSync('token') },
  //           success: (res) => {
  //             if (res.statusCode === 200 && res.data.code === 1) {
  //               wx.showToast({ title: '添加成功', icon: 'success' });
  //               this.loadRemarks();
  //             } else {
  //               wx.showToast({ title: '添加失败', icon: 'none' });
  //             }
  //           },
  //           fail: () => {
  //             wx.showToast({ title: '网络错误', icon: 'none' });
  //           }
  //         });
  //       }
  //     }
  //   });
  // },

  // 编辑评论
  onEditRemark(e) {
    const id = e.currentTarget.dataset.id;
    const remark = this.data.remarks.find(item => item.id === id);

    wx.showModal({
      title: '编辑评论',
      placeholderText: '请输入新的评论内容',
      editable: true,
      content: remark.detail,
      success: (res) => {
        if (res.confirm && res.content) {
          wx.request({
            url: 'http://localhost:8081/user/remark/update',
            method: 'PUT',
            header: {
              'Authorization': wx.getStorageSync('token'),
              'Content-Type': 'application/json'
            },
            data: {
              id: id,
              detail: res.content
            },
            success: (res) => {
              if (res.statusCode === 200 && res.data.code === 1) {
                wx.showToast({ title: '更新成功', icon: 'success' });
                this.loadRemarks();
              } else {
                wx.showToast({ title: '更新失败', icon: 'none' });
              }
            },
            fail: () => {
              wx.showToast({ title: '网络错误', icon: 'none' });
            }
          });
        }
      }
    });
  }
});
