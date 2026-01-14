export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string; // ISO or human-readable date accepted by UI components
  time: string; // Human-readable time range
};

export const events: EventItem[] = [
  {
    title: "JSNation Live 2026",
    image: "/images/event1.png",
    slug: "jsnation-live-2026",
    location: "Online + Amsterdam, NL",
    date: "2026-03-12",
    time: "09:00–17:30 CET",
  },
  {
    title: "React Summit Europe 2026",
    image: "/images/event2.png",
    slug: "react-summit-europe-2026",
    location: "Amsterdam, Netherlands",
    date: "2026-04-24",
    time: "09:30–18:00 CEST",
  },
  {
    title: "Google I/O Extended 2026",
    image: "/images/event3.png",
    slug: "google-io-extended-2026",
    location: "Mountain View, CA, USA + Online",
    date: "2026-05-13",
    time: "10:00–18:00 PDT",
  },
  {
    title: "WWDC Community Watch Party 2026",
    image: "/images/event4.png",
    slug: "wwdc-watch-party-2026",
    location: "San Francisco, CA, USA",
    date: "2026-06-08",
    time: "09:00–16:00 PDT",
  },
  {
    title: "Next.js Conf 2026",
    image: "/images/event5.png",
    slug: "nextjs-conf-2026",
    location: "Los Angeles, CA, USA + Online",
    date: "2026-10-07",
    time: "09:00–17:00 PDT",
  },
  {
    title: "KubeCon + CloudNativeCon North America 2026",
    image: "/images/event6.png",
    slug: "kubecon-cloudnativecon-na-2026",
    location: "Chicago, IL, USA",
    date: "2026-11-18",
    time: "08:30–17:30 CST",
  },
  {
    title: "Hacktoberfest 2026 Kickoff",
    image: "/images/event-full.png",
    slug: "hacktoberfest-2026-kickoff",
    location: "Global, Online",
    date: "2026-10-01",
    time: "All day",
  },
  {
    title: "Open Source Summit Europe 2026",
    image: "/images/event3.png",
    slug: "open-source-summit-europe-2026",
    location: "Vienna, Austria",
    date: "2026-09-16",
    time: "09:00–17:30 CEST",
  },
];

export default events;
