// DocumentationPage.jsx
import React from 'react';
import { Code2, Copy, ExternalLink, Terminal, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.png'

export default function DocumentationPage() {
    const [copied, setCopied] = useState(false);

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

    const handleCopy = () => {
        navigator.clipboard.writeText(sampleScript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                                    <Terminal className="w-4 h-4 text-blue-500" />
                                </div>
                                <h2 className="text-xl font-semibold">1. Add the tracking script</h2>
                            </div>
                            <p className="text-gray-400">
                                Copy and paste this script into your website's HTML, just before the closing &lt;/body&gt; tag.
                            </p>
                            <div className="relative">
                                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                                    <div className="absolute right-4 top-4">
                                        <button
                                            onClick={handleCopy}
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

                        {/* Step 2 */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Code2 className="w-4 h-4 text-blue-500" />
                                </div>
                                <h2 className="text-xl font-semibold">2. View your analytics</h2>
                            </div>
                            <p className="text-gray-400">
                                Once installed, your website traffic will be automatically tracked. Visit your dashboard to view analytics.
                            </p>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                <span>Open Dashboard</span>
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-12 p-4 border border-gray-800 rounded-lg bg-gray-900/50">
                        <h3 className="text-lg font-medium mb-2">Need Help?</h3>
                        <p className="text-gray-400">
                            If you have any questions or need assistance, our support team is here to help.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
