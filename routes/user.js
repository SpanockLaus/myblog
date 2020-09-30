const express = require('express');
// const { set } = require('../app');
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const router = express.Router();

router.post('/login', function(req, res, next) {
    const { username, password } = req.body;
    const result = login(username, password)
    return result.then(data => {
      console.log(data.username);
      if(data.username) {
        // 设置 session
        req.session.username = data.username
        req.session.realname = data.realname
        // // 同步到 redis 
        // set(req.sessionID, req.session)

        res.json(
          new SuccessModel()
        ) 
        return
      }
      res.json(
        new ErrorModel('登录失败')
      )
    })
    // res.json({
    //     error: 0,
    //     data: {
    //       username,
    //       password
    //     }
    // })
})

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
      res.json({
        error: 0,
        msg: '已登录'
      })
      return
    }
    res.json({
      error: -1,
      msg: '未登录'
    })
})

// router.get('/session-test', (req, res, next) => {
//   const session = req.session
//   if (session.viewNum == null) {
//       session.viewNum = 0
//   }
//   session.viewNum ++
//   res.json({
//       viewNum: session.viewNum
//   })
// })

module.exports = router;