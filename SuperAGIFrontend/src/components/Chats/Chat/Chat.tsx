import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { createMessage, getChatWithMessages, getChatWithMessages_KEY } from 'api/chatApi';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdSend } from 'react-icons/io';
import styled from 'styled-components';
import ChatMessage from './Message/ChatMessage';

interface ChatProps {
	chatId: number;
	canInput?: boolean;
}

const ChatContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	height: 100%;
	max-height: 100%;
	padding: 0 50px;
`;
const MessagesContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
	height: 100%;
	max-height: 100%;
	padding: 20px 50px 10px 50px;
	overflow: auto;
	&::-webkit-scrollbar {
		width: 10px;
		height: 11px;
	}
	&::-webkit-scrollbar-track {
		box-shadow: nset 0 0 6px gray;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #adadae;
		border-radius: 5px;
		border: 2px solid white;
	}
`;
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
	const { t } = useTranslation();
	return (
		// <Spin spinning={isLoading} style={{ width: '100%', height: '100%' }}>
		<ChatContainer>
			<MessagesContainer>
				{chat?.messages?.map((a, idx, arr) => (
					<ChatMessage
						key={a.id}
						message={a}
						joinUpperMessage={idx > 0 && arr[idx - 1].role === arr[idx].role}
					/>
				))}
			</MessagesContainer>
			{canInput && (
				<div
					style={{
						margin: '20px',
						position: 'relative'
					}}
				>
					<TextArea
						placeholder={t('SendMessage')}
						autoSize={{ minRows: 1, maxRows: 6 }}
						style={{ padding: '10px' }}
						onChange={(e) => setInputMsg(e.target.value)}
						value={inputMsg}
						onPressEnter={(e) => {
							if (e.shiftKey) return;
							e.preventDefault();
							mutation.mutate();
						}}
					/>
					<Button
						style={{
							position: 'absolute',
							right: '5px',
							bottom: '5px',
							border: 'none',
							...(inputMsg.length > 0 ? { backgroundColor: 'green' } : {}),
							color: 'white'
						}}
						disabled={inputMsg.length === 0}
						onClick={() => {
							mutation.mutate();
						}}
					>
						<IoMdSend />
					</Button>
				</div>
			)}
		</ChatContainer>
		// </Spin>
	);
};

export default Chat;
