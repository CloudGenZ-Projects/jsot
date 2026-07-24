import { useState } from "react";
import { ChevronDown, CalendarDays, ExternalLink, CalendarHeart } from "lucide-react";

// Import Newsletter Images
import linkInaugurationImg from "@/assets/newsletter/Link Inauguration.jpg";
import bhaktamarVidhanImg from "@/assets/newsletter/Bhaktamar Vidhan.jpg";
import discoursesImg from "@/assets/newsletter/Discources by Pujya Gurudevshri.jpg";
import imjmReunionImg from "@/assets/newsletter/IMJM Jain Camp Reunion.jpg";
import juneMonthImg from "@/assets/newsletter/JuneMonth.jpg";

// --- JUNE NEWSLETTER CONTENT COMPONENT ---
const JuneNewsletterContent = () => {
  return (
    <div className="bg-muted/10 rounded-b-xl border-x border-b border-gold/30 p-4 md:p-8 space-y-12 md:space-y-16">
      
      {/* 1. MONTHLY OVERVIEW (Massive Cover Image) */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gold/20 flex flex-col group">
        <div className="w-full relative bg-secondary/5">
          <img 
            src={juneMonthImg} 
            alt="June Newsletter Overview" 
            className="w-full h-auto object-contain max-h-[80vh] mx-auto"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-saffron to-gold"></div>
        </div>
        <div className="p-8 md:p-12 text-center max-w-4xl mx-auto space-y-4">
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-secondary">
            Upcoming Events for June
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Please review our schedule of events for this month. We warmly welcome you and your family to join us in these moments of devotion, learning, and community building.
          </p>
        </div>
      </div>

      {/* 2. DISCOURSES (Full Width Image Block) */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gold/20 flex flex-col">
        <div className="w-full bg-secondary/5">
          <img 
            src={discoursesImg} 
            alt="Discourses by Pujya Gurudevshri Rakeshji" 
            className="w-full h-auto object-contain max-h-[80vh] mx-auto"
          />
          <div className="h-1 w-full bg-gold/50"></div>
        </div>
        <div className="p-8 md:p-12 max-w-4xl mx-auto text-center space-y-6">
          <h4 className="text-3xl md:text-4xl font-serif font-bold text-secondary">
            Discources by Pujya Gurudevshri Rakeshji
          </h4>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Two inspiring discourses that offer practical spiritual wisdom to navigate life with greater clarity, peace, and purpose. Whether you are new to spirituality or have been walking the path for years, these sessions offer a unique opportunity to gain fresh perspectives, deepen your understanding, and experience the uplifting presence of a living Master. We warmly invite you to register and encourage your family and friends to join you for this special opportunity to learn, reflect, and grow in Pujya Gurudevshri's presence.
          </p>
          <div className="pt-4">
            <a 
              href="https://srmd.org/toronto" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-gold text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Register: srmd.org/toronto <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. SAVE THE DATE (Typographic Highlight Banner) */}
      <div className="bg-gradient-to-br from-secondary via-[#3A1F24] to-maroon rounded-2xl p-8 md:p-16 text-white shadow-2xl relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
          <CalendarHeart className="w-96 h-96 text-gold" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-gold/20">
            <CalendarDays className="h-5 w-5" /> Save The Date
          </div>
          <h4 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
            Anniversary Celebrations & Dhwaja Mahotsav
          </h4>
          <p className="text-xl text-white/90">
            We are delighted to share the dates for our upcoming celebrations and we invite all members to mark their calendars to join us for these auspicious and joyous occasion:
          </p>
          
          <div className="bg-white/10 p-4 md:p-6 rounded-2xl border border-white/20 backdrop-blur-md mt-8">
            <div className="grid md:grid-cols-3 gap-6 font-semibold text-xl">
              <div className="bg-white/5 rounded-xl py-4 px-4 flex flex-col justify-center">
                <span className="block text-gold text-sm uppercase mb-2 tracking-wider">July 12 - 18</span>
                Abhishek
              </div>
              <div className="bg-white/5 rounded-xl py-4 px-4 flex flex-col justify-center border-t border-white/10 md:border-t-0 md:border-l">
                <span className="block text-gold text-sm uppercase mb-2 tracking-wider">July 18</span>
                Dhwaja Aarohan
              </div>
              <div className="bg-white/5 rounded-xl py-4 px-4 flex flex-col justify-center border-t border-white/10 md:border-t-0 md:border-l">
                <span className="block text-gold text-sm uppercase mb-2 tracking-wider">July 19</span>
                Cultural Program & Celebrations
              </div>
            </div>
          </div>
          <p className="text-gold/80 italic text-sm pt-4">
            * Further details and the complete program schedule will be shared soon. Stay tuned!
          </p>
        </div>
      </div>

      {/* 4. IMJM REUNION (Full Width Image Block) */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gold/20 flex flex-col">
        <div className="w-full bg-secondary/5">
          <img 
            src={imjmReunionImg} 
            alt="IMJM Jain Camp Reunion" 
            className="w-full h-auto object-contain max-h-[80vh] mx-auto"
          />
          <div className="h-1 w-full bg-gold/50"></div>
        </div>
        <div className="p-8 md:p-12 max-w-4xl mx-auto text-center space-y-4">
          <h4 className="text-3xl md:text-4xl font-serif font-bold text-secondary">
            IMJM Jain Camp Reunion
          </h4>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join us as we reconnect, share memories, and celebrate the bonds built during the IMJM Jain Camp. A wonderful opportunity for fellowship, spiritual reflection, and strengthening our vibrant community ties.
          </p>
        </div>
      </div>

      {/* 5. HIGHLIGHTS FROM RECENT EVENTS (Stacked Full-Width Sections) */}
      <div className="space-y-12 pt-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
          <div className="section-divider w-24 mx-auto bg-saffron h-1.5 rounded-full mb-6" />
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-secondary">
            Highlights from recent events
          </h3>
          <p className="text-muted-foreground text-lg">
            We are pleased to share highlights from a few of the memorable and spiritually enriching events recently held at our centre. These gatherings brought together members of our community in devotion, celebration and unity, further strengthening our shared values and traditions.
          </p>
        </div>

        {/* Highlight 1: Link Inauguration */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gold/20">
          <div className="w-full bg-black/5">
            <img 
              src={linkInaugurationImg} 
              alt="Link Inauguration" 
              className="w-full h-auto object-contain max-h-[80vh] mx-auto" 
            />
          </div>
          <div className="p-8 text-center max-w-4xl mx-auto">
            <h4 className="text-2xl md:text-3xl font-bold text-secondary font-serif mb-3">
              Link Inauguration
            </h4>
            <p className="text-muted-foreground text-lg">
              Unveiling the "Pathway to Moksha", a sacred connection between the Derasar and Cultural centre that bridges devotion with cultural enrichment.
            </p>
          </div>
        </div>

        {/* Highlight 2: Bhaktamar Vidhan */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gold/20">
          <div className="w-full bg-black/5">
            <img 
              src={bhaktamarVidhanImg} 
              alt="Bhaktamar Vidhan" 
              className="w-full h-auto object-contain max-h-[80vh] mx-auto" 
            />
          </div>
          <div className="p-8 text-center max-w-4xl mx-auto">
            <h4 className="text-2xl md:text-3xl font-bold text-secondary font-serif mb-3">
              Bhaktamar Vidhan
            </h4>
            <p className="text-muted-foreground text-lg">
              Devotees participated in the auspicious Bhaktamar Vidhan, experiencing a spiritually enriching ceremony filled with devotion, prayer and reverence.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};


// --- MAIN NEWSLETTER ARCHIVE COMPONENT ---
export const NewsletterArchive = () => {
  const newsletters = [
    {
      id: "june-2024",
      monthName: "June Updates & Events",
      content: <JuneNewsletterContent />
    },
    // Future months go here
  ];

  const [openId, setOpenId] = useState<string | null>(newsletters[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="newsletters" className="py-20 scroll-mt-20 relative bg-muted/20 border-t border-gold/20">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-gold font-bold uppercase tracking-widest text-sm">Stay Updated</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-secondary mt-3">
            Monthly Newsletters
          </h2>
          <div className="section-divider w-24 mx-auto mt-6 mb-6 bg-saffron h-1.5 rounded-full" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our visually rich newsletter archive containing flyers, announcements, and memories from our vibrant community.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-6xl mx-auto space-y-6">
          {newsletters.map((newsletter) => {
            const isOpen = openId === newsletter.id;

            return (
              <div key={newsletter.id} className="shadow-2xl rounded-xl bg-white border border-gold/30">
                <button
                  onClick={() => toggleAccordion(newsletter.id)}
                  className={`w-full flex items-center justify-between p-6 md:p-8 text-left transition-all duration-300 rounded-xl ${
                    isOpen 
                      ? "bg-secondary text-white rounded-b-none border-b-0 shadow-inner" 
                      : "hover:bg-gold/5 text-secondary"
                  }`}
                >
                  <span className="font-serif text-2xl md:text-3xl font-bold flex items-center gap-4">
                    <CalendarDays className={`h-8 w-8 md:h-10 md:w-10 ${isOpen ? "text-gold" : "text-saffron"}`} />
                    {newsletter.monthName}
                  </span>
                  <div className={`p-2 rounded-full transition-colors ${isOpen ? "bg-white/10" : "bg-secondary/5"}`}>
                    <ChevronDown 
                      className={`h-8 w-8 transition-transform duration-500 ${isOpen ? "rotate-180 text-white" : "text-secondary"}`} 
                    />
                  </div>
                </button>
                
                {/* Expandable Content (CSS Grid transition for smooth height animation) */}
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {newsletter.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};