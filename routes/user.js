const express = require('express')
const router = express.Router()

const { requireSignin, adminMiddleware } = require('../controller/auth')
const { read, update, unlock, athlete, prupdate } = require('../controller/user')

router.get('/user/:id', requireSignin, read)
router.put('/user/update',requireSignin, update)
router.put('/user/unlock', requireSignin, unlock)
router.put('/user/athlete', requireSignin, athlete)
router.put('/user/prupdate', requireSignin, prupdate)
router.put('/admin/update', requireSignin, adminMiddleware, update)
router.put('/admin/unlock', requireSignin, adminMiddleware, unlock)

module.exports = router