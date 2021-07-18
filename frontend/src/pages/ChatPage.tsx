import React, { useContext } from 'react'
import { ChatSelect } from '../components/chat/ChatSelect';

import { InboxPeople } from '../components/chat/InboxPeople';
import { Messages } from '../components/chat/Messages';
import { ChatContext } from '../context/chat/ChatContext';

import '../css/chat.css';


export const ChatPage: React.FC = () => {

    const { chatState } = useContext(ChatContext);

    const { activeChat } = chatState;

    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />
                {

                    (activeChat) ?
                        <Messages />
                        :
                        <ChatSelect />
                }

            </div>

        </div>
    )
}
