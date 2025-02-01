// LandingPage.jsx
import React, { useEffect } from 'react';
import { Activity, ArrowRight, Code2, Globe2, Users, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png'

export default function LandingPage() {
    let navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-white/10">
            {/* Gradient background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute top-0 right-0 w-[1000px] h-[300px] bg-blue-500/10 rounded-full filter blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[400px] bg-purple-500/10 rounded-full filter blur-[120px]"></div>
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-sm bg-black/20">
                <nav className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <img src={logo} className=" h-10"  alt="" />

                            {/* <Activity className="w-5 h-5 text-white" />
                            <span className="font-mono font-bold">visit_logger</span> */}
                        </div>
                        <div  className="hidden md:flex items-center space-x-8">
                            <button onClick={() => { navigate('/doc') }} className="px-4 py-1.5 text-sm font-medium hover:text-white/70 cursor-pointer transition-colors">
                                Documentation
                            </button>
                            <button onClick={() => { navigate('/login') }} className="px-4 py-1.5 text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                                Analytics
                            </button>
                            <button onClick={() => { navigate('/login') }} className="px-4 py-1.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90 transition-all cursor-pointer">
                                Start Tracking →
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="relative pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block mb-6 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                            <span className="text-sm text-white/70">Now with real-time analytics</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Website Analytics{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                                Made Simple
                            </span>
                        </h1>
                        <p className="text-lg font-thin text-white/70 mb-10">
                            Deploy a dynamically generated tracking script and instantly monitor your website traffic 
                            <br />- zero configuration required.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button onClick={() => { navigate('/login') }} className="w-full sm:w-auto group px-6 py-3 bg-white text-black cursor-pointer rounded-lg font-medium hover:bg-white/90 transition-all flex items-center justify-center">
                                Get Script
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button onClick={() => { navigate('/doc') }} className="w-full cursor-pointer sm:w-auto px-6 py-3 border border-white/10 rounded-lg font-medium hover:bg-white/5 transition-all">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Grid */}
            <section className="relative py-24 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="group p-6 rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-white/20 transition-all">
                                <div className="mb-4 p-2 w-fit rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                                <p className="text-sm text-white/70">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative pt-10 pb-14 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Trusted by Developers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="p-6 rounded-lg border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
                                <div className="flex items-start mb-4">
                                    <div className="flex-shrink-0">
                                        <img src={testimonial.avatar} alt="" className="h-12 w-12 rounded-full bg-white/10" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium">{testimonial.name}</h3>
                                        <p className="text-sm text-white/70">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-white/70 italic">"{testimonial.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-8 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <img src={logo} className='w-8' alt="" />
                            <span className="text-sm text-white/70">© 2025 VisitLogger. All rights reserved.</span>
                        </div>
                        <div className="flex  space-x-6">
                            <a onClick={() => navigate('/terms')} className="text-sm cursor-pointer text-white/70 hover:text-white transition-colors">Privacy</a>
                            <button onClick={() => navigate('/terms')} className="text-sm cursor-pointer text-white/70 hover:text-white transition-colors">Terms</button>
                            <a href="#" onClick={() => navigate('/terms')} className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const features = [
    {
        icon: <Globe2 className="w-5 h-5" />,
        title: "Global Edge Network",
        description: "Track visitors from anywhere with our distributed tracking infrastructure"
    },
    {
        icon: <Code2 className="w-5 h-5" />,
        title: "One-Line Integration",
        description: "Add our script with a single line of code. No complex setup required"
    },
    {
        icon: <BarChart3 className="w-5 h-5" />,
        title: "Real-Time Metrics",
        description: "Get instant insights with live updates and comprehensive analytics"
    }
];

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Full Stack Developer",
        quote: "VisitLogger made it incredibly easy to implement analytics across all our projects. The real-time data is a game-changer.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
        name: "Alex Rodriguez",
        role: "Tech Lead",
        quote: "The simplicity of integration and depth of analytics is impressive. Perfect for both small and large scale applications.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    {
        name: "Maya Patel",
        role: "Frontend Engineer",
        quote: "Been using VisitLogger for 6 months now. The insights have helped us make data-driven decisions consistently.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya"
    }
];
