"use client"
import { useState, useEffect } from 'react'

// We'll load Prism only on the client side
let Prism: any
if (typeof window !== 'undefined') {
    Prism = require('prismjs')
    require('prismjs/components/prism-javascript')
    require('prismjs/components/prism-python')
    require('prismjs/components/prism-java')
    require('prismjs/components/prism-bash')
    require('prismjs/themes/prism-tomorrow.css')
    // Load PHP language after core Prism is loaded
    require('prismjs/components/prism-markup-templating')
    require('prismjs/components/prism-php')
}

const codeExamples = {
    nodejs: {
        title: 'Node.js',
        icon: (
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        code: `const axios = require('axios');

const solve = async () => {
  const response = await axios.post('https://iconcaptcha-solver.vercel.app/v1/solve', {
    token: 'YOUR_TOKEN',
    image: 'BASE64_OR_URL'
  });
  console.log(response.data);
};

solve();`
    },
    python: {
        title: 'Python',
        icon: (
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        code: `import requests

response = requests.post(
    'https://iconcaptcha-solver.vercel.app/v1/solve',
    json={
        'token': 'YOUR_TOKEN',
        'image': 'BASE64_OR_URL'
    }
)
print(response.json())`
    },
    php: {
        title: 'PHP',
        icon: (
            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        code: `<?php
$data = array(
    'token' => 'YOUR_TOKEN',
    'image' => 'BASE64_OR_URL'
);

$ch = curl_init('https://iconcaptcha-solver.vercel.app/v1/solve');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$response = curl_exec($ch);
curl_close($ch);

echo $response;`
    },
    java: {
        title: 'Java',
        icon: (
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        code: `import java.net.http.*;
import java.net.URI;

public class IconCaptchaSolver {
    public static void main(String[] args) throws Exception {
        String json = """
            {
                "token": "YOUR_TOKEN",
                "image": "BASE64_OR_URL"
            }
            """;
            
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://iconcaptcha-solver.vercel.app/v1/solve"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();

        HttpResponse<String> response = client.send(
            request, 
            HttpResponse.BodyHandlers.ofString()
        );
        System.out.println(response.body());
    }
}`
    },
    curl: {
        title: 'cURL',
        icon: (
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        code: `curl -X POST https://iconcaptcha-solver.vercel.app/v1/solve \\
  -H "Content-Type: application/json" \\
  -d '{
    "token": "YOUR_TOKEN",
    "image": "BASE64_OR_URL"
  }'`
    }
}

export default function CodeExamples() {
    const [activeTab, setActiveTab] = useState<keyof typeof codeExamples>('nodejs')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && typeof window !== 'undefined') {
            // Small delay to ensure the DOM is ready
            setTimeout(() => {
                Prism?.highlightAll()
            }, 0)
        }
    }, [activeTab, mounted])

    if (!mounted) {
        return null
    }

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(codeExamples).map(([key, { title, icon }]) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key as keyof typeof codeExamples)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === key
                            ? 'bg-white/20 text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {icon}
                        {title}
                    </button>
                ))}
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl hover:border-white/20 transition-colors">
                <pre className="bg-[#2d2d2d] p-4 rounded-lg overflow-x-auto">
                    <code className={`language-${activeTab === 'curl' ? 'bash' : activeTab === 'nodejs' ? 'javascript' : activeTab}`}>
                        {codeExamples[activeTab].code}
                    </code>
                </pre>
            </div>
        </div>
    )
}