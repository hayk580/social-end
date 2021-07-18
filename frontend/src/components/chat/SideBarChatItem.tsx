import React, { useContext } from 'react'
import { IUser } from '../../auth/AuthContext';
import { ChatContext } from '../../context/chat/ChatContext';
import { ActiveChat } from '../../context/chat/chatReducer';
import { ChatTypes } from '../../types/chat.types';

export type SideBarChatItemProps = {
    user: IUser;
};


export const SideBarChatItem: React.FC<SideBarChatItemProps> = ({ user }: SideBarChatItemProps) => {

    const { username, online, id } = user;

    const { chatState, dispatch } = useContext(ChatContext);

    const { activeChat } = chatState;

    const onClick = () => {
        const action: ActiveChat = {
            payload: user.id,
            type: ChatTypes.activeChat,
        };
        dispatch(action);

       
    }


    return (
        <>
            {/* <!-- conversación activa inicio --> */}
            <div
                className={`chat_list ${id === activeChat && 'active_chat'}`}
                onClick={onClick}
            >
                <div className="chat_people">
                    <div className="chat_img">
                        <img src="http://cemokalab.com/wp-content/uploads/2015/07/avatar-369-456321.png" alt="sunil" />
                    </div>
                    <div className="chat_ib">
                        <h5>{username}</h5>
                        {
                            (online)
                                ? <span className="text-success">Online</span>
                                : <span className="text-danger">Offline</span>
                        }
                    </div>
                </div>
            </div>
            {/* <!-- conversación activa Fin --> */}

        </>
    )
}
