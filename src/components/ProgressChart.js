import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const ProgressChart = () => {
    const { theme } = useTheme();
    const data = [
        { name: 'Week 1', progress: 20, vocabulary: 5 },
        { name: 'Week 2', progress: 40, vocabulary: 10 },
        { name: 'Week 3', progress: 60, vocabulary: 15 },
        { name: 'Week 4', progress: 80, vocabulary: 20 },
    ];

    return (
        <div style={{ 
            backgroundColor: theme.colors.light.background, 
            padding: theme.spacing[4],
            borderRadius: theme.borderRadius.default 
        }}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={theme.colors.light.border} 
                    />
                    <XAxis 
                        dataKey="name" 
                        stroke={theme.colors.light.foreground} 
                    />
                    <YAxis 
                        stroke={theme.colors.light.foreground} 
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: theme.colors.light.card,
                            borderColor: theme.colors.light.border 
                        }}
                    />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="progress" 
                        stroke={theme.colors.primary.main} 
                    />
                    <Line 
                        type="monotone" 
                        dataKey="vocabulary" 
                        stroke={theme.colors.secondary.main} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressChart; 