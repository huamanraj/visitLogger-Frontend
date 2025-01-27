import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Databases, Query, Client } from 'appwrite';

const Dashboard = () => {
    
    const { user, logout } = useAuth();
    const [scripts, setScripts] = useState([]);
    const [selectedScript, setSelectedScript] = useState(null);
    const [analytics, setAnalytics] = useState([]);
    const [scriptName, setScriptName] = useState('');
    const [expandedScriptId, setExpandedScriptId] = useState(null);

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
            // Redirect will be handled by your AuthContext/Router
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
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
                Logout
            </button>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Script Name"
                    value={scriptName}
                    onChange={(e) => setScriptName(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <button
                    onClick={createScript}
                    className="bg-purple-500 text-white p-2 rounded"
                >
                    Create Script
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Your Scripts</h2>
                <ul>
                    {scripts.map((script) => (
                        <li key={script.scriptId} className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleAccordion(script.scriptId)}
                            >
                                <h3 className="text-lg font-semibold">{script.scriptName}</h3>
                                <span>{expandedScriptId === script.scriptId ? '▼' : '▶'}</span>
                            </div>

                            {expandedScriptId === script.scriptId && (
                                <div className="mt-4">
                                    <pre className="p-2 bg-gray-200 rounded overflow-x-auto">
                                        <code>{script.script}</code>
                                    </pre>
                                    <p className="mt-2 text-sm text-gray-600">User ID: {script.userId}</p>
                                    <button
                                        onClick={() => copyScript(script.script)}
                                        className="mt-2 bg-blue-500 text-white p-2 rounded"
                                    >
                                        Copy Script
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedScript(script.scriptId);
                                            fetchAnalytics(script.scriptId);
                                        }}
                                        className="mt-2 bg-green-500 text-white p-2 rounded ml-2"
                                    >
                                        View Analytics
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedScript && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Analytics for {scripts.find(s => s.scriptId === selectedScript)?.scriptName}</h2>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">IP Address</th>
                                <th className="py-2 px-4 border-b">Timestamp</th>
                                <th className="py-2 px-4 border-b">Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analytics.map((data, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">{data.ipAddress}</td>
                                    <td className="py-2 px-4 border-b">{data.timestamp}</td>
                                    <td className="py-2 px-4 border-b text-clip">{data.userAgent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Dashboard;