import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Databases, Query, Client } from 'appwrite';
import { Link } from 'react-router-dom';
const Dashboard = () => {
    const { user, logout } = useAuth();
    const [scripts, setScripts] = useState([]);
    const [selectedScript, setSelectedScript] = useState(null);
    const [analytics, setAnalytics] = useState([]);
    const [scriptName, setScriptName] = useState('');
    const [expandedScriptId, setExpandedScriptId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
            const data = await databases.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_SCRIPTS_COLLECTION_ID,
                [Query.equal('userId', userId)]
            );
            setScripts(data.documents);
        } catch (error) {
            console.error('Error fetching scripts:', error);
        }
    };

    const createScript = async () => {
        if (!scriptName) {
            alert('Script name is required');
            return;
        }

        try {
            const response = await fetch('https://visitloggerbackend.vercel.app/script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.$id, scriptName }),
            });

            const data = await response.json();
            if (response.ok) {
                setScripts([...scripts, { scriptId: data.scriptId, scriptName, script: data.script, userId: data.userId }]);
                setScriptName('');
                alert('Script created successfully!');
            } else {
                alert('Error creating script');
            }
        } catch (error) {
            console.error('Error creating script:', error);
        }
    };

    const fetchAnalytics = async (scriptId) => {
        try {
            const response = await fetch(`https://visitloggerbackend.vercel.app/analytics/${scriptId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setAnalytics(data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const copyScript = (script) => {
        navigator.clipboard.writeText(script);
        alert('Script copied to clipboard!');
    };

    const toggleAccordion = (scriptId) => {
        setExpandedScriptId(expandedScriptId === scriptId ? null : scriptId);
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>

                {/* Script Creation Section */}
                <div className="mb-8 space-y-4">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Enter script name..."
                            value={scriptName}
                            onChange={(e) => setScriptName(e.target.value)}
                            className="flex-1 p-3 border border-gray-800 rounded-md bg-[#111111] text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        />
                        <button
                            onClick={createScript}
                            className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-md transition-all duration-200 text-sm font-medium whitespace-nowrap"
                        >
                            Create Script
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
                                            <code className="text-sm text-gray-300 font-mono">{script.script}</code>
                                        </pre>
                                        <div className="mt-4 space-y-2">
                                            <button
                                                onClick={() => copyScript(script.script)}
                                                className="w-full bg-[#111111] hover:bg-[#1a1a1a] border border-gray-800 text-white p-2 rounded-md transition-all text-sm font-medium"
                                            >
                                                Copy Script
                                            </button>
                                            <Link
                                                to={`/analytics/${script.scriptId}`}
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

                {/* Analytics Section */}
                {selectedScript && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight">
                            Analytics for {scripts.find(s => s.scriptId === selectedScript)?.scriptName}
                        </h2>
                        <div className="border border-gray-800 rounded-md overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-[#111111]">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">IP Address</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Timestamp</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Agent</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {analytics.map((data, index) => (
                                        <tr key={index} className="hover:bg-[#111111] transition-all">
                                            <td className="py-3 px-4 text-sm text-gray-300">{data.ipAddress}</td>
                                            <td className="py-3 px-4 text-sm text-gray-300">{data.timestamp}</td>
                                            <td className="py-3 px-4 text-sm text-gray-300 truncate max-w-xs">
                                                {data.userAgent}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;