import { useState } from 'react';
import { X, Check, Palette } from 'lucide-react';
import { useThemeStore, THEMES } from '../store/useThemeStore';
import toast from 'react-hot-toast';

function ThemeSettings({ isOpen, onClose }) {
    const { currentTheme, setTheme } = useThemeStore();

    const handleThemeSelect = (themeId) => {
        setTheme(themeId);
        toast.success(`Theme changed to ${THEMES.find(t => t.id === themeId)?.name}!`, {
            icon: '🎨',
            duration: 2000,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl shadow-cyan-500/10 animate-fade-in-scale overflow-hidden">

                {/* Header */}
                <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-md border-b border-slate-700/50 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-cyan-500/20 rounded-lg">
                                <Palette className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-cyan-200 to-slate-200">
                                    Theme Settings
                                </h2>
                                <p className="text-sm text-slate-400 mt-1">
                                    Choose a theme for your chat interface
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2.5 rounded-lg bg-slate-800/50 text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-slate-700/50 hover:border-red-500/30 transition-all duration-300 hover:scale-105 hover:rotate-90"
                            title="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

               
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {THEMES.map((theme, index) => (
                            <button
                                key={theme.id}
                                onClick={() => handleThemeSelect(theme.id)}
                                className={`group relative p-4 rounded-xl border transition-all duration-300 hover:scale-105 animate-slide-in-up ${currentTheme === theme.id
                                        ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                                        : 'bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700/50 hover:border-cyan-500/30'
                                    }`}
                                style={{ animationDelay: `${index * 0.03}s` }}
                            >
                              
                                {currentTheme === theme.id && (
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-bounce-subtle">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                )}

                               
                                <div className="flex gap-1.5 mb-3 h-8">
                                    {theme.colors.map((color, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-md transition-transform duration-300 group-hover:scale-110"
                                            style={{
                                                backgroundColor: color,
                                                transitionDelay: `${i * 50}ms`
                                            }}
                                        />
                                    ))}
                                </div>

                         
                                <p className={`text-sm font-semibold text-center transition-colors ${currentTheme === theme.id
                                        ? 'text-cyan-300'
                                        : 'text-slate-300 group-hover:text-cyan-400'
                                    }`}>
                                    {theme.name}
                                </p>

                              
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </button>
                        ))}
                    </div>
                </div>

                
                <div className="sticky bottom-0 bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-md border-t border-slate-700/50 p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>🎨 {THEMES.length} themes available</span>
                        <span>Current: <span className="text-cyan-400 font-semibold">{THEMES.find(t => t.id === currentTheme)?.name}</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThemeSettings;
