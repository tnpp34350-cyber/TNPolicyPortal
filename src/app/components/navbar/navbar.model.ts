export interface DropdownCard {
  title: string;
  desc: string;
  icon: string;
}

export interface NavItem {
  label: string;
  hasDropdown?: boolean;
  panelType?: 'cards' | 'list';
  panelItems?: DropdownCard[] | string[];
}

export const NAVBAR_ITEMS: NavItem[] = [
  { label: 'Home' },

  {
    label: 'Knowledge',
    hasDropdown: true,
    panelItems: [
      {
        title: "Best Practices",
        desc: "Curated initiatives and case studies from India and the world.",
        icon: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "Policy",
        desc: "One-stop source for policies, schemes, sector overviews.",
        icon: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "Data",
        desc: "Visualization of key trends and insights at various levels.",
        icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "Starter Kits",
        desc: "Guides to help dive into sectors and themes effectively.",
        icon: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=350&fit=crop&q=80"
      }
    ]
  },

  { label: 'Sectors', hasDropdown: true,
    panelItems: [
      {
        title: "Skilling Livelihoods & Labour Welfare",
        desc: "",
        icon: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "Health & Nutrition",
        desc: "",
        icon: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "Education",
        desc: "",
        icon: "https://images.unsplash.com/photo-1427504494785-cdfa6e60b537?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "Tourism",
        desc: "",
        icon: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "Agriculture & Allied Services",
        desc: "",
        icon: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "Energy",
        desc: "",
        icon: "https://images.unsplash.com/photo-1509391366360-2e938286dba8?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "Urbanization",
        desc: "",
        icon: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "Water & WASH",
        desc: "",
        icon: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "MSME",
        desc: "",
        icon: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=500&h=350&fit=crop&q=80"
      },
      {
        title: "Manufacturing",
        desc: "",
        icon: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=350&fit=crop&q=80"
      }
    ]
  },
  { 
    label: 'Districts', 
    hasDropdown: true,
    panelType: 'list',
    panelItems: [
      "Chennai",
      "Tiruchirappalli",
      "Madurai",
      "Tirunelveli",
      "Coimbatore",
      "Nilgiris",
      "Kanyakumari",
      "Vellore",
      "Chengalpattu",
      "Kanchipuram",
      "Villupuram",
      "Ranipet",
      "Tiruppur",
      "Karur",
      "Erode",
      "Sivagangai",
      "Ramanathapuram",
      "Virudunagar",
      "Tenkasi",
      "Theni",
      "Dindigul",
      "Puducherry",
      "Kallakurichi",
      "Perambalur"
    ]
  },
  { label: 'Programmes', hasDropdown: true },
  { label: 'Dashboard' }
];
