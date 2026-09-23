import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Moon,
  Clock,
  CheckCircle2,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react";
import api from "@/utils/api";

export interface ApiEvent {
  id: string | number;
  title: string;
  fullDate: string; // YYYY-MM-DD
  time: string; // startTime HH:mm
  endTime?: string; // endTime HH:mm
  location?: string;
  type?: string;
  description?: string;
}

// Paryushan 2026 Tithi Mapping
const PARYUSHAN_TITHIS: Record<string, { dayNumber: number; tithi: string }> = {
  "2026-09-08": { dayNumber: 1, tithi: "Baras" },
  "2026-09-09": { dayNumber: 2, tithi: "Teras" },
  "2026-09-10": { dayNumber: 3, tithi: "Chaudas" },
  "2026-09-11": { dayNumber: 4, tithi: "Amas" },
  "2026-09-12": { dayNumber: 5, tithi: "Bestu Mahino (Ekam)" },
  "2026-09-13": { dayNumber: 6, tithi: "Bij" },
  "2026-09-14": { dayNumber: 7, tithi: "Trij" },
  "2026-09-15": { dayNumber: 8, tithi: "Choth · Samvatsari" },
};

// Convert 24-hour "HH:mm" time string to "5:45 AM"
function formatTime12h(time24: string): string {
  if (!time24) return "";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const m = mStr || "00";
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

// Convert "HH:mm" to total seconds from 00:00
function timeToSeconds(time24: string): number {
  if (!time24) return 0;
  const [h, m] = time24.split(":").map(Number);
  return (h || 0) * 3600 + (m || 0) * 60;
}

// Format duration: clean minutes only ("54 min" / "2 hr 2 min")
function formatDuration(totalSeconds: number): string {
  if (totalSeconds <= 0) return "Starting now";

  const roundedMins = Math.ceil(totalSeconds / 60);
  const rHours = Math.floor(roundedMins / 60);
  const rMins = roundedMins % 60;

  if (rHours > 0 && rMins > 0) return `${rHours} hr ${rMins} min`;
  if (rHours > 0) return `${rHours} hr`;
  return `${rMins} min`;
}

// Get current Toronto (America/Toronto) time components
function getTorontoTimeDetails() {
  const now = new Date();
  
  // Format parts in America/Toronto timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "long",
  });

  const parts = formatter.formatToParts(now);
  const findPart = (type: string) => parts.find((p) => p.type === type)?.value || "";

  const year = findPart("year");
  const month = findPart("month");
  const day = findPart("day");
  const hour = parseInt(findPart("hour"), 10) || 0;
  const minute = parseInt(findPart("minute"), 10) || 0;
  const second = parseInt(findPart("second"), 10) || 0;
  const weekday = findPart("weekday");

  const dateStr = `${year}-${month}-${day}`; // e.g. "2026-09-09"
  const currentSeconds = hour * 3600 + minute * 60 + second;

  // Formatted date string like "Wednesday, Sep 9"
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIdx = parseInt(month, 10) - 1;
  const dayNum = parseInt(day, 10);
  const displayDate = `${weekday}, ${monthNames[monthIdx] || ""} ${dayNum}`;

  // Time in 12h format with seconds
  const h12 = hour % 12 || 12;
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayTime = `${h12}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")} ${ampm}`;

  return {
    dateStr,
    displayDate,
    displayTime,
    weekday,
    hour,
    minute,
    second,
    currentSeconds,
  };
}

export const ParyushanLiveTracker: React.FC = () => {
  const [torontoTime, setTorontoTime] = useState(getTorontoTimeDetails());
  const [events, setEvents] = useState<ApiEvent[]>([]);

  // Update clock every second (1000ms) for live real-time countdown reduction
  useEffect(() => {
    const timer = setInterval(() => {
      setTorontoTime(getTorontoTimeDetails());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch events directly from API (https://jsot-api.cloudgenz.com/api/events)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        }
      } catch (err) {
        console.error("Error fetching events from API:", err);
      }
    };
    fetchEvents();
  }, []);

  // Determine active date & events for today
  const todayDateStr = torontoTime.dateStr;
  let activeDateStr = todayDateStr;
  let activeEvents = events.filter((e) => e.fullDate === todayDateStr);

  // If no events found for today's date yet, fallback to available date in events
  if (activeEvents.length === 0 && events.length > 0) {
    const dates = Array.from(new Set(events.map((e) => e.fullDate))).sort();
    const foundDate = dates.find((d) => d >= todayDateStr) || dates[0];
    if (foundDate) {
      activeDateStr = foundDate;
      activeEvents = events.filter((e) => e.fullDate === activeDateStr);
    }
  }

  // Sort events by time
  const dayEvents = [...activeEvents].sort((a, b) =>
    (a.time || "").localeCompare(b.time || "")
  );

  const dayInfo = PARYUSHAN_TITHIS[activeDateStr] || {
    dayNumber: 2,
    tithi: "Teras",
  };

  // Calculate live state for today with second precision
  let status: "OVERNIGHT" | "HAPPENING_NOW" | "BREAK" | "COMPLETED" = "OVERNIGHT";
  let currentEvent: ApiEvent | null = null;
  let nextEvent: ApiEvent | null = null;
  let timeToNextSeconds = 0;
  let remainingSeconds = 0;
  let progressPercent = 0;

  if (dayEvents.length > 0) {
    const curSec = torontoTime.currentSeconds;

    // Check if there is an event currently happening
    const liveEv = dayEvents.find((e) => {
      const s = timeToSeconds(e.time);
      const end = timeToSeconds(e.endTime || e.time);
      return curSec >= s && curSec < end;
    });

    if (liveEv) {
      status = "HAPPENING_NOW";
      currentEvent = liveEv;
      const s = timeToSeconds(liveEv.time);
      const end = timeToSeconds(liveEv.endTime || liveEv.time);
      remainingSeconds = Math.max(0, end - curSec);
      const totalDuration = end - s;
      progressPercent = totalDuration > 0 ? Math.min(100, Math.max(0, ((curSec - s) / totalDuration) * 100)) : 0;

      // Find the next upcoming event
      nextEvent = dayEvents.find((e) => timeToSeconds(e.time) >= end) || null;
      if (nextEvent) {
        timeToNextSeconds = Math.max(0, timeToSeconds(nextEvent.time) - curSec);
      }
    } else {
      const firstEvent = dayEvents[0];
      const lastEvent = dayEvents[dayEvents.length - 1];
      const firstStart = timeToSeconds(firstEvent.time);
      const lastEnd = timeToSeconds(lastEvent.endTime || lastEvent.time);

      if (curSec < firstStart) {
        // Before morning program
        status = "OVERNIGHT";
        nextEvent = firstEvent;
        timeToNextSeconds = Math.max(0, firstStart - curSec);
      } else if (curSec >= lastEnd) {
        // After all programs of the day
        status = "COMPLETED";
        nextEvent = null;
      } else {
        // In-between daytime programs
        status = "BREAK";
        nextEvent = dayEvents.find((e) => timeToSeconds(e.time) > curSec) || null;
        if (nextEvent) {
          timeToNextSeconds = Math.max(0, timeToSeconds(nextEvent.time) - curSec);
        }
      }
    }
  }

  // Active date display breakdown
  const dateParts = activeDateStr.split("-");
  const activeDayNum = dateParts[2] ? parseInt(dateParts[2], 10) : 9;

  return (
    <section className="relative py-8 md:py-12 bg-gradient-to-b from-secondary/5 via-background to-muted/20 border-b border-gold/20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header Title with Live Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-primary font-bold">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Real-Time Paryushan Companion</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mt-1">
              Live & Upcoming Programs
            </h2>
          </div>

          {/* Toronto Clock Badge with Live Ticking Seconds */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card border border-gold/30 text-xs text-muted-foreground shadow-sm self-start sm:self-auto font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Toronto: <strong className="text-secondary font-semibold">{torontoTime.displayTime} EDT</strong></span>
          </div>
        </div>

        {/* MAIN LIVE CARD (Exact UI from jsot.info) */}
        <div className="relative rounded-3xl border-2 border-primary/25 bg-card shadow-xl overflow-hidden mb-6">
          
          {/* Top Gradient Banner: Day X · Tithi & Date */}
          <div className="relative bg-gradient-to-r from-secondary via-saffron to-secondary text-white px-5 py-3 flex items-center justify-between shadow-sm">
            <span className="font-semibold text-sm inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Day {dayInfo.dayNumber} · {dayInfo.tithi}</span>
            </span>
            <span className="text-xs opacity-90 font-medium">
              {torontoTime.weekday}, Sep {activeDayNum}
            </span>
          </div>

          {/* Card Body */}
          <div className="p-5 md:p-6">
            {/* 1. OVERNIGHT */}
            {status === "OVERNIGHT" && (
              <div>
                <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm">
                  <Moon className="w-4 h-4 text-primary" />
                  <span>OVERNIGHT</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-maroon mt-2">
                  Programs begin this morning
                </h3>
                <p className="text-foreground/75 mt-1 font-medium">
                  Next: <span className="tabular-nums font-semibold text-primary">{formatDuration(timeToNextSeconds)}</span>
                </p>
              </div>
            )}

            {/* 2. HAPPENING NOW */}
            {status === "HAPPENING_NOW" && currentEvent && (
              <div>
                <div className="flex items-center gap-2 font-bold text-sm text-red-600">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping bg-red-500"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                  <span>HAPPENING NOW</span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-maroon mt-2">
                  {currentEvent.title}
                </h3>

                {currentEvent.location && (
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{currentEvent.location}</span>
                  </p>
                )}

                <div className="mt-3 flex items-baseline justify-between text-sm">
                  <span className="text-foreground/80 font-medium">
                    {formatTime12h(currentEvent.time)} – {formatTime12h(currentEvent.endTime || currentEvent.time)}
                  </span>
                  <span className="text-primary font-semibold tabular-nums">
                    {formatDuration(remainingSeconds)} remaining
                  </span>
                </div>

                {/* Live Progress Bar */}
                <div className="mt-2 h-2.5 w-full rounded-full bg-secondary/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-saffron to-primary transition-all duration-1000 ease-linear"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* 3. BETWEEN PROGRAMS (Break) */}
            {status === "BREAK" && (
              <div>
                <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>BETWEEN PROGRAMS</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-maroon mt-2">
                  Between programs
                </h3>
                <p className="text-foreground/75 mt-1 font-medium">
                  Next: <span className="tabular-nums font-semibold text-primary">{formatDuration(timeToNextSeconds)}</span>
                </p>
              </div>
            )}

            {/* 4. COMPLETED */}
            {status === "COMPLETED" && (
              <div>
                <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>COMPLETED</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-maroon mt-2">
                  Today's programs have ended
                </h3>
                <p className="text-foreground/75 mt-1 font-medium">
                  Michhami Dukkadam · Temple open tomorrow morning at 5:45 AM
                </p>
              </div>
            )}

            {/* UP NEXT ROW (Divider + Next Program Details) */}
            {nextEvent && (
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Next
                  </div>
                  <div className="font-semibold text-maroon truncate text-base md:text-lg">
                    {nextEvent.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatTime12h(nextEvent.time)} – {formatTime12h(nextEvent.endTime || nextEvent.time)}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground">Starts in</div>
                  <div className="font-serif text-xl sm:text-2xl text-primary font-bold tabular-nums">
                    {formatDuration(timeToNextSeconds)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action button redirecting to Events page */}
        <div className="flex justify-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#7C0902] hover:bg-[#600701] text-white font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-xl hover:scale-[1.02] border border-gold/30"
          >
            <Calendar className="w-5 h-5 text-gold" />
            <span>Today's Schedule</span>
            <ChevronRight className="w-5 h-5 text-gold" />
          </Link>
        </div>

      </div>
    </section>
  );
};
