import Link from "next/link";
import Image from "next/image";

import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";

import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12 dark:shadow-none">
      <Link href="/" className="flex">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="DevOverFlow"
        />
        <p className="h2-bold ml-2 font-spaceGrotesk text-dark-100 max-sm:hidden dark:text-light-900">
          Dev<span className="text-primary-500 ">OverFlow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
