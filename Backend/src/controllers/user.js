import User from "../models/user";
import Joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer';
import cloudinary from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dkjk0lyhn', 
  api_key: '731421237515219', 
  api_secret: 'OxwTL9WsqmscxdZNg1jKW2bMNY0' 
});

const signupSchema = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "Dữ liệu bắt buộc"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Dữ liệu bắt buộc",
        "string.email": "Email không đúng định dạng",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Dữ liệu bắt buộc",
        "string.min": "Dữ liệu tối thiểu 8 ký tự",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
        "any.only": "Mật khẩu không khớp"
    }),
    // avatar: Joi.string().allow(null),
    role: Joi.string().valid("member", "admin").default("member"),
})

// Cac buoc xay dung API
// B1: Tao model
// B2: Controller
// B3: Router
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage }).single('avatar');

export const signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (!error) {
      const { username, email, password } = req.body;

      // Kiểm tra xem email đã tồn tại trong hệ thống chưa
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "Email đã tồn tại trong hệ thống" });
      }

      const hash = bcrypt.hashSync(password, 10);
      const role = "member";  

      // Xử lý tải lên ảnh lên Cloudinary
      upload(req, res, async (error) => {
        if (error) {
          console.error('Lỗi tải lên ảnh:', error);
          return;
        }

        let avatarUrl = null;
        if (req.file) {
          const result = await cloudinary.v2.uploader.upload(req.file.path);
          avatarUrl = result.secure_url;
        }

      const user = {
        username,
        email,
        password: hash,
        // avatar: avatarUrl, 
        role, 
      };
        // Tạo user mới sau khi xử lý tải lên ảnh
        User.create(user)
          .then((createdUser) => {
            res.send({
              message: "Đăng ký thành công",
              data: createdUser,
              avatar: avatarUrl, 
            });
          })
          .catch((createError) => {
            console.error('Lỗi tạo user:', createError);
            res.status(500).send({
              message: "Có lỗi xảy ra",
            });
          });
      });
    } else {
      const messages = error.details.map((item) => item.message);
      res.status(400).send({
        message: messages,
      });
    }
  } catch (err) {
    console.error('Lỗi:', err);
    res.status(500).send({
      message: "Có lỗi xảy ra",
    });
  }
};


const signinSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "{#label} dữ liệu bắt buộc",
        "string.email": "{#label} không đúng định dạng"
    }),
    password: Joi.string().min(5).required().messages({
        "string.empty": "{#label} dữ liệu bắt buộc",
        "string.min": "{#label} mật khẩu không đúng định dạng hihi",
    })
})

export const signin = async (req, res) => {
    try {
      const { error } = signinSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const message = error.details.map((item) => item.message);
        res.status(400).send({
          message: message,
        });
        return;
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(401).send({
          message: "Email hoặc password không hợp lệ",
        });
        return;
      }
      const check = bcrypt.compareSync(password, user.password);
      if (!check) {
        res.status(401).send({
          message: "Email hoặc password không hợp lệ",
        });
        return;
      }
      const token = jwt.sign({ _id: user._id }, "wd18101", { expiresIn: "1d" });
      res.send({
        message: "Đăng nhập thành công",
        user: {
          id: user._id,
          name: user.username,
          email: user.email,
          password: user.password,
        },
        token: token,
      });
    } catch (err) {
      res.status(500).send({
        message: "Có lỗi xảy ra",
      });
    }
  };

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).send({
        message: "An error occurred while fetching users",
        error: err.message, // Include the error message for debugging
      });
    }
  };
  
export const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).send({
          message: "User not found",
        });
      }
  
      res.status(200).send({
        message: "User deleted successfully",
        user: deletedUser,
      });
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).send({
        message: "An error occurred",
      });
    }
  };
  
export const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }
  
      res.status(200).send(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).send({
        message: "An error occurred",
      });
    }
  };
  