import React from 'react';
import {
	HomeOutlined,
	AlignLeftOutlined,
	ReadOutlined,
	FolderOutlined,
	QuestionCircleOutlined,
	NotificationOutlined,
	ProfileOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';

const MenuItemUrls = new Map<string, string>([
	['home', '/apa'],
	['pathogen', '/apa/pathogens'],
	['submission', '/apa/submission'],
	['resources', '/apa/resources'],
	['guides', '/apa/guides'],
	['faqs', '/apa/faqs'],
	['contact', '/apa/contact'],
	['terms', '/apa/terms'],
]);

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group',
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}
const itemsWhenAuthenticated: MenuProps['items'] = [
	getItem('Home', 'home', <HomeOutlined />),
	getItem('Pathogen', 'pathogen', <AlignLeftOutlined />),
	getItem('Submission', 'submission', <UploadOutlined />),
	getItem('Resources', 'resources', <ReadOutlined />),
	getItem('Guides', 'guides', <FolderOutlined />),
	getItem('FAQs', 'faqs', <QuestionCircleOutlined />),
	getItem('Contact', 'contact', <NotificationOutlined />),
	getItem('Terms & conditions', 'terms', <ProfileOutlined />),
];

const itemsWhenNotAuthenticated: MenuProps['items'] = [
	getItem('Home', 'home', <HomeOutlined />),
	getItem('Pathogen', 'pathogen', <AlignLeftOutlined />),
	getItem('Submission', 'submission', <UploadOutlined />),
	getItem('Resources', 'resources', <ReadOutlined />),
	getItem('Guides', 'guides', <FolderOutlined />),
	getItem('FAQs', 'faqs', <QuestionCircleOutlined />),
	getItem('Contact', 'contact', <NotificationOutlined />),
	getItem('Terms & conditions', 'terms', <ProfileOutlined />),
];

const SideMenu = ({
	selectedKey,
	authenticated,
}: {
	selectedKey: string;
	authenticated?: boolean;
}) => {
	const router = useRouter();
	const onClick: MenuProps['onClick'] = (e) => {
		router.push(MenuItemUrls.get(e.key) as string);
	};

	return (
		<Menu
			onClick={onClick}
			style={{ height: '100%' }}
			defaultSelectedKeys={[selectedKey]}
			defaultOpenKeys={['home']}
			mode="inline"
			items={authenticated ? itemsWhenAuthenticated : itemsWhenNotAuthenticated}
		/>
	);
};

export default SideMenu;
