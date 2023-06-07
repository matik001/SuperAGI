import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Menu, MenuProps } from 'antd';
import { Chat as ChatType, createChat, getChats, getChats_KEY } from 'api/chatApi';
import Chat from 'components/Chats/Chat/Chat';
import { darken } from 'polished';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsChatLeftText } from 'react-icons/bs';
import styled, { useTheme } from 'styled-components';
import MainTemplatePage from './templates/MainTemplatePage';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [];

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	position: absolute;
`;

const ChatsPage = () => {
	const theme = useTheme();
	const { t } = useTranslation();
	const [collapsed, setCollapsed] = useState(false);
	const chats = useQuery([getChats_KEY], () => getChats());
	const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
	const queryClient = useQueryClient();

	useEffect(() => {
		if (chats.data && chats.data?.length > 0) {
			setSelectedChat(chats.data[0]);
		}
	}, [chats.data]);

	const onAddChat = async () => {
		await createChat('New chat');
		queryClient.invalidateQueries([getChats_KEY]);
	};
	return (
		<>
			<MainTemplatePage>
				<Container style={{ paddingTop: '50px', overflow: 'hidden' }}>
					<Menu
						style={{
							height: '100%',
							width: 'fit-content',
							padding: '0 10px'
						}}
						theme={theme.isDarkMode ? 'dark' : 'light'}
						mode="inline"
						selectedKeys={[selectedChat?.id?.toString() || '0']}
						onSelect={(e) => {
							const chat = chats.data?.find((a) => a.id.toString() === e.key);
							setSelectedChat(chat ?? null);
						}}
						items={
							chats.data?.map((a) => ({
								key: a.id,
								icon: <BsChatLeftText />,
								title: a.title,
								label: a.title
							})) || items
						}
					/>
					<Button
						onClick={onAddChat}
						style={{ position: 'absolute', bottom: '30px', left: 30, width: 140 }}
					>
						{t('Add')}
					</Button>
					<div
						style={{
							backgroundColor: darken(0.05, theme.bgColor)
						}}
					>
						{selectedChat && <Chat chatId={selectedChat.id} canInput />}
					</div>
				</Container>
			</MainTemplatePage>
		</>
	);
};

export default ChatsPage;
