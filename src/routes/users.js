const { Router } = require('express')
const userController = require('../controllers/user');

const router = Router()

router.use('/users', router)

// Create user 
router.post('/', userController.createUser)
router.get('/', userController.getUsers)

// // Params
// router.get('/greeting/:user', (req, res) => {
//     const { user } = req.params
//     res.json({
//         message: `Hello user: ${user}`,
//     })
// })

// // Query,
// // is often used with paginations, example: /products?page=2&limit=10
// router.get('/greeting', (req, res) => {
//     console.log(req.query)

//     res.json({
//         message: `Hello ${req.query.user}`,
//     })
// })

module.exports = router