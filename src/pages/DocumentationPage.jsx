// DocumentationPage.jsx
import React from 'react';
import { Code2, Copy, ExternalLink, Terminal, CheckCircle2, Key, Layout } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.png'

export default function DocumentationPage() {
    const [copied, setCopied] = useState(false);
    const [copiedInline, setCopiedInline] = useState(false);

    const sampleScript = `<script>
  (function() {
    const scriptId = "your_script_id";
    const userId = "your_user_id";
    const ipAddress = window.location.hostname;

    fetch('https://visitloggerbackend.vercel.app/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scriptId,
        userId,
        ipAddress,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      })
    })
    .catch(console.error);
  })();
</script>`;

    const inlineScript = `<script src="https://visitloggerbackend.vercel.app/track.js?scriptId=your_script_id&userId=your_user_id" async></script>`;

    const handleCopy = (text, setCopyState) => {
        navigator.clipboard.writeText(text);
        setCopyState(true);
        setTimeout(() => setCopyState(false), 2000);
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-blue-500/30">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full filter blur-[120px]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Quick Start Guide
                        </h1>
                        <p className="text-lg text-gray-400">
                            Get started with Visit Logger in just a few minutes
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Key className="w-4 h-4 text-blue-500" />
                                </div>
                                <h2 className="text-xl font-semibold">1. Create a tracking script</h2>
                            </div>
                            <p className="text-gray-400">
                                First, create a new script from your dashboard. You'll receive a unique scriptId and userId.
                            </p>
                            <div className="bg-gray-900 rounded-lg p-4">
                                <ul className="list-disc list-inside space-y-2 text-gray-400">
                                    <li>Go to your dashboard</li>
                                    <li>Click on "Create New Script"</li>
                                    <li>Name your script and select the website you want to track</li>
                                    <li>Copy the generated scriptId and userId</li>
                                </ul>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Layout className="w-4 h-4 text-blue-500" />
                                </div>
                                <h2 className="text-xl font-semibold">2. Choose your implementation method</h2>
                            </div>
                            <p className="text-gray-400">
                                You have two options to implement the tracking script:
                            </p>
                            
                            {/* Option A */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Option A: Inline Script (Recommended)</h3>
                                <p className="text-gray-400">
                                    Add this single line to your website's &lt;head&gt; section. Replace 'your_script_id' and 'your_user_id' with your actual IDs.
                                </p>
                                <div className="relative">
                                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                                        <div className="absolute right-4 top-4">
                                            <button
                                                onClick={() => handleCopy(inlineScript, setCopiedInline)}
                                                className="flex items-center space-x-2 px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                                            >
                                                {copiedInline ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                                <span>{copiedInline ? 'Copied!' : 'Copy'}</span>
                                            </button>
                                        </div>
                                        <pre className="text-gray-300 overflow-x-auto">
                                            {inlineScript}
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            {/* Option B */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Option B: Full Script</h3>
                                <p className="text-gray-400">
                                    Alternatively, you can use the full script version. Add this before the closing &lt;/body&gt; tag.
                                </p>
                                <div className="relative">
                                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                                        <div className="absolute right-4 top-4">
                                            <button
                                                onClick={() => handleCopy(sampleScript, setCopied)}
                                                className="flex items-center space-x-2 px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                                            >
                                                {copied ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                                <span>{copied ? 'Copied!' : 'Copy'}</span>
                                            </button>
                                        </div>
                                        <pre className="text-gray-300 overflow-x-auto">
                                            {sampleScript}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Terminal className="w-4 h-4 text-blue-500" />
                                </div>
                                <h2 className="text-xl font-semibold">3. Verify Installation</h2>
                            </div>
                            <p className="text-gray-400">
                                After adding the script, visit your website and check your dashboard. You should see traffic data appearing within a few minutes.
                            </p>
                            <div className="bg-gray-900 rounded-lg p-4">
                                <ul className="list-disc list-inside space-y-2 text-gray-400">
                                    <li>Visit your website</li>
                                    <li>Check browser console for any errors</li>
                                    <li>View your dashboard to confirm data collection</li>
                                </ul>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-12 p-4 border border-gray-800 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-colors cursor-pointer">
                            <a href="https://aman-raj.xyz" target="_blank" rel="noopener noreferrer" className="block">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Need Help?</h3>
                                        <p className="text-gray-400">
                                            If you have any questions or need assistance, our support team is here to help.
                                        </p>
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-gray-400" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
