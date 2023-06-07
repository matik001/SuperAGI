import { Message, MessageRole } from 'api/chatApi';
import { invert, readableColor } from 'polished';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { DefaultTheme, useTheme } from 'styled-components';

interface ChatMessageProps {
	message: Message;
	joinUpperMessage?: boolean;
}

const getBackgroundColor = (theme: DefaultTheme, role: MessageRole) => {
	switch (role) {
		case 'assistant':
			return invert(theme.primaryColor);
		case 'user':
			return theme.primaryColor;
		case 'system':
			return '#151515';
	}
};
const Box = styled.div<{
	role: MessageRole;
	backgroundColor: string;
	textColor: string;
	joinUpperMessage: boolean;
}>`
	padding: 10px 20px;
	border-radius: 18px;
	margin: ${(p) => (p.joinUpperMessage ? '5px 0 0 0' : '22px 0 0 0')};
	max-width: 95%;
	background-color: ${(props) => props.backgroundColor};
	color: ${(props) => props.textColor};
	align-self: ${(props) => (props.role === 'user' ? 'end' : 'start')};
`;
const ChatMessage: React.FC<ChatMessageProps> = ({
	message: { content, id, role },
	joinUpperMessage
}) => {
	if (joinUpperMessage === undefined) joinUpperMessage = false;
	const { t } = useTranslation();
	const theme = useTheme();
	const backgroundColor = getBackgroundColor(theme, role);
	const textColor = readableColor(backgroundColor);
	return (
		<Box
			role={role}
			backgroundColor={backgroundColor}
			joinUpperMessage={joinUpperMessage}
			textColor={textColor}
		>
			{!joinUpperMessage && (
				<div
					style={{
						position: 'relative',
						// color: textColor,
						color: 'gray',
						userSelect: 'none',
						textTransform: 'capitalize',
						fontSize: '12px'
					}}
				>
					<span
						style={{
							position: 'absolute',
							top: '-29px',
							...(role !== 'user' ? { left: 0 } : { right: 0 })
						}}
					>
						{t(role)}
					</span>
				</div>
			)}
			{content}
		</Box>
	);
};

export default ChatMessage;
