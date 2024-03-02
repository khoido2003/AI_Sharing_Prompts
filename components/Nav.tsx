"use client";

import { BuiltInProviderType } from "next-auth/providers/index";

import { useEffect, useState } from "react";

import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

import Link from "next/link";
import Image from "next/image";
import { inter } from "../utils/fonts";

import ToggleButton from "./ToggleButton";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { AuthLoading } from "./loading/auth-loading";

function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setProvidersFn = async () => {
      const res = await getProviders();

      setProviders(res);
    };
    setProvidersFn();
  }, []);

  return (
    <nav className="flex-between mb-16 w-full pt-3">
      <div className="flex gap-5">
        <Link href="/" className="flex-center flex gap-2">
          <Image
            src="/assets/images/logo.svg"
            alt="Logo"
            width={30}
            height={30}
          />

          <span>PromptWorld</span>
        </Link>
        <ToggleButton />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {/* Create loading state */}
        {session === undefined && <AuthLoading />}
        {session?.user ? (
          <DesktopNav session={session} signOut={signOut} />
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className={`black_btn dark:black_btn_dark ${inter.className}`}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* MOBILE NAVIGATION */}
      <div className="relative flex sm:hidden">
        {/* Create loading state */}
        {session === undefined && <AuthLoading />}
        {session?.user ? (
          <MobileNav session={session} signOut={signOut} />
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
