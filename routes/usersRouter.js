import { Router } from "express"
import { UsersController } from '../controllers/usersController.js'

const router = Router()


router.post('/user', UsersController.add)
router.get('/users', UsersController.get)
// router.get('/getuserslist', (req, resp) => {
//     resp.json({message: "Get method is working"})
// })
router.patch('/user', UsersController.change)


export default router