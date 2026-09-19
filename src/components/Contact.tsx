import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

export function Contact() {
  const { theme } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const isDark = theme !== "light";

  const handleCopyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(profileData.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const headingColor = isDark ? "text-white" : "text-gray-900";
  const bodyColor = isDark ? "text-zinc-400" : "text-gray-500";
  const cardBg = isDark ? "bg-[var(--bg-surface)]/80 border-[var(--border-subtle)]" : "bg-white border-gray-200";
  const innerCard = isDark ? "bg-[var(--bg-elevated)]/40 border-[var(--border-subtle)]" : "bg-gray-50 border-gray-200";
  const labelColor = isDark ? "text-zinc-400" : "text-gray-400";
  const primaryEmailColor = isDark ? "text-zinc-100" : "text-gray-900";
  const secondaryCardHover = isDark ? "hover:border-[var(--border-mid)]" : "hover:border-gray-300";
  const sectionAccent = isDark ? "text-indigo-400" : "text-blue-500";
  const btnCopy = isDark ? "bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] text-zinc-200" : "bg-gray-100 hover:bg-gray-200 text-gray-700";
  const btnCompose = isDark ? "bg-zinc-100 hover:bg-white text-zinc-950" : "bg-gray-900 hover:bg-gray-800 text-white";
  const iconBg = isDark ? "bg-indigo-950/60 border-indigo-500/30 text-indigo-400" : "bg-blue-50 border-blue-200 text-blue-500";
  const profileCard = isDark
    ? "bg-[var(--bg-surface)]/80 border-[var(--border-subtle)] hover:border-[var(--border-mid)] text-zinc-100"
    : "bg-white border-gray-200 hover:border-gray-300 text-gray-900";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-10 text-left"
      >
        <div className={`flex items-center gap-2 text-xs font-mono-code ${sectionAccent}`}>
          <Mail className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">// DIRECT INQUIRIES & COLLABORATION</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif-display tracking-tight ${headingColor}`}>
          Let's Connect & Build
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl font-normal leading-relaxed ${bodyColor}`}>
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
        {/* Primary email card */}
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <div className={`p-7 sm:p-8 rounded-2xl border shadow-xl space-y-6 flex flex-col justify-between h-full ${cardBg}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-code">
                <span className={`font-bold uppercase tracking-wider ${sectionAccent}`}>
                  PRIMARY COMMUNICATION CHANNEL
                </span>
                <span className="text-emerald-500">Response within 24h</span>
              </div>
              <div>
                <h3 className={`text-xl sm:text-2xl font-serif-display ${headingColor}`}>
                  Send an email directly
                </h3>
                <p className={`text-xs sm:text-sm mt-1 font-normal leading-relaxed ${bodyColor}`}>
                  No automated forms or hidden gateways. Email delivered directly to my personal inbox.
                </p>
              </div>
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${innerCard}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border shrink-0 ${iconBg}`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`text-xs font-mono-code uppercase ${labelColor}`}>Direct Email</span>
                    <p className={`text-sm font-mono-code font-bold ${primaryEmailColor}`}>
                      {profileData.links.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono-code transition-all ${btnCopy}`}
                  >
                    {copiedEmail ? (
                      <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied</span></>
                    ) : (
                      <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>
                    )}
                  </button>
                  <a
                    href={`mailto:${profileData.links.email}`}
                    onClick={() => soundManager.playClick()}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium text-xs transition-all shadow-sm ${btnCompose}`}
                  >
                    <span>Compose</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
            <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code ${isDark ? "border-[var(--border-subtle)]" : "border-gray-100"}`}>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span className={labelColor}>Navi Mumbai, Maharashtra, India</span>
              </div>
              <span className="text-emerald-500">Available: Full-time / Internships</span>
            </div>
          </div>
        </motion.div>

        {/* Profile links */}
        <div className="lg:col-span-5 space-y-4">
          {[
            {
              href: profileData.links.github,
              Icon: Github,
              title: "GitHub Profile",
              sub: "@pratish104 · Repositories & source code",
              hover: isDark ? "hover:border-zinc-600" : "hover:border-gray-300",
              iconBg: isDark ? "bg-zinc-900 border-zinc-800 text-zinc-300 group-hover:text-white" : "bg-gray-100 border-gray-200 text-gray-500 group-hover:text-gray-800",
            },
            {
              href: profileData.links.linkedin,
              Icon: Linkedin,
              title: "LinkedIn Network",
              sub: "Vishwadeep Pratap · Professional profile",
              hover: "hover:border-blue-400/40",
              iconBg: isDark ? "bg-blue-950/50 border-blue-500/30 text-blue-400" : "bg-blue-50 border-blue-200 text-blue-500",
            },
            {
              href: profileData.links.resume,
              Icon: FileText,
              title: "Curriculum Vitae (PDF)",
              sub: "Verified resume document",
              hover: "hover:border-emerald-400/40",
              iconBg: isDark ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-500",
            },
          ].map(({ href, Icon, title, sub, hover, iconBg: iBg }, i) => (
            <motion.div key={i} variants={itemVariants}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="block"
              >
                <div className={`p-5 rounded-2xl border transition-colors group flex items-center justify-between ${profileCard} ${hover}`}>
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl border group-hover:scale-105 transition-all ${iBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold transition-colors ${headingColor}`}>{title}</h4>
                      <p className={`text-xs font-mono-code ${labelColor}`}>{sub}</p>
                    </div>
                  </div>
                  <ArrowUpRight className={`w-4 h-4 transition-colors ${labelColor} group-hover:${isDark ? "text-white" : "text-gray-800"}`} />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
