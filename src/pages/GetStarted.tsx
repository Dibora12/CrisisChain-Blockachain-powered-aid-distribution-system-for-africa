
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Users, MapPin, CheckCircle, Zap, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 dark:from-blue-950/20 dark:via-green-950/20 dark:to-purple-950/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mb-6">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to CrisisChain
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the future of humanitarian aid distribution powered by blockchain technology. 
            Secure, transparent, and privacy-preserving aid delivery for crisis-affected communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-2 hover:bg-muted">
                View Dashboard
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-4 bg-blue-600 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-blue-900 dark:text-blue-100 text-xl">
                Privacy-First Security
              </CardTitle>
              <CardDescription className="text-blue-700 dark:text-blue-300">
                Zero-knowledge proofs protect recipient identities while ensuring aid reaches those in need
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Advanced Cryptography</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-green-200 dark:border-green-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-4 bg-green-600 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-green-900 dark:text-green-100 text-xl">
                Instant Distribution
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                Blockchain-powered smart contracts enable immediate aid token distribution to verified recipients
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Smart Contracts</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-4 bg-purple-600 rounded-full mb-4 w-16 h-16 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-purple-900 dark:text-purple-100 text-xl">
                Community Driven
              </CardTitle>
              <CardDescription className="text-purple-700 dark:text-purple-300">
                Decentralized verification through community witnesses ensures transparency and trust
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">DAO Governance</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-12">How CrisisChain Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">1</div>
              <h3 className="font-semibold text-foreground mb-2">Register Identity</h3>
              <p className="text-muted-foreground text-sm">Verify your identity privately using zero-knowledge proofs</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">2</div>
              <h3 className="font-semibold text-foreground mb-2">Community Verification</h3>
              <p className="text-muted-foreground text-sm">Get verified by trusted community witnesses</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">3</div>
              <h3 className="font-semibold text-foreground mb-2">Receive Aid Tokens</h3>
              <p className="text-muted-foreground text-sm">Smart contracts distribute aid tokens automatically</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">4</div>
              <h3 className="font-semibold text-foreground mb-2">Access Aid</h3>
              <p className="text-muted-foreground text-sm">Use tokens at verified distribution points</p>
            </div>
          </div>
        </div>

        {/* Global Impact Stats */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-16">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Global Impact</h2>
              <p className="text-blue-100">Making a difference in crisis-affected communities worldwide</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">2,847</div>
                <div className="text-blue-100">Active Recipients</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$284K</div>
                <div className="text-blue-100">Aid Distributed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">47</div>
                <div className="text-blue-100">Crisis Zones Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98.7%</div>
                <div className="text-blue-100">Privacy Protection Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Make a Difference?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of aid workers, recipients, and community verifiers using CrisisChain to deliver 
                transparent and efficient humanitarian aid where it's needed most.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
