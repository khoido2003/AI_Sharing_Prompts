"use client";

import { BuiltInProviderType } from "next-auth/providers/index";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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

type ImgSrc = string | StaticImport;

function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  // Toggle button in mobile view - Hide in larger view
  const [toggleDropdown, setToggleDropDown] = useState<boolean>(false);

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
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image as ImgSrc}
                width={37}
                alt="User Photo"
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
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
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image as string}
              width={37}
              height={37}
              className="cursor-pointer rounded-full"
              alt="User profile image"
              onClick={() => {
                setToggleDropDown((prev) => !prev);
              }}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="black_btn mt-5 w-full"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
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
