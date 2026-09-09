import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Calendar, ExternalLink } from "lucide-react";

// Importing Schedule Images
import p1 from "@/assets/p1.webp";
import p2 from "@/assets/p2.png";
import d1 from "@/assets/d1.png";
import d2 from "@/assets/d2.jpg";
import d3 from "@/assets/d3.jpg";

// Importing QR Codes
import volunteerQr from "@/assets/volunteerqr.jpg";
import newsletterQr from "@/assets/newslatterqr.jpg";
import whatsappQr from "@/assets/whatsappqr.jpg";
import pathshalaQr from "@/assets/pathshalaqr.jpg";

const ParyushanPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[350px] py-16 md:py-20 bg-gradient-to-r from-secondary via-maroon to-secondary text-white text-center flex flex-col items-center justify-center">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gold drop-shadow-md">
              Paryushan Mahaparva & Das Lakshan
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-8">Jain Society of Toronto</p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base font-medium">
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full">
                <MapPin className="h-5 w-5 text-saffron" /> 441 Ellesmere Road, Scarborough, ON M1R 4E5
              </div>
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full">
                <Phone className="h-5 w-5 text-saffron" /> 416 441 2211
              </div>
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full">
                <Mail className="h-5 w-5 text-saffron" /> info@jsotcanada.org
              </div>
            </div>
            
            <div className="mt-6 inline-flex flex-col md:flex-row gap-4 justify-center items-center bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
              <span className="flex items-center gap-2"><Clock className="h-5 w-5 text-gold" /> Temple Timings: 9:00 AM to 10:00 PM</span>
              <span className="hidden md:inline text-gold">|</span>
              <span className="flex items-center gap-2"><Calendar className="h-5 w-5 text-gold" /> Daily Aarti & Mangal Divo at 6:30 PM</span>
            </div>
          </div>
        </section>

        {/* Welcome & Scholars Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="font-serif text-2xl font-bold text-secondary">Jai Jinendra and Pranam</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The most auspicious and spiritually significant days of Paryushan Mahaparva and Das Lakshan Parva are approaching. On behalf of the Management Committee and Board of Directors, we warmly invite all members and families to come together at JSOT and make the most of these sacred days.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Paryushan is a time for self-reflection, atma chintan, spiritual purification, forgiveness and strengthening our connection with Jain principles. We encourage everyone to participate in the various religious activities, pujas, pravachans, tapasya and other programs being organized during this period.
              </p>
              <p className="text-secondary font-semibold text-lg">
                Let us come together as a Sangh and make these days meaningful through austerity, devotion, meditation, swadhyay and seva.
              </p>
            </div>

            <div className="mt-16 max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="font-serif text-3xl font-bold text-secondary">Welcoming Our Veer Sainik Scholars</h3>
                <div className="w-24 h-1 bg-saffron mx-auto mt-4 rounded-full"></div>
                <p className="text-muted-foreground mt-4">We are delighted to welcome two scholars from Tapovan, who will be joining our Sangh this Paryushan:</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-gold/20 shadow-lg hover:shadow-xl transition-shadow bg-card">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-saffron/10 rounded-full flex items-center justify-center border-2 border-saffron">
                      <span className="text-2xl font-serif text-saffron">MS</span>
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-secondary">Shri Meetbhai Shah</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      A young and passionate aaradhak from Surat, Meetbhai has been associated with Tapovan since 2011. His years at Tapovan, immersed in values, culture, and spiritual learning, have deeply shaped his character and understanding of our heritage.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gold/20 shadow-lg hover:shadow-xl transition-shadow bg-card">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gold/10 rounded-full flex items-center justify-center border-2 border-gold">
                      <span className="text-2xl font-serif text-gold">SS</span>
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-secondary">Shri Sampratibhai Shah</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      A talented and passionate singer from Ahmedabad, Sampratibhai has been associated with Tapovan for over 15 years and is one of its outstanding singers. Trained in classical music under Guruji Shree Aniket Khandekar, his devotional singing has touched Jain Sanghs across the world.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Images Section */}
        <section className="py-16 bg-white border-y border-gold/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-10">Paryushan Schedule</h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <img src={p1} alt="Paryushan Schedule Part 1" className="w-full rounded-xl shadow-lg border border-gold/20 object-contain" />
              <img src={p2} alt="Paryushan Schedule Part 2" className="w-full rounded-xl shadow-lg border border-gold/20 object-contain" />
            </div>
          </div>
        </section>

        {/* Ghee Bolis & Booking Links */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-10 text-center">Ghee Bolis & Important Notes</h2>
            
            <Card className="border-gold/30 bg-gradient-to-br from-white to-saffron/5 shadow-xl mb-12">
              <CardContent className="p-6 md:p-10 space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-maroon mb-3 border-b border-gold/20 pb-2">Ghee Bolis</h4>
                  <p className="text-muted-foreground">Snatra, Munimji, Thali & Danko, Tilak to Labharthis, Ami Chatana, Barsasutra Voravanu, Barsasuta Chitra Darshan, Parna Padhravanu, Parnu Jhulavanu</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-maroon mb-3 border-b border-gold/20 pb-2">Shobha Yatra</h4>
                  <p className="text-muted-foreground">Bhagwan ne lai Shobha yatra ma besvanu ghee, Dharavadi, Dhoop & Deep, Thali Danko, Pokhvanu Ghee</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-maroon mb-3 border-b border-gold/20 pb-2">Bestu Varas Dwar Utghatan - Tuesday, Nov 10th (6 AM)</h4>
                  <p className="text-muted-foreground">Snatra Puja, Simandhar Swami Gabhara, Parshwanath Gabhara & Mahavir Swami nu Gabhara, Asthaprakari Puja 3 Labhs - Simandhar Swami, Parshwanath Gabhara, Mahavir Swami Gabhara</p>
                </div>
                <div className="bg-saffron/10 p-4 rounded-lg border border-saffron/20 mt-4 text-secondary font-medium">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>All Labh’s are on First Come First Serve basis.</li>
                    <li>Kesar Pooja for all days is until 2:00 PM only. Kindly cooperate with us to manage the program in a timely manner.</li>
                    <li>All the programs are subject to change.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <h3 className="font-serif text-3xl font-bold text-center text-secondary mb-8">Booking Links</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Swapna Booking */}
              <Card className="border-gold/20 hover:shadow-lg transition-all h-full flex flex-col">
                <CardHeader className="bg-secondary/5 pb-4">
                  <CardTitle className="text-xl text-secondary">Swapna Booking</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex-grow flex flex-col justify-between space-y-4">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>Fixed Nakro for 10 Swapna for Phool ni Mala ($1008) & Sona ni Mala ($1107).</p>
                    <p>4 Ghee Bolis for Swapna (on the spot): Lakshmiji, Dev Viman, Padma Sarovar & Ratna no Dhaglo</p>
                  </div>
                  <button className="w-full bg-saffron hover:bg-saffron/90 text-white py-2 rounded font-medium flex justify-center items-center gap-2 transition-colors">
                    Booking Link <ExternalLink className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>

              {/* Ashtamangal Booking */}
              <Card className="border-gold/20 hover:shadow-lg transition-all h-full flex flex-col">
                <CardHeader className="bg-secondary/5 pb-4">
                  <CardTitle className="text-xl text-secondary">Ashtamangal Booking</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex-grow flex flex-col justify-between space-y-4">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>Ashtamangal Fixed Nakro for Phool ni Mala ($1008) & Sona ni Mala ($1107).</p>
                    <p>Ashtamangal will be given to the Labharthi for 1 year and must be returned 1 month before next Paryushan.</p>
                  </div>
                  <button className="w-full bg-saffron hover:bg-saffron/90 text-white py-2 rounded font-medium flex justify-center items-center gap-2 transition-colors">
                    Booking Link <ExternalLink className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>

              {/* Sattarbhedi Puja Booking */}
              <Card className="border-gold/20 hover:shadow-lg transition-all h-full flex flex-col">
                <CardHeader className="bg-secondary/5 pb-4">
                  <CardTitle className="text-xl text-secondary">Sattarbhedi Puja Booking</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex-grow flex flex-col justify-between space-y-4">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>Book for Sattarbhedi Puja on Sep 27, 2026.</p>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>Puja 1-4: $405 (Jal, Chandan, Vastrayugm, Vasakshep)</li>
                      <li>Puja 5-8: $405 (Pushparohan, Pushpamala, Pushpa Angrachana, Baras Churan)</li>
                      <li>Puja 9: Gheeboli (Dhwaja)</li>
                      <li>Puja 10-13: $405 (Mugat, Pushpagriha, Pushpavrishti, Astamangal)</li>
                      <li>Puja 14-17: $405 (Dhoop-Dipak, Geet, Nritya Natak, Vajintra)</li>
                    </ul>
                  </div>
                  <button className="w-full bg-saffron hover:bg-saffron/90 text-white py-2 rounded font-medium flex justify-center items-center gap-2 transition-colors">
                    Booking Link <ExternalLink className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-sm font-semibold text-maroon mt-6 bg-maroon/10 py-2 rounded">
              The booking links will open on Monday, August 24 at 8:00 PM and close by Monday, September 7, 2026.
            </p>
          </div>
        </section>

        {/* Das Lakshan & Other Events Images */}
        <section className="py-16 bg-white border-y border-gold/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-10">Das Lakshan Schedule & Other Events</h2>
            <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <img src={d1} alt="Das Lakshan Part 1" className="w-full rounded-xl shadow-lg border border-gold/20 object-contain hover:scale-[1.02] transition-transform" />
              <img src={d2} alt="Das Lakshan Part 2" className="w-full rounded-xl shadow-lg border border-gold/20 object-contain hover:scale-[1.02] transition-transform" />
              <img src={d3} alt="Das Lakshan Part 3" className="w-full rounded-xl shadow-lg border border-gold/20 object-contain hover:scale-[1.02] transition-transform" />
            </div>
          </div>
        </section>

        {/* Donations & Outstanding Dues */}
        <section className="py-16 bg-secondary text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="font-serif text-3xl font-bold text-gold mb-6">Outstanding Dues & Donations</h2>
            
            <div className="bg-white/10 p-6 rounded-xl border border-gold/30 mb-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3">Outstanding Dues!</h3>
              <p className="text-white/90">
                We request all Labharthis / Members to pay any outstanding dues that they have committed to the Jain Society for various occasions. As a Jain, it is our sincere and moral responsibility to clear any outstanding payments in a timely manner.
              </p>
            </div>

            <div className="text-left bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-gold mb-4 border-b border-white/20 pb-2">Donations / Labh Payments</h3>
              <p className="mb-4 text-white/90">All Labhs / donations can be made in 3 different ways:</p>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-start gap-3">
                  <div className="mt-1 min-w-[24px] h-6 bg-gold text-black rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div><strong className="text-white">E-Transfer (Preferred):</strong> jsottreasurer@gmail.com. Kindly mention the amount and name of the Labh or purpose of the donation in the comments section.</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 min-w-[24px] h-6 bg-gold text-black rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div><strong className="text-white">Cheque:</strong> In the name of “Jain Society of Toronto Inc”.</div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 min-w-[24px] h-6 bg-gold text-black rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div><strong className="text-white">In-Person:</strong> At the Office in the Cultural Centre.</div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Connect With Us (QR Codes) */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-secondary mb-12">Connect With Us</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              
              {/* Newsletter */}
              <div className="flex flex-col items-center group">
                <h4 className="text-lg font-bold text-secondary mb-4 border-b-2 border-saffron pb-1">Subscribe to Newsletter</h4>
                <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 group-hover:shadow-xl group-hover:-translate-y-2 transition-all">
                  <img src={newsletterQr} alt="Newsletter QR" className="w-48 h-48 object-contain" />
                </div>
              </div>

              {/* Pathshaala */}
              <div className="flex flex-col items-center group">
                <h4 className="text-lg font-bold text-secondary mb-4 border-b-2 border-saffron pb-1">Join JSOT's Pathshaala</h4>
                <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 group-hover:shadow-xl group-hover:-translate-y-2 transition-all">
                  <img src={pathshalaQr} alt="Pathshaala QR" className="w-48 h-48 object-contain" />
                </div>
              </div>

              {/* Whatsapp */}
              <div className="flex flex-col items-center group">
                <h4 className="text-lg font-bold text-secondary mb-4 border-b-2 border-saffron pb-1">Join Whatsapp Group</h4>
                <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 group-hover:shadow-xl group-hover:-translate-y-2 transition-all">
                  <img src={whatsappQr} alt="Whatsapp QR" className="w-48 h-48 object-contain" />
                </div>
              </div>

              {/* Volunteer */}
              <div className="flex flex-col items-center group">
                <h4 className="text-lg font-bold text-secondary mb-4 border-b-2 border-saffron pb-1">Become a Volunteer</h4>
                <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 group-hover:shadow-xl group-hover:-translate-y-2 transition-all">
                  <img src={volunteerQr} alt="Volunteer QR" className="w-48 h-48 object-contain" />
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ParyushanPage;