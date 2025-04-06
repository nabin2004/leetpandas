import React, { useEffect, useState } from 'react';
import { Table, Avatar, Badge, Typography, Tag, Card } from 'antd';

const { Text } = Typography;

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/leaderboard/');
        const data = await response.json();
        // Assign a key to each item
        const leaderboardWithKey = data.map((user, index) => ({
          ...user,
          key: index + 1,
          rank: index + 1,
          avatar: `https://randomuser.me/api/portraits/men/${index % 50 + 1}.jpg`, // fake avatar
          status: user.score > 1300 ? 'Pro User' : 'Beginner',
        }));
        setLeaderboardData(leaderboardWithKey);
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
      }
    };

    fetchLeaderboard();
  }, []);

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {record.rank <= 5 && (
              <Tag color="#722f37" style={{ fontSize: '10px' }}>KAJI</Tag>
            )}
            <Text strong>{username}</Text>
            {record.status === 'Pro User' && (
              <Tag color="green" style={{ fontSize: '11px' }}>PRO</Tag>
            )}
          </div>
          <img
            src={`https://flagcdn.com/24x18/${record.country.toLowerCase()}.png`}
            alt={`${record.country} flag`}
            style={{ width: '24px', height: '18px' }}
          />
        </div>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score) => <Text>{score}</Text>,
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
