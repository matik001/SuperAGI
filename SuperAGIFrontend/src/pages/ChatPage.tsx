import { useQuery } from '@tanstack/react-query';
import { Layout, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { Chat as ChatType, getChats, getChats_KEY } from 'api/chatApi';
import Chat from 'components/Chats/Chat/Chat';
import { useEffect, useState } from 'react';
import { BsChatLeftText } from 'react-icons/bs';
import { useTheme } from 'styled-components';
import MainTemplatePage from './templates/MainTemplatePage';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, children?: MenuItem[]): MenuItem {
	return {
		key,
		children,
		label
	} as MenuItem;
}
const items: MenuItem[] = [
	getItem('Option 1', '1'),
	getItem('Option 2', '2'),
	getItem('User', 'sub1', [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
	getItem('Team', 'sub2', [getItem('Team 1', '6'), getItem('Team 2', '8')]),
	getItem('Files', '9')
];

const ChatsPage = () => {
	const theme = useTheme();
	const [collapsed, setCollapsed] = useState(false);
	const chats = useQuery([getChats_KEY], () => getChats());
	const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
	useEffect(() => {
		if (chats.data && chats.data?.length > 0) {
			setSelectedChat(chats.data[0]);
		}
	}, [chats.data]);
	return (
		<MainTemplatePage>
			<Layout style={{ minHeight: '100%' }}>
				<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
					<Menu
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
				</Sider>
				{/* <Layout> */}
				<Content style={{ margin: '0 16px' }}>
					{/* <Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb> */}
					{selectedChat && <Chat chatId={selectedChat.id} canInput />}
				</Content>
				{/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
				{/* </Layout> */}
			</Layout>
		</MainTemplatePage>
	);
};

export default ChatsPage;
