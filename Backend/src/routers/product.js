import { Router } from 'express';
import { addProductPage, createProduct, deleteProduct, getAllProducts, getProductById, updateProduct, searchProducts } from '../controllers/product'; 

import { checkPermission } from '../middleware/permission';

const router = Router();

router.get('/search', searchProducts); // Thay đổi tên hàm
router.get('/', getAllProducts); // Thay đổi tên hàm
router.get('/add', addProductPage); // Thay đổi tên hàm
// Dynamic routing
router.get('/:id', getProductById); // Thay đổi tên hàm
router.post('/', checkPermission, createProduct); // Thay đổi tên hàm
router.put('/:id', checkPermission, updateProduct); // Thay đổi tên hàm
router.delete('/:id', checkPermission, deleteProduct); // Thay đổi tên hàm

export default router;