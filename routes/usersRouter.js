import { Router } from "express"
import { UsersController } from '../controllers/usersController.js'

const router = Router()


router.post('/user', UsersController.add)
router.get('/users', UsersController.get)

router.patch('/user', UsersController.change)


export default router