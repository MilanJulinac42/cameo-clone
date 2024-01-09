import { Router } from "express";
import orderController from "../controllers/order.controller";

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.patch("/:id", orderController.updateOrder);
router.delete("/delete/:id", orderController.deleteOrder);
router.delete("/:id", orderController.removeOrder);

export default router;
