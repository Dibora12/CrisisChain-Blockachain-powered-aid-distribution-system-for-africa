
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  type: 'distribution' | 'verification' | 'registration';
  amount?: string;
  recipient: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'distribution',
    amount: '$150',
    recipient: 'Family ID: ...gh45',
    timestamp: '2 minutes ago',
    status: 'completed'
  },
  {
    id: '2',
    type: 'verification',
    recipient: 'Witness: ...abc23',
    timestamp: '5 minutes ago',
    status: 'pending'
  },
  {
    id: '3',
    type: 'registration',
    recipient: 'Crisis ID: ...def67',
    timestamp: '12 minutes ago',
    status: 'completed'
  },
  {
    id: '4',
    type: 'distribution',
    amount: '$75',
    recipient: 'Individual: ...xyz89',
    timestamp: '1 hour ago',
    status: 'completed'
  }
];

export function RecentTransactions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {mockTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground capitalize">
              {transaction.type} {transaction.amount && `- ${transaction.amount}`}
            </p>
            <p className="text-xs text-muted-foreground">{transaction.recipient}</p>
          </div>
          <div className="text-right space-y-1">
            <Badge className={getStatusColor(transaction.status)}>
              {transaction.status}
            </Badge>
            <p className="text-xs text-muted-foreground">{transaction.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
