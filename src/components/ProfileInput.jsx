import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ChevronRight, Zap, Brain, Settings, ChevronDown } from "lucide-react"

export function ProfileInput({ onSubmit }) {
  const [formData, setFormData] = useState({
    chessProfile: "",
    stockfishDepth: [12],
    geminiApiKey: "",
    geminiTone: "",
    answerLength: "",
  })
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "auto" })
    onSubmit(formData)
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Cursor glow */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-all duration-300"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Chess board elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-8 h-8 border-2 border-emerald-500/20 bg-emerald-500/5" />
            <div className="absolute top-0 right-0 w-8 h-8 border-2 border-emerald-500/20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-2 border-emerald-500/20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-2 border-emerald-500/20 bg-emerald-500/5" />
          </div>

          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              {/* Chess notation header */}
              <div className="text-emerald-400 text-sm font-mono mb-4 tracking-wider">CHESS AI ANALYSIS ENGINE</div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-slate-200 to-emerald-300 bg-clip-text text-transparent leading-tight">
                 ChessSage
                 <div className="absolute -top-2 -right-8 text-2xl">♔</div>
                <br />
              </h1>

              {/* Chess subtitle */}
              <div className="h-16 mb-12">
                <p className="text-2xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                  Advanced game and profile analysis powered by <span className="text-emerald-400 font-semibold">Stockfish</span>{" "}
                  and AI. Discover patterns, improve tactics, dominate the board.
                  <br /> 
                </p>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <ChevronDown className="h-8 w-8 text-emerald-400 mx-auto animate-bounce" />
          </div>
        </div>
      </section>
      
      <section className="flex-1 flex items-center justify-cente relative">
      <div className="max-w-6xl mx-auto text-center relative">
      <div className="h-16 mb-12">
          <p className="text-sm md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Backend in progress. <span className="text-emerald-400 font-semibold">Placeholders</span>{" "} used.
            <br /> 
          </p>
        </div>
       </div>
      </section>

      {/* Form*/}
      <section className="px-4 py-20 relative">
        <div className="max-w-3xl mx-auto">
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Chess board container */}
            <div className="relative">
              {/* Chess board border*/}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600/10 via-transparent to-emerald-600/10 rounded-3xl" />
              <div className="absolute -inset-2 bg-gradient-to-r from-slate-950/70 to-slate-900/70 rounded-3xl" />

              <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-950/95 to-slate-900/95 rounded-3xl p-8 md:p-12 border-2 border-emerald-800/30 shadow-2xl shadow-emerald-900/10">
                {/* Chess notation*/}
                <div className="absolute top-4 left-4 text-emerald-400/40 text-xs font-mono">a8</div>
                <div className="absolute top-4 right-4 text-emerald-400/40 text-xs font-mono">h8</div>
                <div className="absolute bottom-4 left-4 text-emerald-400/40 text-xs font-mono">a1</div>
                <div className="absolute bottom-4 right-4 text-emerald-400/40 text-xs font-mono">h1</div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30">
                      <Settings className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white">Game Configuration</h2>
                    <div className="text-emerald-400/60 text-sm font-mono ml-auto">♔ ♕ ♖ ♗ ♘ ♙</div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="group">
                      <Label htmlFor="chess-profile" className="text-white text-lg mb-3 block flex items-center gap-2">
                        <span className="text-emerald-400">♔</span>
                        Chess.com Profile
                      </Label>
                      <div className="relative">
                        <Input
                          id="chess-profile"
                          placeholder="Enter your username"
                          value={formData.chessProfile}
                          onChange={(e) => setFormData({ ...formData, chessProfile: e.target.value })}
                          className="bg-slate-950/80 border-emerald-700/30 text-white placeholder:text-slate-500 h-14 text-lg rounded-2xl focus:border-emerald-500/50 transition-all duration-300 focus:shadow-lg focus:shadow-emerald-500/10"
                          required
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-600/5 via-transparent to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>

                    <div className="group">
                      <Label className="text-white text-lg mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-emerald-400" />
                        Engine Depth: <span className="text-emerald-400 font-mono">{formData.stockfishDepth[0]}</span>
                      </Label>
                      <div className="px-4 relative">
                        <Slider
                          value={formData.stockfishDepth}
                          onValueChange={(value) => setFormData({ ...formData, stockfishDepth: value })}
                          max={20}
                          min={8}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-slate-400 mt-2">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse duration-500" />
                            Faster
                          </span>
                          <span className="flex items-center gap-1">
                            Deeper Analysis
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse duration-2000" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <Label htmlFor="gemini-key" className="text-white text-lg mb-3 flex items-center gap-2">
                        <Brain className="h-5 w-5 text-emerald-400" />
                        AI Analysis Key (Optional)
                      </Label>
                      <div className="relative">
                        <Input
                          id="gemini-key"
                          type="password"
                          placeholder="Leave empty for default analysis"
                          value={formData.geminiApiKey}
                          onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
                          className="bg-slate-950/80 border-emerald-700/30 text-white placeholder:text-slate-500 h-14 text-lg rounded-2xl focus:border-emerald-500/50 transition-all duration-300 focus:shadow-lg focus:shadow-emerald-500/10"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-600/5 via-transparent to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <Label htmlFor="tone" className="text-white text-lg mb-3 block">
                          Analysis Style
                        </Label>
                        <div className="relative">
                          <Input
                            id="tone"
                            placeholder="Professional"
                            value={formData.geminiTone}
                            onChange={(e) => setFormData({ ...formData, geminiTone: e.target.value })}
                            className="bg-slate-950/80 border-emerald-700/30 text-white placeholder:text-slate-500 h-14 text-lg rounded-2xl focus:border-emerald-500/50 transition-all duration-300 focus:shadow-lg focus:shadow-emerald-500/10"
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-600/5 via-transparent to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                      </div>
                      <div className="group">
                        <Label htmlFor="length" className="text-white text-lg mb-3 block">
                          Detail Level
                        </Label>
                        <div className="relative">
                          <Input
                            id="length"
                            placeholder="Comprehensive"
                            value={formData.answerLength}
                            onChange={(e) => setFormData({ ...formData, answerLength: e.target.value })}
                            className="bg-slate-950/80 border-emerald-700/30 text-white placeholder:text-slate-500 h-14 text-lg rounded-2xl focus:border-emerald-500/50 transition-all duration-300 focus:shadow-lg focus:shadow-emerald-500/10"
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-600/5 via-transparent to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-16 text-lg bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="flex items-center gap-2">
                        ♔ Begin Analysis
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}