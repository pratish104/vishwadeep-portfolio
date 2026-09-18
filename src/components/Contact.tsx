import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { SpotlightCard } from "./SpotlightCard";

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(profileData.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    soundManager.playSuccess();
    setSent(true);
    setTimeout(() => {
      setMessage("");
      setSent(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-3 mb-14 text-center sm:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>// GET IN TOUCH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Let’s Build Something Impactful
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          I am always open to discussing new engineering opportunities, research collaborations, or technical challenges.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 lg:grid-cols-5 gap-6"
      >
        {/* Left Side: Contact Channels (3 columns) */}
        <div className="lg:col-span-3 space-y-3.5">
          {/* Email Card */}
          <motion.div variants={itemVariants}>
            <SpotlightCard
              spotlightColor="rgba(0, 229, 255, 0.15)"
              onMouseEnter={() => soundManager.playHover()}
              className="p-5 sm:p-6 flex items-center justify-between gap-4 group hover:border-zinc-700"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 text-cyan-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    Direct Email
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-zinc-100 font-mono">
                    {profileData.links.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition-all flex items-center gap-1.5 text-xs font-mono shadow-sm"
                title="Copy Email Address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </SpotlightCard>
          </motion.div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* LinkedIn */}
            <motion.div variants={itemVariants}>
              <a
                href={profileData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="block h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(59, 130, 246, 0.16)"
                  className="p-5 h-full flex items-center justify-between group hover:border-blue-500/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-400 group-hover:scale-105 transition-transform">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        Network
                      </span>
                      <p className="text-xs font-semibold text-zinc-200">
                        LinkedIn Profile
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </SpotlightCard>
              </a>
            </motion.div>

            {/* GitHub */}
            <motion.div variants={itemVariants}>
              <a
                href={profileData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="block h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(255, 255, 255, 0.12)"
                  className="p-5 h-full flex items-center justify-between group hover:border-zinc-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 group-hover:scale-105 transition-transform">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        Code Vault
                      </span>
                      <p className="text-xs font-semibold text-zinc-200">
                        GitHub Repositories
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </SpotlightCard>
              </a>
            </motion.div>
          </div>

          {/* Resume Download Tile */}
          <motion.div variants={itemVariants}>
            <a
              href={profileData.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className="block"
            >
              <SpotlightCard
                spotlightColor="rgba(245, 158, 11, 0.16)"
                className="p-5 bg-gradient-to-r from-zinc-900/60 to-zinc-950 flex items-center justify-between group hover:border-amber-500/40"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 group-hover:scale-105 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      Official Verified PDF
                    </span>
                    <p className="text-xs font-semibold text-zinc-200">
                      Download Official Resume
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </SpotlightCard>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Message Form (2 columns) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SpotlightCard
            spotlightColor="rgba(0, 229, 255, 0.12)"
            className="p-6 h-full flex flex-col justify-between space-y-4"
          >
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col h-full justify-between">
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-400 font-semibold uppercase">
                  Direct Dispatch
                </span>
                <p className="text-xs text-zinc-500">
                  Send a message, collaboration inquiry, or opportunity:
                </p>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={4}
                className="w-full p-3.5 rounded-2xl bg-zinc-950/90 border border-zinc-800 focus:border-cyan-400 focus:outline-none text-xs font-mono text-zinc-200 resize-none transition-colors"
              />

              <button
                type="submit"
                onMouseEnter={() => soundManager.playHover()}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-medium transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {sent ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-emerald-800">Transmitted Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
