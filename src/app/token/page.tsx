'use client'

import { useState } from 'react'
import Link from 'next/link'
import WatchAd from '@/components/AdSense'

export default function TokenPage() {
    const [token, setToken] = useState<string>('')
    const [email, setEmail] = useState('')
    const [existingToken, setExistingToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const [mode, setMode] = useState<'generate' | 'add'>('generate')
    const [showAd, setShowAd] = useState(false)

    const handleAction = () => {
        if (mode === 'generate' && !email) {
            setError('Please enter your email address')
            return
        }
        if (mode === 'add' && !existingToken) {
            setError('Please enter your token')
            return
        }

        setError('')
        setShowAd(true)
    }

    const generateToken = async () => {
        try {
            setLoading(true)
            setError('')
            const response = await fetch('/api/v1/token/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to generate token')
            }

            const data = await response.json()
            setToken(data.id)
            setShowAd(false)
        } catch (err: any) {
            setError(err.message || 'Failed to generate token. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const addCredits = async () => {
        try {
            setLoading(true)
            setError('')
            const response = await fetch(`/api/v1/token/${existingToken}`, {
                method: 'PUT'
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to add credits')
            }

            const data = await response.json()
            setToken(existingToken)
            setShowAd(false)
        } catch (err: any) {
            setError(err.message || 'Failed to add credits. Please check your token and try again.')
        } finally {
            setLoading(false)
        }
    }

    const onAdLoad = () => {
        // Quando o anúncio carregar, processar a ação
        if (mode === 'generate') {
            generateToken()
        } else {
            addCredits()
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            <div className="relative max-w-7xl mx-auto px-4 py-16">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">API Token Manager</h1>
                        <p className="text-gray-300">
                            {mode === 'generate'
                                ? 'Generate a new API token by providing your email address'
                                : 'Add credits to your existing token'}
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl mb-8">
                        <div className="mb-8">
                            <div className="flex justify-center space-x-4 mb-8">
                                <button
                                    onClick={() => {
                                        setMode('generate')
                                        setShowAd(false)
                                        setToken('')
                                        setError('')
                                    }}
                                    className={`px-4 py-2 rounded-lg transition-colors ${mode === 'generate'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    Generate New Token
                                </button>
                                <button
                                    onClick={() => {
                                        setMode('add')
                                        setShowAd(false)
                                        setToken('')
                                        setError('')
                                    }}
                                    className={`px-4 py-2 rounded-lg transition-colors ${mode === 'add'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    Add Credits
                                </button>
                            </div>

                            {!token && !showAd && (
                                <div className="space-y-6">
                                    {mode === 'generate' ? (
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your email address"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <label htmlFor="token" className="block text-sm font-medium text-gray-300 mb-2">
                                                Your Token
                                            </label>
                                            <input
                                                type="text"
                                                id="token"
                                                value={existingToken}
                                                onChange={(e) => setExistingToken(e.target.value)}
                                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your existing token"
                                            />
                                        </div>
                                    )}

                                    <button
                                        onClick={handleAction}
                                        disabled={loading || (mode === 'generate' ? !email : !existingToken)}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg px-6 py-3 font-medium hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {mode === 'generate' ? 'Generate Token' : 'Add Credits'}
                                    </button>
                                </div>
                            )}

                            {showAd && (
                                <div className="mt-8">
                                    <div className="text-center mb-6">
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {mode === 'generate' ? 'Watch Video to Generate Token' : 'Watch Video to Add Credits'}
                                        </h3>
                                        <p className="text-gray-400">
                                            Please watch the video completely to continue
                                        </p>
                                    </div>

                                    <WatchAd
                                        key={mode} // Add this line to force remount
                                        onLoad={onAdLoad}
                                        className="max-w-xl mx-auto"
                                    />

                                    {loading && (
                                        <div className="mt-4 text-center">
                                            <div className="inline-flex items-center gap-2 text-blue-400">
                                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Processing...
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {token && (
                                <div className="text-center">
                                    <div className="mb-8">
                                        <div className="w-16 h-16 bg-green-400/20 rounded-full mx-auto flex items-center justify-center mb-4">
                                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                            {mode === 'generate' ? 'Token Generated!' : 'Credits Added!'}
                                        </h2>
                                        <p className="text-gray-400 mb-6">
                                            {mode === 'generate'
                                                ? 'Your API token has been generated successfully. Make sure to copy and save it in a secure location.'
                                                : 'Credits have been added to your token successfully.'}
                                        </p>
                                    </div>

                                    <div className="bg-black/30 rounded-lg p-4 mb-6">
                                        <p className="font-mono text-blue-400 break-all">{token}</p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(token)
                                        }}
                                        className="w-full bg-white/10 text-white rounded-lg px-6 py-3 font-medium hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                                    >
                                        Copy Token
                                    </button>
                                </div>
                            )}

                            {error && (
                                <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}