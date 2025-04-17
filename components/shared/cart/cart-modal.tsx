import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import parse from "html-react-parser";

import OrderList from "./order-list";
import Link from "next/link";

const CartModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const t = useTranslations("LinksAndGeneral");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{parse(t("cartSmall"))} 🛒</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <OrderList />
        <div className="flex justify-end gap-2">
          <Button onClick={() => setOpen(false)} variant="outline">
            {parse(t("close"))}
          </Button>
          <Button onClick={() => setOpen(false)} asChild>
            <Link href="/order"> {parse(t("orderModal"))}</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
