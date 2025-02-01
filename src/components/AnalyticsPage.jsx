import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AnalyticsGraph from "./AnalyticsGraph"; // Import AnalyticsGraph Component
import logo from '../assets/logo.png'
import { IoIosArrowBack } from "react-icons/io";
import AnalyticsTable from "./AnalyticsTable";
import Footer from './Footer';

const AnalyticsPage = () => {
    const { scriptId } = useParams();
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState([]);  // Current page data
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const [scriptName, setScriptName] = useState('');


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const name = queryParams.get('scriptName');
        if (name && name !== scriptName) {
            setScriptName(name);
        }
    }, [location.search, scriptName]);


    // Fetch paginated analytics data
    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `https://visitloggerbackend.vercel.app/analytics/${scriptId}?page=${currentPage}&limit=${itemsPerPage}`
                );
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);

                const data = await response.json();
                if (Array.isArray(data.documents) && data.documents.length > 0) {
                    setAnalytics(data.documents);
                    setTotalPages(Math.ceil(data.total / itemsPerPage)); // Total pages from response
                }
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, [scriptId, currentPage]);


    // Handle pagination button clicks
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        
                        <button
                            onClick={() => navigate(-1)}
                            className=" cursor-pointer text-gray-300 border p-2 rounded-md transition-all duration-200 text-sm font-medium"
                        >
                            <IoIosArrowBack size={15} />
                        </button>
                        {/* Logo */}
                        <img src={logo} className="h-8  sm:h-10 " alt="" />
                        {/* Back Button */}
                        
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-center sm:text-left">
                        Analytics for <span className="text-yellow-200 font-mono text-2xl sm:text-3xl">{scriptName} </span> 
                    </h1>
                    
                </div>
                <p className="text-[10px] text-end py-1 text-gray-400">Script ID: {scriptId}</p>
                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-screen bg-[#000000] text-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                    </div>
                ) : analytics.length > 0 ? (
                    <>
                        {/* Graph Section */}
                        <AnalyticsGraph scriptId={scriptId} />  

                        {/* Table Section */}
                            <AnalyticsTable data={analytics} />

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${currentPage === 1 ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"}`}
                            >
                                Previous
                            </button>
                            <p className="text-gray-300">
                                Page {currentPage} of {totalPages}
                            </p>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${currentPage === totalPages ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"}`}
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-400 text-center">
                        No analytics data available for this script.
                    </p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AnalyticsPage;
