import React, { useCallback, useContext, useEffect } from 'react'

import { SendMessage } from './SendMessage'
import { OutgoingMessage } from './OutgoingMessage'
import { IncomingMessage } from './IncomingMessage'
import { AuthContext } from '../../auth/AuthContext'
import { ChatContext, IMessage } from '../../context/chat/ChatContext'
import { LoadMessages } from '../../context/chat/chatReducer'
import { customFetch } from '../../helpers/fetch'
import { ChatTypes } from '../../types/chat.types'
import { scrollToBottom } from '../../helpers/scrollToBottom'


export const Messages: React.FC = () => {

    const { auth } = useContext(AuthContext);
    const { chatState, dispatch } = useContext(ChatContext);

    const { activeChat } = chatState;

    const fetchMessages = useCallback(
        async () => {
            const response = await customFetch<IMessage[]>(
                {
                    endpoint: `message/history/${activeChat}`,
                    method: 'GET',
                    token: localStorage.getItem('accessToken') ?? '',
                }
            );

            const { ok, data } = response;
            if (ok) {

                const loadAction = {
                    type: ChatTypes.loadMessages,
                    payload: data ?? [],
                } as LoadMessages;

                dispatch(loadAction);
                scrollToBottom('messages');

            }
        },
        [activeChat, dispatch],
    );


    useEffect(() => {
        // Load chat messages
        fetchMessages();
    }, [fetchMessages]);


    return (
        <>
            {/* <!-- Chat inicio --> */}
            <div
                className="mesgs"
            >

                {/* <!-- Historia inicio --> */}
                <div
                    id="messages"
                    className="msg_history"
                >

                    {

                        chatState.messages.map(
                            (msg) => (msg.to !== auth.id)
                                // ? <OutgoingMessage key={msg.id} message={msg} />
                                ? <img src={'http://localhost:3001/photo/' + msg.text} />
                                : <IncomingMessage key={msg.id} message={msg} />

                        )

                    }


                </div>
                {/* <!-- Historia Fin --> */}

                <SendMessage />

            </div>
            {/* <!-- Chat Fin --> */}
        </>
    )
}
