
import { MapPin, Users, Shield, TrendingUp } from 'lucide-react';

const mockMapData = [
  { id: 1, location: 'Northern Region', recipients: 1247, status: 'active', privacy: 98.9 },
  { id: 2, location: 'Central District', recipients: 856, status: 'active', privacy: 97.8 },
  { id: 3, location: 'Eastern Zone', recipients: 623, status: 'pending', privacy: 98.5 },
  { id: 4, location: 'Southern Area', recipients: 421, status: 'active', privacy: 99.1 }
];

export function AidDistributionMap() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-muted-foreground">Active Distribution</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-muted-foreground">Pending Setup</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-muted-foreground">Emergency Zone</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-muted-foreground">High Privacy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockMapData.map((zone) => (
          <div key={zone.id} className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground">{zone.location}</h3>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                zone.status === 'active' ? 'bg-green-500' : 
                zone.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{zone.recipients}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{zone.privacy}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-600 text-xs">Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          Interactive map visualization showing real-time aid distribution across crisis zones with privacy-preserving location data
        </p>
      </div>
    </div>
  );
}
