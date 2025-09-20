/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb',
        input: '#f9fafb',
        ring: '#22c55e',
        background: '#f9fafb',
        foreground: '#111827',
        primary: {
          DEFAULT: '#22c55e',
          foreground: '#ffffff'
        },
        secondary: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff'
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff'
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280'
        },
        accent: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff'
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#111827'
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#111827'
        },
        success: {
          DEFAULT: '#16a34a',
          foreground: '#ffffff'
        },
        warning: {
          DEFAULT: '#fbbd23',
          foreground: '#ffffff'
        },
        error: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff'
        },
        forest: '#166534',
        ocean: '#1e40af',
        achievement: '#b45309',
        sky: '#0ea5e9',
        action: '#15803d',
        surface: '#f3f4f6',
        'text-primary': '#111827',
        'text-secondary': '#6b7280',
      },
      fontFamily: {
        'headline': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'accent': ['Nunito', 'sans-serif'],
        'sans': ['Source Sans Pro', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif']
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'mission': ['2rem', { lineHeight: '1.2', fontWeight: '600' }],
        'quest': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'achievement': ['1.25rem', { lineHeight: '1.4', fontWeight: '700' }]
      },
      spacing: {
        'eco-xs': '8px',
        'eco-sm': '12px',
        'eco-md': '20px',
        'eco-lg': '32px',
        'eco-xl': '52px'
      },
      borderRadius: {
        'eco-sm': '8px',
        'eco-md': '12px',
        'eco-lg': '16px'
      },
      boxShadow: {
        'eco-sm': '0 2px 10px rgba(45, 90, 39, 0.05)',
        'eco-md': '0 4px 20px rgba(45, 90, 39, 0.1)',
        'eco-lg': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'mission-pulse': '0 0 0 0 rgba(45, 90, 39, 0.4)',
        'achievement-glow': '0 0 20px 10px rgba(255, 215, 0, 0.4)'
      },
      animation: {
        'mission-pulse': 'missionPulse 2s infinite',
        'achievement-glow': 'achievementGlow 1s ease-out',
        'vine-growth': 'vineGrowth 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'organic-bounce': 'bounce 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
      keyframes: {
        missionPulse: {
          '0%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(45, 90, 39, 0.4)'
          },
          '50%': {
            transform: 'scale(1.05)',
            boxShadow: '0 0 0 10px rgba(45, 90, 39, 0.2)'
          },
          '100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 20px rgba(45, 90, 39, 0)'
          }
        },
        achievementGlow: {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '0',
            boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.8)'
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '1',
            boxShadow: '0 0 20px 10px rgba(255, 215, 0, 0.4)'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(255, 215, 0, 0)'
          }
        },
        vineGrowth: {
          'to': {
            strokeDashoffset: '0'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        scaleIn: {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        }
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'quest': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      },
      transitionDuration: {
        'organic': '300ms',
        'celebration': '600ms'
      },
      backdropBlur: {
        'eco': '8px'
      },
      backgroundImage: {
        'forest-gradient': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        'ocean-gradient': 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        'achievement-gradient': 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
        'mission-pattern': 'radial-gradient(circle at 1px 1px, rgba(45, 90, 39, 0.1) 1px, transparent 0)',
        'hero-pattern': 'linear-gradient(135deg, #fafbfc 0%, #f1f3f4 100%)'
      },
      backgroundSize: {
        'mission-pattern': '20px 20px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}
