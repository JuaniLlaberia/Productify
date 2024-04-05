import Conversation from './conversation';
import ChatInput from './custom-chat-input';
import { Id } from '../../../../../convex/_generated/dataModel';

const ChatPage = ({ params }: { params: { projectId: Id<'projects'> } }) => {
  return (
    <>
      <Conversation projectId={params.projectId} />
      <ChatInput projectId={params.projectId} />
    </>
  );
};

export default ChatPage;
