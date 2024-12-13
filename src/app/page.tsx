"use client";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import "tailwindcss/tailwind.css";

export default function Home() {
  return (
    <div className="font-sans snap-y snap-mandatory h-screen overflow-y-scroll relative">
      {/* Custom Scrollbar */}
      <style>
        {`
          ::-webkit-scrollbar {
            width: 12px;
          }
          ::-webkit-scrollbar-track {
            background: #1f2937;
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #06b6d4);
            border-radius: 6px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #2563eb, #0891b2);
          }
        `}
      </style>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-2 h-screen bg-gray-800">
        <motion.div
          className="bg-gradient-to-b from-blue-500 to-teal-400 w-full"
          style={{ scaleY: 0 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        ></motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen snap-start bg-gradient-to-r from-gray-800 via-gray-700 to-black flex items-center justify-center text-white">
        <motion.div
          className="absolute inset-0 bg-hero-pattern bg-cover bg-center blur-lg"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hi, I’m a Software Developer
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Crafting seamless digital experiences with cutting-edge technology.
          </motion.p>
          <motion.button
            className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            View My Projects
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <InView triggerOnce>
        {({ inView, ref }) => (
          <motion.section
            ref={ref}
            className="relative min-h-screen snap-start bg-gray-100 p-8 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-800">About Me</h2>
              <p className="mt-4 text-gray-600 text-lg">
                Passionate about designing and developing scalable software solutions that create real-world impact.
              </p>
            </div>
          </motion.section>
        )}
      </InView>

      {/* Skills Section */}
      <section className="relative min-h-screen snap-start bg-gray-900 text-gray-200 py-12 flex flex-col items-center overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-semibold text-blue-400 mb-6">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "JavaScript",
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Tailwind CSS",
              "Framer Motion",
              "MongoDB",
            ].map((skill, index) => (
              <motion.div
                key={skill}
                className="p-4 bg-gray-800 text-center rounded-md shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <InView triggerOnce>
        {({ inView, ref }) => (
          <motion.section
            ref={ref}
            className="relative min-h-screen snap-start bg-gray-100 p-8 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="relative z-10">
              <h2 className="text-4xl font-semibold text-gray-800">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {[1, 2, 3, 4].map((project) => (
                  <motion.div
                    key={project}
                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Project {project}</h3>
                    <p className="text-gray-600 text-sm">
                      A brief description of the project with key features and impact.
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </InView>

      {/* Contact Section */}
      <section className="relative min-h-screen snap-start bg-gradient-to-b from-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-blue-400">Get in Touch</h2>
          <p className="mt-4 text-gray-400">I&apos;d love to hear from you! Let&apos;s connect.</p>
          <motion.a
            href="mailto:youremail@example.com"
            className="mt-6 inline-block px-8 py-3 bg-blue-600 rounded-md text-white font-semibold shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            Contact Me
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}
