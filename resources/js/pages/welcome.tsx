import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import ThemeToggle from '@/components/ui/theme-toggle';
import { useEffect, useState } from 'react';

const permissions = [
    { name: 'Camera', detail: 'Access to device camera', risk: 'High' },
    { name: 'Microphone', detail: 'Record audio input', risk: 'High' },
    { name: 'Location', detail: 'Track device location', risk: 'High' },
    { name: 'Contacts', detail: 'Read contact information', risk: 'High' },
];

const statistics = [
    { number: '12', label: 'Fictional applications mapped' },
    { number: '48', label: 'Permission requests explained' },
    { number: '4', label: 'Privacy risk levels' },
    { number: '11', label: 'Permission types in the guide' },
];

const features = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
        ),
        title: 'Plain-language breakdowns',
        description: 'Every request is explained twice — what the app can do, and why it matters for your privacy.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
            </svg>
        ),
        title: 'Risk scoring',
        description: 'Each permission and each application carries a clear risk level, from low through to high.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
        ),
        title: 'Combined filtering',
        description: 'Search by name and filter by category or by the exact permission an application requests.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        ),
        title: 'Community reviews',
        description: 'Submit your own privacy notes and follow their review status from your personal dashboard.',
    },
];

// DATA SCENARIOS BARU (Ditambah rating, ikon SVG, dan warna spesifik)
const scenarios = [
    {
        name: 'CamShield Scanner',
        developer: 'Northgate Labs',
        category: 'Security',
        rating: '4.3',
        status: 'Needs Attention',
        risk: 'High',
        description: 'QR and document scanner that also runs background threat sweeps.',
        iconBg: '#3b82f6', // Blue
        iconSvg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
            </svg>
        ),
    },
    {
        name: 'CloudVault',
        developer: 'Atlas Binary',
        category: 'Utility',
        rating: '4.5',
        status: 'Verified',
        risk: 'Moderate',
        description: 'Encrypted cloud backup for documents.',
        iconBg: '#3b82f6', // Blue
        iconSvg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
            </svg>
        ),
    },
    {
        name: 'FitTrail',
        developer: 'Verdant Systems',
        category: 'Health',
        rating: '4.1',
        status: 'Under Review',
        risk: 'Elevated',
        description: 'Running coach with live route sharing.',
        iconBg: '#3b82f6', // Blue
        iconSvg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
            </svg>
        ),
    },
    {
        name: 'LedgerLite',
        developer: 'Coinharbor',
        category: 'Finance',
        rating: '4.7',
        status: 'Verified',
        risk: 'Moderate',
        description: 'Personal budgeting with receipt capture.',
        iconBg: '#06b6d4', // Cyan
        iconSvg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
        ),
    },
    {
        name: 'MediTrack',
        developer: 'Carelight Health',
        category: 'Health',
        rating: '4.4',
        status: 'Needs Attention',
        risk: 'High',
        description: 'Medication reminders and symptom diary.',
        iconBg: '#06b6d4', // Cyan
        iconSvg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z"></path>
                <path d="M8.5 8.5l7 7"></path>
            </svg>
        ),
    },
    {
        name: 'NoteNest',
        developer: 'Quillstack',
        category: 'Productivity',
        rating: '4.6',
        status: 'Verified',
        risk: 'Low',
        description: 'Offline notes with attachment capture.',
        iconBg: '#a855f7', // Purple
        iconSvg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
        ),
    },
];

const steps = [
    {
        number: '01',
        title: 'Browse the Directory',
        description:
            'Explore different application scenarios and find the application you want to understand.',
    },
    {
        number: '02',
        title: 'Read the Breakdown',
        description:
            'Review permission requests, their purposes and the associated privacy risk levels.',
    },
    {
        number: '03',
        title: 'Share Your Review',
        description:
            'Read community feedback or submit your own review to help other users.',
    },
];

export default function Welcome() {
    const { auth } = usePage().props as any;
    const [activeSection, setActiveSection] = useState('home');
    const [showNotice, setShowNotice] = useState(false);

    useEffect(() => {
        const noticeAccepted = localStorage.getItem('dppe_notice_accepted');

        if (!noticeAccepted) {
            setShowNotice(true);
        }
    }, []);

    const handleAcceptNotice = () => {
        localStorage.setItem('dppe_notice_accepted', 'true');
        setShowNotice(false);
    };

    // ACTIVE NAVIGATION WHEN SCROLLING
    useEffect(() => {
        const sections = ['home', 'featured-scenarios', 'how-it-works'];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target.id === 'home') {
                            setActiveSection('home');
                        } else if (entry.target.id === 'featured-scenarios') {
                            setActiveSection('features');
                        } else if (entry.target.id === 'how-it-works') {
                            setActiveSection('how-it-works');
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach((id) => {
            const section = document.getElementById(id);

            if (section) {
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* SIMULATION NOTICE POP-UP */}
            {showNotice && (
                <div className="simulation-modal-overlay">
                    <div className="simulation-modal">
                        <div className="simulation-modal-icon">
                            ⚠️
                        </div>

                        <h2>Simulation Notice</h2>

                        <p className="simulation-modal-intro">
                            Before you start exploring DPPE, please read
                            the following notice.
                        </p>

                        <div className="simulation-modal-content">
                            <p>
                                DPPE is an educational simulation platform
                                that uses fictional applications and
                                simulated permission requests.
                            </p>

                            <p>
                                It does not access your actual camera,
                                microphone, location, or notifications,
                                or collect your device data.
                            </p>

                            <p>
                                All Allow and Deny choices are for
                                demonstration purposes only. They do not
                                grant or revoke real device permissions.
                            </p>
                        </div>

                        <button
                            className="simulation-modal-button"
                            onClick={handleAcceptNotice}
                        >
                            I Understand — Continue
                        </button>
                    </div>
                </div>
            )}

            <Head title="DPPE - Digital Privacy Permission Explorer" />

            <div className="dppe-page">

{/* NAVIGATION */}
<header className="dppe-navbar sticky top-0 z-50">
    <div className="dppe-nav-inner">
        <Link href="/" className="dppe-brand">
            <span className="dppe-brand-icon">◈</span>
            <span>
                DPPE
                <small>Digital Privacy Explorer</small>
            </span>
        </Link>

        <nav className="dppe-nav-links">
            <a
                href="#home"
                className={activeSection === 'home' ? 'active' : ''}
                onClick={() => setActiveSection('home')}
            >
                Home
            </a>

            <a
                href="#featured-scenarios"
                className={activeSection === 'features' ? 'active' : ''}
                onClick={() => setActiveSection('features')}
            >
                Features
            </a>

            <a
                href="#how-it-works"
                className={activeSection === 'how-it-works' ? 'active' : ''}
                onClick={() => setActiveSection('how-it-works')}
            >
                How It Works
            </a>

            <Link
                href="/about"
                className={activeSection === 'about' ? 'active' : ''}
                onClick={() => setActiveSection('about')}
            >
                About & Help
            </Link>
        </nav>

        <div className="dppe-nav-actions">
            <ThemeToggle />

            {auth?.user ? (
                <Link href={dashboard()} className="dppe-button">
                    Dashboard <span>→</span>
                </Link>
            ) : (
                <>
                    <Link href={login()} className="dppe-login">Log in</Link>
                    <Link href={register()} className="dppe-button">
                        Get Started <span>→</span>
                    </Link>
                </>
            )}
        </div>
    </div>
</header>
                <main>
                    {/* HERO */}
                    <section className="dppe-hero" id="home">
                        <div className="dppe-hero-inner">
                            <div className="dppe-hero-content">
                                <div className="dppe-eyebrow">
                                    <span className="dppe-live-dot"></span>
                                    DIGITAL PRIVACY TRANSPARENCY
                                </div>

                                <h1>
                                    See what an app really <br className="hidden-mobile" />
                                    asks for <span className="text-gradient-blue">before you</span> <br className="hidden-mobile" />
                                    <span className="text-gradient-cyan">install it</span>
                                </h1>

                                <p className="dppe-hero-description">
                                    Understand application permissions, discover
                                    potential privacy risks and make smarter
                                    decisions about your digital privacy.
                                </p>

                                <div className="dppe-hero-buttons">
                                    <a href="#featured-scenarios" className="dppe-button">
                                        Explore Applications
                                        <span>→</span>
                                    </a>

                                    <a href="#about" className="dppe-secondary-button">
                                        Learn More
                                    </a>
                                </div>

                                <div className="dppe-hero-note">
                                    <span>✓</span>
                                    Make informed decisions. Stay privacy-aware.
                                </div>
                            </div>

                            {/* ANIMATED CAMSHIELD SCANNER */}
                            <div className="dppe-preview-area">
                                <div className="dppe-orbit orbit-one"></div>
                                <div className="dppe-orbit orbit-two"></div>

                                <div className="dppe-floating-label label-top">
                                    <span className="label-icon">✦</span>
                                    Privacy Analysis
                                    <span className="label-status">Active</span>
                                </div>

                                <div className="dppe-scanner-card">
                                    <div className="dppe-scan-line"></div> 

                                    <div className="dppe-scanner-header">
                                        <div className="dppe-app-identity">
                                            <div className="dppe-app-icon-shield">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                                    <path d="M9 12l2 2 4-4"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="dppe-title-row">
                                                    <strong>CamShield Scanner</strong>
                                                    <span className="dppe-badge-risk">High risk</span>
                                                </div>
                                                <small>Security · Northgate Labs</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="dppe-scanner-divider"></div>

                                    <div className="dppe-permission-list">
                                        {permissions.map((permission, index) => (
                                            <div className="dppe-permission-item" key={permission.name}>
                                                <div className="dppe-permission-name">
                                                    <span className="permission-icon">
                                                        {index === 0 && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>}
                                                        {index === 1 && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>}
                                                        {index === 2 && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>}
                                                        {index === 3 && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>}
                                                    </span>
                                                    <strong>{permission.name}</strong>
                                                </div>
                                                
                                                <div className="dppe-risk-indicator">
                                                    <div className="dppe-risk-bar-track">
                                                        <div className="dppe-risk-bar-fill"></div>
                                                    </div>
                                                    <span className="dppe-risk-label">{permission.risk}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="dppe-scanner-divider"></div>

                                    <div className="dppe-scanner-footer">
                                        <div className="dppe-footer-warning">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                            <span>4 of 4 permissions are rated high risk</span>
                                        </div>
                                        <a href="#" className="dppe-view-link">View breakdown →</a>
                                    </div>
                                </div>

                                <div className="dppe-floating-note">
                                    <span className="dppe-note-icon">✓</span>
                                    <div>
                                        <strong>Analysis Complete</strong>
                                        <small>Permission report generated</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* STATISTICS - 4 KOTAK */}
                    <section className="dppe-stats-box">
                        <div className="dppe-stats-box-inner">
                            {statistics.map((stat) => (
                                <div className="dppe-stat-card" key={stat.label}>
                                    <strong>{stat.number}</strong>
                                    <span>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ABOUT */}
                    <section className="dppe-section dppe-about" id="about">
                        <div className="dppe-section-inner dppe-about-grid">
                            <div className="dppe-about-visual">
                                <div className="dppe-about-card">
                                    <div className="dppe-about-card-top">
                                        <span className="dppe-about-shield">◈</span>
                                        <span className="dppe-about-tag">PRIVACY FIRST</span>
                                    </div>

                                    <div className="dppe-about-visual-title">
                                        Your privacy.
                                        <br />
                                        Your decision.
                                    </div>

                                    <div className="dppe-about-check">
                                        <span>✓</span>
                                        Understand permissions
                                    </div>
                                    <div className="dppe-about-check">
                                        <span>✓</span>
                                        Identify potential risks
                                    </div>
                                    <div className="dppe-about-check">
                                        <span>✓</span>
                                        Make informed choices
                                    </div>

                                    <div className="dppe-about-decoration decoration-one"></div>
                                    <div className="dppe-about-decoration decoration-two"></div>
                                </div>
                            </div>

                            <div className="dppe-about-content">
                                <div className="dppe-eyebrow">
                                    ABOUT THE EXPLORER
                                </div>

                                <h2>
                                    Understand permissions.
                                    <span> Protect your privacy.</span>
                                </h2>

                                <p>
                                    Digital Privacy Permission Explorer (DPPE)
                                    is designed to help users understand the
                                    permissions requested by different
                                    applications.
                                </p>

                                <p>
                                    Instead of accepting permission requests
                                    without understanding them, users can
                                    explore what information an application
                                    may access and identify potential privacy
                                    concerns.
                                </p>

                                <a href="#features" className="dppe-text-link">
                                    Discover what DPPE offers <span>→</span>
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* FEATURES - REKA BENTUK BARU */}
                    <section className="dppe-section dppe-features-new" id="features">
                        <div className="dppe-section-inner">
                            <div className="dppe-features-header">
                                <div className="dppe-eyebrow-badge">WHAT THE EXPLORER DOES</div>
                                <h2>A clear view of every permission request</h2>
                                <p>Instead of a wall of technical warnings, each scenario shows the four permissions an app asks for, what that access actually allows, and how much it exposes about you.</p>
                            </div>

                            <div className="dppe-features-grid-new">
                                {features.map((feature, index) => (
                                    <article className="dppe-feature-card" key={index}>
                                        <div className="dppe-feature-icon-box">
                                            {feature.icon}
                                        </div>
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FEATURED SCENARIOS - REKA BENTUK BARU */}
                    <section className="dppe-section dppe-scenarios-new" id="featured-scenarios">
                        <div className="dppe-section-inner">
                            <div className="dppe-scenarios-header">
                                <div>
                                    <div className="dppe-eyebrow-badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.3)' }}>FEATURED SCENARIOS</div>
                                    <h2>Applications worth a closer look</h2>
                                    <p>A selection from the scenario directory, ranked by how much access they request.</p>
                                </div>
                                <a href="#" className="dppe-btn-outline">View all 12 scenarios <span>→</span></a>
                            </div>

                            <div className="dppe-scenario-grid-new">
                                {scenarios.map((scenario, index) => (
                                    <article className="dppe-scenario-card-new" key={index}>
                                        <div className="dppe-sc-top">
                                            <div className="dppe-sc-header">
                                                <div className="dppe-sc-icon" style={{ background: scenario.iconBg }}>
                                                    {scenario.iconSvg}
                                                </div>
                                                <div>
                                                    <h3>{scenario.name}</h3>
                                                    <span>{scenario.developer}</span>
                                                </div>
                                            </div>
                                            {/* Badge Risiko */}
                                            <span className={`dppe-sc-risk-badge risk-${scenario.risk.toLowerCase()}`}>
                                                {scenario.risk}
                                            </span>
                                        </div>

                                        <div className="dppe-sc-meta-row">
                                            <span className="dppe-sc-chip">{scenario.category}</span>
                                            <span className="dppe-sc-chip">⭐ {scenario.rating}</span>
                                            <span className={`dppe-sc-status-chip status-${scenario.status.toLowerCase().replace(' ', '-')}`}>
                                                {scenario.status}
                                            </span>
                                        </div>

                                        <p className="dppe-sc-description">{scenario.description}</p>

                                        <a href="#" className="dppe-sc-link">View permission breakdown →</a>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* HOW IT WORKS */}
                    <section className="dppe-section dppe-how" id="how-it-works">
                        <div className="dppe-section-inner">
                            <div className="dppe-section-heading">
                                <div className="dppe-eyebrow">SIMPLE AND STRAIGHTFORWARD</div>
                                <h2>How DPPE works</h2>
                                <p>
                                    Three simple steps to make better
                                    application privacy decisions.
                                </p>
                            </div>

                            <div className="dppe-steps">
                                {steps.map((step) => (
                                    <div className="dppe-step" key={step.number}>
                                        <div className="dppe-step-number">
                                            {step.number}
                                        </div>
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="dppe-cta-section">
                        <div className="dppe-cta">
                            {/* Efek gradien bulat di kanan */}
                            <div className="dppe-cta-glow"></div>

                            <div className="dppe-cta-content">
                                <div className="dppe-cta-badge">START EXPLORING</div>
                                
                                <h2>
                                    Know what an app asks for before you tap install
                                </h2>
                                
                                <p>
                                    Open the scenario directory, read each permission request in plain language, and add your own privacy review.
                                </p>

                                <div className="dppe-cta-buttons">
                                    {/* Butang Putih */}
                                    <a href="#featured-scenarios" className="dppe-cta-btn-white">
                                        Open the scenario directory <span>→</span>
                                    </a>

                                    {/* Butang Outline (Garis Putih) */}
                                    <a href="#about" className="dppe-cta-btn-outline">
                                        Learn how permissions work
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                 </main>

                {/* FOOTER */}
                <footer className="dppe-footer">
                    <div className="dppe-footer-inner">
                        {/* Column 1: Brand & Description */}
                        <div className="dppe-footer-brand">
                            <Link href="/" className="dppe-brand">
                                <span className="dppe-brand-icon">◈</span>
                                <span>
                                    DPPE
                                    <small>Digital Privacy Explorer</small>
                                </span>
                            </Link>
                            <p>
                                A transparency platform that explains the permission
                                requests behind everyday mobile apps — what each
                                one allows, and how risky it really is.
                            </p>
                        </div>

                        {/* Column 2: Explore */}
                        <div className="dppe-footer-links">
                            <strong>EXPLORE</strong>
                            <a href="#home">Home</a>
                            <a href="#featured-scenarios">Scenario directory</a>
                            <a href="#reviews">My reviews</a>
                        </div>

                        {/* Column 3: Learn */}
                        <div className="dppe-footer-links">
                            <strong>LEARN</strong>

                            <Link href="/about">
                                About the project
                            </Link>

                            <Link href="/about#permission-guide">
                                Permission guide
                            </Link>

                            <Link href="/about#faq">
                                Frequently asked questions
                            </Link>
                        </div>
                        {/* Column 4: Risk Levels */}
                        <div className="dppe-footer-risk-levels">
                            <strong>RISK LEVELS</strong>
                            <div className="dppe-risk-item">
                                <span className="dot dot-low"></span> Low — minimal exposure
                            </div>
                            <div className="dppe-risk-item">
                                <span className="dot dot-moderate"></span> Moderate — worth reviewing
                            </div>
                            <div className="dppe-risk-item">
                                <span className="dot dot-elevated"></span> Elevated — limited access
                            </div>
                            <div className="dppe-risk-item">
                                <span className="dot dot-high"></span> High — broad personal access
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="dppe-footer-bottom">
                        <span>© {new Date().getFullYear()} DPPE · Digital Privacy Explorer.</span>
                        <span>All applications shown are fictional and created for demonstration purposes.</span>
                    </div>
                </footer>
               </div>
        </>
    );
}