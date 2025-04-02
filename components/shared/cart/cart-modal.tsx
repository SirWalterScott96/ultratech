import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import OrderList from "./order-list";

const CartModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle>Кошик 🛒</DialogTitle>
        </DialogHeader>
        <OrderList />
        <div className="flex justify-end gap-2">
          <Button onClick={() => setOpen(false)} variant="outline">
            Закрити
          </Button>
          <Button asChild>
            <a href="/order">Оформити замовлення</a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
