
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ExternalLink } from 'lucide-react';

interface LaceInstallPromptProps {
  onInstallClick: () => void;
  onRefreshClick: () => void;
}

export function LaceInstallPrompt({ onInstallClick, onRefreshClick }: LaceInstallPromptProps) {
  return (
    <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
      <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
      <AlertDescription className="text-orange-800 dark:text-orange-200">
        <div className="flex flex-col gap-3">
          <p><strong>Lace Wallet Required</strong></p>
          <p>To connect your wallet and use blockchain features, you need to install the Lace Wallet extension.</p>
          <div className="flex gap-2">
            <Button 
              onClick={onInstallClick}
              size="sm"
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              Install Lace Wallet
            </Button>
            <Button 
              onClick={onRefreshClick}
              size="sm"
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900/20"
            >
              I've Installed It
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
