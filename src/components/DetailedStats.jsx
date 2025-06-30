import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, TrendingUp, Clock, AlertTriangle, ChevronRight } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function DetailedStats({ gameMode, profileData, onGameAnalysis, onBack }) {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const observerRef = useRef()

  useEffect(() => {
    setIsVisible(true)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observerRef.current?.observe(section))

    return () => observerRef.current?.disconnect()
  }, [])

  const mockDetailedStats = {
    openings: {
      white: [
        { name: "Queen's Gambit", games: 45, winRate: 78, avgOpponentRating: 1620 },
        { name: "Ruy Lopez", games: 38, winRate: 71, avgOpponentRating: 1650 },
        { name: "English Opening", games: 32, winRate: 69, avgOpponentRating: 1580 },
      ],
      black: [
        { name: "Sicilian Defense", games: 42, winRate: 67, avgOpponentRating: 1640 },
        { name: "French Defense", games: 35, winRate: 63, avgOpponentRating: 1610 },
        { name: "Caro-Kann", games: 28, winRate: 71, avgOpponentRating: 1590 },
      ],
    },
    lossReasons: {
      time: 35,
      resignation: 45,
      checkmate: 20,
    },
    ratingProgression: [
      { game: 1, rating: 1200, accuracy: 75 },
      { game: 5, rating: 1250, accuracy: 76 },
      { game: 10, rating: 1300, accuracy: 78 },
      { game: 15, rating: 1380, accuracy: 79 },
      { game: 20, rating: 1420, accuracy: 81 },
      { game: 25, rating: 1480, accuracy: 82 },
      { game: 30, rating: 1520, accuracy: 83 },
      { game: 35, rating: 1580, accuracy: 84 },
      { game: 40, rating: 1620, accuracy: 85 },
      { game: 45, rating: 1650, accuracy: 86 },
    ],
  }

  const AnimatedProgress = ({ value, delay = 0 }) => {
    const [animatedValue, setAnimatedValue] = useState(0)

    useEffect(() => {
      if (!visibleSections.has("opening-analysis")) return

      const timer = setTimeout(() => {
        setAnimatedValue(value)
      }, delay)
      return () => clearTimeout(timer)
    }, [value, delay, visibleSections])

    return <Progress value={animatedValue} className="h-3 rounded-full transition-all duration-1000" />
  }

  const AnimatedNumber = ({ value, section }) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
      if (!visibleSections.has(section)) return

      let startTime
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / 1000, 1)
        setDisplayValue(Math.floor(progress * value))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, [value, section, visibleSections])

    return <span>{displayValue}</span>
  }

  return (
    <div className="min-h-screen relative bg-slate-950">
      {/* Chess-themed background pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
        linear-gradient(45deg, #10b981 25%, transparent 25%), 
        linear-gradient(-45deg, #10b981 25%, transparent 25%), 
        linear-gradient(45deg, transparent 75%, #10b981 75%), 
        linear-gradient(-45deg, transparent 75%, #10b981 75%)
      `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
            transform: `scale(${1 + scrollY* 0.0003})`
          }}
        />
      </div>
      {/* Header */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-400 hover:text-emerald-200 hover:bg-emerald-950/50 rounded-2xl px-6 py-3 transition-all duration-300 group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Overview
            </Button>
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="text-emerald-400 text-sm font-mono mb-2 tracking-wider">
                {gameMode.toUpperCase()} ANALYSIS
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-300 to-slate-100 bg-clip-text text-transparent">
                Deep Dive
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Progress chart */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div
            id="rating-chart"
            data-animate
            className={`transition-all duration-1000 delay-200 ${
              visibleSections.has("rating-chart") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />

              <div className="relative backdrop-blur-xl bg-slate-950/98 rounded-3xl p-8 md:p-12 border-2 border-emerald-800/30 shadow-2xl shadow-emerald-900/10 mb-16">
                {/* Chess coords */}
                <div className="absolute top-4 left-4 text-emerald-400/30 text-xs font-mono">a8</div>
                <div className="absolute bottom-4 right-4 text-emerald-400/30 text-xs font-mono">h1</div>

                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30">
                    <TrendingUp className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-semibold text-white">Rating Journey</h2>
                  <div className="text-emerald-400/60 text-lg ml-auto">♔</div>
                </div>

                <ChartContainer
                  config={{
                    rating: {
                      label: "Rating",
                      color: "hsl(var(--emerald-500))",
                    },
                    accuracy: {
                      label: "Accuracy",
                      color: "hsl(var(--teal-400))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockDetailedStats.ratingProgression}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="game" stroke="#6b7280" tick={{ fill: "#6b7280" }} />
                      <YAxis stroke="#6b7280" tick={{ fill: "#6b7280" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Analysis */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div
            id="opening-analysis"
            data-animate
            className={`transition-all duration-1000 delay-400 ${
              visibleSections.has("opening-analysis") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-semibold text-white mb-12 text-center flex items-center justify-center gap-3">
              <span className="text-emerald-400">♔</span>
              Opening Repertoire
              <span className="text-emerald-400">♕</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* White Pieces */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />

                <div className="relative backdrop-blur-xl bg-slate-950/98 rounded-3xl p-8 border-2 border-emerald-800/30 shadow-2xl shadow-emerald-900/10">
                  {/* Chess coordinates */}
                  <div className="absolute top-3 left-3 text-emerald-400/30 text-xs font-mono">e1</div>

                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-black font-bold">
                      ♔
                    </div>
                    Playing as White
                    <div className="text-emerald-400/60 text-lg ml-auto">1.e4</div>
                  </h3>
                  <div className="space-y-6">
                    {mockDetailedStats.openings.white.map((opening, index) => (
                      <div key={index} className="group transition-all duration-500 hover:scale-105">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-white font-medium text-lg group-hover:text-emerald-300 transition-colors duration-300">
                            {opening.name}
                          </span>
                          <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30">
                            {opening.winRate}%
                          </Badge>
                        </div>
                        <div className="flex justify-between text-slate-400 mb-3 text-sm">
                          <span className="flex items-center gap-2">
                            <span className="text-emerald-400">♔</span>
                            {opening.games} games
                          </span>
                          <span>Avg opponent: {opening.avgOpponentRating}</span>
                        </div>
                        <AnimatedProgress value={opening.winRate} delay={index * 200} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Black Pieces */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />

                <div className="relative backdrop-blur-xl bg-slate-950/98 rounded-3xl p-8 border-2 border-emerald-800/30 shadow-2xl shadow-emerald-900/10">
                  {/* Chess coordinates */}
                  <div className="absolute top-3 right-3 text-emerald-400/30 text-xs font-mono">e8</div>

                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-800 border-2 border-white rounded-full shadow-lg flex items-center justify-center text-white font-bold">
                      ♛
                    </div>
                    Playing as Black
                    <div className="text-emerald-400/60 text-lg ml-auto">1...e5</div>
                  </h3>
                  <div className="space-y-6">
                    {mockDetailedStats.openings.black.map((opening, index) => (
                      <div key={index} className="group transition-all duration-500 hover:scale-105">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-white font-medium text-lg group-hover:text-emerald-300 transition-colors duration-300">
                            {opening.name}
                          </span>
                          <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30">
                            {opening.winRate}%
                          </Badge>
                        </div>
                        <div className="flex justify-between text-slate-400 mb-3 text-sm">
                          <span className="flex items-center gap-2">
                            <span className="text-emerald-400">♛</span>
                            {opening.games} games
                          </span>
                          <span>Avg opponent: {opening.avgOpponentRating}</span>
                        </div>
                        <AnimatedProgress value={opening.winRate} delay={index * 200 + 300} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loss Analysis */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div
            id="loss-analysis"
            data-animate
            className={`transition-all duration-1000 delay-600 ${
              visibleSections.has("loss-analysis") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 rounded-3xl" />

              <div className="relative backdrop-blur-xl bg-slate-950/98 rounded-3xl p-8 md:p-12 border-2 border-red-800/30 shadow-2xl shadow-red-900/10">
                {/* Chess coordinates */}
                <div className="absolute top-4 left-4 text-red-400/30 text-xs font-mono">0-1</div>
                <div className="absolute bottom-4 right-4 text-red-400/30 text-xs font-mono">resign</div>

                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-red-600/20 border border-red-500/30">
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                  </div>
                  <h2 className="text-3xl font-semibold text-white">Loss Pattern Analysis</h2>
                  <div className="text-red-400/60 text-lg ml-auto">♔</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="text-6xl font-bold text-red-300 mb-4 transition-transform duration-300 group-hover:scale-110">
                      <AnimatedNumber value={mockDetailedStats.lossReasons.time} section="loss-analysis" />%
                    </div>
                    <div className="text-slate-300 text-xl mb-4 flex items-center justify-center gap-2">
                      <Clock className="w-5 h-5" />
                      Time Losses
                    </div>
                    <div className="text-red-400/60 text-sm font-mono">Flag Fall</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-6xl font-bold text-orange-300 mb-4 transition-transform duration-300 group-hover:scale-110">
                      <AnimatedNumber value={mockDetailedStats.lossReasons.resignation} section="loss-analysis" />%
                    </div>
                    <div className="text-slate-300 text-xl mb-4 flex items-center justify-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Resignations
                    </div>
                    <div className="text-orange-400/60 text-sm font-mono">1-0</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-6xl font-bold text-yellow-300 mb-4 transition-transform duration-300 group-hover:scale-110">
                      <AnimatedNumber value={mockDetailedStats.lossReasons.checkmate} section="loss-analysis" />%
                    </div>
                    <div className="text-slate-300 text-xl mb-4 flex items-center justify-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Checkmates
                    </div>
                    <div className="text-yellow-400/60 text-sm font-mono">#</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div
            id="cta-section"
            data-animate
            className={`transition-all duration-1000 delay-800 ${
              visibleSections.has("cta-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />

              <div className="relative backdrop-blur-xl bg-slate-950/98 rounded-3xl p-8 md:p-12 border-2 border-emerald-700/40 shadow-2xl shadow-emerald-900/20">
                {/* Chess coordinates */}
                <div className="absolute top-4 left-4 text-emerald-400/30 text-xs font-mono">analyze</div>
                <div className="absolute bottom-4 right-4 text-emerald-400/30 text-xs font-mono">games</div>

                <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                  <span className="text-emerald-400">♔</span>
                  Ready for Game Analysis?
                  <span className="text-emerald-400">♕</span>
                </h2>
                <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                  Dive deeper into your recent games with advanced{" "}
                  <span className="text-emerald-400 font-semibold">Stockfish</span> analysis and AI-powered insights
                </p>
                <Button
                  onClick={onGameAnalysis}
                  className="h-16 px-12 text-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="flex items-center gap-2">
                    ♔ Analyze Recent Games
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}