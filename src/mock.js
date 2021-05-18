import Mock from 'mockjs'
import Random from 'mockjs'

//登陆
Mock.mock('/api/login', 'post', function (params) {
  const Random = Mock.Random
  let data = JSON.parse(params.body)
  let username = data.username
  let password = data.password
  let verifyCode = data.verifyCode

  console.log('用户名：' + username + '\n' + '密码：' + password + '\n' + '验证码' + verifyCode)
  /*{msg: "请求成功", code: "100", info: {result: "success"}}*/
  return Mock.mock({
    msg: '请求成功',
    info: {result: 'success'},
    code: '100',
  })
})

//注册
Mock.mock('/api/register', 'post', function (params) {
  let data = JSON.parse(params.body)
  let username = data.username
  let password = data.password
  let email = data.email

  console.log('邮箱：' + email + '\n' + '用户名：' + username + '\n' + '密码：' + password)

  return Mock.mock({
    msg: '请求成功',
    info: {result: 'success'},
    code: '100',
  })
})

//获取信息
Mock.mock('/api/getInfo', 'post', function () {
  return Mock.mock({
    msg: '请求成功',
    info: {
      userPermission: {
        menuList: ['role', 'user', 'article'],
        username: '超级用户23',
        permissionList: ["article:list", "user:list", "user:add", "role:update", "article:add", "role:list", "article:update","user:update","role:delete","role:add"],
        roleId: 1,
        roleName: "管理员",
        userId: 10003,
      }
    },
    code: '100',
  })
})

//登出
Mock.mock('/api/logout', 'post', function () {
  return Mock.mock({
    code:'100'
  })
})
