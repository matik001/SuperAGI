import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { createMessage, getChatWithMessages, getChatWithMessages_KEY } from 'api/chatApi';
import React, { useState } from 'react';
import { IoMdSend } from 'react-icons/io';

interface ChatProps {
	chatId: number;
	canInput?: boolean;
}

const Chat: React.FC<ChatProps> = ({ chatId, canInput }) => {
	const queryClient = useQueryClient();
	const {
		data: chat,
		isFetching,
		isLoading
	} = useQuery([getChatWithMessages_KEY, chatId], () => getChatWithMessages(chatId), {
		refetchInterval: 3000
	});
	const [inputMsg, setInputMsg] = useState('');
	const mutation = useMutation({
		mutationFn: () => {
			setInputMsg('');
			return createMessage(chatId, inputMsg);
		}
		// onSuccess: (data) => {
		// 	queryClient.setQueryData([getChatWithMessages_KEY, chatId], data);
		// }
	});
	return (
		<Spin spinning={isLoading} style={{ minHeight: '300px', height: '100%' }}>
			<>
				<h1>{chat?.title}</h1>
				{chat?.messages?.map((a) => (
					<p key={a.id}>
						<pre>
							{a.role} --- {a.content}
						</pre>
					</p>
				))}
				{canInput && (
					<>
						<TextArea
							placeholder="Send a message."
							autoSize={{ minRows: 1, maxRows: 6 }}
							style={{ alignSelf: 'end', justifySelf: 'end', padding: '10px' }}
							onChange={(e) => setInputMsg(e.target.value)}
							value={inputMsg}
							onPressEnter={(e) => {
								e.preventDefault();
								mutation.mutate();
							}}
						/>
						<Button
							style={{ position: 'absolute', right: '5px', bottom: '5px' }}
							onClick={() => {
								mutation.mutate();
							}}
						>
							<IoMdSend />
						</Button>
					</>
				)}
			</>
		</Spin>
	);
};

export default Chat;
