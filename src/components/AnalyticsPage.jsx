import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AnalyticsPage = () => {
    const { scriptId } = useParams();
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch(
                    `https://visitloggerbackend.vercel.app/analytics/${scriptId}`
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                console.log("API response:", data);
                setAnalytics(data);
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, [scriptId]);

    return (
        <div className="min-h-screen bg-[#000000] text-white p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
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
                    <div className="flex justify-center items-center min-h-screen bg-[#000000] text-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                    </div>
                ) : analytics.length > 0 ? (
                    <div className="border border-gray-800 rounded-md overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#111111]">
                                <tr className="text-gray-400">
                                    <th className="py-3 px-4 text-left">IP Address</th>
                                    <th className="py-3 px-4 text-left">Timestamp</th>
                                    <th className="py-3 px-4 text-left">User Agent</th>
                                    <th className="py-3 px-4 text-left">City</th>
                                    <th className="py-3 px-4 text-left">Latitude</th>
                                    <th className="py-3 px-4 text-left">Longitude</th>
                                    <th className="py-3 px-4 text-left">Page Views</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {analytics.map((data, index) => (
                                    <tr key={index} className="hover:bg-[#111111] transition-all">
                                        <td className="py-3 px-4 text-gray-300 truncate">
                                            {data.ipAddress}
                                        </td>
                                        <td className="py-3 px-4 text-gray-300 truncate">
                                            {new Date(data.timestamp).toLocaleString()}
                                        </td>
                                        <td className="py-3 px-4 text-gray-300 truncate">
                                            {data.userAgent}
                                        </td>
                                        <td className="py-3 px-4 text-gray-300 truncate">
                                            {data.city || "N/A"}
                                        </td>
                                        <td className="py-3 px-4 text-gray-300 truncate">
                                            {data.latitude}
                                        </td>
                                        <td className="py-3 px-4 text-gray-300 truncate">
                                            {data.longitude}
                                        </td>
                                        <td className="py-3 px-4 text-gray-300 truncate">
                                            {data.pageViews}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400 text-center">
                        No analytics data available for this script.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AnalyticsPage;
