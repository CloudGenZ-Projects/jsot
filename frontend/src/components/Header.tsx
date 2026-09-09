import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Instagram, Youtube, Sun, Moon, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoJain from "@/assets/logoJain.jpg";
import api from '@/utils/api';

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    submenu: [
      { name: "About Jainism", href: "/about#jainism" },
      { name: "About JSOT", href: "/about#jsot" },
      { name: "Board of Directors", href: "/about#board" },
      { name: "Management Committee", href: "/about#management" },
    ]
  },
  {
    name: "Events",
    href: "/events",
    submenu: [
      // --- ADDED PARYUSHAN PAGE HERE ---
      { name: "Paryushan Mahaparva", href: "/paryushan" },
      { name: "Upcoming Events", href: "/events#upcoming" },
      { name: "Calendar", href: "/events#calendar" },
      { name: "Affiliated Groups", href: "/events#groups" },
      { name: "Past Events Gallery", href: "/events#past" },
    ]
  },
  {
    name: "Resources",
    href: "/resources",
    submenu: [
      { name: "Project 441 Ellesmere", href: "/resources#441-ellesmere" },
      { name: "Articles", href: "/resources#articles" },
      { name: "Videos", href: "/resources#videos" },
      { name: "Newsletter", href: "/resources#subscribe-to-newsletter" },
    ]
  },
  { name: "Visitors", href: '/visitor' } // Fixed casing to match App.tsx
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const location = useLocation();

  const toggleMobileSubmenu = (name) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === name ? null : name);
  };

  const [panchang, setPanchang] = useState({
    tithi: "Loading...",
    navkarsi: "--:--",
    chovihar: "--:--",
  });

  useEffect(() => {
    const fetchPanchangData = async () => {
      try {
        const todayObj = new Date();
        const dateKey = todayObj.toISOString().split("T")[0];

        // 1. Fetch Tithi from Backend
        const response = await api.get('/panchang-2025');
        const panchangList = response.data;
        
        // Find today's data
        const todayData = panchangList.find(item => item.date === dateKey);
        const currentTithi = todayData ? todayData.tithi : "";

        // 2. Fetch Sun Data for Navkarsi/Chovihar
        const torontoDate = new Date().toLocaleDateString("en-CA", {
          timeZone: "America/Toronto",
        });

        const sunResponse = await fetch(
          `https://api.sunrise-sunset.org/json?lat=43.6532&lng=-79.3832&date=${torontoDate}&formatted=0`
        );
        const data = await sunResponse.json();

        if (data.status === "OK") {
          const sunriseTime = new Date(data.results.sunrise);
          const sunsetTime = new Date(data.results.sunset);

          // Navkarsi = Sunrise + 48 mins
          const navkarsiTime = new Date(sunriseTime.getTime() + 48 * 60000);
          // Chovihar = Sunset
          const choviharTime = sunsetTime;

          const formatTorontoTime = (date) => {
            return date.toLocaleTimeString("en-US", {
              timeZone: "America/Toronto",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
          };

          setPanchang({
            tithi: currentTithi,
            navkarsi: formatTorontoTime(navkarsiTime),
            chovihar: formatTorontoTime(choviharTime),
          });
        } else {
           setPanchang(prev => ({ ...prev, tithi: currentTithi }));
        }
      } catch (error) {
        console.error("Failed to fetch panchang data:", error);
        setPanchang({ tithi: "Unavailable", navkarsi: "--:--", chovihar: "--:--" });
      }
    };

    fetchPanchangData();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm shadow-md border-b-2 border-gold/30">

        {/* Top Bar with Panchang Data */}
        <div className="bg-secondary text-secondary-foreground py-2 px-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-2 md:gap-0">

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gold" />
                <span className="opacity-80 hidden sm:inline">Tithi:</span>
                <span className="font-semibold text-gold-light">{panchang.tithi}</span>
              </div>

              <span className="hidden sm:inline opacity-30">|</span>

              <div className="flex items-center gap-2">
                <Sun className="w-3 h-3 md:w-4 md:h-4 text-gold" />
                <span className="opacity-80 hidden sm:inline">Navkarsi:</span>
                <span className="font-semibold text-gold-light">{panchang.navkarsi}</span>
              </div>

              <span className="hidden sm:inline opacity-30">|</span>

              <div className="flex items-center gap-2">
                <Moon className="w-3 h-3 md:w-4 md:h-4 text-gold" />
                <span className="opacity-80 hidden sm:inline">Chovihar:</span>
                <span className="font-semibold text-gold-light">{panchang.chovihar}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden lg:inline text-gold-light font-medium text-xs">॥ Jai Jinendra ॥</span>
              <div className="flex gap-2">
                <a href="https://www.facebook.com/jsotcanada/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="https://www.instagram.com/jainsocietyoftoronto/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://www.youtube.com/@jainsocietyoftoronto-media131" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <img
                  src={logoJain}
                  alt="JSOT Logo"
                  className="w-full h-full rounded-full object-cover shadow-lg border border-gold/20"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg md:text-xl font-bold text-secondary">JSOT</span>
                <span className="text-[10px] md:text-xs text-muted-foreground">Jain Society of Toronto</span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative group px-3 py-2">
                  {item.submenu ? (
                    <>
                      <Link
                        to={item.href}
                        className="flex items-center gap-1 text-foreground hover:text-primary font-medium transition-colors focus:outline-none"
                      >
                        {item.name}
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                      </Link>
                      {/* Dropdown Menu */}
                      <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                        <div className="bg-white border border-gold/20 rounded-lg shadow-xl overflow-hidden py-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block px-4 py-3 text-sm text-foreground/80 hover:bg-gold/10 hover:text-primary transition-colors border-b border-gray-100 last:border-0"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link to={item.href} className="text-foreground hover:text-primary font-medium transition-colors">
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Donate Button & Hamburger */}
            <div className="flex items-center gap-3">
              <Button 
                variant="default" 
                size="default" 
                className="hidden sm:flex bg-gold hover:bg-gold/80 text-black font-semibold"
                onClick={() => setIsDonateModalOpen(true)}
              >
                DONATE NOW
              </Button>
              <button
                className="lg:hidden p-2 text-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* MOBILE NAVIGATION */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-in slide-in-from-top-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <div className="flex items-center justify-between w-full py-2 text-foreground hover:text-primary font-medium cursor-pointer">
                        <Link 
                          to={item.href} 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex-1"
                        >
                           {item.name}
                        </Link>
                        <button 
                           onClick={(e) => {
                             e.preventDefault();
                             toggleMobileSubmenu(item.name);
                           }}
                           className="p-2"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenuOpen === item.name ? "rotate-180" : ""}`} />
                        </button>
                      </div>

                      {mobileSubmenuOpen === item.name && (
                        <div className="pl-4 space-y-1 border-l-2 border-gold/20 ml-2 mb-2 bg-muted/20 rounded-r-md">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block py-2 px-2 text-sm text-muted-foreground hover:text-primary hover:bg-gold/10 rounded"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="block py-2 text-foreground hover:text-primary font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Button 
                className="w-full mt-4 bg-gold hover:bg-gold/80 text-black font-bold"
                onClick={() => {
                  setIsDonateModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                DONATE NOW
              </Button>
            </div>
          )}
        </nav>
      </header>

      {/* DONATE MODAL */}
      {isDonateModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsDonateModalOpen(false)}
        >
          <div 
            className="bg-background rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden relative border border-gold/30 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsDonateModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors bg-secondary/20 rounded-full hover:bg-secondary/50"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 border-b border-border pb-3">
                Donations / Labh Payments
              </h2>
              
              <p className="text-sm md:text-base text-foreground mb-4 font-medium">
                All Labhs / donations can be made in 3 different ways:
              </p>
              
              <ul className="list-disc pl-5 space-y-3 mb-6 text-sm md:text-base text-foreground/90">
                <li>
                  <span className="font-semibold">E-Transfer (Preferred):</span> jsottreasurer@gmail.com. Kindly mention the amount and name of the Labh or purpose of the donation in the comments section while using this method of payment.
                </li>
                <li>
                  <span className="font-semibold">Cheque:</span> In the name of “Jain Society of Toronto Inc”.
                </li>
                <li>
                  <span className="font-semibold">In-Person</span> at the Office in the Cultural Centre.
                </li>
              </ul>
              
              <h3 className="text-lg md:text-xl font-bold text-primary mt-6 border-b border-border pb-3 mb-4">
                Stock Donations
              </h3>
              <p className="text-sm md:text-base text-foreground/90">
                Please contact the management committee for instructions regarding stock transfers and tax receipts.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}