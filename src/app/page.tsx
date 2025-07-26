import ShowCaptcha from "@/components/showCaptcha";
import CodeExamples from "@/components/CodeExamples";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-blob"></div>
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl top-1/2 right-0 animate-blob animation-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl bottom-0 left-1/2 animate-blob animation-delay-4000"></div>
      </div>

      <header className="relative w-full py-8 px-4 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-[500px]:flex-col max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              IconCaptcha
            </span>
            <span className="text-white">Solver</span>
          </h1>
          <nav>
            <Link
              href="https://t.me/moz4rtdev"
              className="max-[500px]:mt-3 flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 backdrop-blur-sm "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              Get API Token
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
            Solve IconCaptchas with AI
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experience the power of our advanced AI technology that
            automatically solves IconCaptcha challenges with remarkable
            accuracy. Try our live demo below.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left column - Demo */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl hover:border-white/20 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Live Demo
              </h3>
              <div className="flex justify-center">
                <ShowCaptcha />
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl hover:border-white/20 transition-colors">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                How It Works
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Our advanced AI model analyzes the IconCaptcha pattern and
                identifies the correct icon position with exceptional accuracy,
                providing instant results.
              </p>
            </div>
          </div>

          {/* Right column - Features */}
          <div className="lg:col-span-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl hover:border-white/20 transition-colors h-full">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  Features
                </h4>
                <span className="px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 rounded-full">
                  Production Ready
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl p-4 border border-blue-400/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-400/20 rounded-lg">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h5 className="font-semibold text-white">Lightning Fast</h5>
                  </div>
                  <p className="text-sm text-gray-300">
                    Average response time under 1 second with our optimized AI
                    model
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-400/20 rounded-lg">
                        <svg
                          className="w-5 h-5 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white">
                          High Accuracy
                        </h5>
                        <p className="text-xs text-gray-400">
                          99.9% success rate
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-400/20 rounded-lg">
                        <svg
                          className="w-5 h-5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                          />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white">REST API</h5>
                        <p className="text-xs text-gray-400">
                          Simple integration
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-yellow-400/20 rounded-lg">
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white">
                          Theme Support
                        </h5>
                        <p className="text-xs text-gray-400">
                          Light & dark mode
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-pink-400/20 rounded-lg">
                        <svg
                          className="w-5 h-5 text-pink-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white">Support</h5>
                        <p className="text-xs text-gray-400">24/7 assistance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Usage Examples Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
            <svg
              className="w-8 h-8 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            API Usage Examples
          </h3>

          <CodeExamples />
        </div>
      </main>

      <footer className="relative w-full py-8 px-4 bg-black/40 backdrop-blur-md border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 IconCaptcha Solver. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
