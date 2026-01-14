export type ComponentCategory = 'Propulsion' | 'Intelligence' | 'Flight Control' | 'Perception' | 'Power' | 'Base Station';

export interface ComponentData {
    id: string;
    name: string;
    category: ComponentCategory;
    role: string;
    description: string;
    specs: { [key: string]: string };
    mass: string;
    image: string;
}

export const hardwareInventory: ComponentData[] = [
    // --- PROPULSION ---
    {
        id: 'motor-mn4006',
        name: 'T-Motor Antigravity 4006',
        category: 'Propulsion',
        role: 'Primary Lift Generation',
        description: 'High-efficiency brushless motors designed for thin Martian atmosphere operations, providing exceptional thrust-to-weight ratio.',
        specs: {
            'KV Rating': '380KV',
            'Max Thrust': '2.8kg',
            'Weight': '68g',
            'Config': '18N24P'
        },
        mass: '68g',
        image: '/components/MOTOR.jpg'
    },
    {
        id: 'prop-scimitar',
        name: '4-Bladed Scimitar Props',
        category: 'Propulsion',
        role: 'High-Altitude Aerodynamics',
        description: 'Custom-molded carbon fiber propellers with aggressive pitch for optimized bite in low-density air.',
        specs: {
            'Diameter': '15 inch',
            'Pitch': '5.5 inch',
            'Material': 'CF Composite',
            'Blades': '4'
        },
        mass: '24g',
        image: '/components/PROPELLER.jpg'
    },

    // --- INTELLIGENCE ---
    {
        id: 'jetson-orin',
        name: 'NVIDIA Jetson Orin Nano',
        category: 'Intelligence',
        role: 'AI Mission Computer',
        description: 'The neural brain of the UAV, processing V-SLAM and object detection models in real-time.',
        specs: {
            'AI Performance': '40 TOPS',
            'GPU': '1024-core Ampere',
            'CPU': '6-core ARM v8.2',
            'Memory': '8GB LPDDR5'
        },
        mass: '128g',
        image: '/components/NVIDIA JETSON NANO.jpeg'
    },
    {
        id: 'ssd-wd',
        name: 'WD Blue SN580 SSD',
        category: 'Intelligence',
        role: 'Data Storage',
        description: 'High-speed NVMe storage for logging telemetry and high-resolution mission imagery.',
        specs: {
            'Capacity': '1TB',
            'Interface': 'PCIe Gen4',
            'Read Speed': '4150 MB/s',
            'Form Factor': 'M.2 2280'
        },
        mass: '5.5g',
        image: '/components/SSD.png'
    },

    // --- FLIGHT CONTROL ---
    {
        id: 'cube-orange',
        name: 'Cube Orange+',
        category: 'Flight Control',
        role: 'Autopilot Core',
        description: 'Triple-redundant flight controller ensuring stability and precise navigation control via MAVLink.',
        specs: {
            'Processor': 'H7 STM32',
            'IMU': '3x Redundant',
            'ADS-B': 'Integrated',
            'Interface': 'CubePilot Carrier'
        },
        mass: '75g',
        image: '/components/CUBE ORANGE PLUS.jpeg'
    },

    // --- PERCEPTION ---
    {
        id: 'oak-d',
        name: 'OAK-D Lite',
        category: 'Perception',
        role: 'Stereo Vision & Depth',
        description: 'Provides 4K color imagery and stereo depth perception for obstacle avoidance and mapping.',
        specs: {
            'Resolution': '4K Color',
            'Depth Range': '0.2m - 18m',
            'AI Chip': 'Myriad X',
            'FOV': '69° H / 55° V'
        },
        mass: '61g',
        image: '/components/CAMERA MODULE.jpg'
    },
    {
        id: 'tf-luna',
        name: 'TF-Luna LiDAR',
        category: 'Perception',
        role: 'Altitude Ranging',
        description: 'Single-point ranging LiDAR for precise altitude hold and terrain following.',
        specs: {
            'Range': '0.2m - 8m',
            'Frequency': '100Hz',
            'Accuracy': '±6cm',
            'Interface': 'UART / I2C'
        },
        mass: '5g',
        image: '/components/LIDAR.jpeg'
    },
    {
        id: 'opt-flow',
        name: 'PMW3901 Optical Flow',
        category: 'Perception',
        role: 'Visual Odometry',
        description: 'Provides velocity data for position holding in GPS-denied environments (lava tubes).',
        specs: {
            'Min Light': '5 Lux',
            'Interface': 'SPI',
            'Range': '80mm - inf',
            'FOV': '42°'
        },
        mass: '2g',
        image: '/components/OF.jpg'
    },

    // --- POWER ---
    {
        id: 'lipo-6s',
        name: '4500mAh 6S LiPo',
        category: 'Power',
        role: 'Main Power Source',
        description: 'High-density lithium polymer battery pack providing extended flight times.',
        specs: {
            'Voltage': '22.2V (6S)',
            'Capacity': '4500mAh',
            'Discharge': '60C',
            'Connector': 'XT90'
        },
        mass: '580g',
        image: '/components/BATTERY.jpeg'
    },
    {
        id: 'pdb-matek',
        name: 'Matek PDB-HEX',
        category: 'Power',
        role: 'Power Distribution',
        description: 'Distributes high current to ESCs and provides regulated voltage rails for avionics.',
        specs: {
            'Input': '6-60V (2-12S)',
            'Current': '4x 50A',
            'BEC': '5V/12V',
            'Mounting': '30.5mm'
        },
        mass: '16g',
        image: '/components/POWER DISTRIBUTION BOARD.jpeg'
    },

    // --- BASE STATION ---
    {
        id: 'pogo-pins',
        name: 'Gold-Plated Pogo Pins',
        category: 'Base Station',
        role: 'Charging Interface',
        description: 'Spring-loaded high-current contacts for automated landing and charging connection.',
        specs: {
            'Material': 'Gold Plated',
            'Current': '10A Continuous',
            'Stroke': '5mm',
            'Durability': '1M Cycles'
        },
        mass: 'N/A',
        image: '/components/POGOPINS.jpg'
    },
    {
        id: 'solar-cells',
        name: 'Solar Cell Walls',
        category: 'Base Station',
        role: 'Energy Harvesting',
        description: 'Deployable solar arrays to recharge the base station battery bank during Martian day.',
        specs: {
            'Efficiency': '24%',
            'Type': 'Monocrystalline',
            'Output': '200W Total',
            'Deploy': 'Auto-Folding'
        },
        mass: 'N/A',
        image: '/components/solar.webp'
    },
    {
        id: 'kill-switch',
        name: 'Emergency Kill-Switch',
        category: 'Base Station',
        role: 'Safety Override',
        description: 'Physical hardware interrupt for immediate system shutdown during testing protocols.',
        specs: {
            'Type': 'Mushroom Push',
            'Rating': '250V / 10A',
            'Action': 'Latching',
            'IP Rating': 'IP65'
        },
        mass: 'N/A',
        image: '/components/killswitch.jpg'
    }
];
