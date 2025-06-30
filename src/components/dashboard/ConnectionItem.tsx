
import React from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConnectionItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  connected: boolean;
  loading?: boolean;
  statusText?: string;
  actionButton?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

export function ConnectionItem({ 
  icon: IconComponent, 
  label, 
  connected, 
  loading = false, 
  statusText,
  actionButton 
}: ConnectionItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <IconComponent className="h-4 w-4 text-muted-foreground" />
        <span className="text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {connected ? (
          <>
            <CheckCircle className="h-5 w-5 text-green-500" />
            {statusText && (
              <span className="text-xs text-muted-foreground">
                {statusText}
              </span>
            )}
          </>
        ) : (
          <>
            <XCircle className="h-5 w-5 text-red-500" />
            {loading && <Loader2 className="h-3 w-3 animate-spin" />}
            {statusText && (
              <span className="text-xs text-muted-foreground">
                {statusText}
              </span>
            )}
            {actionButton && (
              <Button 
                size="sm" 
                onClick={actionButton.onClick}
                disabled={actionButton.disabled}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {actionButton.disabled && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                {actionButton.text}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
