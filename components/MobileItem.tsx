"use client";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  href: string | any;
  onClick?: () => void;
  active?: boolean;
  label: string;
  icon?: any;
};
function MobileItem({ href, label, onClick, active, icon: Icon }: Props) {
  const handleClick = () => {
    if (onClick) return onClick();
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        "group flex gap-x-3 text-sm leading-6 font-semibold justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100 w-full",
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
}

export default MobileItem;
