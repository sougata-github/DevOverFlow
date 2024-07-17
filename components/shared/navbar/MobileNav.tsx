"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";

import { sidebarLinks } from "@/constants";

import { SignedOut } from "@clerk/nextjs";

import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="mb-2 flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : " text-dark300_light900 "
              } flex items-center justify-start gap-4 bg-transparent p-4 `}
            >
              <Image
                className={`${isActive ? "" : "invert-colors"}`}
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 cursor-pointer text-black sm:hidden dark:text-white" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 scrollbar-hidden overflow-y-auto border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevOverFlow"
          />
          <p className="h2-bold text-dark100_light900 ml-2 font-spaceGrotesk">
            Dev<span className="text-primary-500">OverFlow</span>
          </p>
        </Link>

        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button
                    className=" text-dark400_light900 small-medium light-border-2 btn-tertiary
                   min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                  >
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
