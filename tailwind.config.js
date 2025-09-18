/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // gray-50
        ring: 'var(--color-ring)', // forest-green
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // gray-900
        primary: {
          DEFAULT: 'var(--color-primary)', // forest-green
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // ocean-blue
          foreground: 'var(--color-secondary-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)' // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-100
          foreground: 'var(--color-muted-foreground)' // gray-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // orange-600
          foreground: 'var(--color-accent-foreground)' // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // gray-900
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // gray-900
        },
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)' // white
        },
        // Brand specific colors
        forest: 'var(--color-forest)', // forest-green
        ocean: 'var(--color-ocean)', // ocean-blue
        achievement: 'var(--color-achievement)', // orange-600
        sky: 'var(--color-sky)', // sky-blue
        action: 'var(--color-action)', // green-600
        surface: 'var(--color-surface)', // gray-100
        'text-primary': 'var(--color-text-primary)', // gray-900
        'text-secondary': 'var(--color-text-secondary)' // gray-500
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
        'hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }], // 48px
        'mission': ['2rem', { lineHeight: '1.2', fontWeight: '600' }], // 32px
        'quest': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px
        'achievement': ['1.25rem', { lineHeight: '1.4', fontWeight: '700' }] // 20px
      },
      spacing: {
        'eco-xs': 'var(--spacing-xs)', // 8px
        'eco-sm': 'var(--spacing-sm)', // 12px
        'eco-md': 'var(--spacing-md)', // 20px
        'eco-lg': 'var(--spacing-lg)', // 32px
        'eco-xl': 'var(--spacing-xl)' // 52px
      },
      borderRadius: {
        'eco-sm': 'var(--radius-sm)', // 8px
        'eco-md': 'var(--radius-md)', // 12px
        'eco-lg': 'var(--radius-lg)' // 16px
      },
      boxShadow: {
        'eco-sm': 'var(--shadow-sm)', // 0 2px 10px rgba(45, 90, 39, 0.05)
        'eco-md': 'var(--shadow-md)', // 0 4px 20px rgba(45, 90, 39, 0.1)
        'eco-lg': 'var(--shadow-lg)', // 0 8px 24px rgba(0, 0, 0, 0.15)
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