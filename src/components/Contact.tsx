import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { SpotlightCard } from "./SpotlightCard";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(profileData.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-10 text-left"
      >
        <div className="flex items-center gap-2 text-xs font-mono-code text-indigo-400">
          <Mail className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">// DIRECT INQUIRIES & COLLABORATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display text-white tracking-tight">
          Let’s Connect & Build
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Open to full-time roles, internships, and research collaborations across Data Analytics, Applied Machine Learning, and Intelligent Data Products.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left"
      >
        {/* Left Side: Primary Contact Card (7 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.14)"
            onMouseEnter={() => soundManager.playHover()}
            className="p-7 sm:p-8 bg-zinc-950/80 border-zinc-850 shadow-xl space-y-6 flex flex-col justify-between h-full"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-code">
                <span className="text-indigo-400 font-bold uppercase tracking-wider">
                  PRIMARY COMMUNICATION CHANNEL
                </span>
                <span className="text-emerald-400">
                  Response within 24h
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-serif-display text-white">
                  Send an email directly
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-normal leading-relaxed">
                  No automated forms or hidden gateways. Email is delivered directly to my personal inbox.
                </p>
              </div>

              {/* Email Address Display Box */}
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono-code text-zinc-400 uppercase">
                      Direct Email
                    </span>
                    <p className="text-sm font-mono-code font-bold text-zinc-100">
                      {profileData.links.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-mono-code transition-all"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${profileData.links.email}`}
                    onClick={() => soundManager.playClick()}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition-all shadow-sm font-sans"
                  >
                    <span>Compose</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Geographical & Availability Footer */}
            <div className="pt-4 border-t border-zinc-850 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-zinc-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Navi Mumbai, Maharashtra, India</span>
              </div>
              <span className="text-emerald-400">
                Available: Full-time / Internships
              </span>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Right Side: Professional Profiles & Resume (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* GitHub Card */}
          <motion.div variants={itemVariants}>
            <a
              href={profileData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="block"
            >
              <SpotlightCard
                spotlightColor="rgba(255, 255, 255, 0.08)"
                className="p-5 bg-zinc-950/80 border-zinc-850 hover:border-zinc-700 transition-colors group flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors font-sans">
                      GitHub Profile
                    </h4>
                    <p className="text-xs font-mono-code text-zinc-400">
                      @pratish104 · Repositories & source code
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </SpotlightCard>
            </a>
          </motion.div>

          {/* LinkedIn Card */}
          <motion.div variants={itemVariants}>
            <a
              href={profileData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="block"
            >
              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.1)"
                className="p-5 bg-zinc-950/80 border-zinc-850 hover:border-blue-500/40 transition-colors group flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-950/50 border border-blue-500/30 text-blue-400 group-hover:scale-105 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-100 group-hover:text-blue-300 transition-colors font-sans">
                      LinkedIn Network
                    </h4>
                    <p className="text-xs font-mono-code text-zinc-400">
                      Vishwadeep Pratap · Professional profile
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
              </SpotlightCard>
            </a>
          </motion.div>

          {/* Resume PDF Card */}
          <motion.div variants={itemVariants}>
            <a
              href={profileData.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="block"
            >
              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.1)"
                className="p-5 bg-zinc-950/80 border-zinc-850 hover:border-emerald-500/40 transition-colors group flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 transition-all">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors font-sans">
                      Curriculum Vitae (PDF)
                    </h4>
                    <p className="text-xs font-mono-code text-zinc-400">
                      Verified resume document
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </SpotlightCard>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
