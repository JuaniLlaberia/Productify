import { isSameHour } from 'date-fns';

export const groupConsecutiveMessages = (messages: any[]) => {
  const groupedMessages = [];
  let currentGroup = [];

  for (let i = 0; i < messages.length; i++) {
    if (
      i === 0 ||
      messages[i].sendBy._id !== messages[i - 1].sendBy._id ||
      !isSameHour(
        new Date(messages[i]._creationTime!),
        new Date(messages[i - 1]._creationTime!)
      )
    ) {
      currentGroup = [messages[i]];
      groupedMessages.push(currentGroup);
    } else {
      currentGroup.push(messages[i]);
    }
  }

  return groupedMessages;
};
