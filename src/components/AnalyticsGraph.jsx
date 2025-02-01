import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { useCallback } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const AnalyticsGraph = ({ scriptId }) => {
    const [chartData, setChartData] = useState(null);
    const [selectedDays, setSelectedDays] = useState(5);
    const [isLoading, setIsLoading] = useState(true);

    const fetchGraphData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `https://visitloggerbackend.vercel.app/analytics/graph/${scriptId}?days=${selectedDays}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Received data:', data); // Debug log

            if (!data.graphData || !Array.isArray(data.graphData)) {
                throw new Error('Invalid data format received');
            }

            const formattedData = {
                labels: data.graphData.map(entry => {
                    // Format date to be more readable
                    const date = new Date(entry.date);
                    return date.toLocaleDateString();
                }),
                datasets: [{
                    label: "Daily Visitors",
                    data: data.graphData.map(entry => entry.count),
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    fill: true,
                }],
            };

            console.log('Formatted chart data:', formattedData); // Debug log
            setChartData(formattedData);

        } catch (error) {
            console.error('Error fetching graph data:', error);
            setChartData(null);
        } finally {
            setIsLoading(false);
        }
    }, [scriptId, selectedDays]);

   
    useEffect(() => {
        console.log('Selected days changed to:', selectedDays);
        fetchGraphData();
    }, [fetchGraphData]);

    if (isLoading) {
        return (
            <div className="bg-[#111111] p-4 rounded-md mb-8">
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#111111] p-4 rounded-md mb-8">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">
                Daily Visitors (Last {selectedDays} Days)
            </h2>

            <select
                value={selectedDays}
                onChange={(e) => {
                    const newDays = Number(e.target.value);
                    console.log('Changing days to:', newDays); // Debug log
                    setSelectedDays(newDays);
                }}
                className="bg-[#222222] text-white border border-gray-800 rounded-md p-2 mb-4"
            >
                {[ 3, 5, 10, 30, 365].map((days) => (
                    <option key={days} value={days}>
                        Last {days} day{days > 1 ? "s" : ""}
                    </option>
                ))}
            </select>

            {chartData && (
                <div className="w-full sm:w-[80%] mx-auto h-[300px]">
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    },
                                    ticks: {
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    }
                                },
                                x: {
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.1)'
                                    },
                                    ticks: {
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    }
                                }
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default AnalyticsGraph;
