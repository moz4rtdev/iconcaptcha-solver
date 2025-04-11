'use client'

import { useEffect, useState } from 'react'

interface WatchAdProps {
    onLoad?: () => void
    className?: string
}

interface YouTubePlayer {
    Player: {
        new(elementId: string, config: {
            videoId: string
            height?: string
            width?: string
            events?: {
                onStateChange?: (event: { data: number }) => void
            }
        }): void
    }
    PlayerState: {
        ENDED: number
    }
}

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void
        YT: YouTubePlayer
    }
}

export default function WatchAd({ onLoad, className }: WatchAdProps) {
    const [videoEnded, setVideoEnded] = useState(false)
    const [player, setPlayer] = useState<any>(null)

    useEffect(() => {
        let isMounted = true;
        setVideoEnded(false)

        // Function to create the player
        const createPlayer = () => {
            if (!isMounted) return;

            const playerDiv = document.createElement('div')
            playerDiv.id = 'youtube-player'
            playerDiv.className = 'absolute inset-0'

            const container = document.querySelector('[data-youtube-container]')
            if (container) {
                container.innerHTML = ''
                container.appendChild(playerDiv)

                const ytPlayer = new window.YT.Player('youtube-player', {
                    videoId: 'nNkw3Fo9Aqk',
                    height: '315',
                    width: '560',
                    events: {
                        onStateChange: (event: { data: number }) => {
                            if (!isMounted) return;
                            if (event.data === window.YT.PlayerState.ENDED) {
                                setVideoEnded(true)
                                onLoad?.()
                            }
                        }
                    }
                })
                setPlayer(ytPlayer)
            }
        }

        // Check if YT API is already loaded
        if (window.YT && window.YT.Player) {
            createPlayer()
        } else {
            // Load YouTube API if not already loaded
            if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                const tag = document.createElement('script')
                tag.src = 'https://www.youtube.com/iframe_api'
                const firstScriptTag = document.getElementsByTagName('script')[0]
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
            }

            // Setup YouTube player when API is ready
            window.onYouTubeIframeAPIReady = () => {
                if (!isMounted) return;
                createPlayer()
            }
        }

        return () => {
            isMounted = false
            if (player?.destroy) {
                try {
                    player.destroy()
                } catch (e) {
                    console.error('Error destroying player:', e)
                }
            }
            setPlayer(null)
            setVideoEnded(false)
        }
    }, [onLoad])

    return (
        <div className={className}>
            <div className="aspect-video relative bg-black rounded-lg overflow-hidden" data-youtube-container>
            </div>
            {videoEnded && (
                <div className="mt-4 text-center text-green-400">
                    <p>✓ Video watched - processing your request...</p>
                </div>
            )}
        </div>
    )
}