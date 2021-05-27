import Mock from 'mockjs'
import Random from 'mockjs'

//登陆
Mock.mock('/api/login', 'post', function (params) {
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
    //管理员
    // msg: '请求成功',
    // info: {
    //   userPermission: {
    //     menuList: ['role', 'user', 'article'],
    //     username: '超级用户23',
    //     permissionList: ['article:list', 'user:list', 'user:add', 'role:update', 'article:add', 'role:list', 'article:update', 'user:update', 'role:delete', 'role:add'],
    //     roleId: 1,
    //     roleName: '管理员',
    //     userId: 10003,
    //   }
    // },
    // code: '100',

    //普通用户
    // msg: '请求成功',
    // info: {
    //   userPermission: {
    //     menuList: ['common'],
    //     username: '超级用户23',
    //     permissionList: ['article:list', 'user:list', 'user:add', 'role:update', 'article:add', 'role:list', 'article:update', 'user:update', 'role:delete', 'role:add'],
    //     roleId: 1,
    //     roleName: '普通用户',
    //     userId: 10003,
    //   }
    // },
    // code: '100',

    //管理层
    // msg: '请求成功',
    // info: {
    //   userPermission: {
    //     menuList: ['common', 'admin'],
    //     username: '超级用户23',
    //     permissionList: ['article:list', 'user:list', 'user:add', 'role:update', 'article:add', 'role:list', 'article:update', 'user:update', 'role:delete', 'role:add'],
    //     roleId: 1,
    //     roleName: '管理层',
    //     userId: 10003,
    //     avatarUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201905%2F28%2F20190528143150_fETNW.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624365601&t=7d3a9e920bc71e0d16f6312a02cde5d6',
    //   }
    // },
    // code: '100',

    //系统管理员
    msg: '请求成功',
    info: {
      userPermission: {
        menuList: ['common', 'admin', 'system'],
        username: '超级用户23',
        permissionList: ['article:list', 'user:list', 'user:add', 'role:update', 'article:add', 'role:list', 'article:update', 'user:update', 'role:delete', 'role:add'],
        roleId: 1,
        roleName: '管理层',
        userId: 10003,
        avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201905%2F28%2F20190528143150_fETNW.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624365601&t=7d3a9e920bc71e0d16f6312a02cde5d6',
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
Mock.mock('/api/delSch', 'post', function (params) {
  console.log('让我们看看这个删除的是什么')
  console.log(params)
  return Mock.mock({
    code: '100',
    info: {result: 'success'},
  })
})

//完成日程
Mock.mock('/api/finSch', 'post', function (params) {
  console.log('让我们看看这个完成的是什么')
  console.log(params)
  return Mock.mock({
    code: '100',
    info: {result: 'success'},
  })
})

//日程列表
Mock.mock('/api/schList', 'post', function (params) {
  let jsonForWork = {
    '2021-05-20': [
      {
        'work': '@csentence(9, 19)',
        'index': 0,
        'isFinished': false,
      },
      {
        'work': '@csentence(9, 19)',
        'index': 1,
        'isFinished': true,
      },
      {
        'work': '@sentence(9, 19)',
        'index': 2,
        'isFinished': false,
      },
    ],
    '2021-05-22': [
      {
        'work': '@csentence(9, 19)',
        'index': 0,
        'isFinished': true,
      },
      {
        'work': '@csentence(9, 19)',
        'index': 1,
        'isFinished': false,
      },
      {
        'work': '@sentence(9, 19)',
        'index': 2,
        'isFinished': false,
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

//公告栏界面分页列表
Mock.mock('/api/pageNoticeList', 'post', function (params) {
  let noticeList = [
    {
      'noticeTitle': '@sentence(2, 9)',
      'time': '@date',
      'pubUser': '@name',
      'noticeDetail': '@paragraph(2, 7)',
    },
    {
      'noticeTitle': '@ctitle',
      'time': '@date',
      'pubUser': '@name',
      'noticeDetail': '@cparagraph(1, 7)',
    },
    {
      'noticeTitle': '@sentence(2, 9)',
      'time': '@date',
      'pubUser': '@cname',
      'noticeDetail': '@paragraph(2, 19)',
    },
    {
      'noticeTitle': '@csentence(9, 19)',
      'time': '@date',
      'pubUser': '@name',
      'noticeDetail': '@cparagraph(2, 7)',
    },
    {
      'noticeTitle': '@csentence(7,9)',
      'time': '@date',
      'pubUser': '@cname',
      'noticeDetail': '@paragraph(2, 7)',
    },
    {
      'noticeTitle': '@sentence(2, 9)',
      'time': '@date',
      'pubUser': '@name',
      'noticeDetail': '@paragraph(2, 9)',
    },
    {
      'noticeTitle': '@sentence(2, 9)',
      'time': '@date',
      'pubUser': '@name',
      'noticeDetail': '@cparagraph(2, 7)',
    },
    {
      'noticeTitle': '@csentence(9, 19)',
      'time': '@date',
      'pubUser': '@name',
      'noticeDetail': '@paragraph(2, 7)',
    },
    {
      'noticeTitle': '@sentence(2, 9)',
      'time': '@date',
      'pubUser': '@name',
      'noticeDetail': '@paragraph(2, 9)',
    },
    {
      'noticeTitle': '@sentence(2, 9)',
      'time': '@date',
      'pubUser': '@name',
      'noticeDetail': '@paragraph(2, 9)',
    },
    // {
    //   'noticeTitle': '@sentence(2, 9)',
    //   'time': '@date',
    //   'pubUser': '@name',
    //   'noticeDetail': '@paragraph(2, 9)',
    // },
    // {
    //   'noticeTitle': '@sentence(2, 9)',
    //   'time': '@date',
    //   'pubUser': '@name',
    //   'noticeDetail': '@paragraph(2, 9)',
    // },
  ]
  return Mock.mock({
    code: '100',
    info: {
      result: 'success',
      noticeList: noticeList,
      totalPage: 2,
      totalCount: 12
    },
  })
})

//管理公告栏（删除）
Mock.mock('/api/delNoticeList', 'post', function (params) {
  console.log('让我们看看这个删除的公告是什么')
  console.log(params)
  return Mock.mock({
    code: '100',
    info: {result: 'success'},
  })
})

//添加公告
Mock.mock('/api/addNotice', 'post', function (params) {
  let data = JSON.parse(params.body)
  let addDetail = data.pubDetail
  let addTime = data.nowTime
  let addTitle = data.title
  let addUser = data.pubName
  // let nowId = data.nowId
  console.log('让我们看看这个新增的公告是什么')
  console.log(params)

  console.log('添加时间：' + addTime + '\n' + '公告内容：' + addDetail + '\n' + '公告标题：' + addTitle + '\n' + '发布人：' + addUser)

  return Mock.mock({
    msg: '请求成功',
    info: {result: 'success'},
    code: '100',
  })
})

//获取个人主页用户信息
Mock.mock('/api/userSetInfo', 'post', function (params) {
  let userSetInfo = {
    'company': '宇宙最强公司',
    'department': '摸鱼软件测试部 Moyu R&D',
    'station': '软件测试工程师',
    'location': '中国',
    'email': '222222222@qq.com',
    'cname': '菜虚鲲',
    'ename': 'Xu.KunCai',
    'phone': '1234567890',
    'introduce': '我石头人从来不空大，要和我学打篮球吗？不要和产品经理学打篮球。'
  }
  return Mock.mock({
    msg: '请求成功',
    info: {
      result: 'success',
      userSetInfo: userSetInfo,
    },
    code: '100',
  })
})

//更改用户头像
Mock.mock('/api/userAvatar', 'post', function (params) {
  let data = params
  // let imgUrl=data.url;
  console.log('上传照片的url为：')
  console.log(data.body)
  // let imgList=[{
  //   'name':'avatar.jpeg',
  //   'url':'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201905%2F28%2F20190528143150_fETNW.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624365601&t=7d3a9e920bc71e0d16f6312a02cde5d6',
  // }]
  return Mock.mock({
    msg: '请求成功',
    info: {
      result: 'success',
      // imgList:imgList
    },
    code: '100',
  })
})

//更改用户电话
Mock.mock('/api/userSetPhone', 'post', function (params) {
  let data = params
  // let imgUrl=data.url;
  return Mock.mock({
    msg: '请求成功',
    info: {
      result: 'success',
    },
    code: '100',
  })
})

//更改用户介绍
Mock.mock('/api/userSetIntroduce', 'post', function (params) {
  let data = params
  // let imgUrl=data.url;
  return Mock.mock({
    msg: '请求成功',
    info: {
      result: 'success',
    },
    code: '100',
  })
})

//用户昵称列表
Mock.mock('/api/userNickName', 'post', function (params) {
  let userNickNameList = [
    {
      'userId': '@id',
      'value': '@name',
    },
    {
      'userId': '@id',
      'value': '@name',
    },
    {
      'userId': '@id',
      'value': '@name',
    },
    {
      'userId': '@id',
      'value': '@name',
    },
    {
      'userId': '@id',
      'value': '@name',
    },
    {
      'userId': '@id',
      'value': '@name',
    },
    {
      'userId': '@id',
      'value': '@name',
    },
  ]
  return Mock.mock({
    code: '100',
    info: {
      result: 'success',
      userNickNameList: userNickNameList,
    },
  })
})

//获取朋友主页用户信息
Mock.mock('/api/friendViewInfo', 'post', function (params) {
  let data = params
  console.log('input username is')
  console.log(data)
  let userSetInfo = {
    'company': '宇宙最强公司',
    'department': '摸鱼软件测试部 Moyu R&D',
    'station': '软件测试工程师',
    'location': '中国',
    'email': '222222222@qq.com',
    'cname': '菜虚鲲',
    'ename': 'Xu.KunCai',
    'phone': '1234567890',
    'introduce': '我石头人从来不空大，要和我学打篮球吗？不要和产品经理学打篮球。',
    'avatarUrl': 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201905%2F12%2F20190512115037_xixpq.thumb.400_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624633518&t=98d33f6768b3051c27c0e8611b702ddf'
  }
  return Mock.mock({
    msg: '请求成功',
    info: {
      result: 'success',
      userSetInfo: userSetInfo,
    },
    code: '100',
  })
})
