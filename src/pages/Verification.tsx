import { 
  Users, UserCheck, Search, Shield, Fingerprint, 
  CheckCircle, Settings, Filter, Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommunityVerificationPanel } from "@/components/verification/CommunityVerificationPanel";
import { VerifyIdentityDialog } from "@/components/dialogs/VerifyIdentityDialog";
import { useState } from "react";

// Mock data for verification requests
const verificationRequests = [
  {
    recipientName: "Ekon Nkosi",
    recipientId: "0x7a2...9f3b",
    status: "pending" as const,
    locationName: "Nairobi, Kenya",
    verifiers: [
      {
        name: "Elder Makena",
        role: "Community Elder",
        status: "approved" as const,
        timestamp: "2 hours ago"
      },
      {
        name: "John Kamau",
        role: "Local NGO Worker",
        status: "approved" as const,
        timestamp: "3 hours ago"
      },
      {
        name: "Sarah Omondi",
        role: "Regional Authority",
        status: "pending" as const,
        timestamp: "pending"
      }
    ],
    requiredVerifications: 3
  },
  {
    recipientName: "Amara Okafor",
    recipientId: "0x3c8...2d4e",
    status: "verified" as const,
    locationName: "Lagos, Nigeria",
    verifiers: [
      {
        name: "Chief Adebayo",
        role: "Community Leader",
        status: "approved" as const,
        timestamp: "1 day ago"
      },
      {
        name: "Dr. Ngozi",
        role: "Medical Volunteer",
        status: "approved" as const,
        timestamp: "1 day ago"
      },
      {
        name: "Olufemi Adeyemi",
        role: "Aid Worker",
        status: "approved" as const,
        timestamp: "2 days ago"
      }
    ],
    requiredVerifications: 3
  }
];

export default function Verification() {
  const [verifyIdentityOpen, setVerifyIdentityOpen] = useState(false);

  const handleApplyNow = () => {
    setVerifyIdentityOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-chai-darkblue">Community Verification</h1>
          <p className="text-chai-gray mt-1">DAO-based verification by community witnesses and elders</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Verifier Portal
          </Button>
          <Button 
            className="flex items-center bg-chai-blue hover:bg-chai-darkblue"
            onClick={handleApplyNow}
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-chai-blue" />
              Active Verifiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">438</div>
            <p className="text-sm text-chai-gray">Community witnesses</p>
            <div className="flex items-center mt-2 text-chai-green text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M7 17l5-5 5 5M7 7l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              +23 new this month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-chai-green" />
              Successful Verifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">28,389</div>
            <p className="text-sm text-chai-gray">Identities verified</p>
            <div className="flex items-center mt-2 text-chai-green text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M7 17l5-5 5 5M7 7l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              97.2% success rate
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-chai-orange" />
              Pending Verifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">146</div>
            <p className="text-sm text-chai-gray">Awaiting verification</p>
            <div className="mt-2 text-chai-orange text-sm">
              Avg. time: 8.2 hours
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Verification Process</CardTitle>
          <CardDescription>How community-based verification works</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-grow">
              <div className="relative">
                <div className="hidden md:block absolute z-0 top-1/2 left-[35px] right-[35px] h-0.5 bg-gray-200"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-chai-blue/10 flex items-center justify-center mb-3">
                      <Fingerprint className="h-8 w-8 text-chai-blue" />
                    </div>
                    <h3 className="font-medium mb-1">Identity Claim</h3>
                    <p className="text-xs text-chai-gray">Individual requests identity verification</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-chai-orange/10 flex items-center justify-center mb-3">
                      <Users className="h-8 w-8 text-chai-orange" />
                    </div>
                    <h3 className="font-medium mb-1">Witness Gathering</h3>
                    <p className="text-xs text-chai-gray">Community elders and approved witnesses are notified</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-chai-green/10 flex items-center justify-center mb-3">
                      <UserCheck className="h-8 w-8 text-chai-green" />
                    </div>
                    <h3 className="font-medium mb-1">DAO Voting</h3>
                    <p className="text-xs text-chai-gray">Witnesses vote to confirm identity</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-chai-darkblue/10 flex items-center justify-center mb-3">
                      <Shield className="h-8 w-8 text-chai-darkblue" />
                    </div>
                    <h3 className="font-medium mb-1">Blockchain Record</h3>
                    <p className="text-xs text-chai-gray">Identity is permanently recorded on blockchain</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3 bg-chai-lightgray p-4 rounded-lg">
              <h3 className="font-medium mb-2">Benefits of Community Verification</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-chai-green mr-2 mt-0.5" />
                  <span>Works in regions with limited technology access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-chai-green mr-2 mt-0.5" />
                  <span>Leverages existing community trust networks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-chai-green mr-2 mt-0.5" />
                  <span>Prevents fraud through multiple independent witnesses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-chai-green mr-2 mt-0.5" />
                  <span>Creates immutable blockchain record of verification</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <Tabs defaultValue="pending">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="pending" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Pending</span>
              </TabsTrigger>
              <TabsTrigger value="verified" className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Verified</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2 w-full sm:w-auto mt-4 sm:mt-0">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search verifications..." 
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
          
          <TabsContent value="pending">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {verificationRequests.filter(req => req.status === 'pending').map((request, index) => (
                <CommunityVerificationPanel 
                  key={index}
                  recipientName={request.recipientName}
                  recipientId={request.recipientId}
                  status={request.status}
                  locationName={request.locationName}
                  verifiers={request.verifiers}
                  requiredVerifications={request.requiredVerifications}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="verified">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {verificationRequests.filter(req => req.status === 'verified').map((request, index) => (
                <CommunityVerificationPanel 
                  key={index}
                  recipientName={request.recipientName}
                  recipientId={request.recipientId}
                  status={request.status}
                  locationName={request.locationName}
                  verifiers={request.verifiers}
                  requiredVerifications={request.requiredVerifications}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Card className="bg-gradient-to-r from-chai-green/20 to-chai-green/5 border-chai-green/30">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <UserCheck className="h-10 w-10 text-chai-green" />
            </div>
            <div className="flex-grow text-center md:text-left mb-4 md:mb-0">
              <h3 className="font-bold text-lg text-chai-darkblue">Become a Community Verifier</h3>
              <p className="text-chai-gray">Help your community by verifying identities and enabling aid distribution.</p>
            </div>
            <Button 
              className="bg-chai-green hover:bg-chai-green/90 text-white"
              onClick={handleApplyNow}
            >
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <VerifyIdentityDialog 
        open={verifyIdentityOpen} 
        onOpenChange={setVerifyIdentityOpen} 
      />
    </div>
  );
}
