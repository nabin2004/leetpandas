import React from 'react';
import { Table, Pagination, Badge, Typography } from 'antd';

const { Text } = Typography;

const badgeStyle = `
  .custom-badge .ant-badge-status-dot {
    width: 12px;
    height: 12px;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = badgeStyle;
document.head.appendChild(styleSheet);

const dataSource = Array.from({ length: 100 }, (_, i) => ({
  key: i + 1,
  question: `What is the purpose of the Pandas method question ${i + 1}?`,
  difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard',
  example: `df.method_example_${i + 1}()`
}));

const columns = [
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question',
    render: (text) => <Text strong>{text}</Text>,
  },
  {
    title: 'Difficulty',
    dataIndex: 'difficulty',
    key: 'difficulty',
    render: (difficulty) => {
      let color;
      switch (difficulty) {
        case 'Easy':
          color = 'green';
          break;
        case 'Medium':
          color = 'orange';
          break;
        case 'Hard':
          color = 'red';
          break;
        default:
          color = 'blue';
      }
      return <Badge color={color} text={difficulty} style={{ color: color }} className="custom-badge" />;
    },
  },
  {
    title: 'Example Code',
    dataIndex: 'example',
    key: 'example',
    render: (text) => <Text code>{text}</Text>,
  },
];

const ProblemsPage = () => {
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
        }}
      />
    </div>
  );
};

export default ProblemsPage;
