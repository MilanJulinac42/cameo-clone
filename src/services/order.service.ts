import OrderModel, { IOrder } from "../models/Order";

class OrderService {
    async getAllOrders(): Promise<IOrder[]> {
        try {
            const orders = await OrderModel.find();
            return orders;
        } catch (error) {
            throw new Error(
                `Error fetching orders: ${(error as Error).message}`
            );
        }
    }

    async getOrderById(orderId: string): Promise<IOrder | null> {
        try {
            const order = await OrderModel.findById(orderId);
            return order;
        } catch (error) {
            throw new Error(
                `Error fetching order: ${(error as Error).message}`
            );
        }
    }

    async createOrder(orderData: IOrder): Promise<IOrder> {
        try {
            const newOrder = await OrderModel.create(orderData);
            return newOrder;
        } catch (error) {
            throw new Error(
                `Error creating order: ${(error as Error).message}`
            );
        }
    }

    async updateOrder(
        orderId: string,
        orderData: Partial<IOrder>
    ): Promise<IOrder | null> {
        try {
            const updatedOrder = await OrderModel.findByIdAndUpdate(
                orderId,
                { $set: orderData },
                { new: true }
            );
            return updatedOrder;
        } catch (error) {
            throw new Error(
                `Error updating order: ${(error as Error).message}`
            );
        }
    }

    async deleteOrder(orderId: string): Promise<IOrder | any> {
        try {
            const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
            return deletedOrder;
        } catch (error) {
            throw new Error(`Error deleting user: ${(error as Error).message}`);
        }
    }
}

export default new OrderService();
