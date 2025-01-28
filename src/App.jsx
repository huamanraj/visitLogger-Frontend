
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginSignup from './components/LoginSignup';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute'; 
import LandingPage from './pages/LandingPage';
import DocumentationPage from './pages/DocumentationPage';
import AnalyticsPage from './components/AnalyticsPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doc" element={<DocumentationPage/>} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/analytics/:scriptId" element={<PrivateRoute><AnalyticsPage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};



export default App;














// import { useState, useEffect } from 'react';
// import { Client, Account, Databases, Query } from 'appwrite';

// // Initialize Appwrite client
// const client = new Client()
//   .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
//   .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// const account = new Account(client);
// const databases = new Databases(client);

// function App() {
//   const [user, setUser] = useState(null);
//   const [scripts, setScripts] = useState([]);
//   const [selectedScript, setSelectedScript] = useState(null);
//   const [analytics, setAnalytics] = useState([]);
//   const [scriptName, setScriptName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [expandedScriptId, setExpandedScriptId] = useState(null); // Track expanded script

//   // Handle user login
//   const handleLogin = async () => {
//     try {
//       await account.createEmailSession(email, password);
//       const user = await account.get();
//       setUser(user);
//       fetchScripts(user.$id); // Fetch scripts for the logged-in user
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   // Handle user signup
//   const handleSignUp = async () => {
//     try {
//       await account.create('unique()', email, password);
//       await handleLogin();
//     } catch (error) {
//       console.error('Signup failed:', error);
//     }
//   };

//   // Fetch scripts for the logged-in user
//   const fetchScripts = async (userId) => {
//     try {
//       const data = await databases.listDocuments(
//         import.meta.env.VITE_APPWRITE_DATABASE_ID,
//         import.meta.env.VITE_APPWRITE_SCRIPTS_COLLECTION_ID, // Use the scripts collection
//         [Query.equal('userId', userId)] // Filter by userId
//       );
//       setScripts(data.documents);
//     } catch (error) {
//       console.error('Error fetching scripts:', error);
//     }
//   };

//   // Create a new tracking script
//   const createScript = async () => {
//     if (!scriptName) {
//       alert('Script name is required');
//       return;
//     }

//     try {
//       const response = await fetch('https://visitloggerbackend.vercel.app/script', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId: user.$id, scriptName }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setScripts([...scripts, { scriptId: data.scriptId, scriptName, script: data.script, userId: data.userId }]);
//         setScriptName('');
//         alert('Script created successfully!');
//       } else {
//         alert('Error creating script');
//       }
//     } catch (error) {
//       console.error('Error creating script:', error);
//     }
//   };

//   // Fetch analytics for a specific script
//   const fetchAnalytics = async (scriptId) => {
//     try {
//       const response = await fetch(`https://visitloggerbackend.vercel.app/analytics/${scriptId}`);
//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }
//       const data = await response.json();
//       setAnalytics(data);
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//     }
//   };

//   // Copy script to clipboard
//   const copyScript = (script) => {
//     navigator.clipboard.writeText(script);
//     alert('Script copied to clipboard!');
//   };

//   // Toggle accordion for a script
//   const toggleAccordion = (scriptId) => {
//     setExpandedScriptId(expandedScriptId === scriptId ? null : scriptId);
//   };

//   // Check if user is already logged in
//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const user = await account.get();
//         setUser(user);
//         fetchScripts(user.$id);
//       } catch (error) {
//         console.error('User not logged in:', error);
//       }
//     };
//     checkUser();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       {!user ? (
//         <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold mb-4">Login / Sign Up</h1>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 mb-4 border rounded"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 mb-4 border rounded"
//           />
//           <button
//             onClick={handleLogin}
//             className="w-full bg-blue-500 text-white p-2 rounded mb-2"
//           >
//             Login
//           </button>
//           <button
//             onClick={handleSignUp}
//             className="w-full bg-green-500 text-white p-2 rounded"
//           >
//             Sign Up
//           </button>
//         </div>
//       ) : (
//         <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

//           {/* Create Script Section */}
//           <div className="mb-6">
//             <input
//               type="text"
//               placeholder="Script Name"
//               value={scriptName}
//               onChange={(e) => setScriptName(e.target.value)}
//               className="w-full p-2 mb-4 border rounded"
//             />
//             <button
//               onClick={createScript}
//               className="bg-purple-500 text-white p-2 rounded"
//             >
//               Create Script
//             </button>
//           </div>

//           {/* List of Scripts */}
//           <div className="mb-6">
//             <h2 className="text-xl font-bold mb-4">Your Scripts</h2>
//             <ul>
//               {scripts.map((script) => (
//                 <li key={script.scriptId} className="mb-4 p-4 bg-gray-50 rounded-lg">
//                   {/* Accordion Header */}
//                   <div
//                     className="flex justify-between items-center cursor-pointer"
//                     onClick={() => toggleAccordion(script.scriptId)}
//                   >
//                     <h3 className="text-lg font-semibold">{script.scriptName}</h3>
//                     <span>{expandedScriptId === script.scriptId ? '▼' : '▶'}</span>
//                   </div>

//                   {/* Accordion Content */}
//                   {expandedScriptId === script.scriptId && (
//                     <div className="mt-4">
//                       <pre className="p-2 bg-gray-200 rounded overflow-x-auto">
//                         <code>{script.script}</code>
//                       </pre>
//                       <p className="mt-2 text-sm text-gray-600">User ID: {script.userId}</p>
//                       <button
//                         onClick={() => copyScript(script.script)}
//                         className="mt-2 bg-blue-500 text-white p-2 rounded"
//                       >
//                         Copy Script
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelectedScript(script.scriptId);
//                           fetchAnalytics(script.scriptId);
//                         }}
//                         className="mt-2 bg-green-500 text-white p-2 rounded ml-2"
//                       >
//                         View Analytics
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Analytics Section */}
//           {selectedScript && (
//             <div>
//               <h2 className="text-xl font-bold mb-4">Analytics for {scripts.find(s => s.scriptId === selectedScript)?.scriptName}</h2>
//               <table className="min-w-full bg-white border">
//                 <thead>
//                   <tr>
//                     <th className="py-2 px-4 border-b">IP Address</th>
//                     <th className="py-2 px-4 border-b">Timestamp</th>
//                     <th className="py-2 px-4 border-b">Agent</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {analytics.map((data, index) => (
//                     <tr key={index}>
//                       <td className="py-2 px-4 border-b">{data.ipAddress}</td>
//                       <td className="py-2 px-4 border-b">{data.timestamp}</td>
//                       <td className="py-2 px-4 border-b text-clip">{data.userAgent}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;