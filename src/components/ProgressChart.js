import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Week 1', progress: 20, vocabulary: 5 },
    { name: 'Week 2', progress: 40, vocabulary: 10 },
    { name: 'Week 3', progress: 60, vocabulary: 15 },
    { name: 'Week 4', progress: 80, vocabulary: 20 },
];

const ProgressChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="progress" stroke="#8884d8" />
                <Line type="monotone" dataKey="vocabulary" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ProgressChart; 