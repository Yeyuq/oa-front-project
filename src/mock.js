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
Mock.mock('/api/register', 'get', function (params) {
  let data = JSON.parse(params.body)
  let username = data.username
  let password = data.pass
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
        permissionList: ['article:list', 'user:list', 'user:add', 'role:update', 'article:add', 'role:list', 'article:update', 'user:update', 'role:delete', 'role:add'],
        roleId: 1,
        roleName: '管理员',
        userId: 10003,
      }
    },
    code: '100',
  })
})

//登出
Mock.mock('/api/logout', 'post', function () {
  return Mock.mock({
    code: '100',
    info: {result: 'success'},
  })
})

//添加日程
Mock.mock('/api/setDialogForm', 'post', function (params) {
  let data = JSON.parse(params.body)
  let addWork = data.schedule
  let addTime = data.time
  let isFinished = data.isFinished
  // let nowId = data.nowId
  console.log('让我们看看这个params是什么')
  console.log(params)

  console.log('添加时间：' + addTime + '\n' + '当日工作计划：' + addWork + '\n' + '是否完成：' + isFinished)

  return Mock.mock({
    msg: '请求成功',
    info: {result: 'success'},
    code: '100',
  })
})

//删除日程
Mock.mock('/api/DelSch', 'post', function (params) {
  console.log('让我们看看这个删除的是什么')
  console.log(params)
  return Mock.mock({
    code: '100',
    info: {result: 'success'},
  })
})

//完成日程
Mock.mock('/api/FinSch', 'post', function (params) {
  console.log('让我们看看这个完成的是什么')
  console.log(params)
  return Mock.mock({
    code: '100',
    info: {result: 'success'},
  })
})

//日程列表
Mock.mock('/api/SchList', 'post', function (params) {
  let jsonForWork={
    '2021-05-20':[
      {
        // 'work':Random.cparagraph(1, 2),
        'work':'121321312431',
        'index': 0,
        'status':200,
        'isFinished':false,
      },
      {
        // 'work':Random.cparagraph(1, 2),
        'work':'121321312431',
        'index': 1,
        'status':200,
        'isFinished':true,
      },
      {
        // 'work':Random.cparagraph(1, 2),
        'work':'121321312431',
        'index': 2,
        'status':200,
        'isFinished':false,
      },
    ],
    '2021-05-22':[
      {
        // 'work':Random.cparagraph(1, 2),
        'work':'121321312431',
        'index': 0,
        'status':200,
        'isFinished':true,
      },
      {
        // 'work':Random.cparagraph(1, 2),
        'work':'121321312431',
        'index': 1,
        'status':200,
        'isFinished':false,
      },
      {
        // 'work':Random.cparagraph(1, 2),
        'work':'121321312431',
        'index': 2,
        'status':200,
        'isFinished':false,
      },
    ]
  }
  return Mock.mock({
    code: '100',
    info: {
      result: 'success',
      jsonForWork: jsonForWork,
    },
  })
})
