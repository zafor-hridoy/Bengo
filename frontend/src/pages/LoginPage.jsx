import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MailIcon, LoaderIcon, LockIcon, Sparkles, Zap, Shield, Users } from "lucide-react";
import { Link } from "react-router";
import BengoLogo from "../components/BengoLogo";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();
  const [focusedInput, setFocusedInput] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };


  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-slate-900 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="floating-particle absolute rounded-full bg-cyan-400/20 blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>


      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl animate-pulse-slower" />

      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px] animate-fade-in-up">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row backdrop-blur-sm bg-slate-900/80">

            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30 relative">
              <div className="w-full max-w-md">

                <div className="text-center mb-8 animate-fade-in">
                  <div className="relative inline-block mb-4">
                    <BengoLogo className="size-16 mx-auto" showText={false} />
                    <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-cyan-300 animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-cyan-200 to-slate-200 mb-2 animate-gradient">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400 animate-fade-in-delay">Login to continue your journey</p>
                </div>


                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                    <label className="auth-input-label flex items-center gap-2">
                      <span>Email</span>
                      <span className="text-cyan-400 text-xs opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}></span>
                    </label>
                    <div className="relative group">
                      <MailIcon className={`auth-input-icon transition-all duration-300 ${focusedInput === 'email' ? 'text-cyan-400 scale-110' : ''}`} />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                        className="input-modern"
                        placeholder="xyz@gmail.com"
                      />
                      {focusedInput === 'email' && (
                        <div className="input-glow-effect" />
                      )}
                    </div>
                  </div>


                  <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                    <label className="auth-input-label flex items-center gap-2">
                      <span>Password</span>
                      <span className="text-cyan-400 text-xs opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}></span>
                    </label>
                    <div className="relative group">
                      <LockIcon className={`auth-input-icon transition-all duration-300 ${focusedInput === 'password' ? 'text-cyan-400 scale-110' : ''}`} />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                        className="input-modern"
                        placeholder="••••••••"
                      />
                      {focusedInput === 'password' && (
                        <div className="input-glow-effect" />
                      )}
                    </div>
                  </div>


                  <button
                    className="auth-btn-modern group relative overflow-hidden animate-slide-in-left"
                    type="submit"
                    disabled={isLoggingIn}
                    style={{ animationDelay: '0.3s' }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoggingIn ? (
                        <LoaderIcon className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Sign In
                          <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </form>

                <div className="mt-6 text-center animate-fade-in-delay" style={{ animationDelay: '0.5s' }}>
                  <Link to="/signup" className="auth-link-modern group">
                    <span>Don't have an account?</span>
                    <span className="ml-1 text-cyan-400 group-hover:translate-x-1 inline-block transition-transform">Sign Up →</span>
                  </Link>
                </div>
              </div>
            </div>


            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent relative">
              <div className="animate-fade-in-scale">
                <div className="relative">
                  <img
                    src="/login.png"
                    alt="People using mobile devices"
                    className="w-full h-auto object-contain drop-shadow-2xl animate-float-slow"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-lg blur-2xl" />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-slate-200 to-cyan-300 animate-gradient">
                    Where Message Matters
                  </h3>

                  <div className="mt-6 flex justify-center gap-4">
                    <span className="auth-badge-modern animate-bounce-subtle" style={{ animationDelay: '0s' }}>
                      💬 Chat
                    </span>
                    <span className="auth-badge-modern animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>
                      🔗 Connect
                    </span>
                    <span className="auth-badge-modern animate-bounce-subtle" style={{ animationDelay: '0.4s' }}>
                      😊 Smile
                    </span>
                  </div>


                  <div className="mt-8 space-y-3 text-left max-w-sm mx-auto">
                    <div className="flex items-center gap-3 text-slate-300 animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                      <Shield className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm">Secure authentication</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
                      <Zap className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm">Lightning-fast messaging</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300 animate-slide-in-right" style={{ animationDelay: '0.7s' }}>
                      <Users className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm">Connect with friends instantly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default LoginPage;