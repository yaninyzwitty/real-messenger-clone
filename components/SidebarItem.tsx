"use client";
import clsx from "clsx";
import Link from "next/link";
type Props = {
  label: string;
  href: string | any;
  icon: string | any;
  active?: boolean;
  onClick?: () => void;
};
function SidebarItem({ label, href, icon: Icon, onClick, active }: Props) {
  const handleClick = () => {
    if (onClick) return onClick();
  };
  return (
    <li className="" onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black`,
          active && "bg-gray-300 text-black"
        )}
      >
        <Icon className={"h-6 w-6 shrink-0"} />

        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}

export default SidebarItem;
