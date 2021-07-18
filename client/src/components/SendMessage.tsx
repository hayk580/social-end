import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { HtmlHTMLAttributes } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext, IMessage } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';
export const SendMessage: React.FC = () => {


    const [message, setMessage] = useState('');
    const [messageFile, setMessageFile] = useState('');
    const [fileSelected, setFileSelected] = React.useState<File>() // also tried <string | Blob>
    const Token = localStorage.getItem('accessToken')
    const { auth } = useContext(AuthContext);
    const { chatState } = useContext(ChatContext);
    const { socket } = useContext(SocketContext);

   console.log(Token)

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setMessage(target.value);
    }

    const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;

        if (!fileList) return;

        setFileSelected(fileList[0]);
    };

    const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        if (fileSelected) {
            let configImage = { headers: {
               
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' +  Token, 
            }}

            const formData = new FormData();
            formData.append("file", fileSelected, fileSelected.name);
            axios.post('http://localhost:3001' + '/api/photos', formData, configImage)
            .then(res => {
                setMessage(res.data);

            })
           
        }
    };



    const onSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        if (message.trim().length === 0) { return; }

        const messageToSend = {
            from: auth.id,
            to: chatState.activeChat,
            text: message,
        } as IMessage;
        // Emit a websocket
        socket?.emit('private-message', messageToSend);
        
        setMessage('');
    }


    return (
        <form
            onSubmit={onSubmit}
        >
            { /*      <!-- Enviar mensaje Inicio --> */}
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Նամակ..."
                        value={message}
                        onChange={onChange}
                    />
                    <input 
                    type="file"
                    className="msg_send_btn mt-3"
                    multiple={false}
                    onChange={handleImageChange}     
                      />
                </div>
                <div className="col-sm-3 text-center">
                    <button
                        className="msg_send_btn mt-3"
                        type="submit"
                        onClick={uploadFile}

                    >
                        ուղարկել
                    </button>
                </div>
            </div>
            {/* <!-- Enviar mensaje Fin --> */}
        </form>
    )
}
