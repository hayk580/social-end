import { useCallback, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';


export const useSocket = (serverPath: string): {
    socket: Socket | null;
    online: boolean,
    connectSocket: () => void;
    disconnectSocket: () => void
} => {


    // const socket = useMemo(
    //     () => io(
    //         serverPath,
    //         {
    //             transports: ['websocket'],
    //         },
    //     ),
    //     [serverPath],
    // );

    const [socket, setSocket] = useState<Socket | null>(null);

    const connectSocket = useCallback(
        () => {
            const accessToken = localStorage.getItem('accessToken');
            const socketTemp = io(
                serverPath,
                {
                    transports: ['websocket'],
                    autoConnect: true,
                    forceNew: true,
                    query: {
                        authorization: `Bearer ${accessToken}`,
                    },
                    extraHeaders: {
                        authorization: `Bearer ${accessToken}`,
                    }
                },
            );
            setSocket(socketTemp);
        },
        [serverPath],
    );

    const disconnectSocket = useCallback(
        () => {

            socket?.disconnect();
            setSocket(null);
        },
        [socket],
    );


    const [online, setOnline] = useState<boolean>(false);

    useEffect(() => {

        setOnline(socket?.connected ? true : false);

    }, [socket]);


    useEffect(() => {

        socket?.on(
            'connect', () => {
                setOnline(true);
            }
        );

    }, [socket]);


    useEffect(() => {

        socket?.on(
            'disconnect', () => {
                setOnline(false);
            }
        );

    }, [socket]);


    return {
        socket,
        online,
        disconnectSocket,
        connectSocket,
    };
}
