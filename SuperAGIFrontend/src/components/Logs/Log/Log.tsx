import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { motion } from 'framer-motion';
import { darken, lighten } from 'polished';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
	MdInfoOutline,
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp
} from 'react-icons/md';
import styled from 'styled-components';
import { UrlLog } from 'types/url';
import { useBoolean } from 'usehooks-ts';
type LogProps = {
	log: UrlLog;
};

const Container = styled.div<{ expanded: boolean }>`
	background-color: ${(props) =>
		props.theme.isDarkMode
			? darken(props.expanded ? 0.1 : 0.2, props.theme.primaryColor)
			: lighten(props.expanded ? 0.1 : 0.2, props.theme.primaryColor)};
	cursor: pointer;
	border: 2px solid ${(props) => props.theme.primaryColor};
	margin-bottom: 10px;
	padding: 10px;
	border-radius: 0px;
	padding-left: 20px;
	padding-right: 20px;
	&:hover {
		background-color: ${(props) =>
			props.theme.isDarkMode
				? darken(0.1, props.theme.primaryColor)
				: lighten(0.1, props.theme.primaryColor)};
	}
`;
const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
interface HeaderItem {
	key: React.Key;
	name: string;
	value: string;
}
const Log: React.FC<LogProps> = ({ log }) => {
	const { t } = useTranslation();
	const { value: expanded, toggle: toggleExpanded } = useBoolean(false);
	const headers = useMemo((): HeaderItem[] => {
		const pairs = log.headers.split('\n').map((a) => a.split('='));
		return pairs.map((pair) => ({
			key: pair[0],
			name: pair[0],
			value: pair[1]
		}));
	}, [log.headers]);
	const columns = useMemo(
		(): ColumnsType<HeaderItem> => [
			{
				title: t('HeaderName'),
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: t('Value'),
				dataIndex: 'value',
				key: 'value'
			}
		],
		[t]
	);
	const moreInfoHandler = () => {
		window.open(`https://www.infobyip.com/ip-${log.ip}.html`, '_blank');
	};
	const expandHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		e.preventDefault();
		const elem = e.target as HTMLDivElement;
		const parent = elem.parentNode as HTMLDivElement;
		const classes = [...elem.classList];
		const parentClasses = [...parent.classList];
		if (
			classes.some((a) => a === 'ant-table-cell') ||
			parentClasses.some((a) => a === 'ant-pagination-item')
		)
			return;
		return toggleExpanded();
	};

	return (
		<Container onClick={expandHandler} expanded={expanded}>
			<Row>
				<div style={{ fontSize: '36px', display: 'flex' }}>
					{expanded ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
				</div>
				<span>{`${log.date.toLocaleDateString()} ${log.date.toLocaleTimeString()}`}</span>
				<span>IP: {log.ip}</span>
				<Button
					type="default"
					onClick={moreInfoHandler}
					style={{ display: 'flex', alignItems: 'center' }}
				>
					<MdInfoOutline />
					<span style={{ marginLeft: '3px' }}>{t('IpInfo')}</span>
				</Button>
			</Row>
			<motion.div
				style={{ overflow: 'hidden', height: 0 }}
				animate={{ height: expanded ? 'auto' : 0 }}
			>
				<Table
					pagination={false}
					columns={columns}
					dataSource={headers}
					style={{ marginTop: '20px', marginBottom: '20px' }}
				/>
			</motion.div>
		</Container>
	);
};

export default Log;
