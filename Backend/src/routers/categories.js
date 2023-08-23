import { Router } from 'express';
import { addCategoryPage, createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/categories';
import { checkPermission } from '../middleware/permission';

const router = Router();

router.get("/", getAllCategories);
router.get("/add", addCategoryPage);
// Dynamic routing
router.get("/:id", getCategoryById);
router.post("/", checkPermission,createCategory);
router.put("/:id", checkPermission, updateCategory);
router.delete("/:id", checkPermission, deleteCategory);

export default router;