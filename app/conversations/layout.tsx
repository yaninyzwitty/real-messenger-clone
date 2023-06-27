import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";
import Conversations from "@/components/Conversations";
import Sidebar from "@/components/Sidebar";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-ignore
    <Sidebar>
      <div className="h-full">
        <Conversations
          users={users}
          title="Messages"
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}
