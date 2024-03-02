import { Session } from "next-auth";
import { SignOutParams } from "next-auth/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

type ImgSrc = string | StaticImport;

interface DesktopNavProps {
  session: Session;
  signOut: (options?: SignOutParams<true> | undefined) => Promise<undefined>;
}

export const DesktopNav = ({ session, signOut }: DesktopNavProps) => {
  return (
    <div className="flex gap-3 md:gap-5">
      <Link href="/create-prompt" className="black_btn">
        Create Post
      </Link>

      <button type="button" onClick={() => signOut()} className="outline_btn">
        Sign Out
      </button>

      <Link href="/profile">
        <Image
          src={session?.user?.image as ImgSrc}
          width={37}
          alt="User Photo"
          height={37}
          className="rounded-full"
        />
      </Link>
    </div>
  );
};
