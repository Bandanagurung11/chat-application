import { CometChat } from '@cometchat/chat-uikit-react';

// Initialize CometChat with your App ID
const appID = process.env.APP_ID;  // Replace with your actual App ID
const apiKey = process.env.AUTH_KEY; // Replace with your actual API Key

const cometChatInit = () => {
  CometChat.init(appID).then(
    () => {
      console.log('CometChat initialization completed successfully');
    },
    (error) => {
      console.error('CometChat initialization failed', error);
    }
  );
};

export { cometChatInit };
