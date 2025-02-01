import React from "react";

const AnalyticsTable = ({ data }) => {
    return (
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
                    {data.map((data, index) => (
                        <tr key={index} className="hover:bg-[#111111] transition-all">
                            <td className="py-3 px-4 text-gray-300 truncate">{data.ipAddress}</td>
                            <td className="py-3 px-4 text-gray-300 truncate">
                                {new Date(data.timestamp).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-gray-300 truncate">{data.userAgent}</td>
                            <td className="py-3 px-4 text-gray-300 truncate">{data.city || "N/A"}</td>
                            <td className="py-3 px-4 text-gray-300 truncate">{data.latitude}</td>
                            <td className="py-3 px-4 text-gray-300 truncate">{data.longitude}</td>
                            <td className="py-3 px-4 text-gray-300 truncate">{data.pageViews}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(AnalyticsTable);  // Prevent unnecessary re-renders
