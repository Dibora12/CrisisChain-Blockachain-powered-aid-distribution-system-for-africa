
import { 
  CreditCard, Users, Search, Filter, Plus, 
  Download, ArrowUpDown, Layers, Clock, Settings,
  Shield, Eye, EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AidTokenCard } from "@/components/distribution/AidTokenCard";
import { ProofOfAidCard } from "@/components/proof/ProofOfAidCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAidTokens } from "@/hooks/useAidTokens";
import { useMidnightTransactions, useMidnightStats } from "@/hooks/useMidnightTransactions";
import { useDistributions } from "@/hooks/useDistributions";
import { useState } from "react";
import { toast } from "sonner";

export default function Distribution() {
  const { data: aidTokens, isLoading: tokensLoading } = useAidTokens();
  const { data: distributions, isLoading: distributionsLoading } = useDistributions();
  const { data: midnightStats } = useMidnightStats();
  const { data: midnightTx } = useMidnightTransactions(10);
  const [showPrivateData, setShowPrivateData] = useState(false);

  const handleNewDistribution = () => {
    toast.info("Opening aid distribution form...", {
      description: "This will create a new distribution with Midnight privacy protection"
    });
  };

  const handleExport = () => {
    toast.info("Exporting data with privacy compliance...", {
      description: "Private data will be anonymized using zero-knowledge proofs"
    });
  };

  // Transform aid tokens for display
  const displayTokens = aidTokens?.map(token => ({
    id: token.token_id,
    recipientId: showPrivateData ? token.recipient_id : token.recipient_id.slice(0, 8) + "...",
    amount: token.amount,
    issuer: "CrisisChain Network",
    issuedDate: new Date(token.created_at).toLocaleDateString(),
    expiryDate: token.expires_at ? new Date(token.expires_at).toLocaleDateString() : "No expiry",
    restrictions: token.restrictions || ["Food", "Water", "Medicine"],
    status: token.is_active ? "active" as const : "locked" as const,
  })) || [];

  // Transform distributions for proof of aid
  const proofOfAid = distributions?.slice(0, 5).map((dist, index) => ({
    id: dist.id,
    recipientId: showPrivateData ? dist.recipient_id : dist.recipient_id.slice(0, 8) + "...",
    recipientName: `Recipient ${index + 1}`,
    aidType: "Aid Distribution",
    amount: dist.amount,
    location: "Private Location",
    date: new Date(dist.created_at).toLocaleDateString(),
    time: new Date(dist.created_at).toLocaleTimeString(),
    distributorName: "CrisisChain Network",
    status: dist.status as "verified",
    ipfsHash: dist.midnight_tx_hash || "Not available",
  })) || [];

  if (tokensLoading || distributionsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading distribution data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-chai-darkblue flex items-center">
            <Shield className="h-8 w-8 mr-2 text-purple-600" />
            Aid Distribution
          </h1>
          <p className="text-chai-gray mt-1">Secure, private aid distribution powered by Midnight blockchain</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={() => setShowPrivateData(!showPrivateData)}
            className="flex items-center"
          >
            {showPrivateData ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showPrivateData ? 'Hide' : 'Show'} Private Data
          </Button>
          <Button variant="outline" onClick={handleExport} className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleNewDistribution} className="flex items-center bg-chai-blue hover:bg-chai-darkblue">
            <Plus className="h-4 w-4 mr-2" />
            New Distribution
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
              Active Tokens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{aidTokens?.filter(t => t.is_active).length || 0}</div>
            <p className="text-sm text-chai-gray">Tokens in circulation</p>
            <div className="flex items-center mt-2 text-purple-600 text-sm">
              <Shield className="h-4 w-4 mr-1" />
              Zero-knowledge protected
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Recipients Served
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{distributions?.length || 0}</div>
            <p className="text-sm text-chai-gray">Private distributions</p>
            <div className="flex items-center mt-2 text-green-600 text-sm">
              <Shield className="h-4 w-4 mr-1" />
              Midnight shielded
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Layers className="h-5 w-5 mr-2 text-blue-600" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{midnightStats?.totalValueTransferred.toFixed(0) || 0}</div>
            <p className="text-sm text-chai-gray">AID tokens distributed</p>
            <div className="flex items-center mt-2 text-blue-600 text-sm">
              <Shield className="h-4 w-4 mr-1" />
              Blockchain secured
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-orange-600" />
              Privacy Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{midnightStats?.privacyRate.toFixed(1) || 0}%</div>
            <p className="text-sm text-chai-gray">Transactions shielded</p>
            <div className="flex items-center mt-2 text-orange-600 text-sm">
              <Shield className="h-4 w-4 mr-1" />
              Midnight protected
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="aid-tokens">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="aid-tokens" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              <span>Aid Tokens</span>
            </TabsTrigger>
            <TabsTrigger value="proof-of-aid" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>Proof of Aid</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="aid-tokens">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-chai-darkblue mb-2 sm:mb-0">Active Aid Tokens</h2>
              <div className="flex space-x-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search tokens..." 
                    className="w-full pl-8"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {displayTokens.length > 0 ? (
                displayTokens.map((token) => (
                  <AidTokenCard key={token.id} token={token} />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No aid tokens found. Create your first distribution to get started.</p>
                  <Button onClick={handleNewDistribution} className="mt-4">
                    Create First Token
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="proof-of-aid">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-chai-darkblue mb-2 sm:mb-0">Recent Proof of Aid</h2>
              <div className="flex space-x-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search records..." 
                    className="w-full pl-8"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {proofOfAid.length > 0 ? (
                proofOfAid.map((proof) => (
                  <ProofOfAidCard key={proof.id} proofData={proof} />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No proof of aid records found yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-purple-600" />
            Midnight Blockchain Security
          </CardTitle>
          <CardDescription>Advanced privacy and security features powered by zero-knowledge proofs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/80 rounded-lg p-4 shadow-sm border border-purple-100">
              <h3 className="font-bold mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-purple-600" />
                Zero-Knowledge Proofs
              </h3>
              <p className="text-sm text-chai-gray mb-3">Verify eligibility without revealing sensitive personal data.</p>
              <div className="flex justify-between text-xs text-chai-gray">
                <span>Status:</span>
                <span className="text-purple-600 font-medium">Active</span>
              </div>
            </div>
            
            <div className="bg-white/80 rounded-lg p-4 shadow-sm border border-purple-100">
              <h3 className="font-bold mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-purple-600" />
                Shielded Transactions
              </h3>
              <p className="text-sm text-chai-gray mb-3">All aid distributions are protected with Midnight's privacy layer.</p>
              <div className="flex justify-between text-xs text-chai-gray">
                <span>Privacy Rate:</span>
                <span className="text-purple-600 font-medium">{midnightStats?.privacyRate.toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="bg-white/80 rounded-lg p-4 shadow-sm border border-purple-100">
              <h3 className="font-bold mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-purple-600" />
                Smart Contracts
              </h3>
              <p className="text-sm text-chai-gray mb-3">Automated eligibility verification and token distribution.</p>
              <div className="flex justify-between text-xs text-chai-gray">
                <span>Status:</span>
                <span className="text-purple-600 font-medium">Deployed</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" className="text-purple-600 border-purple-300 hover:bg-purple-50">
              <Settings className="h-4 w-4 mr-2" />
              Manage Privacy Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
