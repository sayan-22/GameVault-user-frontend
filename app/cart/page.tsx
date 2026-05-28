import CartView from "@/views/CartView";
import { GAMES } from "@/constants/game";

export default function Page() {
  return <CartView initialItems={[GAMES[0], GAMES[4], GAMES[7]]} />;
}
