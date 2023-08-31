const router = require('express').Router()
const userController = require('../../controller/user/userController')
const asyncRouteHandler = require('../../util/asyncRouteHandler')


router.get('/', asyncRouteHandler(userController.getUsersList));

router.get('/:id', asyncRouteHandler(userController.getUserById));

router.post('/add', asyncRouteHandler(userController.addUser));

router.patch('/edit/:id', asyncRouteHandler(userController.editUser))

router.delete('/delete/:id', asyncRouteHandler(userController.deleteUser))

module.exports = router;