import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import ThemeToggle from '@/components/ui/theme-toggle';
import { useState, useEffect } from 'react';

// FAQ Data
const faqs = [
    {
        q: "What is Digital Privacy Permission Explorer?",
        a: "It is a transparency platform that breaks down the permission requests behind everyday mobile apps into plain language, so you can understand what an app can access before you install it."
    },
    {
        q: "Are the applications on this site real?",
        a: "No. Every application and scenario shown here is fictional and created solely for demonstration and educational purposes."
    },
    {
        q: "How is the privacy risk level decided?",
        a: "Risk levels are based on the sensitivity of the data being accessed. Camera, Microphone, Location, and Contacts are rated High because they can expose highly personal information."
    },
    {
        q: "Why does an app ask for a permission it does not seem to use?",
        a: "Sometimes apps request permissions for features that are not obvious, or for background processes. If the link between the permission and the app's core function is unclear, it is usually a warning sign."
    },
    {
        q: "What does the review status mean?",
        a: "It indicates whether the community or our team has verified the accuracy of the scenario. 'Verified' means the information has been checked."
    },
    {
        q: "Can I submit my own privacy review?",
        a: "Yes, registered users can submit reviews and share their own privacy notes from their dashboard."
    },
    {
        q: "Can I turn a permission off after installing an app?",
        a: "Yes. You can usually manage permissions in your device's settings at any time. Revoking unnecessary permissions is a good privacy habit."
    },
    {
        q: "How should I decide whether to grant a permission?",
        a: "Ask yourself: Does this app need this permission to perform its core function? If not, deny it. Choose the narrowest option (e.g., 'Only while using the app') whenever possible."
    }
];

// Permission Types Data
const permissionTypes = [
    {
        name: 'Camera',
        risk: 'High',
        desc: 'Capture photos and record video at any time.',
        note: 'Background access can capture your surroundings with no on-screen sign.'
    },
    {
        name: 'Microphone',
        risk: 'High',
        desc: 'Record audio while the app is open or in the background.',
        note: 'Audio can be captured without an obvious indicator.'
    },
    {
        name: 'Location',
        risk: 'High',
        desc: 'Read precise GPS coordinates, continuously.',
        note: 'Reveals your home, workplace and daily routine over time.'
    },
    {
        name: 'Contacts',
        risk: 'High',
        desc: 'Read and upload your entire address book.',
        note: 'Builds a profile of people who never agreed to it.'
    },
    {
        name: 'Photos',
        risk: 'High',
        desc: 'Read your full photo and video library.',
        note: 'Includes hidden metadata such as time, place and device.'
    },
    {
        name: 'Storage',
        risk: 'Moderate',
        desc: 'Read and write files in shared device storage.',
        note: 'Can expose documents and data saved by other apps.'
    },
    {
        name: 'Sensors',
        risk: 'Moderate',
        desc: 'Access motion, gyroscope and step counters.',
        note: 'Fingerprints your device and infers your activity.'
    },
    {
        name: 'Calendar',
        risk: 'Moderate',
        desc: 'Read and change your calendar events.',
        note: 'Exposes meetings, travel plans and personal appointments.'
    },
    {
        name: 'Clipboard',
        risk: 'Elevated',
        desc: 'Read the contents of your clipboard.',
        note: 'Copied passwords and codes can be captured silently.'
    },
    {
        name: 'Device ID',
        risk: 'Elevated',
        desc: 'Read a persistent hardware identifier.',
        note: 'Links your activity across apps even after a reset.'
    },
    {
        name: 'Notifications',
        risk: 'Low',
        desc: 'Send push notifications at any time.',
        note: 'Low risk, but often used for re-engagement pressure.'
    },
];

export default function About() {
    const { auth } = usePage().props as any;

    return (
        <>
            <Head title="About & Help - DPPE" />

            <div className="dppe-page">

                {/* NAVBAR */}
                <header className="dppe-navbar">
                    <div className="dppe-nav-inner">

                        <Link href="/" className="dppe-brand">
                            <span className="dppe-brand-icon">◈</span>

                            <span>
                                DPPE
                                <small>Digital Privacy Explorer</small>
                            </span>
                        </Link>

                       <nav className="dppe-nav-links">
    <Link href="/">Home</Link>

    <Link href="/#features">
        Features
    </Link>

    <Link href="/#how-it-works">
        How It Works
    </Link>

    <Link href="/about" className="active">
        About & Help
    </Link>
</nav>

                        <div className="dppe-nav-actions">
                            <ThemeToggle />

                            {auth?.user ? (
                                <Link
                                    href={dashboard()}
                                    className="dppe-button"
                                >
                                    Dashboard <span>→</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="dppe-login"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={register()}
                                        className="dppe-button"
                                    >
                                        Get Started <span>→</span>
                                    </Link>
                                </>
                            )}
                        </div>

                    </div>
                </header>

                <main className="dppe-about-page-main">
                    <div className="dppe-section-inner">

                        {/* ABOUT & HELP HERO */}
                        <section className="dppe-about-hero">

                            <div
                                className="dppe-eyebrow-badge"
                                style={{
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    color: '#60a5fa',
                                    border: '1px solid rgba(59, 130, 246, 0.3)'
                                }}
                            >
                                ℹ ABOUT & HELP
                            </div>

                            <h1>
                                Privacy should be readable,
                                <br />
                                not buried in a policy
                            </h1>

                            <p>
                                Digital Privacy Permission Explorer exists
                                to make permission requests understandable.
                                It translates the access an app asks for into
                                plain language, rates how much that access
                                exposes, and lets people add what they noticed
                                themselves.
                            </p>

                            <div className="dppe-about-box-grid">

                                <div className="dppe-info-box">
                                    <h3>✔ What this platform does</h3>

                                    <p>
                                        Breaks every scenario into its four
                                        permission requests, explains what
                                        each one allows, assigns a privacy
                                        risk level, and shows the review
                                        status of the application.
                                    </p>
                                </div>

                                <div className="dppe-info-box">
                                    <h3>✖ What it does not do</h3>

                                    <p>
                                        It does not scan your device, store
                                        your installed apps or read your
                                        accounts. Every application listed
                                        here is fictional and written for
                                        demonstration purposes only.
                                    </p>
                                </div>

                            </div>
                        </section>

                        {/* TEAM MEMBERS */}
                        <section className="dppe-about-section" id="team-members">

                            <div className="dppe-eyebrow-badge">
                                OUR TEAM
                            </div>

                            <h2>Meet the Team</h2>

                            <p className="dppe-section-desc">
                                Meet the team behind Digital Privacy Permission Explorer.
                                Each member contributes to developing and improving this platform.
                            </p>

                            <div className="dppe-team-grid">

                                <div className="dppe-team-card">
                                    <div className="dppe-team-icon">👑</div>
                                    <h3>Ahmad Syaqir Bin Suhaidie</h3>
                                    <p className="dppe-team-id">2026123829</p>
                                    <span>Project Leader</span>
                                </div>

                                <div className="dppe-team-card">
                                    <div className="dppe-team-icon">💻</div>
                                    <h3>Khidir Bin Suhaizad</h3>
                                    <p className="dppe-team-id">2026124549</p>
                                    <span>Backend Developer</span>
                                </div>

                                <div className="dppe-team-card">
                                    <div className="dppe-team-icon">🎨</div>
                                    <h3>Nurin Karmila Binti Kamaruddin</h3>
                                    <p className="dppe-team-id">2026132507</p>
                                    <span>Frontend Developer & UI/UX Designer</span>
                                </div>

                                <div className="dppe-team-card">
                                    <div className="dppe-team-icon">⚙️</div>
                                    <h3>Nur Ain Zulaikha Binti Sazali</h3>
                                    <p className="dppe-team-id">2026122285</p>
                                    <span>Frontend Developer (Interactive Features)</span>
                                </div>

                            </div>

                        </section>

                        {/* CREDITS */}
                        <section className="dppe-about-section" id="credits">

                            <div className="dppe-eyebrow-badge">
                                TECHNOLOGY CREDITS
                            </div>

                            <h2>Built With</h2>

                            <p className="dppe-section-desc">
                                DPPE is developed using modern web technologies
                                to create an interactive and user-friendly experience.
                            </p>

                            <div className="dppe-credits-grid">

                                <div className="dppe-credit-card">
                                    <div className="dppe-credit-icon">🔧</div>
                                    <h3>Laravel</h3>
                                    <p>Backend Framework</p>
                                </div>

                                <div className="dppe-credit-card">
                                    <div className="dppe-credit-icon">⚛️</div>
                                    <h3>React</h3>
                                    <p>Frontend Library</p>
                                </div>

                                <div className="dppe-credit-card">
                                    <div className="dppe-credit-icon">🎨</div>
                                    <h3>Tailwind CSS</h3>
                                    <p>CSS Framework</p>
                                </div>

                            </div>

                        </section>

                        {/* PERMISSION BASICS */}
                        <section className="dppe-about-section">

                            <div className="dppe-eyebrow-badge">
                                PERMISSION BASICS
                            </div>

                            <h2>How to read a permission request</h2>

                            <p className="dppe-section-desc">
                                A permission prompt is a trade: access in
                                exchange for a feature. Four questions turn
                                that prompt into a decision.
                            </p>

                            <div className="dppe-guide-grid-2col">

                                <div className="dppe-guide-card">
                                    <h3>1. Read the request in context</h3>
                                    <p>
                                        Prompts appear when a feature needs
                                        them. If an app asks for everything
                                        at first launch with no explanation,
                                        treat it as a warning sign.
                                    </p>
                                </div>

                                <div className="dppe-guide-card">
                                    <h3>2. Match the request to the feature</h3>
                                    <p>
                                        A scanner needs a camera. A budgeting
                                        app rarely needs your contacts. When
                                        the link is unclear, the request is
                                        probably broader than the feature
                                        requires.
                                    </p>
                                </div>

                                <div className="dppe-guide-card">
                                    <h3>3. Choose the narrowest option</h3>
                                    <p>
                                        Many systems offer "only while using",
                                        "once" or approximate location. The
                                        narrowest setting that still works
                                        is the safest default.
                                    </p>
                                </div>

                                <div className="dppe-guide-card">
                                    <h3>4. Review and revoke later</h3>
                                    <p>
                                        Permissions are not permanent. Revisit
                                        your device settings every few months
                                        and remove access the app no longer
                                        needs.
                                    </p>
                                </div>

                            </div>

                            <h2 style={{ marginTop: '60px' }}>
                                What the risk levels mean
                            </h2>

                            <p className="dppe-section-desc">
                                Risk reflects how much a permission reveals
                                about you and how difficult it is to undo
                                once the access has been granted.
                            </p>

                            <div className="dppe-risk-grid-4col">

                                <div className="dppe-risk-card border-low">
                                    <span className="dppe-risk-badge bg-low">
                                        Low
                                    </span>
                                    <h4>Minimal exposure</h4>
                                    <p>
                                        Little personal information is
                                        revealed and the access is easy
                                        to revoke, such as sending
                                        notifications.
                                    </p>
                                </div>

                                <div className="dppe-risk-card border-mod">
                                    <span className="dppe-risk-badge bg-mod">
                                        Moderate
                                    </span>
                                    <h4>Worth reviewing</h4>
                                    <p>
                                        Some device or file data is exposed,
                                        usually limited to what a specific
                                        feature needs to function.
                                    </p>
                                </div>

                                <div className="dppe-risk-card border-elev">
                                    <span className="dppe-risk-badge bg-elev">
                                        Elevated
                                    </span>
                                    <h4>Limited personal access</h4>
                                    <p>
                                        Identifiers or clipboard content
                                        can be read, which may be used to
                                        link your activity over time.
                                    </p>
                                </div>

                                <div className="dppe-risk-card border-high">
                                    <span className="dppe-risk-badge bg-high">
                                        High
                                    </span>
                                    <h4>Broad personal access</h4>
                                    <p>
                                        Camera, microphone, precise location,
                                        contacts or your full photo library
                                        — content that is hard to take back.
                                    </p>
                                </div>

                            </div>
                        </section>

                        {/* PERMISSION GUIDE */}
                        <section
                            className="dppe-about-section"
                            id="permission-guide"
                        >

                            <div className="dppe-eyebrow-badge">
                                PERMISSION GUIDE
                            </div>

                            <h2>Every permission type in the explorer</h2>

                            <p className="dppe-section-desc">
                                These eleven permissions are the building
                                blocks of every scenario. Each one lists
                                what the app can do and why it matters.
                            </p>

                            <div className="dppe-permission-guide-grid">

                                {permissionTypes.map((perm, idx) => (
                                    <div
                                        className="dppe-perm-guide-card"
                                        key={idx}
                                    >
                                        <div className="dppe-pg-header">

                                            <div className="dppe-pg-icon">
                                                ⚙
                                            </div>

                                            <h3>{perm.name}</h3>

                                            <span
                                                className={`dppe-pg-badge bg-${perm.risk.toLowerCase()}`}
                                            >
                                                {perm.risk}
                                            </span>

                                        </div>

                                        <p className="dppe-pg-desc">
                                            {perm.desc}
                                        </p>

                                        <div className="dppe-pg-note">
                                            <span className="dppe-note-dot"></span>
                                            {' '}{perm.note}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </section>

                        {/* FREQUENTLY ASKED QUESTIONS */}
                        <section
                            className="dppe-about-section"
                            id="faq"
                            style={{
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}
                        >

                            <div className="dppe-eyebrow-badge">
                                HELP CENTRE
                            </div>

                            <h2>Frequently Asked Questions</h2>

                            <p className="dppe-section-desc">
                                Short answers to the questions people ask
                                most often about app permissions and how
                                this explorer works.
                            </p>

                            <div className="dppe-faq-list">

                                {faqs.map((faq, index) => (
                                    <div
                                        className="dppe-faq-item"
                                        key={index}
                                    >

                                        <div className="dppe-faq-question">
                                            <span>
                                                <strong>
                                                    {String(index + 1).padStart(2, '0')}.
                                                </strong>
                                                {' '}{faq.q}
                                            </span>
                                        </div>

                                        <div
                                            className="dppe-faq-answer open"
                                            style={{
                                                display: 'block',
                                                maxHeight: 'none',
                                                height: 'auto',
                                                opacity: 1,
                                                overflow: 'visible',
                                                padding: '0 18px 18px 18px'
                                            }}
                                        >
                                            <p>{faq.a}</p>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </section>

                    </div>
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
                            <Link href="/">Home</Link>
                            <Link href="/#featured-scenarios">Scenario directory</Link>
                            <Link href="/#reviews">My reviews</Link>
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

// Remove default layout sidebar and header
About.layout = (page: React.ReactNode) => page;
