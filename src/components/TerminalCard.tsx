import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, Send, RefreshCw, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface TerminalCardProps {
  onNavigateToProjects: () => void;
  onNavigateToSkills: () => void;
  onOpenAudition: () => void;
  onOpenResume: () => void;
}

export function TerminalCard({
  onNavigateToProjects,
  onNavigateToSkills,
  onOpenAudition,
  onOpenResume
}: TerminalCardProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'interactive' | 'stack'>('profile');
  const [commandInput, setCommandInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([
    {
      command: 'whoami',
      output: `${PERSONAL_INFO.fullName} · 1st Year B.Tech CSE at Ramdeobaba University (RBU), Nagpur.`
    },
    {
      command: 'cat philosophy.txt',
      output: `"${PERSONAL_INFO.coreTenet}" — ${PERSONAL_INFO.subPhilosophy}`
    }
  ]);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

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
        output = 'Available commands: whoami, projects, skills, contact, audition, resume, clear, date';
        break;
      case 'whoami':
        output = `${PERSONAL_INFO.fullName} — ${PERSONAL_INFO.headline}`;
        break;
      case 'projects':
        output = (
          <div className="space-y-1">
            <p>1. Client Business & PDF App (Delivered)</p>
            <p>2. Food Safety & Quality Inspection App (In Progress)</p>
            <p>3. Logic Game Projects & Arcade (Playable Live)</p>
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
        output = 'HTML5, CSS3, JavaScript, C Programming, Python, Git/GitHub, AI-Assisted Engineering';
        break;
      case 'contact':
        output = `Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone} | GitHub: ${PERSONAL_INFO.githubHandle}`;
        break;
      case 'audition':
        output = 'Opening Technical Club Audition Breakdown...';
        onOpenAudition();
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
      case 'easter-egg':
      case 'coffee':
        output = '☕ Fueled by curiosity, late night code sessions, and relentless consistency.';
        break;
      default:
        output = `Command not recognized: "${cmd}". Type "help" for a list of commands.`;
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
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/90 shadow-sm backdrop-blur-md overflow-hidden flex flex-col">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/60">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 pl-2">
            harsh@rbu-station:~
          </span>
        </div>

        {/* Segmented Control Tabs (Functional buttons with click handlers) */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-lg text-xs font-medium">
          <button
            onClick={() => {
              setActiveTab('profile');
              sounds.playClick();
            }}
            className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TerminalIcon className="w-3 h-3" />
            Shell
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 font-mono text-xs leading-relaxed min-h-[300px] max-h-[340px] overflow-y-auto">
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div>
              <span className="text-slate-400 dark:text-slate-500 font-medium"># Identity & Enrollment</span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                {PERSONAL_INFO.fullName}
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                1st Year B.Tech CSE · Ramdeobaba University (RBU)
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Nagpur, Maharashtra (440003)
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 dark:text-slate-500 font-medium"># Core Engineering Creed</span>
              <p className="text-slate-800 dark:text-slate-200 mt-1 italic font-sans font-medium text-sm">
                "{PERSONAL_INFO.coreTenet}"
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-sans mt-1">
                {PERSONAL_INFO.subPhilosophy}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 dark:text-slate-500">Contact:</span>{' '}
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">{PERSONAL_INFO.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-500" /> : <Sparkles className="w-3 h-3" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'stack' && (
          <div className="space-y-3">
            <span className="text-slate-400 dark:text-slate-500 font-medium"># Current Development Toolkit</span>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Frontend Web</span>
                <p className="text-slate-500 dark:text-slate-400 mt-1">HTML5, CSS3 (Grid/Flex), Vanilla JS</p>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Foundational Langs</span>
                <p className="text-slate-500 dark:text-slate-400 mt-1">C (Pointers & Logic), Python</p>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Toolchain</span>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Git, GitHub, AI-Assisted Debugging</p>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                <span className="font-semibold text-slate-900 dark:text-slate-100">Special Interests</span>
                <p className="text-slate-500 dark:text-slate-400 mt-1">3D Graphics, Mini-Games, Startups</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500">Curious to see projects in action?</span>
              <button
                onClick={onNavigateToSkills}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
              >
                View Skill Matrix ↗
              </button>
            </div>
          </div>
        )}

        {activeTab === 'interactive' && (
          <div className="space-y-2.5">
            <div className="text-slate-400 dark:text-slate-500">
              Interactive Terminal Session. Try clicking quick commands or typing below:
            </div>

            {/* Quick Command Buttons */}
            <div className="flex flex-wrap gap-1.5 py-1">
              {['whoami', 'projects', 'skills', 'contact', 'audition', 'help'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] transition-colors cursor-pointer"
                >
                  ${cmd}
                </button>
              ))}
              <button
                onClick={() => executeCommand('clear')}
                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-2.5 h-2.5" /> clear
              </button>
            </div>

            {/* Command History */}
            <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                    <span>➜</span>
                    <span className="font-semibold">{item.command}</span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 pl-4">
                    {item.output}
                  </div>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Prompt input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (commandInput.trim()) {
                  executeCommand(commandInput);
                }
              }}
              className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800"
            >
              <span className="text-indigo-500">➜</span>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="type a command (e.g. whoami, help)..."
                className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-xs font-mono"
              />
              <button
                type="submit"
                className="p-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer"
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
