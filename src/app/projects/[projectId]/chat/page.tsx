import Conversation from './conversation';
import ChatInput from './custom-chat-input';
import { Id } from '../../../../../convex/_generated/dataModel';

const ChatPage = ({ params }: { params: { projectId: string } }) => {
  return (
    <>
      <Conversation projectId={params.projectId as Id<'projects'>} />
      <ChatInput projectId={params.projectId as Id<'projects'>} />
    </>
  );
};

export default ChatPage;
