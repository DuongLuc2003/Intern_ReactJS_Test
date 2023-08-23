import { Router } from 'express'
import { signup, signin , getAllUsers , getUserById , deleteUser} from '../controllers/user'

const userRouter = Router()

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.delete("/users/:id", deleteUser);
export default userRouter