import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Databases, Query, Client } from 'appwrite';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { IoIosLogOut } from "react-icons/io";
import { toast } from 'react-toastify';


const Dashboard = () => {
    const { user, logout } = useAuth();
    const [scripts, setScripts] = useState([]);
    const [scriptName, setScriptName] = useState('');
    const [expandedScriptId, setExpandedScriptId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState('');

    
    const databases = new Databases(new Client()
        .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID));

    useEffect(() => {
        if (user) {
            fetchScripts(user.$id);
        }
    }, [user]);

    const fetchScripts = async (userId) => {
        try {
            setIsLoading(true);
            const data = await databases.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_SCRIPTS_COLLECTION_ID,
                [Query.equal('userId', userId)]
            );
            setScripts(data.documents);
        } catch (error) {
            console.error('Error fetching scripts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const createScript = async () => {
        if (!scriptName) {
            toast.error('Script name is required');
            return;
        }

        try {
            setIsCreating(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/script`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.$id, scriptName }),
            });

            const data = await response.json();
            if (response.ok) {
                fetchScripts(user.$id); 
                setScriptName('');
                toast.success('Script created successfully!');
            } else {
                toast.error('Error creating script');
            }
        } catch (error) {
            console.error('Error creating script:', error);
            toast.error('Failed to create script');
        } finally {
            setIsCreating(false);
        }
    };

    

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const copyScript = (scriptUrl) => {
        navigator.clipboard.writeText(scriptUrl);
        toast.success('Script copied to clipboard!');
    };


    const toggleAccordion = (scriptId) => {
        setExpandedScriptId(expandedScriptId === scriptId ? null : scriptId);
    };



        

    return (

        <div className="min-h-screen  bg-[#000000] text-white pt-8 px-5">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <button
                    title='Logout'
                        onClick={handleLogout}
                        className="bg-gray-300 cursor-crosshair hover:bg-gray-200 text-black px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium"
                    >
                    <IoIosLogOut size={15} />
                    </button>
                </div>

                {/* Script Creation Section */}
                <div className="mb-8 space-y-4">
                    <div className="flex gap-4 flex-col sm:flex-row">  {/* Use flex column on mobile and row on larger screens */}
                        <input
                            type="text"
                            placeholder="Enter script name..."
                            value={scriptName}
                            onChange={(e) => setScriptName(e.target.value)}
                            className="flex-1 p-3 border border-gray-800 rounded-md bg-[#111111] text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm sm:text-base"
                        />
                        <button
                            onClick={createScript}
                            disabled={isCreating}
                            className={`bg-gray-200 cursor-pointer hover:bg-gray-200 text-black px-6 py-3 rounded-md transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isCreating ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mx-auto" />
                            ) : (
                                'Create Script'
                            )}
                        </button>
                    </div>
                </div>


                {/* Scripts List Section */}
                <div className="mb-8 space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight">Your Scripts</h2>
                    <ul className="space-y-3">
                        {scripts.map((script) => (
                            <li key={script.scriptId} className="border border-gray-800 rounded-md bg-[#111111] overflow-hidden">
                                <div
                                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-[#1a1a1a] transition-all"
                                    onClick={() => toggleAccordion(script.scriptId)}
                                >
                                    <h3 className="text-sm font-medium">{script.scriptName}</h3>
                                    <span className="text-gray-400 text-sm">
                                        {expandedScriptId === script.scriptId ? '−' : '+'}
                                    </span>
                                </div>
                                {expandedScriptId === script.scriptId && (
                                    <div className="p-4 border-t border-gray-800">
                                        <pre className="p-3 bg-[#0a0a0a] rounded-md overflow-x-auto">
                                            <code className="text-sm text-gray-300 font-mono">
                                                {`<script src="${script.scriptUrl}" async></script>`}
                                            </code>

                                        </pre>
                                        <div className="mt-4 space-y-2">
                                            <button
                                                onClick={() => copyScript(`<script src="${script.scriptUrl}" async></script>`)}
                                                className="w-full bg-[#111111] hover:bg-[#1a1a1a] border border-gray-800 text-white p-2 rounded-md transition-all text-sm font-medium"
                                            >
                                                Copy Script
                                            </button>
                                            <Link
                                                to={`/analytics/${script.scriptId}?scriptName=${encodeURIComponent(script.scriptName)}`}
                                                className="w-full bg-white hover:bg-gray-200 text-black p-2 rounded-md transition-all text-sm font-medium text-center block"
                                            >
                                                View Analytics
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <Footer />
        </div>
        
    );
};

export default Dashboard;
