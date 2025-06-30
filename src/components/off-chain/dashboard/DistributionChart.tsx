
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockData = [
  { month: 'Jan', distributions: 245, privacy: 98.2 },
  { month: 'Feb', distributions: 312, privacy: 97.8 },
  { month: 'Mar', distributions: 389, privacy: 98.5 },
  { month: 'Apr', distributions: 421, privacy: 98.9 },
  { month: 'May', distributions: 456, privacy: 98.1 },
  { month: 'Jun', distributions: 523, privacy: 98.7 }
];

export function DistributionChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="month" 
            className="text-muted-foreground" 
            fontSize={12}
          />
          <YAxis 
            className="text-muted-foreground" 
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              color: 'hsl(var(--foreground))'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="distributions" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            name="Distributions"
          />
          <Line 
            type="monotone" 
            dataKey="privacy" 
            stroke="hsl(142 76% 36%)" 
            strokeWidth={2}
            dot={{ fill: 'hsl(142 76% 36%)', strokeWidth: 2, r: 4 }}
            name="Privacy Rate (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
