// components/dashboard/Analytics.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Analytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await api.get('/analytics/trends');
      setData(res.data);
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Engagement Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={800} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#8884d8" />
            <Line type="monotone" dataKey="enquiries" stroke="#82ca9d" />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
};