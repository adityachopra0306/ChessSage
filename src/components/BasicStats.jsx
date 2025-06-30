import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Trophy, ChevronRight, Clock, Target } from "lucide-react"

export function BasicStats({ profileData, onDetailedAnalysis, onBack }) {
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
      { threshold: 0.2 },
    )

    const sections = document.querySelectorAll("[data-animate]")
    sections.forEach((section) => observerRef.current?.observe(section))

    return () => observerRef.current?.disconnect()
  }, [])

  const mockStats = {
    profile: {
      name: "ChessMaster2024",
      country: "India",
      totalGames: 1275,
      winRate: 66,
      whiteGames: 623,
      blackGames: 624,
      rating: 160,
    },
    gameModes: [
      {
        name: "Blitz",
        games: 456,
        winRateWhite: 55,
        winRateBlack: 49,
        currentRating: 1650,
        peakRating: 1720,
        timeControl: "3+0",
        icon: "⚡",
        color: "from-emerald-500 to-teal-600",
      },
      {
        name: "Rapid",
        games: 234,
        winRateWhite: 75,
        winRateBlack: 68,
        currentRating: 1720,
        peakRating: 1780,
        timeControl: "10+0",
        icon: "🎯",
        color: "from-emerald-600 to-green-700",
      },
      {
        name: "Bullet",
        games: 557,
        winRateWhite: 69,
        winRateBlack: 62,
        currentRating: 1580,
        peakRating: 1620,
        timeControl: "1+0",
        icon: "🚀",
        color: "from-teal-500 to-emerald-600",
      },
    ],
  }

  const AnimatedNumber = ({ value, duration = 2000 }) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
      if (!visibleSections.has("profile-overview")) return

      let startTime
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setDisplayValue(Math.floor(progress * value))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, [value, duration, visibleSections])

    return <span>{displayValue}</span>
  }

  return (
    <div className="min-h-screen relative">
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
              Back to Setup
            </Button>
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="text-emerald-400 text-sm font-mono mb-2 tracking-wider">PLAYER ANALYSIS</div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-300 to-slate-100 bg-clip-text text-transparent">
                Profile Overview
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Overview */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div
            id="profile-overview"
            data-animate
            className={`transition-all duration-1000 delay-200 ${
              visibleSections.has("profile-overview") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Chess board styled container */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />

              <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-950/98 to-slate-900/98 rounded-3xl p-8 md:p-12 border-2 border-emerald-800/30 shadow-2xl shadow-emerald-900/10 mb-16">
                {/* Chess coordinates */}
                <div className="absolute top-4 left-4 text-emerald-400/30 text-xs font-mono">e8</div>
                <div className="absolute bottom-4 right-4 text-emerald-400/30 text-xs font-mono">e1</div>

                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30">
                    <Trophy className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-semibold text-white">Player Statistics</h2>
                  <div className="text-emerald-400/60 text-lg ml-auto">♔</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="text-center md:text-left">
                    <p className="text-slate-400 text-lg mb-2 flex items-center gap-2">
                      <span className="text-emerald-400">♔</span>
                      Player
                    </p>
                    <p className="text-3xl font-bold text-white mb-4">{mockStats.profile.name}</p>
                    <Badge className="bg-emerald-900/30 text-emerald-200 border-emerald-700/50 px-4 py-2 text-base">
                      {mockStats.profile.country}
                    </Badge>
                  </div>

                  <div className="text-center">
                    <p className="text-slate-400 text-lg mb-2">Total Games</p>
                    <p className="text-5xl font-bold text-white mb-4">
                      <AnimatedNumber value={mockStats.profile.totalGames} />
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Badge variant="outline" className="border-slate-600 text-slate-300 px-2 py-1 text-sm">
                        ♔ {mockStats.profile.whiteGames}
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300 px-2 py-1 text-sm">
                        ♛ {mockStats.profile.blackGames}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-slate-400 text-lg mb-2">Win Rate</p>
                    <p className="text-5xl font-bold text-emerald-400 mb-4">
                      <AnimatedNumber value={mockStats.profile.winRate} />%
                    </p>
                    <div className="max-w-xs mx-auto">
                      <Progress
                        value={visibleSections.has("profile-overview") ? mockStats.profile.winRate : 0}
                        className="h-3 rounded-full transition-all duration-1000 delay-500"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-slate-400 text-lg mb-2">Current Rating</p>
                    <p className="text-5xl font-bold text-emerald-400 mb-4">
                      <AnimatedNumber value={mockStats.profile.rating} />
                    </p>
                    <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30 px-3 py-1">
                      Active Player
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div
            id="game-modes"
            data-animate
            className={`transition-all duration-1000 delay-400 ${
              visibleSections.has("game-modes") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-semibold text-white mb-12 text-center flex items-center justify-center gap-3">
              <span className="text-emerald-400">♔</span>
              Time Controls
              <span className="text-emerald-400">♕</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {mockStats.gameModes.map((mode, index) => (
                <div
                  key={mode.name}
                  className={`group relative overflow-hidden rounded-3xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 ${
                    visibleSections.has("game-modes") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                >
                  {/* Chess square styling */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 via-transparent to-emerald-600/20 rounded-3xl" />

                  <div className="relative backdrop-blur-xl bg-slate-950/98 p-8 border-2 border-emerald-800/30 rounded-3xl h-full shadow-lg group-hover:shadow-2xl group-hover:shadow-emerald-500/10 transition-all duration-300">
                    {/* Chess notation */}
                    <div className="absolute top-3 left-3 text-emerald-400/30 text-xs font-mono">
                      {String.fromCharCode(97 + index)}
                      {8 - index}
                    </div>
                    <div className="absolute top-3 right-3 text-emerald-400/40 text-2xl">{mode.icon}</div>

                    <div className="flex items-center justify-between mb-6 mt-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                        {mode.name}
                      </h3>
                      <Badge className="bg-emerald-900/30 text-emerald-200 border-emerald-700/50 px-3 py-1">
                        {mode.timeControl}
                      </Badge>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/80 border border-emerald-800/20">
                        <span className="text-slate-400 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Games Played
                        </span>
                        <span className="text-white font-semibold">{mode.games}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 rounded-xl bg-slate-950/80 border border-emerald-800/20">
                          <p className="text-slate-400 mb-1 text-sm">♔ White</p>
                          <p className="text-xl font-bold text-emerald-400">{mode.winRateWhite}%</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-slate-950/80 border border-emerald-800/20">
                          <p className="text-slate-400 mb-1 text-sm">♛ Black</p>
                          <p className="text-xl font-bold text-emerald-400">{mode.winRateBlack}%</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 rounded-lg bg-slate-950/70">
                          <span className="text-slate-400 text-sm">Current Rating</span>
                          <span className="text-emerald-400 font-semibold">{mode.currentRating}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg bg-slate-950/70">
                          <span className="text-slate-400 text-sm">Peak Rating</span>
                          <span className="text-yellow-400 font-semibold">{mode.peakRating}</span>
                        </div>
                      </div>
                    </div>

                    {mode.games > 20 && (
                      <Button
                        onClick={() => onDetailedAnalysis(mode.name)}
                        className={`w-full h-12 bg-gradient-to-r ${mode.color} hover:shadow-lg hover:shadow-emerald-500/20 text-white rounded-2xl transition-all duration-300 transform group-hover:scale-105 relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="flex items-center gap-2">
                          ♔ Analyze {mode.name}
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Summary */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div
            id="ai-summary"
            data-animate
            className={`transition-all duration-1000 delay-800 ${
              visibleSections.has("ai-summary") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />

              <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-950/98 to-slate-900/98 rounded-3xl p-8 md:p-12 border-2 border-emerald-700/40 shadow-2xl shadow-emerald-900/20">
                {/* Chess coordinates */}
                <div className="absolute top-4 left-4 text-emerald-400/30 text-xs font-mono">d4</div>
                <div className="absolute bottom-4 right-4 text-emerald-400/30 text-xs font-mono">d5</div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30">
                    <Target className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Strategic Assessment</h2>
                  <div className="text-emerald-400/60 text-lg ml-auto">♗</div>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Your chess profile shows{" "}
                  <span className="text-emerald-400 font-semibold">strong tactics</span> across longer time
                  controls with consistent rating improvement. White piece advantage suggests solid opening preparation,
                  while your rapid performance indicates
                  <span className="text-emerald-400 font-semibold"> excellent positional understanding</span>. High
                  blitz volume but low win rate demonstrates issues with balancing calculation and time pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
