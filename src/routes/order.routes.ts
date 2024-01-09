import { Router } from "express";
import orderController from "../controllers/order.controller";
import {
    createOrderValidation,
    updateOrderValidation,
} from "../middleware/validation/orderValidation.middleware";
import objectIdValidation from "../middleware/validation/idValidation.middleware";

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", objectIdValidation, orderController.getOrderById);
router.post("/", createOrderValidation, orderController.createOrder);
router.patch(
    "/:id",
    objectIdValidation,
    updateOrderValidation,
    orderController.updateOrder
);
router.delete("/delete/:id", objectIdValidation, orderController.deleteOrder);
router.delete("/:id", objectIdValidation, orderController.removeOrder);

export default router;
