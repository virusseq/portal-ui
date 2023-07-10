import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { apiRequest } from '@/global/utils/api';
import { HttpMethods } from '@/global/utils/constants';

interface NumberOfSamplesType {
	count: number;
	new: number;
}

interface DataType {
	key: string;
	pathogen: string;
	numberOfSamples: NumberOfSamplesType;
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Pathogen',
		dataIndex: 'pathogen',
		key: 'pathogen',
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
		title: '',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<Link href={`/apa/pathogens/${record.key}`}>View</Link>
			</Space>
		),
	},
];

function convertToTableData(responseData: []): DataType[] {
    return responseData.map((element: any) => {
        console.log(element.item.noOfSamples);
        return {
            key: element.id,
            pathogen: element.item.pathogen,
            numberOfSamples: {
                count: element.item.noOfSamples,
                new: 0,
            },
        };
    });
}

const PathogenTable: React.FC = () => {

    const [data, setData] = useState<any[]>([]);
    
    useEffect(() => {
        apiRequest(HttpMethods.GET,'read').then((res) => {
            setData(convertToTableData(res));
        });
    }, []);

    return (
        <Table columns={columns} dataSource={data} style={{ width: '80%' }} />	
    )};

export default PathogenTable;
