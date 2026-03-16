const { useState, useEffect, useRef, useCallback } = React;

function PortfolioTerminal() {
    const [activeSection, setActiveSection] = useState('about');
    const [bootComplete, setBootComplete] = useState(false);

    const terminalRef = useRef(null);
    const headerRef = useRef(null);
    const titleBarRef = useRef(null);
    const nameRef = useRef(null);
    const subtitleRef = useRef(null);
    const linksRef = useRef(null);
    const navRef = useRef(null);
    const contentRef = useRef(null);
    const footerRef = useRef(null);
    const cursorRef = useRef(null);
    const whoamiRef = useRef(null);
    const bootLinesRef = useRef(null);

    // Boot sequence animation
    useEffect(() => {
        const tl = createBootTimeline({
            terminal: terminalRef.current,
            header: headerRef.current,
            nav: navRef.current,
            content: contentRef.current,
            footer: footerRef.current,
            bootLines: bootLinesRef.current,
            whoami: whoamiRef.current,
            cursor: cursorRef.current,
            name: nameRef.current,
            subtitle: subtitleRef.current,
        }, () => setBootComplete(true));

        return () => tl.kill();
    }, []);

    // Section transition animation
    useEffect(() => {
        if (!bootComplete || !contentRef.current) return;
        const ctx = createSectionTransition(contentRef.current);
        return () => ctx.revert();
    }, [activeSection, bootComplete]);

    // Nav button hover
    const handleNavHover = useCallback((e, isEnter) => {
        animateNavHover(e.currentTarget, isEnter);
    }, []);

    const sections = {
        about: { title: 'about.sh', icon: <Terminal /> },
        skills: { title: 'skills.json', icon: <Code /> },
        projects: { title: 'projects.log', icon: <Briefcase /> },
        education: { title: 'education.txt', icon: <GraduationCap /> }
    };

    return (
        <div className="min-h-screen bg-black text-green-400 font-mono p-4 md:p-8">
            <div className="max-w-7xl mx-auto" ref={terminalRef} style={{ opacity: 0 }}>
                <div ref={titleBarRef} className="bg-gray-900 rounded-t-lg border border-gray-800 p-3 flex items-center gap-2">
                    <div className="flex gap-2">
                        <div className="traffic-light w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="traffic-light w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="traffic-light w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-500 text-sm ml-4">heng@portfolio:~</span>
                </div>

                <div className="bg-gray-950 border-x border-b border-gray-800 rounded-b-lg p-6 md:p-8 min-h-[80vh]">

                    {/* Boot sequence */}
                    <div ref={bootLinesRef} style={{ opacity: 0 }} className="mb-4 text-sm">
                        <p className="boot-line text-gray-600">[OK] Starting terminal emulator...</p>
                        <p className="boot-line text-gray-600">[OK] Loading profile: heng@portfolio</p>
                        <p className="boot-line text-gray-600">[OK] Mounting /home/heng/projects</p>
                        <p className="boot-line text-gray-600">[OK] Initializing environment variables</p>
                        <p className="boot-line text-green-600">[READY] Session active. Welcome back, Heng.</p>
                    </div>

                    {/* Header */}
                    <div ref={headerRef} className="mb-8">
                        <p className="text-green-500 mb-2">
                            <span ref={whoamiRef}></span>
                            <span ref={cursorRef} className="animate-pulse" style={{ opacity: 0 }}>▊</span>
                        </p>
                        <p ref={nameRef} className="text-white text-2xl md:text-3xl font-bold mb-2 glow-text" style={{ opacity: 0 }}>
                            CHHIM HENG HENG
                        </p>
                        <p ref={subtitleRef} className="text-gray-400 mb-4" style={{ opacity: 0 }}>
                            Computer Science Student @ Paragon International University
                        </p>
                        <div ref={linksRef} className="flex flex-wrap gap-4 text-sm">
                            <a href="mailto:henghengc07@gmail.com" className="contact-link flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors" style={{ opacity: 0 }}>
                                <Mail className="w-4 h-4" />
                                <span>henghengc07@gmail.com</span>
                            </a>
                            <a href="https://www.linkedin.com/in/heng-h-chhim-6528b2255/" target="_blank" rel="noopener noreferrer" className="contact-link flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors" style={{ opacity: 0 }}>
                                <Linkedin className="w-4 h-4" />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div ref={navRef} className="flex flex-wrap gap-2 mb-6 border-b border-gray-800 pb-4" style={{ opacity: 0 }}>
                        {Object.entries(sections).map(([key, { title, icon }]) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                onMouseEnter={(e) => handleNavHover(e, true)}
                                onMouseLeave={(e) => handleNavHover(e, false)}
                                className={`nav-btn flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                                    activeSection === key
                                        ? 'bg-green-500 text-black glow-border'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-green-400'
                                }`}
                                style={{ opacity: 0 }}
                            >
                                {icon}
                                <span>{title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div ref={contentRef} className="space-y-6" style={{ opacity: 0 }}>
                        {activeSection === 'about' && (
                            <div className="space-y-4">
                                <div className="section-cmd flex items-center gap-2 text-cyan-400 mb-4">
                                    <ChevronRight className="w-4 h-4" />
                                    <span>cat about.sh</span>
                                </div>
                                <div className="content-card bg-gray-900 border border-gray-800 rounded p-6 text-gray-300 leading-relaxed">
                                    <p className="mb-4">
                                        Computer Science student focused on the intersection of Full-Stack Engineering and Artificial Intelligence. Skilled in developing data-driven applications using PHP, with a strong foundation in deploying optimized environments via Nginx and PM2.
                                    </p>
                                    <p>
                                        Currently expanding expertise into AI/ML integration, with a focus on building and deploying intelligent systems that solve real-world problems through scalable software.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeSection === 'skills' && (
                            <div className="space-y-4">
                                <div className="section-cmd flex items-center gap-2 text-cyan-400 mb-4">
                                    <ChevronRight className="w-4 h-4" />
                                    <span>cat skills.json</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="content-card bg-gray-900 border border-gray-800 rounded p-6">
                                        <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                                            <span className="text-green-400">►</span> Programming Languages
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['C++', 'Java', 'PHP', 'JavaScript'].map(skill => (
                                                <span key={skill} className="skill-tag bg-gray-800 text-green-400 px-3 py-1 rounded text-sm border border-gray-700">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="content-card bg-gray-900 border border-gray-800 rounded p-6">
                                        <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                                            <span className="text-green-400">►</span> Web Development
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['Laravel', 'Nuxt.js', 'Tailwind CSS', 'HTML', 'CSS', 'Bootstrap 5'].map(skill => (
                                                <span key={skill} className="skill-tag bg-gray-800 text-green-400 px-3 py-1 rounded text-sm border border-gray-700">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="content-card bg-gray-900 border border-gray-800 rounded p-6">
                                        <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                                            <span className="text-green-400">►</span> Cloud & DevOps
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['Digital Ocean', 'Nginx', 'PM2', 'Linux (Ubuntu)', 'SSH'].map(skill => (
                                                <span key={skill} className="skill-tag bg-gray-800 text-green-400 px-3 py-1 rounded text-sm border border-gray-700">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="content-card bg-gray-900 border border-gray-800 rounded p-6">
                                        <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                                            <span className="text-green-400">►</span> Tools & Technologies
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['VS Code', 'PhpStorm', 'IntelliJ IDEA', 'Insomnia', 'Git/GitHub'].map(skill => (
                                                <span key={skill} className="skill-tag bg-gray-800 text-green-400 px-3 py-1 rounded text-sm border border-gray-700">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="content-card bg-gray-900 border border-gray-800 rounded p-6">
                                        <h3 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
                                            <span className="text-green-400">►</span> Database
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['MySQL', 'PostgreSQL'].map(skill => (
                                                <span key={skill} className="skill-tag bg-gray-800 text-green-400 px-3 py-1 rounded text-sm border border-gray-700">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'projects' && (
                            <div className="space-y-4">
                                <div className="section-cmd flex items-center gap-2 text-cyan-400 mb-4">
                                    <ChevronRight className="w-4 h-4" />
                                    <span>cat projects.log</span>
                                </div>
                                <div className="content-card bg-gray-900 border border-gray-800 rounded p-6">
                                    <h3 className="text-yellow-400 font-bold text-xl mb-2">Peer to Peer Lending Marketplace Platform</h3>
                                    <p className="text-cyan-400 text-sm mb-4">Backend Developer | Team Project - Paragon International University</p>

                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {['Laravel', 'Nuxt.js', 'MySQL', 'Tailwind CSS', 'Github'].map(tech => (
                                            <span key={tech} className="tech-tag bg-gray-800 text-blue-400 px-3 py-1 rounded text-sm border border-blue-900">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="space-y-3 text-gray-300">
                                        <p className="project-bullet flex items-start gap-2">
                                            <span className="text-green-400 mt-1">●</span>
                                            <span>Developed the backend and admin dashboard for a peer-to-peer lending marketplace using Laravel for the backend and Nuxt.js for the frontend</span>
                                        </p>
                                        <p className="project-bullet flex items-start gap-2">
                                            <span className="text-green-400 mt-1">●</span>
                                            <span>Implemented user management workflows: approving, rejecting, and managing borrower and lender accounts</span>
                                        </p>
                                        <p className="project-bullet flex items-start gap-2">
                                            <span className="text-green-400 mt-1">●</span>
                                            <span>Built loan request management systems with full approval/rejection processes and real-time status updates</span>
                                        </p>
                                        <p className="project-bullet flex items-start gap-2">
                                            <span className="text-green-400 mt-1">●</span>
                                            <span>Designed and integrated data visualization dashboards using charts and key statistics to monitor platform activity</span>
                                        </p>
                                        <p className="project-bullet flex items-start gap-2">
                                            <span className="text-green-400 mt-1">●</span>
                                            <span>Utilized RESTful APIs to efficiently handle data flow between the backend and frontend</span>
                                        </p>
                                        <p className="project-bullet flex items-start gap-2">
                                            <span className="text-green-400 mt-1">●</span>
                                            <span>Collaborated closely with frontend developers to ensure system reliability and functionality</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'education' && (
                            <div className="space-y-4">
                                <div className="section-cmd flex items-center gap-2 text-cyan-400 mb-4">
                                    <ChevronRight className="w-4 h-4" />
                                    <span>cat education.txt</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="content-card bg-gray-900 border border-gray-800 rounded p-6">
                                        <h3 className="text-yellow-400 font-bold text-lg mb-2">Bachelor of Science in Computer Science</h3>
                                        <p className="text-gray-400 mb-1">Paragon International University | Phnom Penh</p>
                                        <p className="text-cyan-400 text-sm">Expected Graduation: 2028</p>
                                    </div>

                                    <div className="content-card bg-gray-900 border border-gray-800 rounded p-6">
                                        <h3 className="text-yellow-400 font-bold text-lg mb-2">General English Program (GEP 12)</h3>
                                        <p className="text-gray-400">Australian Centre for Education (ACE) | Phnom Penh</p>
                                    </div>

                                    <div className="content-card bg-gray-900 border border-gray-800 rounded p-6">
                                        <h3 className="text-yellow-400 font-bold text-lg mb-2">High School Baccalaureate (Science)</h3>
                                        <p className="text-gray-400">Preah Sisowath High School | Phnom Penh</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div ref={footerRef} className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm" style={{ opacity: 0 }}>
                        <p>$ exit</p>
                        <p className="mt-2">&copy; 2025 Chhim Heng Heng. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<PortfolioTerminal />, document.getElementById('root'));
