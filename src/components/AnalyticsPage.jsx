import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AnalyticsPage = () => {
    const { scriptId } = useParams();
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch(`https://visitloggerbackend.vercel.app/analytics/${scriptId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('API response:', data);
                setAnalytics(data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, [scriptId]);

    return (
        <div className="min-h-screen bg-[#000000] text-white p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">
                        Analytics for Script ID: {scriptId}
                    </h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium"
                    >
                        Back
                    </button>
                </div>

                {/* Content Section */}
                {isLoading ? (
                    <p>Loading analytics...</p>
                ) : analytics.length > 0 ? (
                    <div className="border border-gray-800 rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-[#111111]">
                                <tr>
                                    <th className="py-3 px-2 sm:px-4 text-left text-gray-400">IP Address</th>
                                    <th className="py-3 px-2 sm:px-4 text-left text-gray-400">Timestamp</th>
                                    <th className="py-3 px-2 sm:px-4 text-left text-gray-400">Agent</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {analytics.map((data, index) => (
                                    <tr key={index} className="hover:bg-[#111111] transition-all">
                                        <td className="py-3 px-2 sm:px-4 text-gray-300 truncate">{data.ipAddress}</td>
                                        <td className="py-3 px-2 sm:px-4 text-gray-300 truncate">{data.timestamp}</td>
                                        <td className="py-3 px-2 sm:px-4 text-gray-300 truncate">{data.userAgent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400 text-center">No analytics data available for this script.</p>
                )}
            </div>
        </div>
    );
};

export default AnalyticsPage;
