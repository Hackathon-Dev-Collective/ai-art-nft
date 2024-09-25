"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleIcon, Home, LogOut } from "lucide-react";
import { MetaMaskProvider } from "@metamask/sdk-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConnectWalletButton from "@/components/ConnectWalletButton";

const Header = () => {
  const router = useRouter();
  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState({ name: "scofioled", email: "scofield@gmail.com" });

  const host = typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host, // using the host constant defined above
    },
  };

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  async function handleSignOut() {
    // test
    setUser({ name: "", email: "" });
    router.push("/");
  }
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });
  return (
    <header
      className={`ud-header left-0 top-0 z-40 flex w-full items-center border-b border-gray-200 ${
        sticky
          ? "shadow-nav fixed z-[999] border-b border-stroke bg-white/80 backdrop-blur-[5px] dark:border-dark-3/20 dark:bg-dark/10"
          : "absolute bg-transparent"
      }`}
    >
      {/* sm:px-6 lg:px-8 max-w-7xl*/}
      <div className=" mx-auto px-12 w-full py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">NeuroArt</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/generate" className="flex items-center">
            <span className="ml-2 text-xl font-semibold text-gray-900">AI Generate</span>
          </Link>
          <Link href="/vote" className="flex items-center">
            <span className="ml-2 text-xl font-semibold text-gray-900">Arts</span>
          </Link>
          <Link href="/market" className="flex items-center">
            <span className="ml-2 text-xl font-semibold text-gray-900">Market</span>
          </Link>
          <Link href="/user" className="flex items-center">
            <span className="ml-2 text-xl font-semibold text-gray-900">User</span>
          </Link>

          <div className="flex gap-4 px-6">
            <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
              <ConnectWalletButton />
            </MetaMaskProvider>
          </div>
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer size-9">
                  <AvatarImage alt={user.name || ""} />
                  <AvatarFallback>
                    {user.email
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-0">
                {/* <DropdownMenuItem className="w-full cursor-pointer m-1">
                  <Link href="/dashboard" className="flex w-full items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem> */}
                <form action={handleSignOut} className="p-1">
                  <button type="submit" className="flex w-full">
                    <DropdownMenuItem className="w-full cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
