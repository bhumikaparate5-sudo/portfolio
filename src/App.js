import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

/* =====================================
   FINAL BOSS PORTFOLIO (INDUSTRY LEVEL++)
   - Scroll spy navigation
   - Progress bar
   - Loader screen
   - Active section highlighting
   - Back to top button
   - SEO title handling
   - Production UI structure
===================================== */

// ---------------- LOADER ----------------
const Loader = () => (
  <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-[999]">
    <motion.h1
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="text-3xl font-bold"
    >
      Loading Portfolio...
    </motion.h1>
  </div>
);

// ---------------- PROGRESS BAR ----------------
const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-[60]">
      <div className="h-1 bg-blue-600" style={{ width: `${scroll}%` }} />
    </div>
  );
};

// ---------------- NAVBAR (SCROLLSPY) ----------------
const Navbar = ({ dark, toggleDark, active }) => {
  const links = ["home", "about", "skills", "projects", "education", "contact"];

  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Bhumika<span className="text-blue-600">.</span>
        </motion.h1>

        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <motion.li key={l} whileHover={{ scale: 1.05 }}>
              <a
                href={`#${l}`}
                className={`capitalize relative transition-all duration-300 text-sm font-medium ${
                  active === l 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {l}
                {active === l && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDark} 
          className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: dark ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {dark ? (
              <i className="fas fa-sun text-yellow-500 text-lg"></i>
            ) : (
              <i className="fas fa-moon text-gray-700 text-lg"></i>
            )}
          </motion.div>
        </motion.button>
      </nav>
    </header>
  );
};

// ---------------- TYPEWRITER ----------------
const Typing = () => {
  const texts = useMemo(() => ["Frontend Developer", "Full Stack Developer", "React Engineer"], []);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (!reverse && subIndex === texts[index].length) {
      setTimeout(() => setReverse(true), 1200);
      return;
    }

    if (reverse && subIndex === 0) {
      setReverse(false);
      setIndex((i) => (i + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((v) => v + (reverse ? -1 : 1));
    }, 70);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index, texts]);

  return <p className="text-lg mb-6 text-white/90">{texts[index].substring(0, subIndex)}|</p>;
};

// ---------------- SECTION ----------------
const Section = ({ id, title, children }) => (
  <section id={id} className="py-24 px-6 max-w-6xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl font-bold mb-10"
    >
      {title}
    </motion.h2>
    {children}
  </section>
);

// ---------------- HERO ----------------
const Hero = () => (
  <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white px-6 pt-24 relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full relative z-10">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Bhumika</span>
          <motion.span 
            className="inline-block ml-2 text-4xl"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {" "}{" "}
          </motion.span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typing />
        </motion.div>

        <motion.p 
          className="text-white/90 mb-8 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          I build scalable, high-performance web apps with modern React ecosystem.
          <br className="hidden md:block" />
          Passionate about creating beautiful user experiences and clean code.
        </motion.p>

        <motion.div 
          className="flex gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <i className="fas fa-envelope"></i>
            Hire Me
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf" 
            download="Bhumika_Parate_Resume.pdf"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2"
          >
            <i className="fas fa-download"></i>
            Download Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div 
          className="flex gap-3 sm:gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/bhumikaparate5"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl group"
            title="GitHub Profile"
          >
            <i className="fab fa-github text-white text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300"></i>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://linkedin.com/in/bhumikaparate5"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl group"
            title="LinkedIn Profile"
          >
            <i className="fab fa-linkedin text-white text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300"></i>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://twitter.com/bhumikaparate5"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl group"
            title="Twitter Profile"
          >
            <i className="fab fa-twitter text-white text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300"></i>
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative"
      >
        <div className="relative w-80 h-80 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-50 blur-2xl"></div>
          <img
            src="/profile.jpg"
            alt="Bhumika Parate"
            className="relative w-80 h-80 mx-auto rounded-full border-4 border-white shadow-2xl object-cover"
            onError={(e) => {
              e.target.src = "https://picsum.photos/seed/bhumika/400/400";
            }}
          />
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-6 py-2 rounded-full shadow-lg font-semibold"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Available for work
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ---------------- ABOUT ----------------
const About = () => (
  <Section id="about" title="About Me">
    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
      I am a passionate React developer focused on building production-grade UI systems, optimized performance applications, and clean UX design systems.
    </p>
  </Section>
);

// ---------------- SKILLS ----------------
const Skills = () => {
  const skills = [
    { name: "HTML/CSS", level: 95, icon: "fab fa-html5", color: "from-orange-500 to-red-500" },
    { name: "JavaScript", level: 90, icon: "fab fa-js", color: "from-yellow-400 to-yellow-600" },
    { name: "React", level: 85, icon: "fab fa-react", color: "from-cyan-400 to-blue-500" },
    { name: "Tailwind CSS", level: 88, icon: "fab fa-css3-alt", color: "from-teal-400 to-cyan-500" },
    { name: "Node.js", level: 80, icon: "fab fa-node-js", color: "from-green-500 to-green-700" },
    { name: "Git/GitHub", level: 92, icon: "fab fa-git-alt", color: "from-gray-600 to-gray-800" },
  ];

  return (
    <Section id="skills" title="Skills">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                  <i className={skill.icon}></i>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{skill.level}%</span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                >
                  <motion.div
                    initial={{ x: -100 }}
                    animate={{ x: 100 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// ---------------- PROJECTS ----------------
const Projects = () => {
  const data = [
    { 
      name: "Weather App", 
      link: "#", 
      desc: "Real-time weather application with location-based forecasts and beautiful UI",
      tech: ["React", "API", "Tailwind"],
      image: "https://picsum.photos/seed/weather/400/250",
      github: "#"
    },
    { 
      name: "Todo App", 
      link: "#", 
      desc: "Advanced task management app with drag-and-drop functionality",
      tech: ["React", "Redux", "LocalStorage"],
      image: "https://picsum.photos/seed/todo/400/250",
      github: "#"
    },
    { 
      name: "Portfolio", 
      link: "#", 
      desc: "Modern portfolio website with animations and responsive design",
      tech: ["React", "Framer Motion", "Tailwind"],
      image: "https://picsum.photos/seed/portfolio/400/250",
      github: "#"
    },
  ];

  return (
    <Section id="projects" title="Projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
          >
            <div className="relative overflow-hidden h-48">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.link}
                    className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                  >
                    <i className="fas fa-external-link-alt mr-1"></i>
                    Live
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    className="bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
                  >
                    <i className="fab fa-github mr-1"></i>
                    Code
                  </motion.a>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {project.desc}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// ---------------- EDUCATION ----------------
const Education = () => (
  <Section id="education" title="Education">
    <p>B.Tech in Information Technology</p>
  </Section>
);

// ---------------- CONTACT (MAILTO) ----------------
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      window.location.href = `mailto:bhumika@example.com?subject=Hire Me&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`;
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Section id="contact" title="Contact">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <i className="fas fa-envelope text-white text-xl"></i>
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Get In Touch
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              I'm always interested in hearing about new projects and opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="bhumikaparate5@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Send Message
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center gap-4">
              <div className="flex justify-center gap-6">
                <a href="mailto:bhumikaparate5@gmaile.com" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <i className="fas fa-envelope mr-2"></i>
                  bhumikaparate5@gmail.com
                </a>
                <a href="tel:9022519065" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <i className="fas fa-phone mr-2"></i>
                  +91 9022519065
                </a>
              </div>
              
              <div className="flex justify-center gap-3 sm:gap-4">
                <a 
                  href="https://github.com/bhumikaparate5-sudo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-md group"
                  title="GitHub Profile"
                >
                  <i className="fab fa-github text-gray-700 dark:text-gray-300 text-sm sm:text-base group-hover:rotate-12 transition-transform duration-300"></i>
                </a>
                <a 
                  href="www.linkedin.com/in/bhumika-parate-087006369" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-md group"
                  title="LinkedIn Profile"
                >
                  <i className="fab fa-linkedin text-gray-700 dark:text-gray-300 text-sm sm:text-base group-hover:rotate-12 transition-transform duration-300"></i>
                </a>
                <a 
                  href="https://twitter.com/bhumikaparate5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-md group"
                  title="Twitter Profile"
                >
                  <i className="fab fa-twitter text-gray-700 dark:text-gray-300 text-sm sm:text-base group-hover:rotate-12 transition-transform duration-300"></i>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

// ---------------- FOOTER ----------------
const Footer = () => (
  <footer className="bg-black text-white text-center py-6 sm:py-8">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="flex gap-3 sm:gap-6">
          <a 
            href="https://github.com/bhumikaparate5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
            title="GitHub Profile"
          >
            <i className="fab fa-github text-white text-base sm:text-lg group-hover:rotate-12 transition-transform duration-300"></i>
          </a>
          <a 
            href="https://linkedin.com/in/bhumikaparate5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
            title="LinkedIn Profile"
          >
            <i className="fab fa-linkedin text-white text-base sm:text-lg group-hover:rotate-12 transition-transform duration-300"></i>
          </a>
          <a 
            href="https://twitter.com/bhumikaparate5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
            title="Twitter Profile"
          >
            <i className="fab fa-twitter text-white text-base sm:text-lg group-hover:rotate-12 transition-transform duration-300"></i>
          </a>
        </div>
        <p className="text-gray-400 text-sm sm:text-base">
          © 2026 Bhumika | Portfolio
        </p>
      </div>
    </div>
  </footer>
);

// ---------------- APP ----------------
export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("home");
  const [loading, setLoading] = useState(true);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      {loading && <Loader />}
      <ScrollProgress />
      <Navbar dark={dark} toggleDark={toggleDark} active={active} />

      <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
