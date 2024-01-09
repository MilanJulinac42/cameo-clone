import { Request, Response } from "express";
import orderService from "../services/order.service";

class OrderController {
    async getAllOrders(req: Request, res: Response): Promise<void> {
        try {
            const orders = await orderService.getAllOrders();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getOrderById(req: Request, res: Response): Promise<void> {
        const orderId = req.params.id;
        try {
            const order = await orderService.getOrderById(orderId);
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async createOrder(req: Request, res: Response): Promise<void> {
        const orderData = req.body;
        try {
            const newOrder = await orderService.createOrder(orderData);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updateOrder(req: Request, res: Response): Promise<void> {
        const orderId = req.params.id;
        const orderData = req.body;
        try {
            const updatedOrder = await orderService.updateOrder(
                orderId,
                orderData
            );
            if (updatedOrder) {
                res.status(200).json(updatedOrder);
            } else {
                res.status(404).json({ message: "Order not found" });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteOrder(req: Request, res: Response): Promise<void> {
        const orderId = req.params.id;
        try {
            await orderService.deleteOrder(orderId);
            res.json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async removeOrder(req: Request, res: Response): Promise<void> {
        const orderId = req.params.id;
        try {
            await orderService.removeOrder(orderId);
            res.json({ message: "Order removed successfully" });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default new OrderController();
