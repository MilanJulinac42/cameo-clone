import { Router } from "express";
import orderController from "../controllers/order.controller";
import {
    createOrderValidation,
    updateOrderValidation,
} from "../middleware/validation/orderValidation.middleware";

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", createOrderValidation, orderController.createOrder);
router.patch("/:id", updateOrderValidation, orderController.updateOrder);
router.delete("/delete/:id", orderController.deleteOrder);
router.delete("/:id", orderController.removeOrder);

export default router;
