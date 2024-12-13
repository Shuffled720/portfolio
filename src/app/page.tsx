"use client";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import "tailwindcss/tailwind.css";

export default function Home() {
  const animationVariants = {
    visible: { opacity: 1, y: 0, scale: 1 },
    hidden: { opacity: 0, y: 50, scale: 0.9 },
  };

  const alternateAnimationVariants = {
    visible: { opacity: 1, x: 0, rotate: 0 },
    hidden: { opacity: 0, x: -100, rotate: -10 },
  };

  return (
    <div className="font-sans snap-y snap-mandatory h-screen overflow-y-scroll relative">
      {/* Custom Scrollbar */}
      <style>
        {`
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #f4f4f4;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-1 h-screen bg-gray-300">
        <motion.div
          className="bg-gray-600 w-full"
          style={{ scaleY: 0 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        ></motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen snap-start bg-white flex items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-400 animate-pulse"
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
        ></motion.div>
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-700"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            Welcome to My Portfolio
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Minimalistic and Professional Design.
          </motion.p>
          <motion.button
            className="mt-8 px-6 py-3 bg-gray-700 text-white font-semibold rounded-md shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.2 }}
          >
            Explore My Work
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <InView triggerOnce>
        {({ inView, ref }) => (
          <motion.section
            ref={ref}
            className="relative min-h-screen snap-start bg-gray-100 p-8 flex items-center justify-center overflow-hidden"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={alternateAnimationVariants}
            transition={{ duration: 1.5 }}
          >
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-700">About Me</h2>
              <p className="mt-4 text-gray-600 text-lg">
                Passionate about designing and developing scalable solutions for impactful results.
              </p>
            </div>
          </motion.section>
        )}
      </InView>

      {/* Skills Section */}
      <section className="relative min-h-screen snap-start bg-gray-200 text-gray-700 py-12 flex flex-col items-center overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-semibold mb-6">Skills</h2>
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
                className="p-4 bg-white text-center rounded-md shadow-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={animationVariants}
                transition={{ duration: 0.8, delay: index * 0.3 }}
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
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={alternateAnimationVariants}
            transition={{ duration: 1.5 }}
          >
            <div className="relative z-10">
              <h2 className="text-4xl font-semibold text-gray-700">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {[1, 2, 3, 4].map((project) => (
                  <motion.div
                    key={project}
                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-700">Project {project}</h3>
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
      <section className="relative min-h-screen snap-start bg-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-semibold">Get in Touch</h2>
          <p className="mt-4 text-gray-400">I&apos;d love to hear from you! Let&apos;s connect.</p>
          <motion.a
            href="mailto:youremail@example.com"
            className="mt-6 inline-block px-8 py-3 bg-gray-600 rounded-md text-white font-semibold shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.2 }}
          >
            Contact Me
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-700 text-gray-400 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}
