import { Avatar, Button, Input, Paper, ScrollArea } from '@mantine/core';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { Message } from '../../interfaces/chat';
import styles from './styles.module.css';

const Chat = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Array<Message>>([]);
    const socketRef = useRef<Socket<any, any> | null>(null);

    const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        socketRef.current?.emit('send_message', inputValue);
        setInputValue('');
    };

    useEffect(() => {
        const socket = io('http://localhost:3000', {
            withCredentials: true,
        });
        socketRef.current = socket;

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        socketRef.current?.emit('request_all_messages');

        socketRef.current?.on('receive_message', (data: any) => {
            setMessages((prev: any) => [
                ...prev,
                { id: data.message.id, content: data.message.content, user: data.user },
            ]);
        });

        socketRef.current?.on('send_all_messages', (data: any) => {
            setMessages(data);
        });
    }, []);

    return (
        <Paper shadow="xs" p="md">
            <div className={styles.inputContainer}>
                <Input placeholder="Your message" value={inputValue} onChange={handleOnInputChange} />
                <Button
                    onClick={handleSendMessage}
                    variant="gradient"
                    gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                >
                    send
                </Button>
            </div>
            <ScrollArea style={{ height: 600 }}>
                {messages?.map((message) => (
                    <div key={message.id} className={styles.messageContainer}>
                        <div className={styles.avatarContainer}>
                            <Avatar src={`http://localhost:3000/${message.user.avatar?.url}`} alt="it's me" />
                            <div>{message.user?.name}</div>
                        </div>
                        <div>{message.content}</div>
                    </div>
                ))}
            </ScrollArea>
        </Paper>
    );
};

export default Chat;
