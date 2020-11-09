// pages/login/login.js
const app = getApp()
Page({
  data: {
    formData: {},
    isAgree: false,
    rules: [{
      name: 'checkbox',
      rules: {
        required: true,
        message: '多选列表是必选项'
      },
    }, ],
    errTemp:null
  },
  loginSubmit: function (event) {
    //tuip123 11-05 getuserinfo
    if (this.data.isAgree) {
      if (this.data.formData.username && this.data.formData.password) {
        const s_ID = this.data.formData.username
        const s_password = this.data.formData.password
        wx.cloud.callFunction({
          name:"isBinded",
          data:{s_ID}
        }).then(res=>{
          if(res.result.msg==='不存在该用户')
          {
            wx.showLoading({
              title: '正在尝试绑定',
            })
            this.setData({
              errTemp:true
            })
            return wx.cloud.callFunction({
              name:'addUser',
              data:{
                s_ID,
                s_password
              },
            })
          }
          else {this.setData({
            error: '该账号已经被绑定',
            errTemp:false
        })}
        }).then(res => {
          if (this.data.errTemp && res.result.status === 'ok') {
            return wx.cloud.callFunction({
              name: 'getUserData',
              data: {
                openID: app.globalData._openid
              }
            })
          }
        }).then(res => {
          if (this.data.errTemp && res.result.status === 'ok') {
            app.globalData.userInfo = res.result.data
            wx.hideLoading()
            app.globalData.reload=true
            wx.switchTab({
              url: '../userInfo/userInfo',
            })
          }
          
        }).catch(err=>{
          console.error(err)
        })
      }else{this.setData({
        error: '学号或者密码不能为空'
    })}
    }else{this.setData({
      error: '你需要同意《相关条款》'
  })}
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
})