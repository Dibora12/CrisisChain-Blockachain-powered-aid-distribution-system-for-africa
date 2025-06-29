
import { useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { DistributionChart } from "@/components/dashboard/DistributionChart";
import { AidDistributionMap } from "@/components/dashboard/AidDistributionMap";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";
import { CreditCard, Users, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col lg:flex-row items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Crisis Aid Dashboard</h1>
          <p className="text-muted-foreground">
            Privacy-preserving humanitarian aid distribution powered by Midnight blockchain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Active Recipients"
          value="2,847"
          icon={<Users className="h-6 w-6" />}
          trend="+12%"
          trendDirection="up"
          description="Verified individuals receiving aid"
        />
        <StatCard
          title="Aid Distributed"
          value="$284,923"
          icon={<CreditCard className="h-6 w-6" />}
          trend="+8%"
          trendDirection="up"
          description="Total value distributed this month"
        />
        <StatCard
          title="Active Locations"
          value="47"
          icon={<MapPin className="h-6 w-6" />}
          trend="+3"
          trendDirection="up"
          description="Crisis zones currently served"
        />
        <StatCard
          title="Privacy Rate"
          value="98.7%"
          icon={<TrendingUp className="h-6 w-6" />}
          trend="+0.3%"
          trendDirection="up"
          description="Transactions with zero-knowledge protection"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Distribution Overview</CardTitle>
              <CardDescription className="text-muted-foreground">
                Monthly aid distribution trends with privacy metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DistributionChart />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <ConnectionStatus />
          
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription className="text-muted-foreground">
                Latest aid distributions and verifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Global Aid Distribution Map</CardTitle>
          <CardDescription className="text-muted-foreground">
            Real-time view of active crisis zones and aid distribution points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AidDistributionMap />
        </CardContent>
      </Card>
    </div>
  );
}
