import ravi from "@/assets/worker-ravi.jpg";
import senthil from "@/assets/worker-senthil.jpg";
import lakshmi from "@/assets/worker-lakshmi.jpg";
import murugan from "@/assets/worker-murugan.jpg";
import anitha from "@/assets/worker-anitha.jpg";
import karthik from "@/assets/worker-karthik.jpg";

export const DISTRICTS = [
  "Salem", "Erode", "Namakkal", "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli",
  "Tirunelveli", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur", "Kanyakumari",
  "Cuddalore", "Karur", "Nagapattinam", "Pudukkottai", "Ramanathapuram", "Sivaganga",
  "Theni", "Virudhunagar", "Krishnagiri", "Dharmapuri", "Tiruvallur", "Kancheepuram",
  "Chengalpattu", "Tiruvannamalai", "Villupuram", "Ariyalur", "Perambalur", "Tenkasi",
  "Tirupathur", "Ranipet", "Kallakurichi", "Mayiladuthurai", "Nilgiris", "Tiruppur",
  "Ariyalur",
];

export type Worker = {
  id: string;
  name: string;
  role: string;
  roleTa: string;
  category: string;
  district: string;
  rating: number;
  jobs: number;
  distanceKm: number;
  etaMin: number;
  verified: boolean;
  price: number;
  avatar: string;
  photo: string;
  reviews: { user: string; text: string; rating: number }[];
  position: { x: number; y: number }; // % on map
};

export const WORKERS: Worker[] = [
  {
    id: "ravi-kumar",
    name: "Ravi Kumar",
    role: "Electrician",
    roleTa: "மின்சாரம்",
    category: "electrician",
    district: "Salem",
    rating: 4.8,
    jobs: 312,
    distanceKm: 1.2,
    etaMin: 14,
    verified: true,
    price: 350,
    avatar: "RK",
    photo: ravi,
    reviews: [
      { user: "Kavitha S", text: "Fixed the wiring quickly, very polite.", rating: 5 },
      { user: "Arjun P", text: "On time and clean work.", rating: 5 },
    ],
    position: { x: 42, y: 38 },
  },
  {
    id: "senthil-m",
    name: "Senthil M",
    role: "Plumber",
    roleTa: "குழாய் வேலை",
    category: "plumber",
    district: "Erode",
    rating: 4.9,
    jobs: 480,
    distanceKm: 2.4,
    etaMin: 22,
    verified: true,
    price: 400,
    avatar: "SM",
    photo: senthil,
    reviews: [
      { user: "Meena R", text: "Saved my bathroom from flooding!", rating: 5 },
    ],
    position: { x: 58, y: 52 },
  },
  {
    id: "lakshmi-k",
    name: "Lakshmi K",
    role: "House Cleaning",
    roleTa: "வீடு சுத்தம்",
    category: "cleaning",
    district: "Salem",
    rating: 4.7,
    jobs: 210,
    distanceKm: 0.9,
    etaMin: 12,
    verified: true,
    price: 500,
    avatar: "LK",
    photo: lakshmi,
    reviews: [
      { user: "Priya N", text: "Spotless. Trustworthy.", rating: 5 },
    ],
    position: { x: 35, y: 60 },
  },
  {
    id: "murugan-s",
    name: "Murugan S",
    role: "Carpenter",
    roleTa: "தச்சர்",
    category: "carpenter",
    district: "Namakkal",
    rating: 4.6,
    jobs: 175,
    distanceKm: 3.1,
    etaMin: 28,
    verified: true,
    price: 600,
    avatar: "MS",
    photo: murugan,
    reviews: [
      { user: "Vikram T", text: "Made a beautiful wardrobe.", rating: 5 },
    ],
    position: { x: 65, y: 30 },
  },
  {
    id: "anitha-r",
    name: "Anitha R",
    role: "Elder Care",
    roleTa: "முதியோர் பராமரிப்பு",
    category: "elder",
    district: "Coimbatore",
    rating: 4.9,
    jobs: 96,
    distanceKm: 4.2,
    etaMin: 35,
    verified: true,
    price: 800,
    avatar: "AR",
    photo: anitha,
    reviews: [{ user: "Ramesh K", text: "Cares for my mother like family.", rating: 5 }],
    position: { x: 50, y: 70 },
  },
  {
    id: "karthik-v",
    name: "Karthik V",
    role: "AC Repair",
    roleTa: "ஏசி பழுது",
    category: "ac",
    district: "Erode",
    rating: 4.7,
    jobs: 220,
    distanceKm: 2.8,
    etaMin: 24,
    verified: true,
    price: 450,
    avatar: "KV",
    photo: karthik,
    reviews: [{ user: "Suresh", text: "Fixed AC in 30 mins.", rating: 5 }],
    position: { x: 70, y: 45 },
  },
  // Extra electricians
  {
    id: "saravanan-e",
    name: "Saravanan E",
    role: "Electrician",
    roleTa: "மின்சாரம்",
    category: "electrician",
    district: "Salem",
    rating: 4.6, jobs: 198, distanceKm: 2.1, etaMin: 18, verified: true, price: 320,
    avatar: "SE", photo: ravi,
    reviews: [{ user: "Bala", text: "Quick fix for fan rewiring.", rating: 5 }],
    position: { x: 48, y: 42 },
  },
  {
    id: "prabhu-k",
    name: "Prabhu K",
    role: "Electrician",
    roleTa: "மின்சாரம்",
    category: "electrician",
    district: "Salem",
    rating: 4.9, jobs: 410, distanceKm: 1.8, etaMin: 16, verified: true, price: 380,
    avatar: "PK", photo: karthik,
    reviews: [{ user: "Divya", text: "Sorted full house wiring.", rating: 5 }],
    position: { x: 38, y: 50 },
  },
  {
    id: "manoj-d",
    name: "Manoj D",
    role: "Electrician",
    roleTa: "மின்சாரம்",
    category: "electrician",
    district: "Erode",
    rating: 4.5, jobs: 140, distanceKm: 3.4, etaMin: 26, verified: true, price: 300,
    avatar: "MD", photo: murugan,
    reviews: [{ user: "Hari", text: "Affordable and reliable.", rating: 4 }],
    position: { x: 55, y: 35 },
  },
  // Extra plumbers
  {
    id: "vinoth-p",
    name: "Vinoth P",
    role: "Plumber",
    roleTa: "குழாய் வேலை",
    category: "plumber",
    district: "Salem",
    rating: 4.7, jobs: 260, distanceKm: 1.5, etaMin: 15, verified: true, price: 380,
    avatar: "VP", photo: senthil,
    reviews: [{ user: "Sangeetha", text: "Fixed leaking tap fast.", rating: 5 }],
    position: { x: 45, y: 55 },
  },
  {
    id: "ganesh-r",
    name: "Ganesh R",
    role: "Plumber",
    roleTa: "குழாய் வேலை",
    category: "plumber",
    district: "Coimbatore",
    rating: 4.6, jobs: 190, distanceKm: 3.2, etaMin: 25, verified: true, price: 420,
    avatar: "GR", photo: ravi,
    reviews: [{ user: "Mani", text: "Replaced full pipeline well.", rating: 5 }],
    position: { x: 62, y: 60 },
  },
  // Extra carpenters
  {
    id: "balu-c",
    name: "Balu C",
    role: "Carpenter",
    roleTa: "தச்சர்",
    category: "carpenter",
    district: "Salem",
    rating: 4.8, jobs: 230, distanceKm: 2.0, etaMin: 20, verified: true, price: 650,
    avatar: "BC", photo: murugan,
    reviews: [{ user: "Latha", text: "Built a perfect kitchen shelf.", rating: 5 }],
    position: { x: 52, y: 28 },
  },
  {
    id: "raju-w",
    name: "Raju W",
    role: "Carpenter",
    roleTa: "தச்சர்",
    category: "carpenter",
    district: "Erode",
    rating: 4.5, jobs: 150, distanceKm: 3.6, etaMin: 30, verified: true, price: 580,
    avatar: "RW", photo: senthil,
    reviews: [{ user: "Selvi", text: "Door repair done neatly.", rating: 4 }],
    position: { x: 68, y: 38 },
  },
  // Extra elder care
  {
    id: "kala-m",
    name: "Kala M",
    role: "Elder Care",
    roleTa: "முதியோர் பராமரிப்பு",
    category: "elder",
    district: "Salem",
    rating: 4.8, jobs: 78, distanceKm: 1.9, etaMin: 17, verified: true, price: 750,
    avatar: "KM", photo: lakshmi,
    reviews: [{ user: "Ravi", text: "Very patient with my father.", rating: 5 }],
    position: { x: 40, y: 68 },
  },
  // More Salem workers across categories
  { id: "arun-e", name: "Arun Kumar", role: "Electrician", roleTa: "மின்சாரம்", category: "electrician", district: "Salem", rating: 4.7, jobs: 256, distanceKm: 0.8, etaMin: 10, verified: true, price: 340, avatar: "AK", photo: senthil, reviews: [{ user: "Naveen", text: "Came in 10 mins, super fast.", rating: 5 }], position: { x: 44, y: 46 } },
  { id: "vijay-e", name: "Vijay Raj", role: "Electrician", roleTa: "மின்சாரம்", category: "electrician", district: "Salem", rating: 4.8, jobs: 320, distanceKm: 1.6, etaMin: 14, verified: true, price: 360, avatar: "VR", photo: murugan, reviews: [{ user: "Latha", text: "Wired entire home neatly.", rating: 5 }], position: { x: 50, y: 40 } },
  { id: "kumaran-p", name: "Kumaran S", role: "Plumber", roleTa: "குழாய் வேலை", category: "plumber", district: "Salem", rating: 4.8, jobs: 290, distanceKm: 1.1, etaMin: 12, verified: true, price: 400, avatar: "KS", photo: ravi, reviews: [{ user: "Suganya", text: "Fixed tap leak in 20 mins.", rating: 5 }], position: { x: 36, y: 52 } },
  { id: "raja-p", name: "Raja Murthy", role: "Plumber", roleTa: "குழாய் வேலை", category: "plumber", district: "Salem", rating: 4.6, jobs: 180, distanceKm: 2.3, etaMin: 19, verified: true, price: 380, avatar: "RM", photo: karthik, reviews: [{ user: "Anil", text: "Replaced full bath fittings.", rating: 5 }], position: { x: 56, y: 48 } },
  { id: "deepa-c", name: "Deepa V", role: "House Cleaning", roleTa: "வீடு சுத்தம்", category: "cleaning", district: "Salem", rating: 4.9, jobs: 142, distanceKm: 1.4, etaMin: 13, verified: true, price: 520, avatar: "DV", photo: anitha, reviews: [{ user: "Geetha", text: "Spotless work, very polite.", rating: 5 }], position: { x: 42, y: 62 } },
  { id: "selvi-c", name: "Selvi P", role: "House Cleaning", roleTa: "வீடு சுத்தம்", category: "cleaning", district: "Salem", rating: 4.7, jobs: 96, distanceKm: 2.6, etaMin: 21, verified: true, price: 480, avatar: "SP", photo: lakshmi, reviews: [{ user: "Maya", text: "Deep cleaned the whole house.", rating: 4 }], position: { x: 30, y: 58 } },
  { id: "naveen-w", name: "Naveen K", role: "Carpenter", roleTa: "தச்சர்", category: "carpenter", district: "Salem", rating: 4.7, jobs: 165, distanceKm: 2.2, etaMin: 20, verified: true, price: 620, avatar: "NK", photo: senthil, reviews: [{ user: "Ramya", text: "Beautiful TV unit.", rating: 5 }], position: { x: 58, y: 32 } },
  { id: "mani-a", name: "Mani Raj", role: "AC Repair", roleTa: "ஏசி பழுது", category: "ac", district: "Salem", rating: 4.8, jobs: 245, distanceKm: 1.9, etaMin: 17, verified: true, price: 470, avatar: "MR", photo: karthik, reviews: [{ user: "Vinod", text: "AC cooling restored in 40 mins.", rating: 5 }], position: { x: 48, y: 36 } },
  { id: "ravi-m", name: "Ravi Selvam", role: "Mechanic", roleTa: "மெக்கானிக்", category: "mechanic", district: "Salem", rating: 4.6, jobs: 312, distanceKm: 2.7, etaMin: 23, verified: true, price: 280, avatar: "RS", photo: ravi, reviews: [{ user: "Karthik", text: "Doorstep bike service, brilliant.", rating: 5 }], position: { x: 62, y: 56 } },
  { id: "lalitha-b", name: "Lalitha N", role: "Babysitter", roleTa: "குழந்தை பராமரிப்பு", category: "baby", district: "Salem", rating: 4.9, jobs: 88, distanceKm: 1.7, etaMin: 16, verified: true, price: 600, avatar: "LN", photo: lakshmi, reviews: [{ user: "Priya", text: "My baby loves her.", rating: 5 }], position: { x: 38, y: 66 } },
];

import sElectrician from "@/assets/service-electrician.jpg";
import sPlumber from "@/assets/service-plumber.jpg";
import sCarpenter from "@/assets/service-carpenter.jpg";
import sAc from "@/assets/service-ac.jpg";
import sCleaning from "@/assets/service-cleaning.jpg";
import sCook from "@/assets/service-cook.jpg";
import sElder from "@/assets/service-elder.jpg";
import sBaby from "@/assets/service-baby.jpg";
import sCarwash from "@/assets/service-carwash.jpg";
import sPaint from "@/assets/service-paint.jpg";
import sPest from "@/assets/service-pest.jpg";
import sGarden from "@/assets/service-garden.jpg";
import sDelivery from "@/assets/service-delivery.jpg";
import sKitchen from "@/assets/service-kitchen.jpg";
import sWelding from "@/assets/service-welding.jpg";
import sMason from "@/assets/service-mason.jpg";
import sMechanic from "@/assets/service-mechanic.jpg";
import sFridge from "@/assets/service-fridge.jpg";
import sTv from "@/assets/service-tv.jpg";
import sLock from "@/assets/service-lock.jpg";
import sGlass from "@/assets/service-glass.jpg";
import sLaundry from "@/assets/service-laundry.jpg";
import sWatertank from "@/assets/service-watertank.jpg";
import sGrill from "@/assets/service-grill.jpg";
import sWaterproof from "@/assets/service-waterproof.jpg";
import sConstruction from "@/assets/service-construction.jpg";
import sHospital from "@/assets/service-hospital.jpg";
import sGrocery from "@/assets/service-grocery.jpg";
import sChildcare from "@/assets/service-childcare.jpg";
import sSos from "@/assets/service-sos.jpg";


export type Category = {
  id: string;
  en: string;
  ta: string;
  icon: string;
  image: string;
  group: "home" | "technical" | "delivery" | "elder";
  desc: string;
  includes: string[];
};

export const CATEGORY_GROUPS: { id: Category["group"]; label: string; ta: string }[] = [
  { id: "home", label: "Home & Cleaning", ta: "வீடு & சுத்தம்" },
  { id: "technical", label: "Repairs & Technical", ta: "பழுது & தொழில்நுட்பம்" },
  { id: "delivery", label: "Delivery & Errands", ta: "டெலிவரி & உதவி" },
  { id: "elder", label: "Elder Care", ta: "முதியோர் பராமரிப்பு" },
];

export const CATEGORIES: Category[] = [
  // Home & Cleaning
  { id: "carwash", en: "Car Cleaning", ta: "கார் சுத்தம்", icon: "🚗", image: sCarwash, group: "home", desc: "Doorstep car washing — exterior, interior vacuum, dashboard polish.", includes: ["Exterior wash", "Interior vacuum", "Dashboard polish", "Tyre shine"] },
  { id: "glass-cleaning", en: "Glass Cleaning", ta: "கண்ணாடி சுத்தம்", icon: "🪟", image: sGlass, group: "home", desc: "Streak-free window, balcony and mirror cleaning with eco solutions.", includes: ["Windows", "Balcony glass", "Mirrors", "Skylights"] },
  { id: "paint", en: "Painting", ta: "வண்ணம்", icon: "🎨", image: sPaint, group: "home", desc: "Interior & exterior wall painting, texture and waterproof finishes.", includes: ["Wall paint", "Texture", "Ceiling", "Touch-up"] },
  { id: "construction", en: "Construction", ta: "கட்டுமானம்", icon: "🏗️", image: sConstruction, group: "home", desc: "Small-scale civil work, room extensions and renovations.", includes: ["Site prep", "Brickwork", "Plaster", "Finishing"] },
  { id: "welding", en: "Welding", ta: "வெல்டிங்", icon: "🔥", image: sWelding, group: "home", desc: "Gates, grills, gates and steel structure welding at your doorstep.", includes: ["Gate fix", "Grill weld", "Stand fab", "On-site"] },
  { id: "mason", en: "Mason", ta: "கொத்தனார்", icon: "🧱", image: sMason, group: "home", desc: "Brick laying, plastering and tile fixing by experienced masons.", includes: ["Brick laying", "Plaster", "Tile fix", "Repair"] },
  { id: "cook", en: "Cooking", ta: "சமையல்", icon: "🍳", image: sCook, group: "home", desc: "Home cook for daily meals — Tamil, North Indian or veg only menus.", includes: ["Breakfast", "Lunch", "Dinner", "Function"] },
  { id: "garden", en: "Gardener", ta: "தோட்டக்காரர்", icon: "🌿", image: sGarden, group: "home", desc: "Garden setup, lawn mowing, pruning and plant care visits.", includes: ["Lawn", "Pruning", "Planting", "Pest spray"] },
  { id: "laundry", en: "Laundry", ta: "துணி துவைப்பு", icon: "🧺", image: sLaundry, group: "home", desc: "Pickup & drop laundry — wash, iron and fold service.", includes: ["Wash", "Iron", "Dry clean", "Fold"] },
  { id: "watertank", en: "Water Tank Cleaning", ta: "தண்ணீர் தொட்டி", icon: "💧", image: sWatertank, group: "home", desc: "Overhead / sump tank cleaning with sanitisation and chlorination.", includes: ["Drain", "Scrub", "Sanitise", "Refill"] },
  { id: "sofa", en: "Sofa / Mattress Cleaning", ta: "சோபா சுத்தம்", icon: "🛋️", image: sCleaning, group: "home", desc: "Deep shampoo cleaning for sofa, mattress and carpets.", includes: ["Shampoo", "Vacuum", "Stain treat", "Dry"] },
  { id: "pest", en: "Pest Control", ta: "பூச்சிக்கொல்லி", icon: "🐜", image: sPest, group: "home", desc: "Termite, cockroach, rodent and mosquito treatment — child safe.", includes: ["Cockroach", "Termite", "Rodent", "Mosquito"] },
  { id: "packing", en: "Packing & Moving", ta: "பேக்கிங்", icon: "📦", image: sDelivery, group: "home", desc: "Home shifting with packing material, loading and unloading.", includes: ["Packing", "Loading", "Transport", "Unload"] },
  { id: "baby", en: "Babysitter", ta: "குழந்தை பராமரிப்பு", icon: "👶", image: sBaby, group: "home", desc: "Verified babysitters by the hour or full day at your home.", includes: ["Feeding", "Play", "Nap care", "Pickup"] },
  { id: "child-care", en: "Child Care", ta: "சிறுவர் பராமரிப்பு", icon: "🧒", image: sChildcare, group: "home", desc: "After-school care, homework help and supervised play for kids.", includes: ["Homework", "Activities", "Meals", "Reports"] },

  // Repairs & Technical
  { id: "electrician", en: "Electrician", ta: "மின்சாரம்", icon: "⚡", image: sElectrician, group: "technical", desc: "Wiring, fan/light fitting, MCB and inverter work — licensed pros.", includes: ["Wiring", "Fan/Light", "MCB", "Inverter"] },
  { id: "plumber", en: "Plumber", ta: "குழாய்", icon: "🔧", image: sPlumber, group: "technical", desc: "Tap, pipe leak, bathroom and motor work with 30-day warranty.", includes: ["Leak fix", "Tap", "Motor", "Bath fit"] },
  { id: "carpenter", en: "Carpenter", ta: "தச்சர்", icon: "🪚", image: sCarpenter, group: "technical", desc: "Wardrobes, doors, hinges and custom woodwork at your home.", includes: ["Doors", "Wardrobe", "Hinges", "Polish"] },
  { id: "ac", en: "AC Repair", ta: "ஏசி பழுது", icon: "❄️", image: sAc, group: "technical", desc: "AC service, gas top-up, install and uninstall for all brands.", includes: ["Service", "Gas fill", "Install", "Repair"] },
  { id: "fridge", en: "Fridge Repair", ta: "குளிர்சாதனம்", icon: "🧊", image: sFridge, group: "technical", desc: "Refrigerator gas, compressor and cooling issues fixed on-site.", includes: ["Gas", "Compressor", "Cooling", "Door"] },
  { id: "tv", en: "TV / Electronics", ta: "டிவி சேவை", icon: "📺", image: sTv, group: "technical", desc: "LED TV, set-top, washing machine and small electronics repair.", includes: ["LED TV", "Washing m/c", "Mixer", "Mic/Spkr"] },
  { id: "mechanic", en: "Mechanic", ta: "மெக்கானிக்", icon: "🛠️", image: sMechanic, group: "technical", desc: "Two-wheeler & car doorstep mechanic — service, puncture, battery.", includes: ["Service", "Puncture", "Battery", "Oil"] },
  { id: "grill", en: "Window Grill Fitting", ta: "ஜன்னல் கிரில்", icon: "🪟", image: sGrill, group: "technical", desc: "Custom window grills, balcony safety grills designed and fitted.", includes: ["Measure", "Fabricate", "Paint", "Fit"] },
  { id: "waterproof", en: "Roof Waterproofing", ta: "மழைத்தடுப்பு", icon: "☔", image: sWaterproof, group: "technical", desc: "Terrace and roof leak proofing with 5-year warranty coating.", includes: ["Inspect", "Clean", "Coat", "Warranty"] },
  { id: "lock", en: "Door / Lock Repair", ta: "கதவு பூட்டு", icon: "🔐", image: sLock, group: "technical", desc: "Lock change, jammed door fix and digital lock installation.", includes: ["Lock fix", "Key cut", "Digital lock", "Hinges"] },

  // Delivery & Errands
  { id: "medicine", en: "Medicine Pickup", ta: "மருந்து வாங்கல்", icon: "💊", image: sDelivery, group: "delivery", desc: "Pickup prescription medicines from any pharmacy in your city.", includes: ["Pharmacy run", "Prescription", "Cold chain", "Receipt"] },
  { id: "grocery", en: "Grocery Errand", ta: "மளிகை", icon: "🛒", image: sGrocery, group: "delivery", desc: "Grocery shopping from your list — billing photo before pickup.", includes: ["Shop list", "Bill photo", "Bring home", "Cash/UPI"] },
  { id: "delivery", en: "Item Delivery (Intra-city)", ta: "டெலிவரி", icon: "🚚", image: sDelivery, group: "delivery", desc: "Pick & drop parcels within the city — documents, food, gifts.", includes: ["Document", "Parcel", "Food", "Gift"] },

  // Elder Care
  { id: "elder", en: "Elder Care", ta: "முதியோர் பராமரிப்பு", icon: "🧓", image: sElder, group: "elder", desc: "Trained caregivers for daily companionship and care of parents.", includes: ["Companion", "Bath/Meal", "Mobility", "Reports"] },
  { id: "hospital-escort", en: "Hospital Escort", ta: "மருத்துவமனை", icon: "🏥", image: sHospital, group: "elder", desc: "Trained attender to take parents for hospital visits and tests.", includes: ["Pickup", "Sit with", "Pharmacy", "Drop"] },
  { id: "daily-checkin", en: "Daily Check-in / Companion", ta: "தினசரி பார்வை", icon: "🤝", image: sElder, group: "elder", desc: "Daily visit to check on parents, conversation and basic help.", includes: ["Visit", "Talk", "Light help", "Photo update"] },
  { id: "elder-medicine", en: "Medicine Pickup (Elder)", ta: "மருந்து", icon: "💊", image: sDelivery, group: "elder", desc: "Refill prescription medicines for parents and deliver to home.", includes: ["Refill", "Reminder", "Doctor sync", "Delivery"] },
  { id: "sos-alert", en: "Emergency Alert to Children", ta: "அவசர அறிவிப்பு", icon: "🚨", image: sSos, group: "elder", desc: "Wearable / app SOS that pings family instantly during emergencies.", includes: ["SOS button", "Auto call", "Location", "24/7"] },
  { id: "family-dashboard", en: "Family Dashboard", ta: "குடும்ப டாஷ்போர்டு", icon: "📊", image: sElder, group: "elder", desc: "Single dashboard for all parent bookings, reports and updates.", includes: ["Bookings", "Reports", "Photos", "Bills"] },
];


export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

// ---- Auto-generate 100+ workers across districts/categories ----
const FIRST_NAMES = ["Arun","Vijay","Karthik","Suresh","Mani","Bala","Hari","Naveen","Vinod","Ramesh","Gopal","Mohan","Senthil","Raja","Kumar","Velu","Murali","Sathish","Pandi","Saravanan","Dinesh","Prabhu","Manoj","Anand","Sundar","Ezhil","Yuvan","Selva","Tamil","Iniyan","Kavin","Jeeva","Sakthi","Ashok","Bharath","Chandru","Deva","Elango","Ganesh","Hemant"];
const LAST_NAMES = ["K","S","M","R","V","P","T","N","B","G","D","L","C","E","A","J","H"];
const FEMALE_NAMES = ["Kavitha","Lakshmi","Priya","Anitha","Meena","Divya","Latha","Geetha","Bhuvana","Saranya","Revathi","Vidhya","Sangeetha","Deepa","Selvi","Kala","Lalitha","Suganya","Ramya","Maya"];
const PHOTO_POOL = [ravi, senthil, lakshmi, murugan, anitha, karthik];

function seedRandom(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

const _gen: Worker[] = [];
const _categories = CATEGORIES.filter((c) => !["sos-alert","family-dashboard"].includes(c.id));
let _seed = 1;
DISTRICTS.forEach((district, di) => {
  const count = district === "Salem" ? 14 : (district === "Erode" || district === "Coimbatore" || district === "Chennai") ? 6 : 3;
  for (let i = 0; i < count; i++) {
    const rand = seedRandom(_seed++ * 1000 + di);
    const cat = _categories[Math.floor(rand() * _categories.length)];
    const female = ["cleaning","cook","baby","child-care","elder","laundry"].includes(cat.id) && rand() > 0.3;
    const fn = female ? FEMALE_NAMES[Math.floor(rand() * FEMALE_NAMES.length)] : FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
    const ln = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
    const id = `gen-${district.toLowerCase().replace(/\s/g,"")}-${i}-${cat.id}`;
    if (WORKERS.find((w) => w.id === id)) continue;
    const dist = Math.round((0.5 + rand() * 5) * 10) / 10;
    _gen.push({
      id,
      name: `${fn} ${ln}`,
      role: cat.en,
      roleTa: cat.ta,
      category: cat.id,
      district,
      rating: Math.round((4.3 + rand() * 0.6) * 10) / 10,
      jobs: 40 + Math.floor(rand() * 450),
      distanceKm: dist,
      etaMin: Math.round(8 + dist * 5),
      verified: rand() > 0.15,
      price: 250 + Math.floor(rand() * 600),
      avatar: (fn[0] + ln[0]).toUpperCase(),
      photo: PHOTO_POOL[Math.floor(rand() * PHOTO_POOL.length)],
      reviews: [{ user: "Customer", text: "Professional and on time.", rating: 5 }],
      position: { x: 20 + Math.floor(rand() * 60), y: 20 + Math.floor(rand() * 60) },
    });
  }
});
WORKERS.push(..._gen);

// ---- All 38 Tamil Nadu districts (Blinkit-style picker) ----
export const TN_DISTRICTS_ALL = [
  "Salem","Erode","Namakkal","Coimbatore","Madurai","Chennai","Tiruchirappalli",
  "Tirunelveli","Vellore","Thoothukudi","Dindigul","Thanjavur","Kanyakumari",
  "Cuddalore","Karur","Nagapattinam","Pudukkottai","Ramanathapuram","Sivaganga",
  "Theni","Virudhunagar","Krishnagiri","Dharmapuri","Tiruvallur","Kancheepuram",
  "Chengalpattu","Tiruvannamalai","Villupuram","Ariyalur","Perambalur","Tenkasi",
  "Tirupathur","Ranipet","Kallakurichi","Mayiladuthurai","Nilgiris","Tiruppur","Thiruvarur",
];
export const POPULAR_DISTRICTS = ["Salem","Erode","Namakkal","Coimbatore","Madurai","Chennai","Tiruchirappalli"];

