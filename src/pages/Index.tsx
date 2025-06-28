
import { StatCard } from "@/components/dashboard/StatCard";
import { AidDistributionMap } from "@/components/dashboard/AidDistributionMap";
import { DistributionChart } from "@/components/dashboard/DistributionChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { ConnectionStatus } from "@/components/dashboard/ConnectionStatus";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Users, ShieldCheck, CreditCard, BarChart4, Fingerprint, 
  DownloadCloud, ListChecks, ArrowRight 
} from "lucide-react";
import { VerifyIdentityDialog } from "@/components/dialogs/VerifyIdentityDialog";
import { DistributeAidDialog } from "@/components/dialogs/DistributeAidDialog";
import { CreateTokenDialog } from "@/components/dialogs/CreateTokenDialog";
import { useCreateAidRequest } from "@/hooks/useAidRequests";
import { toast } from "sonner";

export default function Index() {
  const { user } = useAuth();
  const [verifyIdentityOpen, setVerifyIdentityOpen] = useState(false);
  const [distributeAidOpen, setDistributeAidOpen] = useState(false);
  const [createTokenOpen, setCreateTokenOpen] = useState(false);
  
  const createAidRequest = useCreateAidRequest();

  const handleJoinVerification = async () => {
    if (!user) {
      toast.error('Please sign in first');
      return;
    }
    setVerifyIdentityOpen(true);
  };

  const handleApplyForAid = async () => {
    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    // Simple aid application with default values
    try {
      await createAidRequest.mutateAsync({
        request_type: 'emergency',
        amount: 100,
        location: 'Current Location',
        description: 'Emergency aid request from dashboard',
        urgency_level: 5,
      });
    } catch (error) {
      console.error('Failed to create aid request:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="text-center text-white max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary text-primary-foreground p-3 rounded-md mr-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">CrisisChain</h1>
              <p className="text-xl text-slate-300">Blockchain-Powered Aid Distribution for Africa</p>
            </div>
          </div>
          
          <p className="text-lg mb-8 text-slate-200 max-w-2xl mx-auto">
            Secure, transparent, and efficient distribution of humanitarian aid using blockchain technology. 
            Connect donors, NGOs, governments, and local communities in a decentralized ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <Fingerprint className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Crisis ID Verification</h3>
              <p className="text-slate-300">Secure, biometric-based identity verification for displaced individuals.</p>
            </div>
            <div className="text-center">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Aid Token Distribution</h3>
              <p className="text-slate-300">Stablecoin-like tokens for essential needs distribution with smart contracts.</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Community Verification</h3>
              <p className="text-slate-300">Leveraging community leaders and witnesses for DAO-based identity verification.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-chai-darkblue">Dashboard</h1>
          <p className="text-chai-gray mt-1">Overview of aid distribution and impact</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center">
            <DownloadCloud className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="flex items-center bg-chai-blue hover:bg-chai-darkblue">
            <ListChecks className="h-4 w-4 mr-2" />
            Manage Distributions
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Recipients" 
          value="32,450" 
          description="Verified individuals" 
          icon={Users}
          trend={{ value: 12, positive: true }}
        />
        <StatCard 
          title="Identity Verifications" 
          value="28,389" 
          description="87.5% success rate" 
          icon={ShieldCheck}
          trend={{ value: 5, positive: true }}
        />
        <StatCard 
          title="Aid Tokens Distributed" 
          value="238,450" 
          description="Across 18 regions" 
          icon={CreditCard}
          trend={{ value: 8, positive: true }}
        />
        <StatCard 
          title="Success Rate" 
          value="96.3%" 
          description="Token utilization" 
          icon={BarChart4}
          trend={{ value: 2, positive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <AidDistributionMap />
        <DistributionChart />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-chai-darkblue">Recent Activity</h2>
        <RecentTransactions />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ConnectionStatus />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-chai-blue to-chai-darkblue rounded-lg p-6 text-white">
          <Fingerprint className="h-10 w-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Crisis ID Verification</h3>
          <p className="mb-4 opacity-90">Secure, biometric-based identity verification for displaced individuals.</p>
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/30 hover:bg-white/20 text-white"
            onClick={() => setVerifyIdentityOpen(true)}
          >
            <span>Verify Identity</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="bg-gradient-to-br from-chai-green to-chai-green/80 rounded-lg p-6 text-white">
          <CreditCard className="h-10 w-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Aid Token Distribution</h3>
          <p className="mb-4 opacity-90">Stablecoin-like tokens for essential needs distribution with smart contracts.</p>
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/30 hover:bg-white/20 text-white"
            onClick={() => setDistributeAidOpen(true)}
          >
            <span>Distribute Aid</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="bg-gradient-to-br from-chai-orange to-chai-orange/80 rounded-lg p-6 text-white">
          <Users className="h-10 w-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Community Verification</h3>
          <p className="mb-4 opacity-90">Leveraging community leaders and witnesses for DAO-based identity verification.</p>
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/30 hover:bg-white/20 text-white"
            onClick={handleJoinVerification}
          >
            <span>Join Verification</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 text-white">
          <CreditCard className="h-10 w-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Create First Token</h3>
          <p className="mb-4 opacity-90">Deploy your first privacy token on the Midnight network for secure aid distribution.</p>
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/30 hover:bg-white/20 text-white"
            onClick={() => setCreateTokenOpen(true)}
          >
            <span>Create Token</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-6 text-white">
          <Users className="h-10 w-10 mb-4" />
          <h3 className="text-xl font-bold mb-2">Apply for Aid</h3>
          <p className="mb-4 opacity-90">Submit an emergency aid request to receive assistance through the network.</p>
          <Button 
            variant="outline" 
            className="bg-white/10 border-white/30 hover:bg-white/20 text-white"
            onClick={handleApplyForAid}
            disabled={createAidRequest.isPending}
          >
            <span>Apply Now</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
      
      <div className="bg-chai-lightgray rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-chai-darkblue">Midnight Network Integration</h2>
            <p className="text-chai-gray max-w-2xl mt-1">
              CrisisChain uses Midnight's privacy-preserving blockchain to securely distribute aid while protecting recipient privacy.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">Read Docs</Button>
            <Button className="bg-chai-blue hover:bg-chai-darkblue">Connect Wallet</Button>
          </div>
        </div>
      </div>

      <VerifyIdentityDialog 
        open={verifyIdentityOpen} 
        onOpenChange={setVerifyIdentityOpen} 
      />
      <DistributeAidDialog 
        open={distributeAidOpen} 
        onOpenChange={setDistributeAidOpen} 
      />
      <CreateTokenDialog 
        open={createTokenOpen} 
        onOpenChange={setCreateTokenOpen} 
      />
    </div>
  );
}
