import { Id } from '../../../../../convex/_generated/dataModel';
import Conversation from './conversation';
import ChatInput from './custom-chat-input';

const ChatPage = ({ params }: { params: { projectId: string } }) => {
  return (
    <>
      <Conversation projectId={params.projectId as Id<'projects'>} />
      <ChatInput projectId={params.projectId as Id<'projects'>} />
    </>
  );
};

export default ChatPage;
