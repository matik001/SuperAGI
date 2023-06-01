import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Spin } from 'antd';
import { getLogs } from 'api/shortenerApi';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsArrowRight } from 'react-icons/bs';
import { MdRefresh } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { keyToRedirectionUrl } from 'utils/generalUtils';
import Log from './Log/Log';
interface LogsProps {
	logKey: string;
}
keyToRedirectionUrl;
const Logs: React.FC<LogsProps> = ({ logKey }) => {
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const { data: url, isFetching } = useQuery(
		['GetLogs', logKey],
		() => {
			return getLogs(logKey!);
		},
		{
			refetchInterval: 7000
		}
	);
	const fromUrl = url && keyToRedirectionUrl(url.key);
	return !url ? (
		<Spin style={{ width: '100%', height: '400px' }} />
	) : (
		<>
			<h2 style={{ textAlign: 'center' }}>{t('Logs')}</h2>
			<h3 style={{ textAlign: 'center' }}>
				<a href={fromUrl!}>{fromUrl}</a> <BsArrowRight /> <a href={url.url}>{url.url}</a>
			</h3>
			<hr />
			<Button
				size="large"
				style={{
					marginBottom: '15px',
					display: 'flex',
					alignItems: 'center',
					gap: '3px',
					marginTop: '20px'
				}}
				onClick={() => {
					queryClient.invalidateQueries({ queryKey: ['GetLogs'] });
				}}
			>
				<MdRefresh />
				{t('Refresh')}
			</Button>

			<Spin style={{ width: '100%', minHeight: '300px' }} spinning={isFetching}>
				{url &&
					url.urlLogs.map((log) => {
						return <Log key={log.id} log={log} />;
					})}
			</Spin>
			<div style={{ marginTop: '20px' }}>
				<Link style={{ float: 'left' }} to={`/`}>
					{t('GoToMainPage')}
				</Link>
			</div>
		</>
	);
};

export default Logs;
