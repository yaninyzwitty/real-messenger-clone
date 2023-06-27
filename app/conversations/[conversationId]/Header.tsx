"use client";
import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import {FullConversationType, FullMessageType} from "@/typings";
import {Conversation, User} from "@prisma/client";
import Link from "next/link";
import {useMemo, useState} from "react";
import {HiChevronLeft, HiEllipsisHorizontal} from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/components/AvatarGroup";
import useActiveList from "@/hooks/useActiveList";

type Props = {
  conversation: FullConversationType | {users: User[]} | any;
};
function Header({conversation}: Props) {
  const otherUser = useOtherUser(conversation!);
  const {members} = useActiveList();
  const isActive = members.indexOf(otherUser.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 lg:px-6 px-4 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href={`/conversations`}
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>

          {conversation?.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
        />
      </div>
    </>
  );
}

export default Header;
