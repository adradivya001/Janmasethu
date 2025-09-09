
export type NavItem = {
  id: string;
  label: {
    en: string;
    hi: string;
    te: string;
  };
  href: string;
  priority: number;
};

export const navItems: NavItem[] = [
  {
    id: "home",
    label: { en: "Home", hi: "होम", te: "హోమ్" },
    href: "/",
    priority: 1
  },
  {
    id: "knowledge",
    label: { en: "Knowledge Hub", hi: "नॉलेज हब", te: "నాలెడ్జ్ హబ్" },
    href: "/knowledge",
    priority: 2
  },
  {
    id: "treatments",
    label: { en: "Treatments", hi: "ट्रीटमेंट्स", te: "చికిత్సలు" },
    href: "/treatments",
    priority: 3
  },
  {
    id: "sakhi",
    label: { en: "Sakhi", hi: "सखी", te: "సఖి" },
    href: "/sakhi",
    priority: 4
  },
  {
    id: "life",
    label: { en: "Life Stages", hi: "जीवन चरण", te: "జీవిత దశలు" },
    href: "/life-stages",
    priority: 5
  },
  {
    id: "stories",
    label: { en: "Success Stories", hi: "सफलता की कहानियाँ", te: "విజయ కథలు" },
    href: "/success-stories",
    priority: 6
  },
  {
    id: "blog",
    label: { en: "Blog", hi: "ब्लॉग", te: "బ్లాగ్" },
    href: "/blog",
    priority: 7
  },
  {
    id: "experts",
    label: { en: "Experts", hi: "विशेषज्ञ", te: "నిపుణులు" },
    href: "/experts",
    priority: 8
  },
  {
    id: "tools",
    label: { en: "Tools", hi: "उपकरण", te: "సాధనాలు" },
    href: "/tools",
    priority: 9
  },
  {
    id: "investors",
    label: { en: "Investors", hi: "निवेशक", te: "ఇన్వెస్టర్లు" },
    href: "/investors",
    priority: 10
  }
];
