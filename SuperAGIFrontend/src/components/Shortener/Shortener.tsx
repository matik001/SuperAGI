import { useQuery } from '@tanstack/react-query';
import { Button, Input, Spin } from 'antd';
import { shorten } from 'api/shortenerApi';
import React, { useCallback, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { FiCopy } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { keyToRedirectionUrl } from 'utils/generalUtils';

interface ShortenerProps {}

const UrlInput = styled(Input)`
	font-size: 30px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	height: 100%;
`;
const SubmitUrlBtn = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	height: auto;
`;
const Container = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 70%;
	padding: 20px 30px 15px 30px;
	margin-top: 20px;
	position: relative;
`;
const Row = styled.div`
	display: flex;
	flex-direction: row;
`;
const RedirectLink = styled.div`
	color: ${(props) => props.theme.primaryColor};
	font-size: 22px;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 6px;
	&:hover {
		opacity: 0.8;
	}
	margin-top: 10px;
`;

const Shortener: React.FC<ShortenerProps> = ({}) => {
	const { t } = useTranslation();

	const [url, setUrl] = useState('');
	const changeUrl = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	}, []);

	const {
		data: key,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ['shorten', url],
		queryFn: () => {
			return shorten(url);
		},
		enabled: false
	});
	const shortenHandler = useCallback(() => {
		refetch();
	}, [refetch]);

	const enterDownHandler = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				shortenHandler();
			}
		},
		[shortenHandler]
	);
	const newUrl = keyToRedirectionUrl(key?.key);

	return (
		<Spin spinning={isFetching}>
			<Container>
				<Row>
					<UrlInput
						placeholder={t('EnterYourUrl')}
						onChange={changeUrl}
						onKeyDown={enterDownHandler}
					/>
					<SubmitUrlBtn type="primary" value={url} onClick={shortenHandler}>
						{t('Shorten')}
					</SubmitUrlBtn>
				</Row>
				<br />

				{newUrl && (
					<>
						<CopyToClipboard text={newUrl} onCopy={() => toast('Copied!', { type: 'success' })}>
							<div style={{ textAlign: 'center', fontSize: '24px', marginTop: '30px' }}>
								{t('YourUrl')}
								<RedirectLink>
									<FiCopy />
									{newUrl}
								</RedirectLink>
							</div>
						</CopyToClipboard>
						<Link style={{ float: 'right' }} to={`/logs/${key?.key}`}>
							{t('GoToLogs')}
						</Link>
					</>
				)}
			</Container>
		</Spin>
	);
};

export default Shortener;
