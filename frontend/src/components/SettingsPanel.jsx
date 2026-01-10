import { useState } from 'react';
import { Palette, Sparkles } from 'lucide-react';
import { useThemeStore, THEMES } from '../store/useThemeStore';
import toast from 'react-hot-toast';
import { Check } from 'lucide-react';

function SettingsPanel() {
    const { currentTheme, setTheme } = useThemeStore();

    const handleThemeSelect = (themeId) => {
        setTheme(themeId);
        toast.success(`Theme changed to ${THEMES.find(t => t.id === themeId)?.name}!`, {
            icon: '🎨',
            duration: 2000,
        });
    };

    return (
        <div className="h-full overflow-y-auto p-4 custom-scrollbar">
            {/* Header */}
            <div className="mb-6 text-center animate-fade-in">
                <div className="inline-flex items-center gap-2 mb-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                        <Palette className="w-6 h-6 text-cyan-400 animate-pulse" />
                    </div>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                </div>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-cyan-200 to-slate-200">
                    Theme Settings
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                    Personalize your chat
                </p>
            </div>

          
            <div className="grid grid-cols-2 gap-3">
                {THEMES.map((theme, index) => (
                    <button
                        key={theme.id}
                        onClick={() => handleThemeSelect(theme.id)}
                        className="group relative p-3 rounded-xl border transition-all duration-300 hover:scale-105 animate-slide-in-up"
                        style={{
                            animationDelay: `${index * 0.02}s`,
                            background: currentTheme === theme.id
                                ? `linear-gradient(to bottom right, rgba(var(--primary), 0.2), rgba(var(--secondary), 0.2))`
                                : 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.6))',
                            borderColor: currentTheme === theme.id
                                ? `rgba(var(--primary), 0.5)`
                                : 'rgba(51, 65, 85, 0.5)',
                            boxShadow: currentTheme === theme.id
                                ? `0 10px 15px -3px rgba(var(--primary), 0.2)`
                                : 'none'
                        }}
                        onMouseEnter={(e) => {
                            if (currentTheme !== theme.id) {
                                e.currentTarget.style.borderColor = `rgba(var(--primary), 0.3)`;
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (currentTheme !== theme.id) {
                                e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.5)';
                            }
                        }}
                    >
                        
                        {currentTheme === theme.id && (
                            <div
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse"
                                style={{
                                    background: `linear-gradient(to bottom right, rgb(var(--primary)), rgba(var(--primary), 0.8))`,
                                    boxShadow: `0 4px 6px -1px rgba(var(--primary), 0.5)`
                                }}
                            >
                                <Check className="w-3 h-3 text-white" />
                            </div>
                        )}

                      
                        <div className="flex gap-1 mb-2 h-6">
                            {theme.colors.map((color, i) => (
                                <div
                                    key={i}
                                    className="flex-1 rounded transition-transform duration-300 group-hover:scale-110"
                                    style={{
                                        backgroundColor: color,
                                        transitionDelay: `${i * 30}ms`
                                    }}
                                />
                            ))}
                        </div>

                      
                        <p
                            className="text-xs font-semibold text-center transition-colors"
                            style={{
                                color: currentTheme === theme.id ? `rgb(var(--primary))` : 'rgb(203, 213, 225)'
                            }}
                            onMouseEnter={(e) => {
                                if (currentTheme !== theme.id) {
                                    e.currentTarget.style.color = `rgb(var(--primary))`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (currentTheme !== theme.id) {
                                    e.currentTarget.style.color = 'rgb(203, 213, 225)';
                                }
                            }}
                        >
                            {theme.name}
                        </p>

                     
                        <div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{ background: `linear-gradient(to right, transparent, rgba(var(--primary), 0.05), transparent)` }}
                        />
                    </button>
                ))}
            </div>

            
            <div className="mt-6 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 animate-fade-in-delay">
                <p className="text-xs text-slate-400 text-center">
                    🎨 <span className="font-semibold" style={{ color: `rgb(var(--primary))` }}>{THEMES.length}</span> themes available
                </p>
                <p className="text-xs text-slate-500 text-center mt-1">
                    Current: <span style={{ color: `rgb(var(--primary))` }}>{THEMES.find(t => t.id === currentTheme)?.name}</span>
                </p>
            </div>
        </div>
    );
}

export default SettingsPanel;
