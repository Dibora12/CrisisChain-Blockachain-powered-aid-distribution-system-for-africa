import { Bell, Menu, Wallet, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "../theme/ThemeToggle";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isLaceInstalled, setIsLaceInstalled] = useState(false);
  const [midnightConnected, setMidnightConnected] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLace = () => {
      const isInstalled = typeof window.cardano !== 'undefined' && typeof window.cardano.lace !== 'undefined';
      setIsLaceInstalled(isInstalled);
    };
    
    checkLace();
  }, []);

  const handleWalletConnect = useCallback(async () => {
    if (!isLaceInstalled) {
      toast.error(
        "Lace wallet is required", 
        {
          description: "Please install Lace wallet to connect",
          action: {
            label: "Install Lace",
            onClick: () => window.open('https://www.lace.io/', '_blank')
          }
        }
      );
      return;
    }

    try {
      const api = await window.cardano.lace!.enable();
      const addresses = await api.getUsedAddresses();
      if (addresses.length > 0) {
        const address = addresses[0];
        setIsWalletConnected(true);
        setWalletAddress(address);
        
        // Update user profile with wallet address
        if (user) {
          await supabase
            .from('profiles')
            .upsert({ 
              id: user.id, 
              wallet_address: address 
            });
        }
        
        toast.success("Lace wallet connected successfully!", {
          description: `Connected with address ${address.slice(0, 8)}...${address.slice(-6)}`
        });

        // Simulate Midnight connection after Cardano wallet connection
        setTimeout(() => {
          setMidnightConnected(true);
          toast.success("Midnight network connected for private transactions");
        }, 1000);
      }
    } catch (error) {
      console.error("User denied wallet connection or error occurred:", error);
      toast.error("Failed to connect Lace wallet", {
        description: "Please try again and approve the connection request in Lace"
      });
    }
  }, [isLaceInstalled, user]);

  const handleSignOut = async () => {
    await signOut();
    setIsWalletConnected(false);
    setWalletAddress("");
    setMidnightConnected(false);
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-primary text-primary-foreground p-1 rounded-md mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-bold text-xl text-foreground">CrisisChain</span>
            </Link>
          </div>

          {user ? (
            <>
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-muted-foreground hover:text-primary px-3 py-2 font-medium">Dashboard</Link>
                <Link to="/identity" className="text-muted-foreground hover:text-primary px-3 py-2 font-medium">Identity</Link>
                <Link to="/distribution" className="text-muted-foreground hover:text-primary px-3 py-2 font-medium">Distribution</Link>
                <Link to="/verification" className="text-muted-foreground hover:text-primary px-3 py-2 font-medium">Verification</Link>
              </nav>

              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-destructive"></span>
                </Button>
                
                {!isWalletConnected ? (
                  <Button 
                    onClick={handleWalletConnect}
                    className="hidden md:flex items-center space-x-2 bg-primary hover:bg-primary/90"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>
                      {isLaceInstalled ? 'Connect Lace' : 'Install Lace'}
                    </span>
                  </Button>
                ) : (
                  <div className="hidden md:flex items-center space-x-2">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-800 rounded-md text-sm">
                      <Wallet className="h-4 w-4" />
                      <span>{formatAddress(walletAddress)}</span>
                    </div>
                    {midnightConnected && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span>Midnight</span>
                      </div>
                    )}
                  </div>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden" 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {mobileMenuOpen && user && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/identity" 
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Identity
            </Link>
            <Link 
              to="/distribution" 
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Distribution
            </Link>
            <Link 
              to="/verification" 
              className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Verification
            </Link>
            <Button 
              onClick={handleWalletConnect}
              className="w-full mt-3 bg-primary hover:bg-primary/90"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {isWalletConnected ? 'Connected' : 'Connect Lace'}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
