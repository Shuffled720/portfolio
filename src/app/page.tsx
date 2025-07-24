"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowUpRight,
  Terminal,
  Zap,
  Cpu,
  Globe2,
  Code2,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  status: "shipped" | "building" | "concept";
  year: string;
  impact?: string;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [cursorVariant, setCursorVariant] = useState("default");
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());

  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouse = {
    x: useSpring(mouseX, springConfig),
    y: useSpring(mouseY, springConfig),
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleScroll = () => {
      const sections = ["hero", "work", "craft", "connect"];
      const scrollPosition = window.scrollY + 200; // Offset for header

      let currentSection = "hero"; // Default to hero

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;

          // Check if scroll position is within this section
          if (
            scrollPosition >= elementTop &&
            scrollPosition < elementTop + elementHeight
          ) {
            currentSection = sectionId;
          }
        }
      });

      // Special case for the very end of the page - always show connect
      const isAtBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        currentSection = "connect";
      }

      console.log("Current section:", currentSection); // Debug log
      setActiveSection(currentSection);
    };

    // Initial call to set correct section on load
    handleScroll();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY]);

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const projects: Project[] = [
    {
      id: "nexus",
      title: "Nexus Commerce",
      subtitle: "Next-gen e-commerce platform",
      description:
        "Built a headless commerce platform serving 50K+ users with real-time inventory, AI-powered recommendations, and sub-200ms response times. Reduced cart abandonment by 35%.",
      tech: ["Next.js 14", "tRPC", "Prisma", "PostgreSQL", "Stripe", "Redis"],
      github: "https://github.com/vishalkumar/nexus",
      live: "https://nexus-commerce.dev",
      status: "shipped",
      year: "2024",
      impact: "50K+ users",
    },
    {
      id: "quantum",
      title: "Quantum Dashboard",
      subtitle: "Real-time analytics engine",
      description:
        "Engineered a high-performance dashboard processing 1M+ events/day with WebSocket connections, custom visualization engine, and ML-powered anomaly detection.",
      tech: [
        "React",
        "D3.js",
        "Node.js",
        "ClickHouse",
        "WebSocket",
        "TensorFlow.js",
      ],
      github: "https://github.com/vishalkumar/quantum",
      live: "https://quantum.vishalkumar.dev",
      status: "shipped",
      year: "2024",
      impact: "1M+ events/day",
    },
    {
      id: "flux",
      title: "Flux Collab",
      subtitle: "Team productivity suite",
      description:
        "Developing a real-time collaboration platform with custom CRDT implementation, end-to-end encryption, and offline-first architecture.",
      tech: ["SvelteKit", "Rust", "WebAssembly", "CRDTs", "WebRTC"],
      github: "https://github.com/vishalkumar/flux",
      status: "building",
      year: "2024",
      impact: "Beta: 500+ teams",
    },
    {
      id: "neural",
      title: "Neural Search",
      subtitle: "AI-powered search engine",
      description:
        "Experimenting with vector embeddings and semantic search. Building a search engine that understands context and intent beyond keywords.",
      tech: ["Python", "FastAPI", "Qdrant", "Transformers", "FAISS"],
      status: "concept",
      year: "2024",
      impact: "Research phase",
    },
  ];

  const stats = [
    { label: "Years Coding", value: "4+", icon: Code2 },
    { label: "Projects Built", value: "20+", icon: Terminal },
    { label: "Technologies", value: "15+", icon: Cpu },
    { label: "Open Source", value: "5+", icon: Github },
  ];

  const workExperience = [
    {
      company: "Stealth Startup",
      role: "Founding Engineer",
      duration: "Aug 2024 - Present",
      location: "Remote",
      description:
        "Building core infrastructure and leading technical decisions for fintech platform. Architecting scalable systems handling high-frequency transactions.",
      achievements: [
        "Designed microservices architecture serving 10k+ concurrent users",
        "Implemented real-time transaction processing with 99.9% uptime",
        "Led technical interviews and onboarded 3 senior engineers",
      ],
      tech: ["Go", "PostgreSQL", "Redis", "Kubernetes", "AWS"],
    },
    {
      company: "IIT Indore Research Lab",
      role: "Research Associate",
      duration: "Jan 2024 - Jul 2024",
      location: "Indore, India",
      description:
        "Led research on machine learning applications in electrical systems optimization. Published findings in peer-reviewed conferences.",
      achievements: [
        "Developed ML models improving system efficiency by 23%",
        "Co-authored 2 research papers accepted at IEEE conferences",
        "Mentored 8 undergraduate students in research methodologies",
      ],
      tech: ["Python", "TensorFlow", "MATLAB", "Jupyter", "LaTeX"],
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-black text-white overflow-hidden relative"
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{ x: smoothMouse.x, y: smoothMouse.y }}
      >
        <motion.div
          className="w-full h-full bg-white rounded-full"
          variants={{
            default: { scale: 1, opacity: 0.6 },
            hover: { scale: 2, opacity: 0.8 },
            click: { scale: 0.8, opacity: 1 },
          }}
          animate={cursorVariant}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Grain Effect */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')] opacity-25" /> */}
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-6 lg:mx-8 mt-6 lg:mt-8">
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
            <div className="flex justify-between items-center">
              {/* Logo/Time Section */}
              <motion.div
                className="flex items-center gap-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-400 rounded-lg flex items-center justify-center">
                  <span className="text-black font-black text-sm">VK</span>
                </div>
                <div className="text-sm font-medium tracking-wider text-white">
                  {time.toLocaleTimeString("en-US", {
                    timeZone: "Asia/Kolkata",
                    hour12: false,
                  })}{" "}
                  IST
                </div>
              </motion.div>

              {/* Navigation Links */}
              <div className="hidden lg:flex items-center bg-white/5 rounded-full px-1 py-1">
                {[
                  { id: "work", label: "Work", index: "01" },
                  { id: "craft", label: "Craft", index: "02" },
                  { id: "connect", label: "Connect", index: "03" },
                ].map(({ id, label, index }) => (
                  <motion.button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`relative px-6 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${
                      activeSection === id
                        ? "text-black"
                        : "text-white hover:text-gray-300"
                    }`}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeSection === id && (
                      <motion.div
                        className="absolute inset-0 bg-white rounded-full"
                        layoutId="activeTab"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <span className="text-xs opacity-60">{index}</span>
                      {label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Status & Mobile Menu */}
              <div className="flex items-center gap-4">
                {/* Status Indicator */}
                <motion.div
                  className="hidden sm:flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1.5"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs font-medium text-green-400 uppercase tracking-wider">
                    Available
                  </span>
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button
                  className="lg:hidden w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div className="w-4 h-4 flex flex-col justify-center gap-1">
                    <div className="w-full h-0.5 bg-white rounded"></div>
                    <div className="w-full h-0.5 bg-white rounded"></div>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <motion.div
            className="lg:hidden mt-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              {[
                {
                  id: "work",
                  label: "Work",
                  index: "01",
                  desc: "Professional experience",
                },
                {
                  id: "craft",
                  label: "Craft",
                  index: "02",
                  desc: "Selected projects",
                },
                {
                  id: "connect",
                  label: "Connect",
                  index: "03",
                  desc: "Get in touch",
                },
              ].map(({ id, label, index, desc }) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs text-gray-400">{index}</span>
                      <span className="font-medium text-white">{label}</span>
                    </div>
                    <p className="text-sm text-gray-400">{desc}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center px-6 lg:px-8 relative"
      >
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8">
              <motion.span
                className="text-sm uppercase tracking-widest text-gray-400 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Vishal Kumar — Software Engineer
              </motion.span>
            </div>

            <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black leading-none mb-8">
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Building
              </motion.span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Tomorrow&apos;s
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Web
              </motion.span>
            </h1>

            <motion.div
              className="max-w-2xl mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-light">
                Full-stack engineer crafting high-performance applications with
                modern technologies. Currently at IIT Indore, building
                experiences that matter.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-8 mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {stats.map(({ label, value, icon: Icon }, index) => (
                <motion.div
                  key={label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-2xl font-bold">{value}</span>
                  </div>
                  <p className="text-sm text-gray-400 uppercase tracking-wide font-medium">
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400"
          >
            <ArrowUpRight className="w-6 h-6 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Work Experience */}
      <section id="work" className="py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center mb-16">
              <span className="text-sm uppercase tracking-widest text-gray-400 font-medium mr-8">
                Experience
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
            </div>

            <div className="space-y-24">
              {workExperience.map((job, index) => (
                <motion.div
                  key={job.company}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                      <h3 className="text-2xl font-bold mb-2">{job.role}</h3>
                      <p className="text-xl text-gray-300 mb-2">
                        {job.company}
                      </p>
                      <p className="text-gray-400 mb-1">{job.duration}</p>
                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>

                    <div className="lg:col-span-2">
                      <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {job.achievements.map((achievement, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i }}
                          >
                            <div className="w-1.5 h-1.5 bg-white rounded-full mt-3 flex-shrink-0" />
                            <p className="text-gray-300">{achievement}</p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {job.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="craft"
        className="py-32 px-6 lg:px-8 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-16">
              <span className="text-sm uppercase tracking-widest text-gray-400 font-medium mr-8">
                Selected Work
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
            </div>

            <div className="grid gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <div className="p-8 lg:p-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-2xl lg:text-3xl font-bold">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                project.status === "shipped"
                                  ? "bg-green-400"
                                  : project.status === "building"
                                  ? "bg-yellow-400"
                                  : "bg-blue-400"
                              }`}
                            />
                            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                              {project.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-400 mb-4 font-medium">
                          {project.subtitle}
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-1 flex flex-col justify-between">
                        <div className="space-y-4 mb-8">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                              Year
                            </p>
                            <p className="font-medium">{project.year}</p>
                          </div>
                          {project.impact && (
                            <div>
                              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                                Impact
                              </p>
                              <p className="font-medium">{project.impact}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-4">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                            >
                              <Github className="w-4 h-4" />
                              <span className="text-sm font-medium">Code</span>
                              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                          )}
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span className="text-sm font-medium">Live</span>
                              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="connect" className="py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-16">
              <div className="flex-1 h-px bg-gradient-to-l from-gray-800 to-transparent" />
              <span className="text-sm uppercase tracking-widest text-gray-400 font-medium mx-8">
                Let&apos;s Connect
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
            </div>

            <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
              Ready to build something
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                extraordinary?
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              I&apos;m always excited about new opportunities and interesting
              projects. Let&apos;s discuss how we can work together.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <motion.a
                href="mailto:vishal.kumar@iiti.ac.in"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <Mail className="w-5 h-5" />
                Start a conversation
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              <motion.a
                href="https://cal.com/vishalkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white hover:border-white hover:bg-white/5 transition-all duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <Zap className="w-5 h-5" />
                Schedule a call
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>

            <div className="flex justify-center gap-8">
              {[
                {
                  href: "https://github.com/vishalkumar",
                  icon: Github,
                  label: "GitHub",
                },
                {
                  href: "https://linkedin.com/in/vishalkumar",
                  icon: Linkedin,
                  label: "LinkedIn",
                },
                {
                  href: "https://twitter.com/vishalkumar",
                  icon: Globe2,
                  label: "Twitter",
                },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Vishal Kumar. Crafted with
            obsessive attention to detail.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span>Built with Next.js, Framer Motion & TypeScript</span>
            <div className="w-1 h-1 bg-gray-600 rounded-full" />
            <span>Deployed on Vercel</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
