
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { DistributionChart } from "@/components/dashboard/DistributionChart";
import { AidDistributionMap } from "@/components/dashboard/AidDistributionMap";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";
import { CreditCard, Users, MapPin, TrendingUp, Shield, UserCheck, HandHeart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
          icon={Users}
          trend={{ value: 12, positive: true }}
          description="Verified individuals receiving aid"
        />
        <StatCard
          title="Aid Distributed"
          value="$284,923"
          icon={CreditCard}
          trend={{ value: 8, positive: true }}
          description="Total value distributed this month"
        />
        <StatCard
          title="Active Locations"
          value="47"
          icon={MapPin}
          trend={{ value: 3, positive: true }}
          description="Crisis zones currently served"
        />
        <StatCard
          title="Privacy Rate"
          value="98.7%"
          icon={TrendingUp}
          trend={{ value: 0.3, positive: true }}
          description="Transactions with zero-knowledge protection"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Crisis ID Verification
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Secure identity verification using zero-knowledge proofs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Verify your identity privately while maintaining anonymity through advanced cryptographic methods.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Shield className="h-4 w-4 mr-2" />
              Verify Identity
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <CreditCard className="h-5 w-5 mr-2 text-green-600" />
              Aid Token Distribution
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Distribute aid tokens to verified recipients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create and distribute privacy-preserving aid tokens powered by Midnight blockchain technology.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <CreditCard className="h-4 w-4 mr-2" />
              Distribute Aid
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <UserCheck className="h-5 w-5 mr-2 text-purple-600" />
              Community Verification
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              DAO-based verification by community witnesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Participate in community-driven verification processes to help establish trust and legitimacy.
            </p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <UserCheck className="h-4 w-4 mr-2" />
              Join Verification
            </Button>
          </CardContent>
        </Card>
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
