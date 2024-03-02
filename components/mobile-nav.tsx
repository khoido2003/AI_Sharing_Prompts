"use client";

import { Session } from "next-auth";
import { SignOutParams } from "next-auth/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MobileNavProps {
  session: Session;
  signOut: (options?: SignOutParams<true> | undefined) => Promise<undefined>;
}

export const MobileNav = ({ session, signOut }: MobileNavProps) => {
  // Toggle button in mobile view - Hide in larger view
  const [toggleDropdown, setToggleDropDown] = useState<boolean>(false);

  return (
    <div className="flex">
      <Image
        src={session?.user?.image as string}
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
  );
};
