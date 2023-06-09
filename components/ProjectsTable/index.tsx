import React from 'react';
import Link from 'next/link';
import { Button, Space, Table, Tag, Typography, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import useAuthContext from '../../global/hooks/useAuthContext';

const { Title } = Typography;
const { Search } = Input;

interface NumberOfSamplesType {
	count: number;
	new: number;
}

interface DataType {
	key: string;
	projectId: string;
	dateCreated: Date;
	pathogen: string;
	numberOfSamples: NumberOfSamplesType;
	collaborators: number;
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Project ID',
		dataIndex: 'projectId',
		key: 'projectId',
	},
	{
		title: 'No. of samples',
		key: 'numberOfSamples',
		dataIndex: 'numberOfSamples',
		render: (_, { numberOfSamples }) => (
			<>
				<span style={{ marginRight: 10 }}>{numberOfSamples.count}</span>
				{numberOfSamples.new > 0 && (
					<Tag color={'blue'} key={numberOfSamples.new}>
						{`${numberOfSamples.new} new`}
					</Tag>
				)}
			</>
		),
	},
	{
		title: 'Date created',
		dataIndex: 'dateCreated',
		key: 'dateCreated',
	},
	{
		title: 'Pathogen',
		dataIndex: 'pathogen',
		key: 'pathogen',
	},
	{
		title: 'Collaborators',
		dataIndex: 'collaborators',
		key: 'collaborators',
	},
	{
		title: '',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<Link href={`/apa/pathogens/${record.key}`}>View</Link>
			</Space>
		),
	},
];

const data: DataType[] = [
	{
		key: 'sars-cov2-kzn',
		projectId: 'SARS-cov2 KwaZulu-Natal',
		dateCreated: new Date(),
		pathogen: 'SARS-cov-2',
		collaborators: 2,
		numberOfSamples: { count: 653, new: 50 },
	},
	{
		key: 'sars-cov2-kzn',
		projectId: 'SARS-cov2 KwaZulu-Natal',
		dateCreated: new Date(),
		pathogen: 'SARS-cov-2',
		collaborators: 2,
		numberOfSamples: { count: 653, new: 50 },
	},
	{
		key: 'sars-cov2-kzn',
		projectId: 'SARS-cov2 KwaZulu-Natal',
		dateCreated: new Date(),
		pathogen: 'SARS-cov-2',
		collaborators: 2,
		numberOfSamples: { count: 653, new: 50 },
	},
	{
		key: 'sars-cov2-kzn',
		projectId: 'SARS-cov2 KwaZulu-Natal',
		dateCreated: new Date(),
		pathogen: 'SARS-cov-2',
		collaborators: 2,
		numberOfSamples: { count: 653, new: 50 },
	},
	{
		key: 'sars-cov2-kzn',
		projectId: 'SARS-cov2 KwaZulu-Natal',
		dateCreated: new Date(),
		pathogen: 'SARS-cov-2',
		collaborators: 2,
		numberOfSamples: { count: 653, new: 50 },
	},
	{
		key: 'sars-cov2-kzn',
		projectId: 'SARS-cov2 KwaZulu-Natal',
		dateCreated: new Date(),
		pathogen: 'SARS-cov-2',
		collaborators: 2,
		numberOfSamples: { count: 653, new: 50 },
	},
];

const ProjectsTable: React.FC = () => {
	//const { token } = useAuthContext();

	return (
		<>
			<div style={{ width: '80%', lineHeight: 0 }}>
				<Title level={4} style={{ width: '80%' }}>
					Your projects
				</Title>
				<Space
					direction={'horizontal'}
					style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}
				>
					<Search
						placeholder="input search text"
						allowClear
						onSearch={() => {}}
						style={{ width: 200 }}
					/>
					<div>
						<a style={{ marginRight: 10 }} href="/">
							View all
						</a>
						<Button type={'primary'}>New project</Button>
					</div>
				</Space>
			</div>
			<Table columns={columns} dataSource={data} style={{ width: '80%' }} />
		</>
	);
};

export default ProjectsTable;
