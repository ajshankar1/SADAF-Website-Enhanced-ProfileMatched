import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import brandHeader from "./assets/sadaf-brand-header.png";
import technicianHero from "./assets/sadaf-technician-hero.jpg";
import CompanyProfileFlipbook from "./components/CompanyProfileFlipbook.jsx";

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const profilePages = [
  publicAsset("/profile/SADAF_Page_01_Cover_A4_Final_v2.png"),
  publicAsset("/profile/SADAF_Page_02_Company_Overview_A4.png"),
  publicAsset("/profile/SADAF_Page_03_Vision_Mission_Values_A4_FINAL.png"),
  publicAsset("/profile/SADAF_Page_04_Our_Expertise_A4_FINAL.png"),
  publicAsset("/profile/SADAF_Page_05_Our_Services_EXACT_APPROVED_ARTWORK.png"),
  publicAsset("/profile/SADAF_Page_06_Industries_We_Serve_A4_FINAL_EXACT.png"),
  publicAsset("/profile/SADAF_Page_07_Treatment_Service_Methodology_A4_FINAL_EXACT.png"),
  publicAsset("/profile/SADAF_Page_08_Quality_Safety_Service_Assurance_A4_FINAL_EXACT.png"),
  publicAsset("/profile/SADAF_Page_09_Certifications_Credentials_FINAL.png"),
  publicAsset("/profile/SADAF_Page_10_Projects_Case_Studies_FINAL_EXACT.png"),
  publicAsset("/profile/SADAF_Page_11_Clients_Industries_Social_Proof_FINAL_EXACT.png"),
  publicAsset("/profile/SADAF_Page_12_Client_Testimonials_FINAL_EXACT.png"),
  publicAsset("/profile/SADAF_Page_13_Why_Sadaf_FINAL_EXACT.png"),
  publicAsset("/profile/SADAF_Page_14_Digital_Service_Management_FINAL_EXACT.png"),
  publicAsset("/profile/SADAF_Page_15_Contact_Closing_FINAL_EXACT.png"),
];


const servicePrograms = [
  {
    id: "one-time",
    number: "01",
    title: "ONE-TIME SERVICE",
    short: "For a specific pest issue requiring assessment and a defined service response.",
    bestFor: "A current or isolated pest-control requirement.",
    flow: ["ASSESS", "CONTROL", "DOCUMENT", "FOLLOW-UP"],
    points: [
      "Review the site and identified pest activity",
      "Select an appropriate service response",
      "Document the completed service and observations",
      "Recommend follow-up where the site requires it",
    ],
    cta: "REQUEST ONE-TIME SERVICE",
  },
  {
    id: "recurring",
    number: "02",
    title: "RECURRING SERVICE",
    short: "For environments that benefit from scheduled visits, monitoring and continuing service.",
    bestFor: "Properties with ongoing or recurring pest-management requirements.",
    flow: ["PLAN", "VISIT", "MONITOR", "FOLLOW-UP"],
    points: [
      "Agree a service frequency suited to the site",
      "Review activity and changing site conditions",
      "Record findings across scheduled visits",
      "Adjust follow-up actions when required",
    ],
    cta: "REQUEST RECURRING SERVICE",
  },
  {
    id: "ipm",
    number: "03",
    title: "IPM PROGRAM",
    short: "A prevention-first pathway that connects inspection, monitoring, appropriate control and review.",
    bestFor: "Sites where prevention and long-term pest management are important.",
    flow: ["PREVENT", "INSPECT", "MONITOR", "CONTROL", "REVIEW"],
    points: [
      "Identify conditions that may contribute to pest activity",
      "Monitor activity and site conditions",
      "Choose appropriate control measures when required",
      "Review outcomes and strengthen prevention measures",
    ],
    cta: "REQUEST IPM PROGRAM",
  },
  {
    id: "hpp",
    number: "04",
    title: "HOME PROTECTION",
    short: "A residential service pathway for customers who want continuing household pest-management support.",
    bestFor: "Homes requiring planned protection rather than only a reactive visit.",
    flow: ["ASSESS", "PLAN", "SERVICE", "FOLLOW-UP"],
    points: [
      "Review the residential environment and pest concerns",
      "Define the appropriate home-service pathway",
      "Schedule service according to the selected plan",
      "Maintain follow-up and monitoring where included",
    ],
    cta: "ENQUIRE ABOUT HOME PROTECTION",
  },
  {
    id: "hpp-plus",
    number: "05",
    title: "HOME PROTECTION+",
    short: "An enhanced residential protection pathway for broader or continuing household pest-management needs.",
    bestFor: "Homes that need a more comprehensive continuing service approach.",
    flow: ["ASSESS", "PLAN", "SERVICE", "MONITOR", "REVIEW"],
    points: [
      "Review the home and relevant pest concerns",
      "Build a broader protection pathway around the property",
      "Use scheduled service and monitoring as appropriate",
      "Review recurring activity and next-step requirements",
    ],
    cta: "ENQUIRE ABOUT HOME PROTECTION+",
  },
];

const services = [
  {
    number: "01",
    title: "Pest Management",
    arabic: "مكافحة الآفات",
    text: "Structured pest-management programs for residential, commercial and industrial environments.",
    tags: ["Inspection", "Treatment", "Prevention"],
  },
  {
    number: "02",
    title: "Disinfection & Sanitization",
    arabic: "التعقيم والتطهير",
    text: "Professional hygiene solutions designed around safe application, documentation and follow-up.",
    tags: ["Sanitization", "Hygiene", "Documentation"],
  },
  {
    number: "03",
    title: "Customized Service Programs",
    arabic: "برامج خدمة مخصصة",
    text: "Site-specific service plans aligned with operational conditions, frequency and reporting requirements.",
    tags: ["Site Plans", "Recurring", "Compliance"],
  },
  {
    number: "04",
    title: "Inspection & Reporting",
    arabic: "الفحص والتقارير",
    text: "Clear inspection findings, treatment records, evidence and customer-approved service documentation.",
    tags: ["Findings", "Evidence", "Service Report"],
  },
  {
    number: "05",
    title: "Integrated Pest Management",
    arabic: "الإدارة المتكاملة للآفات",
    text: "A prevention-first approach combining monitoring, treatment decisions and follow-up actions.",
    tags: ["Monitoring", "Prevention", "Follow-up"],
  },
  {
    number: "06",
    title: "Training & Competency",
    arabic: "التدريب والكفاءة",
    text: "Structured learning and competency support for consistent field-service delivery.",
    tags: ["Training", "Safety", "Quality"],
  },
];

const industries = [
  ["HOSPITALITY", "Hotels, restaurants and guest-facing properties"],
  ["FOOD & RETAIL", "Food-service, retail and high-hygiene environments"],
  ["INDUSTRIAL", "Plants, warehouses and operational facilities"],
  ["COMMERCIAL", "Offices, compounds and business premises"],
  ["RESIDENTIAL", "Villas, apartments and residential communities"],
  ["CONSTRUCTION", "Pre-construction and post-construction requirements"],
];


const pestProfiles = [
  {
    id: "termites",
    name: "Termites",
    arabic: "النمل الأبيض",
    category: "PROPERTY",
    overview: "Wood-destroying pests that can remain hidden while affecting vulnerable wood and building elements.",
    signs: ["Mud tubes or shelter tubes", "Wood damage or hollow-sounding areas", "Discarded wings / swarming evidence"],
    serviceOptions: ["PRE-CONSTRUCTION", "POST-CONSTRUCTION", "INSPECTION / ASSESSMENT"],
    prevention: ["Regular inspection", "Moisture and access-point review", "Follow-up monitoring"],
    why: "Termite activity can affect vulnerable wood and building elements if left unaddressed.",
    impactTitle: "What can it affect?",
    impacts: ["Wooden elements", "Building components", "Maintenance planning"],
    helps: ["Inspect activity", "Assess affected areas", "Choose an appropriate control program", "Schedule follow-up"],
    outcome: "Earlier identification and structured treatment planning can help protect vulnerable property areas.",
    serviceLabel: "REQUEST TERMITE CONTROL",
  },
  {
    id: "cockroaches",
    name: "Cockroaches",
    arabic: "الصراصير",
    category: "HYGIENE",
    overview: "Common in warm, food-rich and sheltered environments, especially kitchens, service areas and occupied buildings.",
    signs: ["Live sightings, especially at night", "Droppings or dark spotting", "Egg cases or shed skins"],
    serviceOptions: ["ONE-TIME SERVICE", "RECURRING SERVICE", "IPM PROGRAM"],
    prevention: ["Remove food and water sources", "Improve sanitation and access control", "Monitor activity after treatment"],
    why: "Cockroach activity can affect food-service, kitchen, residential and commercial hygiene environments.",
    impactTitle: "What can it affect?",
    impacts: ["Food and hygiene areas", "Kitchens and service areas", "Commercial environments"],
    helps: ["Inspect active areas", "Identify activity patterns", "Apply suitable control measures", "Monitor and follow up"],
    outcome: "A structured control program helps reduce pest activity and supports cleaner operating environments.",
    serviceLabel: "REQUEST COCKROACH CONTROL",
  },
  {
    id: "ants",
    name: "Ants",
    arabic: "النمل",
    category: "HYGIENE / NUISANCE",
    overview: "Social insects that can establish activity around food, moisture and entry points in occupied environments.",
    signs: ["Visible trails", "Activity near food or moisture", "Entry through cracks / gaps"],
    serviceOptions: ["ONE-TIME SERVICE", "RECURRING SERVICE", "IPM PROGRAM"],
    prevention: ["Seal likely access points", "Reduce food and moisture attractants", "Monitor recurring trails"],
    why: "Ant activity can become a recurring nuisance around food areas, workspaces and occupied environments.",
    impactTitle: "What can it affect?",
    impacts: ["Food areas", "Indoor workspaces", "Residential comfort"],
    helps: ["Locate activity", "Assess access points", "Apply suitable control measures", "Follow up"],
    outcome: "Targeted management helps reduce recurring ant activity around occupied areas.",
    serviceLabel: "REQUEST ANT CONTROL",
  },
  {
    id: "rodents",
    name: "Rodents",
    arabic: "القوارض",
    category: "HYGIENE / PROPERTY",
    overview: "Rodents can enter through small openings and affect storage, hygiene, equipment and operational areas.",
    signs: ["Droppings or gnawing evidence", "Rub marks or nesting material", "Noises or sightings"],
    serviceOptions: ["ONE-TIME SERVICE", "RECURRING SERVICE", "IPM PROGRAM"],
    prevention: ["Inspect entry points", "Protect food / storage areas", "Maintain follow-up monitoring"],
    why: "Rodent activity can affect food/storage areas, operational hygiene and vulnerable property or equipment.",
    impactTitle: "What can it affect?",
    impacts: ["Food and storage areas", "Equipment and property", "Operational hygiene"],
    helps: ["Inspect signs and access points", "Assess activity", "Apply appropriate control measures", "Review follow-up needs"],
    outcome: "A documented rodent-control program can help protect hygiene, storage and operational areas.",
    serviceLabel: "REQUEST RODENT CONTROL",
  },
  {
    id: "bed-bugs",
    name: "Bed Bugs",
    arabic: "بق الفراش",
    category: "COMFORT / HOSPITALITY",
    overview: "Small blood-feeding pests commonly associated with sleeping areas, hospitality environments and residential spaces.",
    signs: ["Live bugs or shed skins", "Small spotting around sleeping areas", "Recurring bites / disturbance"],
    serviceOptions: ["INSPECTION", "TREATMENT PROGRAM", "FOLLOW-UP"],
    prevention: ["Inspect likely harbourages", "Control movement between rooms", "Schedule follow-up inspection"],
    why: "Bed bug activity can disrupt sleeping areas, hospitality environments and residential comfort.",
    impactTitle: "What can it affect?",
    impacts: ["Sleeping areas", "Guest comfort", "Residential environments"],
    helps: ["Inspect likely harbourages", "Confirm activity", "Apply an appropriate treatment program", "Schedule follow-up"],
    outcome: "Structured inspection and treatment can help address active infestations and reduce recurrence.",
    serviceLabel: "REQUEST BED BUG CONTROL",
  },
  {
    id: "flies",
    name: "Flies",
    arabic: "الذباب",
    category: "HYGIENE",
    overview: "Flies can become a persistent nuisance and hygiene concern where food, waste or moisture provide attractants.",
    signs: ["Repeated adult fly activity", "Activity around waste / drains", "Breeding or attractant sources"],
    serviceOptions: ["ONE-TIME SERVICE", "RECURRING SERVICE", "IPM PROGRAM"],
    prevention: ["Control waste and attractants", "Review drains / moisture sources", "Monitor high-risk areas"],
    why: "Fly activity can become a hygiene concern in food-service, waste and other hygiene-sensitive areas.",
    impactTitle: "What can it affect?",
    impacts: ["Food-service areas", "Waste zones", "Hygiene-sensitive spaces"],
    helps: ["Identify attractants", "Inspect activity areas", "Apply suitable control measures", "Recommend prevention actions"],
    outcome: "Control combined with sanitation and prevention helps reduce fly activity around operating areas.",
    serviceLabel: "REQUEST FLY CONTROL",
  },
  {
    id: "mosquitoes",
    name: "Mosquitoes",
    arabic: "البعوض",
    category: "HEALTH / NUISANCE",
    overview: "Mosquito activity is strongly influenced by standing water, breeding areas and outdoor conditions.",
    signs: ["Repeated bites / sightings", "Standing-water activity", "High activity at dusk / dawn"],
    serviceOptions: ["SITE ASSESSMENT", "TARGETED CONTROL", "FOLLOW-UP MONITORING"],
    prevention: ["Remove standing water", "Review breeding conditions", "Monitor outdoor activity zones"],
    why: "Mosquito activity can affect outdoor occupied spaces, residential comfort and customer experience.",
    impactTitle: "What can it affect?",
    impacts: ["Outdoor occupied spaces", "Residential comfort", "Customer experience"],
    helps: ["Identify breeding/activity areas", "Assess site conditions", "Apply appropriate control measures", "Recommend prevention"],
    outcome: "Site-specific monitoring and control can help reduce mosquito activity around occupied environments.",
    serviceLabel: "REQUEST MOSQUITO CONTROL",
  },
  {
    id: "birds",
    name: "Birds",
    arabic: "الطيور",
    category: "PROPERTY / HYGIENE",
    overview: "Bird activity can create cleaning, maintenance and nuisance concerns around roofs, fa\u00e7ades and equipment areas.",
    signs: ["Droppings and nesting material", "Repeated roosting activity", "Damage / obstruction around equipment"],
    serviceOptions: ["SITE ASSESSMENT", "BIRD MANAGEMENT", "FOLLOW-UP"],
    prevention: ["Review roosting points", "Protect vulnerable access areas", "Monitor recurring activity"],
    why: "Bird activity can affect building presentation, rooftops, equipment areas and maintenance conditions.",
    impactTitle: "What can it affect?",
    impacts: ["Building façades", "Rooftops and equipment areas", "Hygiene and maintenance"],
    helps: ["Inspect roosting areas", "Assess access points", "Recommend suitable control measures", "Follow up"],
    outcome: "Appropriate bird-management measures can help protect property presentation and maintenance areas.",
    serviceLabel: "REQUEST BIRD CONTROL",
  },
  {
    id: "bees-wasps",
    name: "Bees & Wasps",
    arabic: "النحل والدبابير",
    category: "SAFETY / NUISANCE",
    overview: "Active nests or repeated bee/wasp activity can create a safety and nuisance concern around occupied areas.",
    signs: ["Repeated flying activity", "Visible nest / hive", "Activity near entrances or occupied outdoor spaces"],
    serviceOptions: ["SITE ASSESSMENT", "NEST / ACTIVITY RESPONSE", "FOLLOW-UP"],
    prevention: ["Identify nesting conditions", "Review access points", "Monitor activity after service"],
    why: "Active nesting or wasp/bees activity around occupied areas can create a safety and nuisance concern.",
    impactTitle: "What can it affect?",
    impacts: ["Occupied areas", "Entrances and outdoor spaces", "Customer and staff comfort"],
    helps: ["Identify activity and nesting areas", "Assess the immediate environment", "Apply an appropriate response", "Recommend prevention"],
    outcome: "Professional assessment helps manage active nesting or nuisance activity around occupied locations.",
    serviceLabel: "REQUEST BEE & WASP SERVICE",
  },
  {
    id: "spiders",
    name: "Spiders",
    arabic: "العناكب",
    category: "NUISANCE",
    overview: "Spider activity can affect visible presentation and comfort, particularly where prey insects and sheltered areas are present.",
    signs: ["Webs or repeated sightings", "Activity around lights / corners", "Recurring presence in sheltered areas"],
    serviceOptions: ["INSPECTION", "TARGETED CONTROL", "FOLLOW-UP"],
    prevention: ["Reduce harbourage", "Review lighting / entry conditions", "Monitor recurring activity"],
    why: "Spider activity can affect the visible presentation and comfort of residential and commercial spaces.",
    impactTitle: "What can it affect?",
    impacts: ["Indoor and outdoor spaces", "Visible presentation", "Residential and commercial comfort"],
    helps: ["Inspect activity areas", "Identify contributing conditions", "Apply suitable control measures", "Follow up"],
    outcome: "Targeted control and environmental management can help reduce recurring spider activity.",
    serviceLabel: "REQUEST SPIDER CONTROL",
  },
];



const pestSignDetails = {
  termites: [
    { title: "Mud / shelter tubes", detail: "Visible earthen tubes along walls or foundations can indicate termite movement between soil and the structure." },
    { title: "Wood damage or hollow areas", detail: "Soft, weakened or hollow-sounding wood can warrant a closer inspection for termite activity." },
    { title: "Discarded wings / swarming evidence", detail: "Wings near windows, entrances or light sources can indicate nearby swarming activity." },
  ],
  cockroaches: [
    { title: "Live sightings", detail: "Repeated sightings around kitchens, food areas and sheltered spaces can indicate active cockroach presence." },
    { title: "Droppings or dark spotting", detail: "Dark spotting around cracks, cupboards and service areas can indicate where activity is occurring." },
    { title: "Egg cases or shed skins", detail: "Egg cases or shed skins can indicate continuing activity and the need for closer assessment." },
  ],
  ants: [
    { title: "Visible trails", detail: "Repeated ant trails can identify feeding routes and areas that may need closer inspection." },
    { title: "Activity near food or moisture", detail: "Regular activity around food, sinks or damp areas can indicate an accessible route or attractive condition." },
    { title: "Nesting or entry points", detail: "Clusters around cracks, joints and access points can help locate where activity is originating." },
  ],
  rodents: [
    { title: "Droppings", detail: "Droppings in storage, service or concealed areas can indicate rodent movement and should be assessed in context." },
    { title: "Gnawing or damage", detail: "Gnaw marks or damage to packaging and materials can help identify frequently visited areas." },
    { title: "Entry points", detail: "Gaps, holes and access routes around a building can contribute to recurring rodent activity." },
  ],
  "bed-bugs": [
    { title: "Live sightings", detail: "Visible bed bugs around sleeping or resting areas are a direct sign that the area needs professional assessment." },
    { title: "Dark spotting or marks", detail: "Small dark spots around bedding and seams can indicate bed bug activity." },
    { title: "Eggs, cast skins or harbourages", detail: "Eggs and cast skins around seams and concealed areas can support an activity assessment." },
  ],
  flies: [
    { title: "Repeated adult fly activity", detail: "Persistent fly activity can point toward an attractant, breeding area or access route requiring assessment." },
    { title: "Activity around waste / drains", detail: "Waste handling and damp drain areas can support fly activity and should be reviewed." },
    { title: "Breeding or attractant sources", detail: "Food residue, organic waste and moisture can contribute to recurring activity." },
  ],
  mosquitoes: [
    { title: "Repeated biting or sightings", detail: "Persistent mosquito activity around occupied outdoor areas can indicate a nearby source requiring assessment." },
    { title: "Water / breeding conditions", detail: "Standing water and damp areas can provide conditions that support mosquito development." },
    { title: "Activity at specific times", detail: "Time and location patterns can help identify where monitoring and control attention is most useful." },
  ],
  birds: [
    { title: "Droppings", detail: "Accumulated droppings on façades, equipment areas or ledges can indicate recurring roosting activity." },
    { title: "Nesting / roosting", detail: "Repeated nesting or roosting can affect maintenance and property presentation." },
    { title: "Frequent congregation", detail: "Regular congregation at a specific location can help identify access, food or shelter conditions." },
  ],
  "bees-wasps": [
    { title: "Repeated sightings", detail: "Frequent bees or wasps near occupied areas can indicate nearby nesting activity." },
    { title: "Nest or hive activity", detail: "Visible nesting activity requires appropriate assessment before a control response is selected." },
    { title: "Activity around access points", detail: "Openings, roof areas and wall voids can provide routes for nesting or repeated access." },
  ],
  spiders: [
    { title: "Webs", detail: "Repeated webbing can indicate persistent spider activity or conditions supporting insect prey." },
    { title: "Regular sightings", detail: "Repeated sightings in the same zones can help identify areas requiring inspection." },
    { title: "Entry / harbourage conditions", detail: "Gaps, clutter and sheltered areas can contribute to recurring spider activity." },
  ],
};

const pestHelpDetails = {
  inspect: { title: "Inspection", detail: "SADAF reviews the relevant areas, signs of activity and site conditions before recommending the next service action." },
  identify: { title: "Assessment", detail: "Observed activity is assessed in context so the service pathway matches the pest, environment and customer requirement." },
  control: { title: "Appropriate control", detail: "Appropriate control measures are selected for the assessed situation, with safe and professional application." },
  monitor: { title: "Monitoring & follow-up", detail: "Follow-up reviews activity, documents the outcome and identifies whether further attention is required." },
};

const serviceOptionDetails = {
  "PRE-CONSTRUCTION": {
    title: "Pre-Construction Termite Protection",
    intro: "A preventive termite protection pathway planned while the project is still at a stage where access and treatment planning can be coordinated with construction.",
    bestFor: "New buildings, extensions and construction projects.",
    points: [
      "Assess the site before the foundation stage",
      "Plan protection while access is relatively unobstructed",
      "Coordinate the approach with construction-stage conditions",
      "Document the planned protection measures",
    ],
    flow: ["ASSESS SITE", "PLAN PROTECTION", "IMPLEMENT", "DOCUMENT"],
    action: "REQUEST PRE-CONSTRUCTION ASSESSMENT",
  },
  "POST-CONSTRUCTION": {
    title: "Post-Construction Termite Control",
    intro: "An inspection and treatment pathway for existing structures where termite or wood-destroying insect activity is suspected or protection needs to be assessed.",
    bestFor: "Existing homes, commercial properties and occupied buildings.",
    points: [
      "Inspect accessible areas for termite and wood-destroying insect evidence",
      "Assess affected and vulnerable building elements",
      "Explain the recommended treatment pathway",
      "Document findings and follow-up requirements",
    ],
    flow: ["INSPECT", "ASSESS", "CONTROL", "FOLLOW-UP"],
    action: "REQUEST POST-CONSTRUCTION INSPECTION",
  },
  "INSPECTION / ASSESSMENT": {
    title: "Termite Inspection & Assessment",
    intro: "A site-focused assessment used to understand visible activity, contributing conditions and the most suitable next service pathway.",
    bestFor: "Suspected termite activity or a property that needs a professional assessment before treatment.",
    points: [
      "Inspect visible activity and affected areas",
      "Review access, harbourage and contributing conditions",
      "Record the findings from the site assessment",
      "Define the recommended next service step",
    ],
    flow: ["INSPECT", "IDENTIFY", "DOCUMENT", "RECOMMEND"],
    action: "REQUEST SITE ASSESSMENT",
  },
  "INSPECTION": {
    title: "Inspection",
    intro: "A focused review of the environment, signs of activity and likely contributing conditions.",
    points: ["Identify visible activity", "Review likely harbourage or access", "Record findings for the service plan"],
    action: "REQUEST INSPECTION",
  },
  "ONE-TIME SERVICE": {
    title: "One-Time Service",
    intro: "A service visit designed around an immediate pest-control requirement.",
    points: ["Initial site review", "Service treatment based on the assessed requirement", "Documented follow-up recommendation where appropriate"],
    action: "REQUEST ONE-TIME SERVICE",
  },
  "RECURRING SERVICE": {
    title: "Recurring Service",
    intro: "A scheduled service pathway for sites that require continuing monitoring and control.",
    points: ["Planned service frequency", "Repeat monitoring of activity", "Follow-up actions based on site conditions"],
    action: "REQUEST RECURRING SERVICE",
  },
  "IPM PROGRAM": {
    title: "Integrated Pest Management",
    intro: "A prevention-first service pathway combining monitoring, assessment, control decisions and follow-up.",
    points: ["Monitor pest activity", "Address contributing conditions", "Use appropriate control measures", "Review outcomes over time"],
    action: "REQUEST IPM PROGRAM",
  },
  "TREATMENT PROGRAM": {
    title: "Treatment Program",
    intro: "A structured treatment pathway based on the findings from the inspection stage.",
    points: ["Define the affected areas", "Choose an appropriate service approach", "Document the treatment outcome", "Schedule follow-up where required"],
    action: "REQUEST TREATMENT PROGRAM",
  },
  "FOLLOW-UP": {
    title: "Follow-Up",
    intro: "A post-service review to confirm progress and decide whether additional action is needed.",
    points: ["Review activity after service", "Check previously affected areas", "Record the outcome", "Plan the next action if required"],
    action: "REQUEST FOLLOW-UP",
  },
  "SITE ASSESSMENT": {
    title: "Site Assessment",
    intro: "A site-focused review used to understand conditions, access points and activity before control decisions are made.",
    points: ["Review the environment", "Identify activity / contributing conditions", "Define the appropriate service pathway"],
    action: "REQUEST SITE ASSESSMENT",
  },
  "TARGETED CONTROL": {
    title: "Targeted Control",
    intro: "Appropriate control measures are selected according to the assessed pest activity and site conditions.",
    points: ["Use the inspection findings", "Focus control on relevant activity areas", "Document outcome and follow-up"],
    action: "REQUEST TARGETED CONTROL",
  },
  "FOLLOW-UP MONITORING": {
    title: "Follow-Up Monitoring",
    intro: "Ongoing monitoring helps review pest activity after the initial control stage.",
    points: ["Review activity trends", "Check high-risk areas", "Adjust the service pathway when needed"],
    action: "REQUEST MONITORING",
  },
  "TREATMENT": {
    title: "Treatment",
    intro: "A treatment stage selected after the service condition and affected areas have been assessed.",
    points: ["Confirm affected areas", "Apply the appropriate service method", "Document the completed work", "Plan follow-up"],
    action: "REQUEST TREATMENT",
  },
  "BIRD MANAGEMENT": {
    title: "Bird Management",
    intro: "A site-specific response to roosting, nesting and nuisance activity around occupied or maintained areas.",
    points: ["Inspect roosting / access areas", "Assess the site condition", "Recommend appropriate control measures", "Follow up"],
    action: "REQUEST BIRD MANAGEMENT",
  },
  "NEST / ACTIVITY RESPONSE": {
    title: "Nest / Activity Response",
    intro: "A focused service response for active bee or wasp nesting and repeated activity around occupied spaces.",
    points: ["Identify the activity area", "Assess the immediate environment", "Apply an appropriate professional response", "Recommend prevention"],
    action: "REQUEST ACTIVITY RESPONSE",
  },
};

const digitalSteps = [
  ["01", "TECHNICIAN APP", "Assigned jobs, site details, inspection, service entry and evidence."],
  ["02", "DIGITAL REPORT", "Structured service record with materials, photographs and remarks."],
  ["03", "CUSTOMER APPROVAL", "Review and digital acknowledgement after the service visit."],
  ["04", "MANAGEMENT VIEW", "Job status, service history, follow-ups and reporting visibility."],
];


const digitalModuleDetails = {
  "TECHNICIAN APP": {
    title: "Technician App",
    body: "The technician starts with assigned work, reviews the customer/site context and records the service journey from inspection to completion.",
    bullets: ["Today's assigned jobs", "Customer and site information", "Inspection findings", "Photos and remarks"],
    screen: ["TODAY'S JOB", "JUBAIL INDUSTRIAL SITE", "READY"],
  },
  "DIGITAL REPORT": {
    title: "Digital Service Report",
    body: "Field information is assembled into a structured service record instead of remaining only as a paper or JPEG artifact.",
    bullets: ["Inspection findings", "Treatment and materials", "Before / during / after evidence", "Outcome and follow-up"],
    screen: ["SERVICE REPORT", "SR-2026-0001", "READY FOR REVIEW"],
  },
  "CUSTOMER APPROVAL": {
    title: "Customer Approval",
    body: "Customer review and acknowledgement become part of the service record, creating a clearer handover after the visit.",
    bullets: ["Review completed work", "Review evidence", "Customer acknowledgement", "Digital signature"],
    screen: ["CUSTOMER REVIEW", "SERVICE COMPLETED", "APPROVAL PENDING"],
  },
  "MANAGEMENT VIEW": {
    title: "Management View",
    body: "Management visibility connects jobs, service history, follow-ups and reporting into a single operational view.",
    bullets: ["Job status", "Pending reports", "Follow-up visibility", "Operational reporting"],
    screen: ["MANAGEMENT VIEW", "12 ACTIVE JOBS", "LIVE DEMO"],
  },
};


const trustCredentials = [
  {
    id: "iso-9001",
    code: "ISO 9001:2015",
    title: "QUALITY MANAGEMENT",
    detail: "A quality-management standard that communicates a structured approach to consistent processes and service quality.",
  },
  {
    id: "iso-14001",
    code: "ISO 14001:2015",
    title: "ENVIRONMENTAL MANAGEMENT",
    detail: "An environmental-management standard associated with structured environmental practices and continual improvement.",
  },
  {
    id: "iso-45001",
    code: "ISO 45001:2018",
    title: "OCCUPATIONAL HEALTH & SAFETY",
    detail: "A management-system standard focused on occupational health and safety practices.",
  },
  {
    id: "vendor",
    code: "SAUDI VENDOR REGISTRATION",
    title: "LOCAL BUSINESS CREDENTIAL",
    detail: "Vendor-registration information shown in the approved company-profile material; exact registration details should be maintained from the current approved documentation.",
  },
];


const galleryItems = [
  {
    id: "field-service-01",
    category: "FIELD SERVICE",
    title: "Professional Field Service",
    text: "Field-service activity in a residential and site-maintenance environment.",
    image: publicAsset("/gallery/gallery-field-service-01.jpg"),
    verified: false,
  },
  {
    id: "field-service-02",
    category: "FIELD SERVICE",
    title: "Site Treatment Visit",
    text: "Technician performing a targeted service visit.",
    image: publicAsset("/gallery/gallery-field-service-02.jpg"),
    verified: false,
  },
  {
    id: "field-service-03",
    category: "FIELD SERVICE",
    title: "On-Site Pest Service",
    text: "Technician carrying out field treatment in an outdoor environment.",
    image: publicAsset("/gallery/gallery-field-service-03.jpg"),
    verified: false,
  },
  {
    id: "pest-control-01",
    category: "PEST CONTROL",
    title: "Pest Control Service",
    text: "Targeted treatment activity inside a service environment.",
    image: publicAsset("/gallery/gallery-pest-control-01.jpg"),
    verified: false,
  },
  {
    id: "pest-control-02",
    category: "PEST CONTROL",
    title: "Targeted Pest Treatment",
    text: "Professional technician carrying out focused pest-control work.",
    image: publicAsset("/gallery/gallery-pest-control-02.jpg"),
    verified: false,
  },
  {
    id: "pest-control-03",
    category: "PEST CONTROL",
    title: "Warehouse Pest Management",
    text: "Pest-control activity in a storage and operational environment.",
    image: publicAsset("/gallery/gallery-pest-control-03.jpg"),
    verified: false,
  },
  {
    id: "termite-01",
    category: "TERMITE",
    title: "Termite Inspection",
    text: "Focused inspection work around a vulnerable building area.",
    image: publicAsset("/gallery/gallery-termite-01.jpg"),
    verified: false,
  },
  {
    id: "termite-02",
    category: "TERMITE",
    title: "Termite Treatment",
    text: "Targeted treatment activity around an existing structure.",
    image: publicAsset("/gallery/gallery-termite-02.jpg"),
    verified: false,
  },
  {
    id: "termite-03",
    category: "TERMITE",
    title: "Structural Termite Service",
    text: "Professional termite service activity in a building access area.",
    image: publicAsset("/gallery/gallery-termite-03.jpg"),
    verified: false,
  },
  {
    id: "disinfection-01",
    category: "DISINFECTION",
    title: "Disinfection Service",
    text: "Controlled disinfection activity in an occupied public environment.",
    image: publicAsset("/gallery/gallery-disinfection-01.jpg"),
    verified: false,
  },
  {
    id: "disinfection-02",
    category: "DISINFECTION",
    title: "Professional Sanitization",
    text: "Disinfection service in a modern commercial interior.",
    image: publicAsset("/gallery/gallery-disinfection-02.jpg"),
    verified: false,
  },
  {
    id: "disinfection-03",
    category: "DISINFECTION",
    title: "Facility Disinfection",
    text: "Professional treatment in a fitness and shared-use environment.",
    image: publicAsset("/gallery/gallery-disinfection-03.jpg"),
    verified: false,
  },
  {
    id: "commercial-01",
    category: "COMMERCIAL",
    title: "Commercial Site Service",
    text: "Pest-management activity in a high-traffic commercial environment.",
    image: publicAsset("/gallery/gallery-commercial-01.jpg"),
    verified: false,
  },
  {
    id: "commercial-02",
    category: "COMMERCIAL",
    title: "Hospitality Service",
    text: "Professional pest-control activity in a hospitality environment.",
    image: publicAsset("/gallery/gallery-commercial-02.jpg"),
    verified: false,
  },
  {
    id: "commercial-03",
    category: "COMMERCIAL",
    title: "Food-Service Environment",
    text: "Targeted service in a restaurant and food-service setting.",
    image: publicAsset("/gallery/gallery-commercial-03.jpg"),
    verified: false,
  },
  {
    id: "industrial-01",
    category: "INDUSTRIAL",
    title: "Industrial Service",
    text: "Professional pest-management activity in an industrial facility.",
    image: publicAsset("/gallery/gallery-industrial-01.jpg"),
    verified: false,
  },
  {
    id: "industrial-02",
    category: "INDUSTRIAL",
    title: "Industrial Treatment",
    text: "Technician working around industrial processing equipment.",
    image: publicAsset("/gallery/gallery-industrial-02.jpg"),
    verified: false,
  },
  {
    id: "industrial-03",
    category: "INDUSTRIAL",
    title: "Warehouse Protection",
    text: "Pest-management service in a large storage environment.",
    image: publicAsset("/gallery/gallery-industrial-03.jpg"),
    verified: false,
  },
];

const testimonials = [
  {
    title: "Verified Client Testimonial",
    body: "Client-approved testimonial text will be placed here after verification.",
    meta: "Client name / company • approval pending",
  },
  {
    title: "Verified Service Experience",
    body: "A second approved client testimonial can be featured here, supported by the customer's consent and exact wording.",
    meta: "Client name / company • approval pending",
  },
  {
    title: "Verified Customer Voice",
    body: "A third approved testimonial slot is reserved for a genuine customer statement.",
    meta: "Client name / company • approval pending",
  },
];

function Icon({ name }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    shield: (
      <>
        <path d="M12 3 20 6v5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-4.8" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12 2.2 2.2 4.8-4.8" />
      </>
    ),
    report: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    phone: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2" />
        <path d="M10 5h4M11 18h2" />
      </>
    ),
    building: (
      <>
        <path d="M4 21V7l8-4 8 4v14" />
        <path d="M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-4h4v4" />
      </>
    ),
    food: (
      <>
        <path d="M6 3v7M4 3v5a2 2 0 0 0 4 0V3M6 10v11" />
        <path d="M15 3v8M18 3v18M15 11c2 0 3-1.5 3-4" />
      </>
    ),
    warehouse: (
      <>
        <path d="M3 21V8l9-5 9 5v13" />
        <path d="M7 13h3M14 13h3M7 17h3M14 17h3M10 21v-5h4v5" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" />
      </>
    ),
    tools: (
      <>
        <path d="m14.5 6.5 3-3 3 3-3 3" /><path d="m13 8 3 3-6 6-3-3 6-6Z" /><path d="M6 18 3 21" />
      </>
    ),
    package: (
      <>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7" /><path d="M12 11v10" />
      </>
    ),
    hygiene: (
      <>
        <path d="M7 3h10" /><path d="M9 3v5l-2 3v7a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-7l-2-3V3" /><path d="M9 12h6" />
      </>
    ),
    alert: (
      <>
        <path d="M12 4 21 20H3L12 4Z" /><path d="M12 9v5M12 17h.01" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" /><circle cx="16.5" cy="9" r="2.5" /><path d="M3.5 20c.7-3.4 2.5-5 5.5-5s4.8 1.6 5.5 5" /><path d="M14.5 15c2.5-.1 4.6 1.2 5.3 4.2" />
      </>
    ),
    magnify: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" />
      </>
    ),
    monitor: (
      <>
        <rect x="4" y="5" width="16" height="11" rx="1.5" /><path d="M8 20h8M12 16v4" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-14-4L3 10" /><path d="M3 5v5h5" /><path d="M4 13a8 8 0 0 0 14 4l3-3" /><path d="M21 19v-5h-5" />
      </>
    ),
    arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

const impactIconMap = {
  "Wooden elements": "package",
  "Building components": "building",
  "Maintenance planning": "tools",
  "Food and hygiene areas": "food",
  "Kitchens and service areas": "food",
  "Commercial environments": "building",
  "Food areas": "food",
  "Indoor workspaces": "building",
  "Residential comfort": "home",
  "Food and storage areas": "warehouse",
  "Equipment and property": "tools",
  "Operational hygiene": "hygiene",
  "Sleeping areas": "home",
  "Guest comfort": "people",
  "Residential environments": "home",
  "Food-service areas": "food",
  "Waste zones": "package",
  "Hygiene-sensitive spaces": "hygiene",
  "Outdoor occupied spaces": "people",
  "Customer experience": "people",
  "Building façades": "building",
  "Rooftops and equipment areas": "building",
  "Hygiene and maintenance": "hygiene",
  "Occupied areas": "people",
  "Entrances and outdoor spaces": "building",
  "Customer and staff comfort": "people",
  "Indoor and outdoor spaces": "building",
  "Visible presentation": "alert",
  "Residential and commercial comfort": "people",
};


const signIconMap = {"termites": ["alert", "tools", "arrow"], "cockroaches": ["magnify", "report", "package"], "ants": ["magnify", "food", "home"], "rodents": ["report", "tools", "magnify"], "bed-bugs": ["magnify", "report", "alert"], "flies": ["magnify", "warehouse", "food"], "mosquitoes": ["magnify", "hygiene", "monitor"], "birds": ["report", "home", "building"], "bees-wasps": ["magnify", "alert", "home"], "spiders": ["monitor", "magnify", "home"]};

const helpIconMap = {
  0: "magnify",
  1: "target",
  2: "shield",
  3: "refresh",
  4: "refresh",
};

function getSignIcon(pestId, index) {
  return signIconMap[pestId]?.[index] || "check";
}

function getImpactIcon(label) {
  return impactIconMap[label] || "shield";
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}


const requestServiceOptions = [
  ...services.map((service) => service.title),
  ...servicePrograms.map((program) => program.title),
  "TERMITE CONTROL",
  "COCKROACH CONTROL",
  "ANT CONTROL",
  "RODENT CONTROL",
  "BED BUG CONTROL",
  "FLY CONTROL",
  "MOSQUITO CONTROL",
  "BIRD MANAGEMENT",
  "BEE & WASP ACTIVITY RESPONSE",
  "SPIDER CONTROL",
];

function App() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [arabic, setArabic] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [quote, setQuote] = useState({ name: "", phone: "", service: "", message: "" });
  const [digitalModule, setDigitalModule] = useState("TECHNICIAN APP");
  const [selectedProgramId, setSelectedProgramId] = useState("one-time");
  const [digitalStage, setDigitalStage] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedCredentialId, setSelectedCredentialId] = useState("iso-9001");
  const [galleryFilter, setGalleryFilter] = useState("ALL");
  const [galleryOpenId, setGalleryOpenId] = useState(null);
  const [selectedPest, setSelectedPest] = useState("cockroaches");
  const [selectedServiceOption, setSelectedServiceOption] = useState(null);
  const [selectedSignIndex, setSelectedSignIndex] = useState(0);
  const [selectedHelpIndex, setSelectedHelpIndex] = useState(0);
  const [siteType, setSiteType] = useState("");
  const [contactPreference, setContactPreference] = useState("PHONE");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedCredential = useMemo(
    () =>
      trustCredentials.find((credential) => credential.id === selectedCredentialId) ||
      trustCredentials[0],
    [selectedCredentialId]
  );

  const selectedServiceProgram = useMemo(
    () =>
      servicePrograms.find((program) => program.id === selectedProgramId) ||
      servicePrograms[0],
    [selectedProgramId]
  );

  const selectedPestProfile = useMemo(
    () => pestProfiles.find((pest) => pest.id === selectedPest) || pestProfiles[0],
    [selectedPest]
  );

  const activeServiceOption = useMemo(() => {
    const option = selectedServiceOption || selectedPestProfile.serviceOptions[0];
    return {
      key: option,
      ...(serviceOptionDetails[option] || {
        title: option,
        intro: `A service pathway for ${selectedPestProfile.name}.`,
        bestFor: `Sites where ${option.toLowerCase()} is appropriate.`,
        points: [
          "Site assessment",
          "Appropriate control measures",
          "Documentation and follow-up",
        ],
        flow: ["ASSESS", "ACT", "DOCUMENT", "FOLLOW-UP"],
        action: `REQUEST ${option}`,
      }),
    };
  }, [selectedPestProfile, selectedServiceOption]);

  const pestSigns = pestSignDetails[selectedPestProfile.id] || [];
  const activeSign = pestSigns[Math.min(selectedSignIndex, Math.max(0, pestSigns.length - 1))] || {
    title: selectedPestProfile.signs?.[0] || "Activity sign",
    detail: "Select a sign to understand what it may indicate.",
  };
  const helpKeys = ["inspect", "identify", "control", "monitor"];
  const activeHelp = pestHelpDetails[helpKeys[Math.min(selectedHelpIndex, helpKeys.length - 1)]];

  const copy = useMemo(
    () =>
      arabic
        ? {
            navAbout: "من نحن",
            navServices: "الخدمات",
            navIndustries: "القطاعات",
            navDigital: "الخدمة الرقمية",
            navProfile: "ملف الشركة",
            navContact: "تواصل معنا",
            heroEyebrow: "صدف الجبيل",
            heroLine1: "خبراء",
            heroLine2: "مكافحة الآفات",
            heroSub: "تجاري • صناعي • سكني",
            heroCopy: "حلول احترافية لمكافحة الآفات والتعقيم والنظافة، مبنية على الممارسات الآمنة والفرق المدربة والتوثيق الموثوق.",
            heroPrimary: "اطلب عرض سعر",
            heroSecondary: "شاهد ملف الشركة",
            aboutEyebrow: "عن صدف الجبيل",
            aboutTitle: "حماية مبنية على خدمة احترافية.",
            aboutText: "تقدم صدف الجبيل حلولاً متخصصة لإدارة الآفات والتعقيم وخدمات النظافة للبيئات السكنية والتجارية والصناعية.",
            serviceEyebrow: "مجالات الخبرة",
            serviceTitle: "خدمات مصممة للبيئات الحقيقية.",
            industriesEyebrow: "القطاعات التي نخدمها",
            industriesTitle: "حلول تتكيف مع طبيعة موقعك.",
            digitalEyebrow: "الخدمة الرقمية المقترحة",
            digitalTitle: "من الخدمة الميدانية إلى سجل خدمة موثق.",
            quoteEyebrow: "اطلب خدمة",
            quoteTitle: "دعنا نبدأ من احتياج موقعك.",
          }
        : {
            navAbout: "ABOUT",
            navServices: "SERVICES",
            navIndustries: "INDUSTRIES",
            navDigital: "DIGITAL SERVICE",
            navProfile: "COMPANY PROFILE",
            navContact: "CONTACT",
            heroEyebrow: "SADAF AL-JUBAIL",
            heroLine1: "PEST CONTROL",
            heroLine2: "EXPERTS",
            heroSub: "COMMERCIAL • INDUSTRIAL • RESIDENTIAL",
            heroCopy: "Professional pest control, disinfection and hygiene solutions built around safe practices, trained professionals and reliable service documentation.",
            heroPrimary: "REQUEST A SERVICE",
            heroSecondary: "VIEW COMPANY PROFILE",
            aboutEyebrow: "ABOUT SADAF AL-JUBAIL",
            aboutTitle: "Protection built around professional service.",
            aboutText: "Sadaf Al-Jubail is positioned as a specialized provider of pest control and disinfection services for domestic, commercial and industrial requirements.",
            serviceEyebrow: "OUR EXPERTISE",
            serviceTitle: "Services designed for real environments.",
            industriesEyebrow: "INDUSTRIES WE SERVE",
            industriesTitle: "Solutions shaped around your environment.",
            digitalEyebrow: "PROPOSED DIGITAL SERVICE",
            digitalTitle: "From field service to a verified service record.",
            quoteEyebrow: "REQUEST A SERVICE",
            quoteTitle: "Start with your site requirement.",
          },
    [arabic]
  );

  const handleQuote = (event) => {
    event.preventDefault();
    setQuoteSent(true);
  };

  return (
    <div className={`site ${arabic ? "arabic-site" : ""}`} dir={arabic ? "rtl" : "ltr"}>
      <header className="header">
        <div className="header-inner">
          <button className="brand-button" onClick={() => scrollToId("home")} aria-label="SADAF home">
            <img className="brand-image" src={brandHeader} alt="SADAF Al-Jubail" />
          </button>

          <nav className="desktop-nav">
            <button onClick={() => scrollToId("about")}>{copy.navAbout}</button>
            <button onClick={() => scrollToId("services")}>{copy.navServices}</button>
            <button onClick={() => scrollToId("service-programs")}>{arabic ? "برامج الخدمة" : "SERVICE PROGRAMS"}</button>
            <button onClick={() => scrollToId("gallery")}>{arabic ? "المعرض" : "GALLERY"}</button>
            <button onClick={() => scrollToId("pests")}>{arabic ? "اعرف الآفة" : "KNOW THE PEST"}</button>
            <button onClick={() => scrollToId("industries")}>{copy.navIndustries}</button>
            <button onClick={() => scrollToId("digital")}>{copy.navDigital}</button>
            <button onClick={() => scrollToId("testimonials")}>{arabic ? "آراء العملاء" : "TESTIMONIALS"}</button>
            <button onClick={() => setProfileOpen(true)}>{copy.navProfile}</button>
            <button onClick={() => scrollToId("contact")}>{copy.navContact}</button>
          </nav>

          <div className="header-actions">
            <button className="language-toggle" onClick={() => setArabic(!arabic)}>
              <Icon name="globe" />
              {arabic ? "EN" : "عربي"}
            </button>
            <button className="demo-tag" onClick={() => scrollToId("contact")}>
              {arabic ? "اطلب عرض سعر" : "GET A QUOTE"}
            </button>
          <button
            type="button"
            className={`mobile-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          </div>

        {mobileMenuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <button onClick={() => { scrollToId("about"); setMobileMenuOpen(false); }}>{copy.navAbout}</button>
            <button onClick={() => { scrollToId("services"); setMobileMenuOpen(false); }}>{copy.navServices}</button>
            <button onClick={() => { scrollToId("service-programs"); setMobileMenuOpen(false); }}>{arabic ? "برامج الخدمة" : "SERVICE PROGRAMS"}</button>
            <button onClick={() => { scrollToId("gallery"); setMobileMenuOpen(false); }}>{arabic ? "المعرض" : "GALLERY"}</button>
            <button onClick={() => { scrollToId("pests"); setMobileMenuOpen(false); }}>{arabic ? "اعرف الآفة" : "KNOW THE PEST"}</button>
            <button onClick={() => { scrollToId("industries"); setMobileMenuOpen(false); }}>{copy.navIndustries}</button>
            <button onClick={() => { scrollToId("digital"); setMobileMenuOpen(false); }}>{copy.navDigital}</button>
            <button onClick={() => { scrollToId("testimonials"); setMobileMenuOpen(false); }}>{arabic ? "آراء العملاء" : "TESTIMONIALS"}</button>
            <button onClick={() => { setProfileOpen(true); setMobileMenuOpen(false); }}>{copy.navProfile}</button>
            <button onClick={() => { scrollToId("contact"); setMobileMenuOpen(false); }}>{copy.navContact}</button>
            <button onClick={() => { setArabic((value) => !value); }}>{arabic ? "ENGLISH" : "العربية"}</button>
          </nav>
        )}
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-left">
            <div className="hero-number">01</div>
            <div className="eyebrow-row">
              <span className="eyebrow">{copy.heroEyebrow}</span>
              <span className="hero-status"><i></i>{arabic ? "خدمة احترافية" : "PROFESSIONAL SERVICE"}</span>
            </div>
            <h1>
              <span>{copy.heroLine1}</span>
              <strong>{copy.heroLine2}</strong>
            </h1>
            <p className="hero-sub">{copy.heroSub}</p>
            <p className="hero-copy">{copy.heroCopy}</p>

            <div className="hero-actions">
              <button className="primary" onClick={() => scrollToId("contact")}>{copy.heroPrimary}<span>→</span></button>
              <button className="outline" onClick={() => setProfileOpen(true)}>{copy.heroSecondary}</button>
            </div>

            <div className="hero-proof">
              <div><b>01</b><span>{arabic ? "منهجية موثقة" : "DOCUMENTED WORKFLOW"}</span></div>
              <div><b>02</b><span>{arabic ? "فرق مدربة" : "TRAINED TEAMS"}</span></div>
              <div><b>03</b><span>{arabic ? "متابعة واضحة" : "CLEAR FOLLOW-UP"}</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <img src={technicianHero} alt="SADAF technician providing professional service" />
            <div className="blue-frame"></div>
            <div className="red-cut"></div>
            <div className="hero-visual-badge">
              <strong>SAFETY</strong>
              <span>QUALITY • DOCUMENTATION</span>
            </div>
            <div className="visual-caption">
              <b>{arabic ? "خدمة احترافية" : "PROFESSIONAL SERVICE"}</b>
              <span>{arabic ? "آمنة • موثقة • موثوقة" : "SAFE • DOCUMENTED • RELIABLE"}</span>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div><b><Icon name="shield" />SAFE & EFFECTIVE</b><span>{arabic ? "ممارسات خدمة مسؤولة" : "Responsible service practices"}</span></div>
          <div><b><Icon name="check" />TRAINED PROFESSIONALS</b><span>{arabic ? "فرق خدمة مدربة" : "Experienced service teams"}</span></div>
          <div><b><Icon name="report" />QUALITY ASSURANCE</b><span>{arabic ? "توثيق منظم للخدمة" : "Structured service control"}</span></div>
          <div><b><Icon name="building" />SITE-SPECIFIC</b><span>{arabic ? "برامج حسب طبيعة الموقع" : "Programs built around site needs"}</span></div>
        </section>

        <section className="section about" id="about">
          <div className="section-title">
            <span>02</span>
            <div>
              <p className="eyebrow">{copy.aboutEyebrow}</p>
              <h2>{copy.aboutTitle}</h2>
            </div>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <p>{copy.aboutText}</p>
              <p>{arabic ? "تجمع التجربة الرقمية هوية الشركة والخدمات والقدرات الميدانية في تجربة واحدة متماسكة." : "The enhanced digital experience brings company identity, service expertise and field-service capability into one consistent presentation."}</p>

              <div className="about-metrics">
                <div><strong>15</strong><span>{arabic ? "صفحة ملف الشركة" : "Profile pages"}</span></div>
                <div><strong>04</strong><span>{arabic ? "مسارات رقمية" : "Digital layers"}</span></div>
                <div><strong>24/7</strong><span>{arabic ? "جاهزية رقمية" : "Digital readiness"}</span></div>
              </div>
            </div>

            <div className="arabic-card" dir="rtl">
              <span className="card-kicker">العربية</span>
              <p className="arabic-title">نبذة عن صدف الجبيل</p>
              <p>خدمات مكافحة الآفات والتعقيم</p>
              <small>حلول مهنية وآمنة وموثوقة لحماية الأشخاص والمرافق.</small>
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="section-title">
            <span>03</span>
            <div>
              <p className="eyebrow">{copy.serviceEyebrow}</p>
              <h2>{copy.serviceTitle}</h2>
            </div>
          </div>

          <div className="service-grid-enhanced">
            {services.map((service, index) => (
              <article className={`service-card-enhanced ${index === 1 ? "accent" : ""}`} key={service.number}>
                <div className="service-top">
                  <span className="service-number">{service.number}</span>
                  <span className="service-arabic" dir="rtl">{service.arabic}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className="tag-row">
                  {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <button onClick={() => scrollToId("contact")} aria-label={`Request ${service.title}`}>
                  <Icon name="arrow" />
                </button>
              </article>
            ))}
          </div>
        </section>



        <section className="service-programs-section" id="service-programs">
          <div className="service-programs-inner">
            <div className="service-programs-heading">
              <div>
                <p className="eyebrow">{arabic ? "برامج الخدمة" : "SERVICE PROGRAMS"}</p>
                <h2>{arabic ? "اختر نموذج الخدمة المناسب لموقعك." : "Choose the service model that fits your site."}</h2>
              </div>
              <p>
                {arabic
                  ? "استكشف نماذج الخدمة المختلفة ثم اختر المسار الذي يناسب احتياج الموقع."
                  : "Explore the service models and select the pathway that best matches the site's requirement."}
              </p>
            </div>

            <div className="service-program-selector">
              {servicePrograms.map((program) => (
                <button
                  type="button"
                  key={program.id}
                  className={selectedProgramId === program.id ? "active" : ""}
                  onClick={() => setSelectedProgramId(program.id)}
                >
                  <b>{program.number}</b>
                  <strong>{program.title}</strong>
                  <span>{program.bestFor}</span>
                  <i>↗</i>
                </button>
              ))}
            </div>

            <div className="service-program-detail">
              <div className="service-program-detail-intro">
                <p className="eyebrow">SELECTED SERVICE PROGRAM</p>
                <h3>{selectedServiceProgram.title}</h3>
                <p className="program-lead">{selectedServiceProgram.short}</p>

                <div className="program-best-for">
                  <small>BEST FOR</small>
                  <strong>{selectedServiceProgram.bestFor}</strong>
                </div>

                <button
                  type="button"
                  className="primary"
                  onClick={() => {
                    setQuote((value) => ({
                      ...value,
                      service: selectedServiceProgram.title,
                      message: `Enquiry regarding ${selectedServiceProgram.title}.`,
                    }));
                    scrollToId("contact");
                  }}
                >
                  {selectedServiceProgram.cta} <span>→</span>
                </button>
              </div>

              <div className="service-program-detail-body">
                <p className="eyebrow">WHAT THE PROGRAM COVERS</p>

                <div className="program-points">
                  {selectedServiceProgram.points.map((point, index) => (
                    <div key={point}>
                      <b>{String(index + 1).padStart(2, "0")}</b>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="program-flow">
                  <p className="eyebrow">SERVICE FLOW</p>
                  <div>
                    {selectedServiceProgram.flow.map((step, index) => (
                      <span key={step}>
                        <b>{String(index + 1).padStart(2, "0")}</b>
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="service-program-note">
              <strong>Need help choosing?</strong>
              <span>Tell us about your site and the pest-management requirement; the enquiry form can carry the selected program into the request.</span>
              <button
                type="button"
                onClick={() => {
                  setQuote((value) => ({
                    ...value,
                    service: selectedServiceProgram.title,
                    message: `Help selecting ${selectedServiceProgram.title}.`,
                  }));
                  scrollToId("contact");
                }}
              >
                TALK TO SADAF <span>→</span>
              </button>
            </div>
          </div>
        </section>

        <section className="pest-explorer-section" id="pests">
          <div className="pest-explorer-inner">
            <div className="pest-explorer-heading">
              <div>
                <p className="eyebrow">{arabic ? "اعرف الآفة" : "KNOW THE PEST"}</p>
                <h2>{arabic ? "ماذا يمكن أن تؤثر عليه؟ وكيف تساعد صدف؟" : "What can it affect? And how does Sadaf help?"}</h2>
              </div>
              <p>{arabic ? "اختر الآفة لرؤية الأثر المحتمل ومسار الإدارة المهنية." : "Select a pest to understand the potential impact and the professional control pathway."}</p>
            </div>

            <div className="pest-count-line">
              <span>{arabic ? "10 آفات مبرمجة" : "10 PEST PROFILES CODED"}</span>
              <small>{arabic ? "الصور ستضاف في خطوة التصميم القادمة" : "10 pest profiles • images + interactive detail"}</small>
            </div>

            <div className="pest-selector">
              {pestProfiles.map((pest) => (
                <button key={pest.id} className={selectedPest === pest.id ? "active" : ""} onClick={() => {
                    setSelectedPest(pest.id);
                    setSelectedServiceOption(null);
                    setSelectedSignIndex(0);
                    setSelectedHelpIndex(0);
                  }}>
                  <img
                    className="pest-selector-thumb"
                    src={publicAsset(`/pests/pest-icon-${pest.id}.png`)}
                    alt=""
                    aria-hidden="true"
                  />
                  <strong>{arabic ? pest.arabic : pest.name}</strong>
                  <small>{pest.category}</small>
                </button>
              ))}
            </div>

            <div className="pest-detail-panel pest-detail-panel-rich">
              <div className="pest-detail-intro rich-intro">
                <img
                  className="pest-hero-image"
                  src={publicAsset(`/pests/pest-icon-${selectedPestProfile.id}.png`)}
                  alt={selectedPestProfile.name}
                />
                <span>{selectedPestProfile.category}</span>
                <h3>{arabic ? selectedPestProfile.arabic : selectedPestProfile.name}</h3>
                <p className="pest-overview-label">{arabic ? "عن الآفة" : "ABOUT THE PEST"}</p>
                <p className="pest-overview-text">{selectedPestProfile.overview}</p>
                <p className="pest-why"><strong>{arabic ? "لماذا يهم؟" : "WHY IT MATTERS"}</strong>{selectedPestProfile.why}</p>
              </div>

              <div className="pest-impact-column rich-impact">
                <div className="pest-sub-block">
                  <p className="eyebrow">{arabic ? "ما الذي يمكن أن تؤثر عليه؟" : "WHAT CAN IT AFFECT?"}</p>
                  <h4>{selectedPestProfile.impactTitle}</h4>
                  <div className="pest-impact-list">
                    {selectedPestProfile.impacts.map((item) => (
                      <div className="pest-impact-item" key={item}>
                        <span className="pest-impact-icon"><Icon name={getImpactIcon(item)} /></span>
                        <span className="pest-impact-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pest-sub-block signs-block">
                  <div className="interactive-section-heading">
                    <div>
                      <p className="eyebrow">{arabic ? "علامات النشاط" : "SIGNS OF ACTIVITY"}</p>
                      <span>{arabic ? "اختر العلامة لمعرفة ما قد تعنيه." : "Select a sign to understand what it may indicate."}</span>
                    </div>
                    <small>CLICK TO EXPLORE</small>
                  </div>

                  <div className="pest-sign-list">
                    {selectedPestProfile.signs.map((item, index) => (
                      <button
                        type="button"
                        className={`pest-sign-item ${selectedSignIndex === index ? "active" : ""}`}
                        key={item}
                        onClick={() => setSelectedSignIndex(index)}
                      >
                        <b className="pest-sign-number">{String(index + 1).padStart(2, "0")}</b>
                        <span className="pest-sign-icon">
                          <Icon name={getSignIcon(selectedPestProfile.id, index)} />
                        </span>
                        <span className="pest-sign-text">{item}</span>
                        <span className="pest-sign-arrow">↗</span>
                      </button>
                    ))}
                  </div>

                  <div className="pest-sign-detail">
                    <div className="pest-detail-marker">{String(selectedSignIndex + 1).padStart(2, "0")}</div>
                    <div>
                      <small>SELECTED SIGN</small>
                      <strong>{activeSign.title}</strong>
                      <p>{activeSign.detail}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pest-help-column rich-help">
                <div className="interactive-section-heading">
                  <div>
                    <p className="eyebrow">{arabic ? "كيف تساعد صدف؟" : "HOW SADAF HELPS"}</p>
                    <span>{arabic ? "اختر مرحلة لمعرفة دورها." : "Select a stage to see what happens."}</span>
                  </div>
                  <small>CLICK TO EXPLORE</small>
                </div>

                <div className="pest-help-steps">
                  {selectedPestProfile.helps.slice(0, 4).map((item, index) => (
                    <button
                      type="button"
                      className={`pest-help-step ${selectedHelpIndex === index ? "active" : ""}`}
                      key={item}
                      onClick={() => setSelectedHelpIndex(index)}
                    >
                      <b>{String(index + 1).padStart(2, "0")}</b>
                      <span className="pest-help-icon"><Icon name={helpIconMap[index] || "shield"} /></span>
                      <span>{item}</span>
                      <i>↗</i>
                    </button>
                  ))}
                </div>

                <div className="pest-help-detail">
                  <small>ACTIVE SERVICE STAGE</small>
                  <strong>{activeHelp.title}</strong>
                  <p>{activeHelp.detail}</p>
                </div>

                <div className="pest-outcome">
                  <small>{arabic ? "النتيجة الوقائية" : "PROTECTION OUTCOME"}</small>
                  <strong>{selectedPestProfile.outcome}</strong>
                </div>
              </div>

              <div className="pest-service-options">
                <div>
                  <p className="eyebrow">{arabic ? "خيارات الخدمة" : "SERVICE OPTIONS"}</p>
                  <span>{arabic ? "اختر مسار الخدمة المناسب للموقع." : "Choose the service pathway that best matches the site requirement."}</span>
                </div>
                <div className="pest-service-option-list">
                  {selectedPestProfile.serviceOptions.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      className={activeServiceOption.key === option ? "selected" : ""}
                      onClick={() => {
                        setSelectedServiceOption(option);
                        setQuote((value) => ({ ...value, service: `${selectedPestProfile.name} — ${option}` }));
                      }}
                    >
                      <b>{String(index + 1).padStart(2, "0")}</b><span>{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pest-service-detail-panel">
                <div className="pest-service-detail-copy">
                  <p className="eyebrow">{arabic ? "المسار المحدد" : "SELECTED SERVICE PATH"}</p>
                  <h4>{activeServiceOption.title}</h4>
                  <p>{activeServiceOption.intro}</p>
                  <div className="pest-service-best-for">
                    <small>{arabic ? "مناسب لـ" : "BEST FOR"}</small>
                    <strong>{activeServiceOption.bestFor || "Sites where this service pathway is appropriate."}</strong>
                  </div>
                </div>

                <div className="pest-service-detail-points">
                  <p className="eyebrow">WHAT THIS PATH COVERS</p>
                  {activeServiceOption.points.map((point, index) => (
                    <div key={point}><b>{String(index + 1).padStart(2, "0")}</b><span>{point}</span></div>
                  ))}
                </div>

                <div className="pest-service-flow">
                  <p className="eyebrow">SERVICE FLOW</p>
                  <div>
                    {(activeServiceOption.flow || ["ASSESS", "ACT", "DOCUMENT", "FOLLOW-UP"]).map((step, index) => (
                      <span key={step}>
                        <b>{String(index + 1).padStart(2, "0")}</b>
                        {step}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="primary pest-service-detail-button"
                    onClick={() => {
                      setQuote((value) => ({
                        ...value,
                        service: `${selectedPestProfile.name} — ${activeServiceOption.key}`,
                        message: `Enquiry regarding ${selectedPestProfile.name} — ${activeServiceOption.key}.`,
                      }));
                      scrollToId("contact");
                    }}
                  >
                    {arabic ? "اطلب هذا المسار" : activeServiceOption.action} <span>→</span>
                  </button>
                </div>
              </div>

              <div className="pest-prevention-panel">
                <div>
                  <p className="eyebrow">{arabic ? "الوقاية والمتابعة" : "PREVENTION & FOLLOW-UP"}</p>
                  <h4>{arabic ? "إدارة مستمرة، وليست زيارة واحدة فقط." : "Management continues beyond one visit."}</h4>
                </div>
                <div className="pest-prevention-list">
                  {selectedPestProfile.prevention.map((item) => <span key={item}>✓ {item}</span>)}
                </div>
              </div>
            </div>

            <div className="pest-cta-row">
              <div>
                <strong>{arabic ? "هل ترى هذه الآفة في موقعك؟" : "Seeing this pest at your site?"}</strong>
                <span>{arabic ? "ابدأ بطلب خدمة مخصص للموقع." : "Start with a site-specific service request."}</span>
              </div>
              <button className="primary" onClick={() => {
                setQuote((value) => ({ ...value, service: selectedPestProfile.name, message: `Enquiry regarding ${selectedPestProfile.name}.` }));
                scrollToId("contact");
              }}>
                {arabic ? "اطلب الخدمة" : selectedPestProfile.serviceLabel} <span>→</span>
              </button>
            </div>
          </div>
        </section>

        <section className="industry-section" id="industries">
          <div className="industry-inner">
            <div className="industry-heading">
              <div>
                <p className="eyebrow">{copy.industriesEyebrow}</p>
                <h2>{copy.industriesTitle}</h2>
              </div>
              <p>{arabic ? "تجربة الموقع الجديدة تعرّف نوع البيئة أولاً، ثم تربطها بالخدمة المناسبة والتوثيق والمتابعة." : "The enhanced website starts with the environment first, then connects the visitor to the relevant service, documentation and follow-up pathway."}</p>
            </div>

            <div className="industry-grid">
              {industries.map(([title, text]) => (
                <div className="industry-card" key={title}>
                  <span>{title}</span>
                  <p>{text}</p>
                  <b>↗</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="digital-enhanced" id="digital">
          <div className="digital-heading">
            <div>
              <p className="eyebrow">{copy.digitalEyebrow}</p>
              <h2>{copy.digitalTitle}</h2>
              <p>{arabic ? "هذا القسم يوضح قدرة رقمية مقترحة للمشروع — التطبيق والتقرير والموافقة ولوحة الإدارة — وليس نظاماً قائماً بعد." : "This is presented as a proposed digital-transformation capability: technician app, service report, customer approval and management visibility."}</p>
            </div>

            <div className="digital-device">
              <div className="device-top"><span></span><b>SADAF</b><span></span></div>
              <div className="device-screen">
                <div className="device-label">TODAY'S JOB</div>
                <strong>JUBAIL INDUSTRIAL SITE</strong>
                <div className="device-row"><span>Inspection</span><b>READY</b></div>
                <div className="device-row"><span>Service</span><b>PEST MANAGEMENT</b></div>
                <div className="device-row"><span>Evidence</span><b>4 PHOTOS</b></div>
                <div className="device-progress"><i></i></div>
                <small>DEMO INTERFACE • NOT FOR PRODUCTION</small>
              </div>
            </div>
          </div>

          <div className="digital-steps">
            {digitalSteps.map(([num, title, text], index) => (
              <button
                className={`digital-step ${digitalModule === title ? "active" : ""}`}
                key={num}
                onClick={() => setDigitalModule(title)}
              >
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <b>{index < digitalSteps.length - 1 ? "→" : "✓"}</b>
              </button>
            ))}
          </div>

          <div className="digital-interactive-panel">
            <div className="digital-panel-copy">
              <p className="eyebrow">ACTIVE DIGITAL MODULE</p>
              <h3>{digitalModuleDetails[digitalModule].title}</h3>
              <p>{digitalModuleDetails[digitalModule].body}</p>
              <div className="digital-bullets">
                {digitalModuleDetails[digitalModule].bullets.map((item) => (
                  <span key={item}>✓ {item}</span>
                ))}
              </div>
            </div>
            <div className="digital-module-screen">
              <small>{digitalModuleDetails[digitalModule].screen[0]}</small>
              <strong>{digitalModuleDetails[digitalModule].screen[1]}</strong>
              <span>{digitalModuleDetails[digitalModule].screen[2]}</span>
              <i style={{ width: `${25 + digitalSteps.findIndex(([_, title]) => title === digitalModule) * 24}%` }} />
              <em>DEMO INTERFACE • NOT FOR PRODUCTION</em>
            </div>
          </div>

          <div className="digital-stage-panel">
            <div className="digital-stage-title">
              <div>
                <p className="eyebrow">FIELD SERVICE WORKFLOW</p>
                <h3>Explore each stage directly.</h3>
              </div>
              <span>No forced next-step sequence.</span>
            </div>

            <div className="digital-stage-tabs">
              {[
                ["Today's Jobs", "Technician starts with assigned work."],
                ["Inspection", "Findings and site observations are recorded."],
                ["Treatment", "Treatment and relevant material details are captured."],
                ["Evidence", "Photographs and remarks support the visit."],
                ["Customer Approval", "Customer reviews and acknowledges the service."],
                ["Service Report", "The professional report is finalized."],
              ].map(([title, body], index) => (
                <button
                  key={title}
                  className={digitalStage === index ? "active" : ""}
                  onClick={() => setDigitalStage(index)}
                >
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{title}</strong>
                  <span>→</span>
                </button>
              ))}
            </div>

            <div className="digital-stage-detail">
              <strong>{String(digitalStage + 1).padStart(2, "0")}</strong>
              <div>
                <p className="eyebrow">SELECTED STAGE</p>
                <h4>{[
                  "Today's Jobs",
                  "Inspection",
                  "Treatment",
                  "Evidence",
                  "Customer Approval",
                  "Service Report",
                ][digitalStage]}</h4>
                <p>{[
                  "Technician starts with assigned work.",
                  "Findings and site observations are recorded.",
                  "Treatment and relevant material details are captured.",
                  "Photographs and remarks support the visit.",
                  "Customer reviews and acknowledges the service.",
                  "The professional report is finalized.",
                ][digitalStage]}</p>
              </div>
              <div className="digital-stage-status">
                <small>DEMO STATUS</small>
                <b>{digitalStage === 5 ? "READY FOR REVIEW" : "IN PROGRESS"}</b>
              </div>
            </div>
          </div>

          <div className="digital-output">
            <div>
              <p className="eyebrow">GENERATED OUTPUT</p>
              <h3>SADAF PROFESSIONAL SERVICE REPORT</h3>
              <p>Customer/site details • Inspection findings • Treatment & materials • Evidence • Outcome • Follow-up • Customer approval</p>
            </div>
            <div className="report-status">
              <small>DEMO REPORT</small>
              <strong>SR-2026-0001</strong>
              <span>READY FOR REVIEW</span>
            </div>
          </div>
        </section>


        <section className="gallery-section" id="gallery">
          <div className="gallery-inner">
            <div className="gallery-heading">
              <div>
                <p className="eyebrow">OUR WORK / PROOF OF WORK</p>
                <h2>Show the work. <em>Keep the visuals clearly identified.</em></h2>
              </div>
              <p>
                These are presentation visuals for the new gallery structure. Replace them with approved SADAF field photographs before publishing them as proof of completed work.
              </p>
            </div>

            <div className="gallery-filter-row">
              {["ALL", "FIELD SERVICE", "PEST CONTROL", "TERMITE", "DISINFECTION", "COMMERCIAL", "INDUSTRIAL"].map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={galleryFilter === filter ? "active" : ""}
                  onClick={() => setGalleryFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="gallery-grid">
              {galleryItems
                .filter((item) => galleryFilter === "ALL" || item.category === galleryFilter)
                .map((item) => (
                  <button
                    type="button"
                    className={`gallery-card ${item.image ? "has-image" : "placeholder"}`}
                    key={item.id}
                    onClick={() => item.image && setGalleryOpenId(item.id)}
                    disabled={!item.image}
                  >
                    <div className="gallery-media">
                      {item.image ? (
                        <img src={item.image} alt={item.title} />
                      ) : (
                        <div className="gallery-placeholder">
                          <span>VERIFIED PHOTO SLOT</span>
                          <strong>{item.category}</strong>
                          <small>Replace with approved SADAF field photography</small>
                        </div>
                      )}
                      <span className="gallery-category">{item.category}</span>
                      {item.image && <span className="gallery-open">↗</span>}
                    </div>
                    <div className="gallery-card-body">
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                      <small>{item.verified ? "APPROVED SADAF PHOTOGRAPH" : "GENERATED DEMO VISUAL"}</small>
                    </div>
                  </button>
                ))}
            </div>

            <div className="gallery-note">
              <strong>Proof of Work Policy</strong>
              <span>The current visuals are presentation assets. Replace them with approved SADAF photographs before presenting them as completed-work evidence; the existing slots and filters do not need to be redesigned.</span>
              <button type="button" onClick={() => scrollToId("contact")}>SUPPLY / REQUEST GALLERY UPDATE <span>→</span></button>
            </div>
          </div>

          {galleryOpenId && (
            <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Gallery image">
              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={() => setGalleryOpenId(null)}
                aria-label="Close gallery"
              >
                ×
              </button>

              <div className="gallery-lightbox-content">
                <img
                  src={galleryItems.find((item) => item.id === galleryOpenId)?.image}
                  alt={galleryItems.find((item) => item.id === galleryOpenId)?.title || "SADAF work"}
                />
                <strong>{galleryItems.find((item) => item.id === galleryOpenId)?.title}</strong>
                <span>{galleryItems.find((item) => item.id === galleryOpenId)?.category}</span>
              </div>
            </div>
          )}
        </section>

        <section className="testimonials-section" id="testimonials">
          <div className="testimonials-heading">
            <div>
              <p className="eyebrow">CLIENT TESTIMONIALS</p>
              <h2>Customer voice, <em>when verified.</em></h2>
            </div>
            <p>
              We will publish only client-approved, verifiable statements. Until approved testimonials are supplied,
              this area stays clearly marked rather than presenting invented customer claims.
            </p>
          </div>

          <div className="testimonials-carousel">
            <button
              className="testimonial-arrow"
              onClick={() => setTestimonialIndex((value) => (value + testimonials.length - 1) % testimonials.length)}
              aria-label="Previous testimonial"
            >
              ‹
            </button>

            <article className="testimonial-card-large">
              <span>CLIENT VOICE {String(testimonialIndex + 1).padStart(2, "0")} / {testimonials.length}</span>
              <h3>{testimonials[testimonialIndex].title}</h3>
              <blockquote>“{testimonials[testimonialIndex].body}”</blockquote>
              <small>{testimonials[testimonialIndex].meta}</small>
            </article>

            <button
              className="testimonial-arrow"
              onClick={() => setTestimonialIndex((value) => (value + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={testimonialIndex === index ? "active" : ""}
                onClick={() => setTestimonialIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>

          <div className="trust-credentials">
            <div className="trust-credentials-heading">
              <div>
                <p className="eyebrow">TRUST & CREDENTIALS</p>
                <h2>Standards that support <em>professional service.</em></h2>
              </div>
              <p>
                Credential cards are shown as structured proof points. Specific registration details remain tied to
                the approved company-profile documentation.
              </p>
            </div>

            <div className="credential-selector">
              {trustCredentials.map((credential) => (
                <button
                  type="button"
                  key={credential.id}
                  className={selectedCredentialId === credential.id ? "active" : ""}
                  onClick={() => setSelectedCredentialId(credential.id)}
                >
                  <span className="credential-mark">
                    <Icon name={credential.id === "vendor" ? "building" : "shield"} />
                  </span>
                  <strong>{credential.code}</strong>
                  <small>{credential.title}</small>
                  <i>↗</i>
                </button>
              ))}
            </div>

            <div className="credential-detail">
              <div className="credential-detail-mark">
                <Icon name={selectedCredential.id === "vendor" ? "building" : "shield"} />
              </div>
              <div>
                <small>SELECTED CREDENTIAL</small>
                <h3>{selectedCredential.code}</h3>
                <strong>{selectedCredential.title}</strong>
                <p>{selectedCredential.detail}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-promo">
          <div className="profile-promo-copy">
            <p className="eyebrow">DIGITAL COMPANY PROFILE</p>
            <h2>One approved profile. <em>One interactive experience.</em></h2>
            <p>Open the 15-page company profile as a digital presentation, review each page and download the A4 PDF for sharing.</p>
          </div>
          <div className="profile-promo-actions">
            <button className="primary" onClick={() => setProfileOpen(true)}>OPEN PROFILE <span>→</span></button>
            <a className="outline" href={publicAsset("/SADAF-Digital-Company-Profile.pdf")} download>DOWNLOAD PDF</a>
          </div>
        </section>

        <section className="request-section" id="contact">
          <div className="request-inner">
            <div className="request-copy">
              <p className="eyebrow">{copy.quoteEyebrow}</p>
              <h2>{copy.quoteTitle}</h2>
              <p>
                {arabic
                  ? "شارك نوع الموقع والخدمة المطلوبة. هذا النموذج تجريبي للعرض."
                  : "Tell us about the site, choose the relevant service pathway and send a structured enquiry."}
              </p>

              <div className="contact-points">
                <div>
                  <span>01</span>
                  <b>Site Assessment</b>
                  <small>Requirement-led service planning</small>
                </div>
                <div>
                  <span>02</span>
                  <b>Professional Quote</b>
                  <small>Structured service proposal</small>
                </div>
                <div>
                  <span>03</span>
                  <b>Digital Follow-up</b>
                  <small>Clear documentation pathway</small>
                </div>
              </div>

              <div className="request-summary-card">
                <small>REQUEST SUMMARY</small>
                <strong>{quote.service || "Select a service"}</strong>
                <span>{siteType || "Select your site type"}</span>
                <em>{contactPreference} preferred</em>
              </div>
            </div>

            <form className="quote-form quote-form-enhanced" onSubmit={handleQuote}>
              <div className="form-section-label">YOUR DETAILS</div>

              <div className="form-grid">
                <label>
                  <span>NAME</span>
                  <input
                    value={quote.name}
                    onChange={(e) => setQuote({ ...quote, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </label>

                <label>
                  <span>PHONE</span>
                  <input
                    value={quote.phone}
                    onChange={(e) => setQuote({ ...quote, phone: e.target.value })}
                    placeholder="+966 ..."
                    required
                  />
                </label>
              </div>

              <label>
                <span>SERVICE / PROGRAM</span>
                <select
                  value={quote.service}
                  onChange={(e) => setQuote({ ...quote, service: e.target.value })}
                  required
                >
                  <option value="">Select service or program</option>
                  {[...new Set(requestServiceOptions)].map((service) => (
                    <option key={service} value={service}>{service.toUpperCase()}</option>
                  ))}
                </select>
              </label>

              <div className="form-grid">
                <label>
                  <span>SITE TYPE</span>
                  <select value={siteType} onChange={(e) => setSiteType(e.target.value)} required>
                    <option value="">Select site type</option>
                    <option value="RESIDENTIAL">Residential</option>
                    <option value="COMMERCIAL">Commercial</option>
                    <option value="INDUSTRIAL">Industrial</option>
                    <option value="HOSPITALITY">Hospitality</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>

                <label>
                  <span>PREFERRED CONTACT</span>
                  <select value={contactPreference} onChange={(e) => setContactPreference(e.target.value)}>
                    <option value="PHONE">Phone</option>
                    <option value="EMAIL">Email</option>
                    <option value="WHATSAPP">WhatsApp</option>
                  </select>
                </label>
              </div>

              <label>
                <span>MESSAGE / SITE REQUIREMENT</span>
                <textarea
                  value={quote.message}
                  onChange={(e) => setQuote({ ...quote, message: e.target.value })}
                  placeholder="Tell us about the site, pest issue or service requirement"
                  rows="5"
                ></textarea>
              </label>

              <div className="form-consent">
                <span>DEMO INTERFACE</span>
                <small>No live submission is connected in this project build.</small>
              </div>

              <button className="form-submit" type="submit">
                SUBMIT SERVICE REQUEST <span>→</span>
              </button>

              {quoteSent && (
                <div className="form-success">
                  DEMO REQUEST RECEIVED • SERVICE: {quote.service || "—"} • SITE: {siteType || "—"}
                </div>
              )}
            </form>

            <aside className="request-next-panel">
              <div>
                <p className="eyebrow">WHAT HAPPENS NEXT</p>
                <h3>A clear service journey from enquiry to follow-up.</h3>
                <p>
                  Your request is structured around the service pathway and site type you selected,
                  making the next conversation easier and more focused.
                </p>

                <div className="request-next-steps">
                  <div>
                    <b>01</b>
                    <div>
                      <strong>We review</strong>
                      <span>Your selected service, site type and requirement.</span>
                    </div>
                  </div>
                  <div>
                    <b>02</b>
                    <div>
                      <strong>We assess</strong>
                      <span>The appropriate service pathway and scope.</span>
                    </div>
                  </div>
                  <div>
                    <b>03</b>
                    <div>
                      <strong>We respond</strong>
                      <span>A structured service discussion or quote pathway.</span>
                    </div>
                  </div>
                  <div>
                    <b>04</b>
                    <div>
                      <strong>We follow up</strong>
                      <span>Clear next steps and documentation where applicable.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="request-contact-box">
                <small>JUBAIL • SAUDI ARABIA</small>
                <strong>SADAF AL-JUBAIL</strong>
                <span>Domestic • Commercial • Industrial</span>
              </div>
            </aside>
          </div>
        </section>

      </main>

      <footer className="footer" id="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <img className="footer-brand-logo" src="/sadaf-footer-logo.png" alt="SADAF Al-Jubail" />
            <p>PROTECTING PEOPLE. PRESERVING SPACES. ENHANCING TRUST.</p>
            <span className="footer-location">JUBAIL • SAUDI ARABIA</span>
            <span className="footer-serves">DOMESTIC • COMMERCIAL • INDUSTRIAL</span>
          </div>

          <div className="footer-column">
            <h4>EXPLORE</h4>
            <button onClick={() => scrollToId("about")}>{copy.navAbout}</button>
            <button onClick={() => scrollToId("services")}>{copy.navServices}</button>
            <button onClick={() => scrollToId("industries")}>{copy.navIndustries}</button>
            <button onClick={() => scrollToId("digital")}>{copy.navDigital}</button>
            <button onClick={() => scrollToId("testimonials")}>{arabic ? "آراء العملاء" : "TESTIMONIALS"}</button>
            <button onClick={() => scrollToId("contact")}>{copy.navContact}</button>
          </div>

          <div className="footer-column">
            <h4>SERVICES</h4>
            <button onClick={() => { setSelectedPest("termites"); scrollToId("pests"); }}>Termite Control</button>
            <button onClick={() => { setSelectedPest("cockroaches"); scrollToId("pests"); }}>Pest Management</button>
            <button onClick={() => scrollToId("services")}>Disinfection &amp; Sanitization</button>
            <button onClick={() => scrollToId("services")}>Customized Programs</button>
            <button onClick={() => scrollToId("contact")}>Request a Service</button>
          </div>

          <div className="footer-column footer-profile-column">
            <h4>COMPANY PROFILE</h4>
            <p>Review the approved 15-page corporate presentation or download the A4 PDF for sharing.</p>
            <div className="footer-profile-actions">
              <button className="footer-profile-btn" onClick={() => setProfileOpen(true)}>OPEN PROFILE <span>→</span></button>
              <a className="footer-profile-link" href={publicAsset("/SADAF-Digital-Company-Profile.pdf")} download>DOWNLOAD PDF</a>
            </div>
            <span className="footer-demo-note">CLIENT DEMO • DEMO DATA • NOT FOR PRODUCTION</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SADAF AL-JUBAIL. ALL RIGHTS RESERVED.</span>
          <span>PROFESSIONAL PEST CONTROL • DISINFECTION • SERVICE DOCUMENTATION</span>
        </div>
      </footer>

      {profileOpen && <CompanyProfileFlipbook pages={profilePages} isOpen={profileOpen} onClose={() => setProfileOpen(false)} />}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
