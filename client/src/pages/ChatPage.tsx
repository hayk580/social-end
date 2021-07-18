import React, { useContext } from 'react'
import { ChatSelect } from '../components/ChatSelect';

import { InboxPeople } from '../components/InboxPeople';
import { Messages } from '../components/Messages';
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
