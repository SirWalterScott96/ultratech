"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Globe } from "lucide-react";
import NavbarLinks from "./navbar-links";
import NavbarMainLinks from "./navbar-main-links";
import LanguageSwitcher from "./language-switcher";
import MyCart from "./my-cart";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <nav className="flex justify-between bg-black p-4 md:hidden">
      <MyCart isMobile={true} />
      <Link href={"/"}>
        <Image
          src={"/images/logo.png"}
          alt="logo"
          width={550}
          height={223}
          className="w-[100px]"
        />
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="align-middle p-2 hover:bg-white hover:text-black transition-colors duration-300 rounded-md">
          <Menu className="" />
        </SheetTrigger>
        <SheetContent className="flex flex-col items-start px-10">
          <SheetHeader>
            <SheetTitle>Меню</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="pb-4 border-b-2 w-full">
            <NavbarLinks onLinkClick={handleClose} />
          </div>
          <NavbarMainLinks onLinkClick={handleClose} />
          <div className="flex space-x-4 justify-center items-center font-black">
            <Globe />
            <LanguageSwitcher isMobile={true} />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
