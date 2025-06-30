import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Target, Zap, BarChart3, Clock } from "lucide-react"
export function GameAnalysis({ profileData, onBack }) {
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

  const mockGames = [
    {
      id: 1,
      opponent: "ChessPlayer2022",
      opponentRating: 1720,
      date: "2024-01-15",
      moves: 42,
      result: "0-1",
      lossReason: "Time",
      opening: "Fried Liver Attack",
      openingCode: "C40",
      openingAccuracy: 65,
      blunders: { opening: 0, middlegame: 2, endgame: 1 },
      mistakes: { opening: 1, middlegame: 3, endgame: 2 },
      avgTimePerMove: 12.5,
      evaluation: [-0.2, 0.1, -0.5, -1.2, -2.8, -4.5],
    },
    {
      id: 2,
      opponent: "TacticalNinja",
      opponentRating: 1680,
      date: "2024-01-14",
      moves: 38,
      result: "0-1",
      lossReason: "Resignation",
      opening: "Englund Gambit",
      openingCode: "D11",
      openingAccuracy: 92,
      blunders: { opening: 0, middlegame: 1, endgame: 0 },
      mistakes: { opening: 0, middlegame: 2, endgame: 1 },
      avgTimePerMove: 15.2,
      evaluation: [0.3, 0.1, -0.3, -0.8, -2.1, -3.5],
    },
  ]

  const heatmapData = {
    opening: 15,
    middlegame: 65,
    endgame: 20,
  }

  const AnimatedBar = ({ value, delay = 0 }) => {
    const [height, setHeight] = useState(0)

    useEffect(() => {
      if (!visibleSections.has("game-analysis")) return

      const timer = setTimeout(() => {
        setHeight(Math.abs(value) * 25 + 30)
      }, delay)
      return () => clearTimeout(timer)
    }, [value, delay, visibleSections])

    return (
      <div
        className={`w-12 rounded-t-lg transition-all duration-1000 ${
          value > 0 ? "bg-gradient-to-t from-emerald-600 to-emerald-400" : "bg-gradient-to-t from-red-600 to-red-400"
        }`}
        style={{ height: `${height}px` }}
        title={`Move ${delay / 100 + 1}: ${value}`}
      />
    )
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
      {/* background pattern */}
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
            transform: `scale(${1 + scrollY* 0.0001})`
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
              Back to Analysis
            </Button>
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="text-emerald-400 text-sm font-mono mb-2 tracking-wider">GAME ANALYSIS</div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-300 to-slate-100 bg-clip-text text-transparent">
                Recent Games
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Blunders*/}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div
            id="blunder-heatmap"
            data-animate
            className={`transition-all duration-1000 delay-200 ${
              visibleSections.has("blunder-heatmap") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 rounded-3xl" />

              <div className="relative backdrop-blur-xl bg-slate-950/98 rounded-3xl p-8 md:p-12 border-2 border-red-800/30 shadow-2xl shadow-red-900/10">
                {/* Chess coordinates */}
                <div className="absolute top-4 left-4 text-red-400/30 text-xs font-mono">blunder</div>
                <div className="absolute bottom-4 right-4 text-red-400/30 text-xs font-mono">??</div>

                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-red-600/20 border border-red-500/30">
                    <Target className="h-8 w-8 text-red-400" />
                  </div>
                  <h2 className="text-3xl font-semibold text-white">Mistake Distribution</h2>
                  <div className="text-red-400/60 text-lg ml-auto">♔</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="text-5xl font-bold text-emerald-300 mb-4 transition-transform duration-300 group-hover:scale-110">
                      <AnimatedNumber value={heatmapData.opening} section="blunder-heatmap" />%
                    </div>
                    <div className="text-gray-300 text-xl mb-4 flex items-center justify-center gap-2">
                      <span className="text-emerald-400">♔</span>
                      Opening
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-emerald-800/30">
                      <div
                        className={`h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000 delay-500`}
                        style={{
                          width: visibleSections.has("blunder-heatmap") ? `${heatmapData.opening}%` : "0%",
                        }}
                      />
                    </div>
                    <div className="text-emerald-400/60 text-xs font-mono mt-2">1-10 moves</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-5xl font-bold text-red-300 mb-4 transition-transform duration-300 group-hover:scale-110">
                      <AnimatedNumber value={heatmapData.middlegame} section="blunder-heatmap" />%
                    </div>
                    <div className="text-gray-300 text-xl mb-4 flex items-center justify-center gap-2">
                      <span className="text-red-400">♕</span>
                      Middlegame
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-red-800/30">
                      <div
                        className={`h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-1000 delay-700`}
                        style={{
                          width: visibleSections.has("blunder-heatmap") ? `${heatmapData.middlegame}%` : "0%",
                        }}
                      />
                    </div>
                    <div className="text-red-400/60 text-xs font-mono mt-2">11-30 moves</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-5xl font-bold text-yellow-300 mb-4 transition-transform duration-300 group-hover:scale-110">
                      <AnimatedNumber value={heatmapData.endgame} section="blunder-heatmap" />%
                    </div>
                    <div className="text-gray-300 text-xl mb-4 flex items-center justify-center gap-2">
                      <span className="text-yellow-400">♖</span>
                      Endgame
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-yellow-800/30">
                      <div
                        className={`h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-1000 delay-900`}
                        style={{
                          width: visibleSections.has("blunder-heatmap") ? `${heatmapData.endgame}%` : "0%",
                        }}
                      />
                    </div>
                    <div className="text-yellow-400/60 text-xs font-mono mt-2">31+ moves</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Analysis */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div
            id="game-analysis"
            data-animate
            className={`transition-all duration-1000 delay-400 ${
              visibleSections.has("game-analysis") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Tabs defaultValue="game-1" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-950/98 backdrop-blur-xl border-2 border-emerald-800/20 rounded-2xl p-2 mb-8 shadow-2xl">
                {mockGames.map((game) => (
                  <TabsTrigger
                    key={game.id}
                    value={`game-${game.id}`}
                    className="data-[state=active]:bg-emerald-950/70 data-[state=active]:text-emerald-200 rounded-xl py-3 text-lg transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-emerald-400">♔</span>
                      vs {game.opponent}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {mockGames.map((game) => (
                <TabsContent key={game.id} value={`game-${game.id}`} className="space-y-8">
                  {/* Game Header */}
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />

                    <div className="relative backdrop-blur-xl bg-slate-950/98 rounded-3xl p-8 border-2 border-emerald-800/30 shadow-2xl shadow-emerald-900/10">
                      {/* Chess coord */}
                      <div className="absolute top-4 left-4 text-emerald-400/30 text-xs font-mono">{game.result}</div>
                      <div className="absolute top-4 right-4 text-emerald-400/30 text-xs font-mono">{game.date}</div>

                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                          <span className="text-emerald-400">♔</span>
                          vs {game.opponent}
                        </h3>
                        <Badge variant="destructive" className="px-4 py-2 text-lg">
                          Loss by {game.lossReason}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center p-4 rounded-xl bg-slate-950/80 border border-emerald-800/20">
                          <p className="text-gray-500 mb-2 flex items-center justify-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Opponent Rating
                          </p>
                          <p className="text-2xl font-bold text-white">{game.opponentRating}</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-slate-950/80 border border-emerald-800/20">
                          <p className="text-gray-500 mb-2 flex items-center justify-center gap-2">
                            <span className="text-emerald-400">♔</span>
                            Moves
                          </p>
                          <p className="text-2xl font-bold text-white">{game.moves}</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-slate-950/80 border border-emerald-800/20">
                          <p className="text-gray-500 mb-2 flex items-center justify-center gap-2">
                            <Clock className="w-4 h-4" />
                            Avg Time/Move
                          </p>
                          <p className="text-2xl font-bold text-white">{game.avgTimePerMove}s</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-slate-950/80 border border-emerald-800/20">
                          <p className="text-gray-500 mb-2 flex items-center justify-center gap-2">
                            <span className="text-emerald-400">♕</span>
                            Opening
                          </p>
                          <p className="text-lg font-bold text-emerald-400">{game.openingCode}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Opening Analysis */}
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />

                    <div className="relative backdrop-blur-xl bg-slate-950/98 rounded-3xl p-8 border-2 border-emerald-800/30 shadow-2xl shadow-emerald-900/10">
                      {/* Chess coords */}
                      <div className="absolute top-4 right-4 text-emerald-400/30 text-xs font-mono">
                        {game.openingCode}
                      </div>

                      <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30">
                          <Target className="w-5 h-5 text-emerald-400" />
                        </div>
                        Opening Performance
                        <div className="text-emerald-400/60 text-lg ml-auto">♔</div>
                      </h4>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-white text-xl font-medium flex items-center gap-2">
                          <span className="text-emerald-400">♔</span>
                          {game.opening}
                        </span>
                        <Badge className="bg-emerald-600/20 text-emerald-300 px-4 py-2 text-lg border border-emerald-500/30">
                          {game.openingAccuracy}% Accuracy
                        </Badge>
                      </div>
                      <Progress
                        value={visibleSections.has("game-analysis") ? game.openingAccuracy : 0}
                        className="h-4 rounded-full transition-all duration-1000 delay-300"
                      />
                    </div>
                  </div>

                  {/* Error section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["opening", "middlegame", "endgame"].map((phase, index) => (
                      <div key={phase} className="relative transition-all duration-500 hover:scale-105">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />

                        <div className="relative backdrop-blur-xl bg-slate-950/98 rounded-3xl p-6 border-2 border-emerald-800/30 shadow-2xl shadow-emerald-900/10">
                          {/* Chess coord */}
                          <div className="absolute top-2 right-2 text-emerald-400/30 text-xs font-mono">
                            {phase === "opening" ? "♔" : phase === "middlegame" ? "♕" : "♖"}
                          </div>

                          <h5 className="text-xl font-bold text-white mb-4 capitalize flex items-center gap-2">
                            <span className="text-emerald-400">
                              {phase === "opening" ? "♔" : phase === "middlegame" ? "♕" : "♖"}
                            </span>
                            {phase}
                          </h5>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950/80 border border-red-800/20">
                              <span className="text-red-400 flex items-center gap-2">
                                <span className="text-red-400">??</span>
                                Blunders
                              </span>
                              <span className="text-white text-xl font-bold">{game.blunders[phase]}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950/80 border border-orange-800/20">
                              <span className="text-orange-400 flex items-center gap-2">
                                <span className="text-orange-400">?</span>
                                Mistakes
                              </span>
                              <span className="text-white text-xl font-bold">{game.mistakes[phase]}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Eval Graph */}
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />

                    <div className="relative backdrop-blur-xl bg-slate-950/98 rounded-3xl p-8 border-2 border-emerald-800/30 shadow-2xl shadow-emerald-900/10">
                      {/* Chess coord */}
                      <div className="absolute top-4 left-4 text-emerald-400/30 text-xs font-mono">eval</div>
                      <div className="absolute bottom-4 right-4 text-emerald-400/30 text-xs font-mono">±</div>

                      <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30">
                          <BarChart3 className="w-5 h-5 text-emerald-400" />
                        </div>
                        Position Evaluation
                        <div className="text-emerald-400/60 text-lg ml-auto">♔</div>
                      </h4>
                      <div className="h-40 bg-slate-950/80 rounded-2xl flex items-end justify-around p-6 border-2 border-emerald-900/30">
                        {game.evaluation.map((evaluation, index) => (
                          <AnimatedBar key={index} value={evaluation} delay={index * 100} />
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mt-2 px-6">
                        <span>Move 1</span>
                        <span>Move {game.evaluation.length}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Final Analysis */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div
            id="final-analysis"
            data-animate
            className={`transition-all duration-1000 delay-800 ${
              visibleSections.has("final-analysis") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />

              <div className="relative backdrop-blur-xl bg-slate-950/98 rounded-3xl p-8 md:p-12 border-2 border-emerald-700/40 shadow-2xl shadow-emerald-900/20">
                {/* Chess coord*/}
                <div className="absolute top-4 left-4 text-emerald-400/30 text-xs font-mono">analysis</div>
                <div className="absolute bottom-4 right-4 text-emerald-400/30 text-xs font-mono">complete</div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30">
                    <Zap className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Strategic Insights</h2>
                  <div className="text-emerald-400/60 text-lg ml-auto">♔</div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Analysis reveals a consistent pattern:{" "}
                  <span className="text-emerald-400 font-semibold">strong opening preparation</span> followed by
                  tactical mistakes in complex middlegame positions.{" "}
                  <span className="text-red-400 font-semibold">65% of blunders</span> occur during the middlegame,
                  especially under time pressure. Focus areas: tactical play {" "}
                  <span className="text-emerald-400 font-semibold">(Do puzzles!)</span>, time management,
                  and endgame technique to reduce resignation rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}