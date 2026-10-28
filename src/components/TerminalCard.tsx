import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Send, RefreshCw, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface TerminalCardProps {
  onNavigateToProjects: () => void;
  onNavigateToSkills: () => void;
  onOpenResume: () => void;
}

const INTRO_LINE_1 = `${PERSONAL_INFO.fullName} · 1st Year B.Tech CSE @ RBU, Nagpur`;
const INTRO_LINE_2 = `"${PERSONAL_INFO.coreTenet}"`;

export function TerminalCard({
  onNavigateToProjects,
  onNavigateToSkills,
  onOpenResume,
}: TerminalCardProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'interactive' | 'stack'>('profile');
  const [commandInput, setCommandInput] = useState('');
  const [typedIntro, setTypedIntro] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([
    {
      command: 'whoami',
      output: `${PERSONAL_INFO.fullName} · 1st Year B.Tech CSE at Ramdeobaba University (RBU), Nagpur.`,
    },
    {
      command: 'cat creed.txt',
      output: `"${PERSONAL_INFO.coreTenet}" — ${PERSONAL_INFO.subPhilosophy}`,
    },
  ]);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setTypedIntro(INTRO_LINE_1);
      setTypingDone(true);
      return;
    }

    let index = 0;
    setTypedIntro('');
    setTypingDone(false);

    const interval = window.setInterval(() => {
      index += 1;
      setTypedIntro(INTRO_LINE_1.slice(0, index));
      if (index >= INTRO_LINE_1.length) {
        window.clearInterval(interval);
        setTypingDone(true);
      }
    }, 22);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === 'interactive') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, activeTab]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    sounds.playMove();

    let output: string | React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        output = 'Available commands: whoami, projects, skills, contact, resume, clear, date';
        break;
      case 'whoami':
        output = `${PERSONAL_INFO.fullName} — ${PERSONAL_INFO.headline}`;
        break;
      case 'projects':
        output = (
          <div className="space-y-1">
            <p>1. Client Business &amp; PDF App (Shipped)</p>
            <p>2. Food Safety &amp; Quality Inspection App (In Progress)</p>
            <p>3. Logic Game Projects &amp; Arcade (Playable Live)</p>
            <button
              onClick={onNavigateToProjects}
              className="text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              Jump to Projects section ↘
            </button>
          </div>
        );
        break;
      case 'skills':
        output = 'C Programming, Python, AI-Assisted Prototyping & Debugging, Git/GitHub, Product Flow';
        break;
      case 'contact':
        output = `Primary: ${PERSONAL_INFO.email} | RBU: ${PERSONAL_INFO.secondaryEmail} | Phone: ${PERSONAL_INFO.phone}`;
        break;
      case 'resume':
        output = 'Opening official resume preview...';
        onOpenResume();
        break;
      case 'clear':
        setHistory([]);
        setCommandInput('');
        return;
      case 'date':
        output = new Date().toLocaleString();
        break;
      case 'coffee':
        output = 'Fueled by curiosity, daily code practice, and steady consistency.';
        break;
      default:
        output = `Command not recognized: "${cmd}". Type "help" for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setCommandInput('');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    sounds.playSuccess();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-700/80 dark:border-slate-800 bg-[#0d1322]/95 text-slate-100 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col card-glow hover:border-indigo-400/60">
      {/* Terminal Titlebar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/95">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/85" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/85" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/85" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 pl-1.5 truncate">
            harsh@rbu-station:~
          </span>
        </div>

        {/* Segmented Control Tabs */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-800/90 rounded-lg text-[11px] font-medium shrink-0">
          <button
            onClick={() => {
              setActiveTab('profile');
              sounds.playClick();
            }}
            className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => {
              setActiveTab('stack');
              sounds.playClick();
            }}
            className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'stack'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Toolkit
          </button>
          <button
            onClick={() => {
              setActiveTab('interactive');
              sounds.playClick();
            }}
            className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              activeTab === 'interactive'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TerminalIcon className="w-3 h-3" />
            <span>Shell</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed min-h-[290px] max-h-[340px] overflow-y-auto">
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>➜</span>
                <span className="text-sky-300">~</span>
                <span className="text-slate-200">whoami</span>
              </div>
              <p className="text-slate-100 font-medium pl-4 min-h-[1.5rem]">
                <span>{typedIntro}</span>
                {!typingDone && (
                  <span
                    className="inline-block w-2 h-3.5 bg-indigo-400 align-middle ml-1 animate-cursor-blink"
                    aria-hidden="true"
                  />
                )}
              </p>
            </div>

            <div className="pt-2.5 border-t border-slate-800/90 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>➜</span>
                <span className="text-sky-300">~</span>
                <span className="text-slate-200">cat creed.txt</span>
              </div>
              <div className="pl-4 space-y-1">
                <p className="text-amber-200/95 font-semibold">{INTRO_LINE_2}</p>
                <p className="text-slate-400 text-[11px] font-sans leading-relaxed">
                  {PERSONAL_INFO.subPhilosophy}
                </p>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-800/90 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-slate-400">Primary:</span>{' '}
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-indigo-300 font-medium hover:underline break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shrink-0 ${
                    copiedEmail
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
                <div className="truncate">
                  <span className="text-slate-500">Secondary:</span>{' '}
                  <a href={`mailto:${PERSONAL_INFO.secondaryEmail}`} className="hover:underline">
                    {PERSONAL_INFO.secondaryEmail}
                  </a>
                </div>
                <span className="inline-flex items-center gap-1 text-emerald-400 shrink-0">
                  <span>$</span>
                  <span
                    className="inline-block w-1.5 h-3.5 bg-emerald-400 animate-cursor-blink"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stack' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <span>➜</span>
              <span className="text-slate-200">ls ./capabilities</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/70">
                <span className="font-semibold text-white">Core Languages</span>
                <p className="text-slate-400 mt-1 text-[11px]">C Programming, Python (Learning)</p>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/70">
                <span className="font-semibold text-white">AI-Assisted Building</span>
                <p className="text-slate-400 mt-1 text-[11px]">Prototyping, Debugging, MVPs</p>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/70">
                <span className="font-semibold text-white">Workflow &amp; Version</span>
                <p className="text-slate-400 mt-1 text-[11px]">Git, GitHub, Client Scoping</p>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/70">
                <span className="font-semibold text-white">Active Curiosity</span>
                <p className="text-slate-400 mt-1 text-[11px]">3D Graphics, Games, Startups</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">Inspect full breakdown:</span>
              <button
                onClick={onNavigateToSkills}
                className="text-indigo-300 hover:underline font-semibold cursor-pointer"
              >
                View Toolkit ↗
              </button>
            </div>
          </div>
        )}

        {activeTab === 'interactive' && (
          <div className="space-y-2.5">
            <div className="text-slate-400 text-[11px]">
              Tap a quick command or type below:
            </div>

            <div className="flex flex-wrap gap-1.5 py-0.5">
              {['whoami', 'projects', 'skills', 'contact', 'resume', 'help'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="px-2 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 text-[11px] transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
                >
                  ${cmd}
                </button>
              ))}
              <button
                onClick={() => executeCommand('clear')}
                className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-2.5 h-2.5" /> clear
              </button>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-indigo-300">
                    <span className="text-emerald-400">➜</span>
                    <span className="font-semibold">{item.command}</span>
                  </div>
                  <div className="text-slate-300 pl-4 break-words">
                    {item.output}
                  </div>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (commandInput.trim()) {
                  executeCommand(commandInput);
                }
              }}
              className="flex items-center gap-2 pt-2 border-t border-slate-800"
            >
              <span className="text-emerald-400 shrink-0">➜</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="type command (help)..."
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-white placeholder:text-slate-500 text-xs font-mono"
              />
              {!commandInput && (
                <span
                  className="w-1.5 h-3.5 bg-indigo-400 animate-cursor-blink shrink-0"
                  aria-hidden="true"
                />
              )}
              <button
                type="submit"
                className="p-1.5 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
                aria-label="Run command"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
