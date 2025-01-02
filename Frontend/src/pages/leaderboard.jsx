import React from 'react';
import { Table, Avatar, Badge, Typography, Tag, Card } from 'antd';

const { Text } = Typography;

// Helper function to generate fake leaderboard data
const generateLeaderboardData = () => {
  const users = [];
  for (let i = 1; i <= 200; i++) {
    users.push({
      key: i.toString(),
      rank: i,
      username: `User ${i}`,
      avatar: `https://randomuser.me/api/portraits/men/${i % 50 + 1}.jpg`,
      score: Math.floor(Math.random() * 1000) + 500, // random score between 500 and 1500
      status: i % 2 === 0 ? 'Pro User' : 'Beginner',
    });
  }
  return users;
};

const leaderboardData = generateLeaderboardData();

const Leaderboard = () => {
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank) => (
        <Badge
          count={rank}
          style={{
            backgroundColor:
              rank === 1 ? '#fadb14' : rank === 2 ? '#d3d3d3' : '#cd7f32',
          }}
        />
      ),
    },
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
      render: (username, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar src={record.avatar} />
          <Text strong>{username}</Text>
        </div>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score) => <Text>{score}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Pro User' ? 'green' : 'blue'}>{status}</Tag>
      ),
    },
  ];

  return (
    <Card title="Leaderboard" bordered={false} style={{ margin: '20px' }}>
      <Table
        dataSource={leaderboardData}
        columns={columns}
        pagination={{
          pageSize: 10, 
          showSizeChanger: true, 
          pageSizeOptions: ['10', '20', '50', '100'],
          showTotal: (total) => `Total ${total} items`,
        }}
        rowClassName={(record) => (record.rank === 1 ? 'gold-row' : '')}
      />
    </Card>
  );
};

export default Leaderboard;
