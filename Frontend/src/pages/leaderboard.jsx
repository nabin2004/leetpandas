import React from 'react';
import { Table, Avatar, Badge, Typography, Tag, Card } from 'antd';

const { Text } = Typography;

// Hardcoded leaderboard data
const hardcodedUsers = [
  {
    key: '1',
    rank: 1,
    username: 'Alok Khatri',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    score: 1500,
    status: 'Pro User',
  },
  {
    key: '2',
    rank: 2,
    username: 'Jatin Bhushal',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    score: 1450,
    status: 'Pro User',
  },
  {
    key: '3',
    rank: 3,
    username: 'Aayusha Shrestha',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    score: 1400,
    status: 'Pro User',
  },
  {
    key: '4',
    rank: 4,
    username: 'Simran Shakya',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    score: 1350,
    status: 'Beginner',
  },
  {
    key: '5',
    rank: 5,
    username: 'Nabin Oli',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    score: 1300,
    status: 'Pro User',
  },
  {
    key: '6',
    rank: 6,
    username: 'Niraj Karki',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    score: 1250,
    status: 'Beginner',
  },
  {
    key: '7',
    rank: 7,
    username: 'Abiyan',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    score: 1200,
    status: 'Beginner',
  },
  {
    key: '8',
    rank: 8,
    username: 'Pariskar',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    score: 1150,
    status: 'Pro User',
  },
  {
    key: '9',
    rank: 9,
    username: 'Sakshi Poudel',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    score: 1100,
    status: 'Beginner',
  },
];

// Adding additional users to fill the leaderboard
const generateLeaderboardData = () => {
  const users = [...hardcodedUsers]; // Start with hardcoded users
  for (let i = hardcodedUsers.length + 1; i <= 200; i++) {
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
