import { LucideIcon } from 'lucide-react';
import { Activity, Zap, Box, Battery, Cpu, Shield, Cog, DollarSign, GitMerge, CheckCircle } from 'lucide-react';

export interface TeamMember {
    name: string;
    domainDesignation: string;
    primaryContribution: string;
    keyHardware: string;
    impactTooltip: string;
    icon: LucideIcon;
}

export const TEAM_ROSTER: TeamMember[] = [
    {
        name: "Aurosri Arman Panigrahi",
        domainDesignation: "Autonomous Navigation Lead",
        primaryContribution: "V-SLAM & Perception Stack",
        keyHardware: "NVIDIA Jetson Orin Nano / OAK-D Lite",
        impactTooltip: "Ensures <1m landing precision via ArUco vision alignment",
        icon: Activity
    },
    {
        name: "Debasis Nayak",
        domainDesignation: "Flight Dynamics Engineer",
        primaryContribution: "Propulsion & Stabilization",
        keyHardware: "Cube Orange+ / T-Motor 4006",
        impactTooltip: "Delivers 18min flight time through thrust optimization",
        icon: Zap
    },
    {
        name: "Advik Rai",
        domainDesignation: "Structural Integrity Specialist",
        primaryContribution: "Airframe & Materials",
        keyHardware: "330mm 3K Carbon Fiber Monocoque",
        impactTooltip: "Achieves 1655g total mass with 5:1 safety factor",
        icon: Box
    },
    {
        name: "Aayush Saha",
        domainDesignation: "Power Systems Architect",
        primaryContribution: "Energy Harvesting & BMS",
        keyHardware: "Solar Walls / 6S LiPo / Gold Pogo Pins",
        impactTooltip: "Enables autonomous 24hr recharge cycles at Base Station",
        icon: Battery
    },
    {
        name: "Ayush Pradhan",
        domainDesignation: "Embedded Intelligence Lead",
        primaryContribution: "Edge Computing & Telemetry",
        keyHardware: "915MHz Telemetry / Jetson Edge Compute",
        impactTooltip: "Processes 30Hz sensor fusion with <50ms latency",
        icon: Cpu
    },
    {
        name: "Bornak Roy",
        domainDesignation: "Mission Reliability Lead",
        primaryContribution: "Safety & Emergency Protocols",
        keyHardware: "Autonomous RTB / Failsafe Matrix",
        impactTooltip: "Guarantees RTB on <20% battery or comms loss",
        icon: Shield
    },
    {
        name: "Boibhav Dey",
        domainDesignation: "Mechatronics Lead",
        primaryContribution: "Mechanical Interaction",
        keyHardware: "TPU Landing Gear / Alignment Funnel",
        impactTooltip: "Absorbs 2m/s vertical impact on 15° slopes",
        icon: Cog
    },
    {
        name: "Rudra Pratap Sahu",
        domainDesignation: "Resource & Budget Lead",
        primaryContribution: "Financial Strategy",
        keyHardware: "₹ 2 Lakh Allocation Management",
        impactTooltip: "Optimized procurement to stay within ₹2L budget",
        icon: DollarSign
    },
    {
        name: "Prabhu Krupa Biswal",
        domainDesignation: "Systems Integration Lead",
        primaryContribution: "Cross-Module Communication",
        keyHardware: "Mavlink Protocol / Hardware-in-the-Loop",
        impactTooltip: "Unified 8 hardware modules into single flight stack",
        icon: GitMerge
    },
    {
        name: "Arnish Das",
        domainDesignation: "Validation & QA Engineer",
        primaryContribution: "Testing & Simulation",
        keyHardware: "Virtual Hangar Benchmarking",
        impactTooltip: "Validated 500+ flight scenarios in SITL before hardware tests",
        icon: CheckCircle
    }
];

// Domain groupings for Management page
export const DOMAIN_GROUPS = {
    hardware: [
        "Flight Dynamics Engineer",
        "Structural Integrity Specialist",
        "Mechatronics Lead"
    ],
    software: [
        "Autonomous Navigation Lead",
        "Embedded Intelligence Lead",
        "Systems Integration Lead"
    ],
    operations: [
        "Mission Reliability Lead",
        "Resource & Budget Lead",
        "Validation & QA Engineer"
    ],
    infrastructure: [
        "Power Systems Architect"
    ]
};
