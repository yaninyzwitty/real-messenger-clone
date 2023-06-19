"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";

function MobileComponent() {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) return null;

  return (
    <div className="fixed justify-between bottom-0 w-full z-40 flex items-center bg-right border-t-[1px] lg:hidden">
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          label={route.label}
          onClick={route.onClick}
          active={route.active}
          icon={route.icon}
        />
      ))}
    </div>
  );
}

export default MobileComponent;
