import React, { useState } from 'react';
import { Code, Github, Linkedin, Mail, X, Star, Zap, Trophy } from 'lucide-react';

export function DeveloperInfo() {
  const [showInfo, setShowInfo] = useState(false);

  const techStack = [
    { name: 'React.js', color: 'from-blue-400 to-blue-600' },
    { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
    { name: 'Supabase', color: 'from-green-400 to-green-600' },
    { name: 'Tailwind CSS', color: 'from-cyan-400 to-cyan-600' },
    { name: 'Vite', color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <>
      <button
        onClick={() => setShowInfo(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40 group"
        title="About Developer"
      >
        <Code className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      {showInfo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">About This Project</h2>
                </div>
                <button
                  onClick={() => setShowInfo(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Code className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Masthi Tasks Manager</h3>
                  <p className="text-white/70">A modern, full-stack task management application</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                    Tech Stack Used
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {techStack.map((tech, index) => (
                      <div
                        key={index}
                        className={`bg-gradient-to-r ${tech.color} p-3 rounded-xl text-white text-sm font-medium text-center shadow-lg`}
                      >
                        {tech.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Key Features
                  </h4>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      User Authentication & Security
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Real-time Task Management
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Advanced Filtering & Search
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Responsive Design
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      Modern UI/UX
                    </li>
                  </ul>
                </div>

                <div className="text-center">
                  <p className="text-white/60 text-sm mb-4">
                    Built with passion for productivity and clean code
                  </p>
                  <div className="flex justify-center space-x-4">
                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                      <Github className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                      <Linkedin className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                      <Mail className="w-5 h-5 text-white/70" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}