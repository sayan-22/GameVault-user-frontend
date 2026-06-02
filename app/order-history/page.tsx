import OrderHistoryView from "@/views/OrderHistoryView";
import { ORDERS } from "@/constants/order";

export default function Page() {
  return <OrderHistoryView orders={ORDERS} />;
}
