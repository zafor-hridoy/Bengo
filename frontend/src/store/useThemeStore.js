import { create } from 'zustand';

export const THEMES = [
    {
        id: 'light',
        name: 'Light',
        colors: ['#6366f1', '#ec4899', '#10b981', '#1f2937']
    },
    {
        id: 'dark',
        name: 'Dark',
        colors: ['#6366f1', '#ec4899', '#10b981', '#1f2937']
    },
    {
        id: 'cupcake',
        name: 'Cupcake',
        colors: ['#fbbf24', '#ec4899', '#f59e0b', '#fef3c7']
    },
    {
        id: 'bumblebee',
        name: 'Bumblebee',
        colors: ['#fbbf24', '#fef3c7', '#f59e0b', '#1f2937']
    },
    {
        id: 'emerald',
        name: 'Emerald',
        colors: ['#10b981', '#6ee7b7', '#3b82f6', '#1f2937']
    },
    {
        id: 'corporate',
        name: 'Corporate',
        colors: ['#3b82f6', '#64748b', '#0ea5e9', '#1e293b']
    },
    {
        id: 'synthwave',
        name: 'Synthwave',
        colors: ['#e879f9', '#fbbf24', '#a855f7', '#1e293b']
    },
    {
        id: 'retro',
        name: 'Retro',
        colors: ['#dc2626', '#facc15', '#f59e0b', '#fef3c7']
    },
    {
        id: 'cyberpunk',
        name: 'Cyberpunk',
        colors: ['#ec4899', '#06b6d4', '#eab308', '#fbbf24']
    },
    {
        id: 'valentine',
        name: 'Valentine',
        colors: ['#ec4899', '#fecdd3', '#f43f5e', '#fce7f3']
    },
    {
        id: 'halloween',
        name: 'Halloween',
        colors: ['#f97316', '#a855f7', '#22c55e', '#1f2937']
    },
    {
        id: 'garden',
        name: 'Garden',
        colors: ['#ec4899', '#f43f5e', '#64748b', '#1e293b']
    },
    {
        id: 'forest',
        name: 'Forest',
        colors: ['#22c55e', '#10b981', '#14b8a6', '#1f2937']
    },
    {
        id: 'aqua',
        name: 'Aqua',
        colors: ['#06b6d4', '#a855f7', '#3b82f6', '#1e293b']
    },
    {
        id: 'lofi',
        name: 'Lofi',
        colors: ['#1f2937', '#374151', '#4b5563', '#d1d5db']
    },
    {
        id: 'pastel',
        name: 'Pastel',
        colors: ['#c4b5fd', '#fbcfe8', '#bfdbfe', '#fef3c7']
    },
    {
        id: 'fantasy',
        name: 'Fantasy',
        colors: ['#a855f7', '#f97316', '#3b82f6', '#1f2937']
    },
    {
        id: 'wireframe',
        name: 'Wireframe',
        colors: ['#e5e7eb', '#d1d5db', '#9ca3af', '#ffffff']
    },
    {
        id: 'black',
        name: 'Black',
        colors: ['#374151', '#4b5563', '#1f2937', '#000000']
    },
    {
        id: 'luxury',
        name: 'Luxury',
        colors: ['#fef3c7', '#a855f7', '#581c87', '#1f2937']
    },
    {
        id: 'dracula',
        name: 'Dracula',
        colors: ['#ec4899', '#a78bfa', '#3730a3', '#1e1b4b']
    },
    {
        id: 'cmyk',
        name: 'CMYK',
        colors: ['#06b6d4', '#ec4899', '#eab308', '#1f2937']
    },
    {
        id: 'autumn',
        name: 'Autumn',
        colors: ['#dc2626', '#f97316', '#92400e', '#78350f']
    },
    {
        id: 'business',
        name: 'Business',
        colors: ['#0ea5e9', '#60a5fa', '#f97316', '#1e293b']
    },
    {
        id: 'acid',
        name: 'Acid',
        colors: ['#ec4899', '#fbbf24', '#fef08a', '#1f2937']
    },
    {
        id: 'lemonade',
        name: 'Lemonade',
        colors: ['#22c55e', '#eab308', '#fef08a', '#fef3c7']
    },
    {
        id: 'night',
        name: 'Night',
        colors: ['#3b82f6', '#60a5fa', '#ec4899', '#1e293b']
    },
    {
        id: 'coffee',
        name: 'Coffee',
        colors: ['#f97316', '#92400e', '#78350f', '#1e293b']
    },
    {
        id: 'winter',
        name: 'Winter',
        colors: ['#3b82f6', '#a855f7', '#6366f1', '#1e293b']
    },
    {
        id: 'dim',
        name: 'Dim',
        colors: ['#10b981', '#f97316', '#ec4899', '#1f2937']
    },
    {
        id: 'nord',
        name: 'Nord',
        colors: ['#60a5fa', '#a5b4fc', '#cbd5e1', '#1e293b']
    },
    {
        id: 'sunset',
        name: 'Sunset',
        colors: ['#f97316', '#ec4899', '#a855f7', '#1e293b']
    }
];

export const useThemeStore = create((set) => ({
    
    currentTheme: typeof window !== 'undefined'
        ? localStorage.getItem('chat-theme') || 'dark'
        : 'dark',

    setTheme: (theme) => {
    
        localStorage.setItem('chat-theme', theme);

      
        document.documentElement.setAttribute('data-theme', theme);

      
        set({ currentTheme: theme });
    },

    initTheme: () => {
        const savedTheme = localStorage.getItem('chat-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        set({ currentTheme: savedTheme });
    }
}));
