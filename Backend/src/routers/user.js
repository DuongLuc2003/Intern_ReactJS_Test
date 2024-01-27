import { Router } from 'express'
import { signup, signin , getAllUsers} from '../controllers/user'

const userRouter = Router()

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)
userRouter.get("/users", getAllUsers);
export default userRouter