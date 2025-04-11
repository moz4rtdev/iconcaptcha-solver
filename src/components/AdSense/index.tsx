'use client'

import { useEffect } from 'react'

interface WatchAdProps {
    onLoad?: () => void
    className?: string
}

declare global {
    interface Window {
        adsbygoogle: any[]
    }
}

export default function WatchAd({ onLoad, className }: WatchAdProps) {
    useEffect(() => {
        // Load AdSense script
        const script = document.createElement('script')
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1372819950640997'
        script.async = true
        script.crossOrigin = 'anonymous'
        document.head.appendChild(script)

        script.onload = () => {
            try {
                // Push the ad after script loads
                (window.adsbygoogle = window.adsbygoogle || []).push({})
                // Simulate ad view completion after a delay
                setTimeout(() => {
                    onLoad?.()
                }, 5000) // Wait 5 seconds before allowing continue
            } catch (error) {
                console.error('Error loading AdSense:', error)
            }
        }

        return () => {
            // Cleanup
            document.head.removeChild(script)
        }
    }, [onLoad])

    return (
        <div className={className}>
            <div className="bg-black rounded-lg overflow-hidden p-4">
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-1372819950640997"
                    data-ad-slot="3703153279"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </div>
    )
}