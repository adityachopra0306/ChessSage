import { useState, useEffect } from "react"
import { ProfileInput } from "./components/ProfileInput"
import { BasicStats } from "./components/BasicStats"
import { DetailedStats } from "./components/DetailedStats"
import { GameAnalysis } from "./components/GameAnalysis"

export default function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileData, setProfileData] = useState(null)
  const [selectedGameMode, setSelectedGameMode] = useState(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleProfileSubmit = (data) => {
    setProfileData(data)
    window.scrollTo({ top: 0, behavior: "auto" })
    setCurrentStep(2)
  }

  const handleDetailedAnalysis = (gameMode) => {
    setSelectedGameMode(gameMode)
    window.scrollTo({ top: 0, behavior: "auto" })
    setCurrentStep(3)
  }

  const handleGameAnalysis = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setCurrentStep(4)
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">    {/* background */}
      <div className="fixed inset-0 pointer-events-none">        {/* chess board pattern */}
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
          }}
        />

        {/* chess pieces */}
        <div className="absolute inset-0">
          {/* rotating king */}
          <div
            className="absolute top-1/4 right-1/4 text-emerald-900/15 transition-all duration-1000 ease-out"
            style={{
              transform: `scale(${1 + scrollY * 0.002}) rotate(${scrollY * 0.1}deg) translateY(${scrollY * 0.05}px)`,
              fontSize: `${Math.max(200, 200 + scrollY * 0.5)}px`,
            }}
          >
            ♔
          </div>

          {/*queen*/}
          <div
            className="absolute top-1/3 left-1/6 text-slate-700/12 transition-all duration-700"
            style={{
              transform: `scale(${1 + scrollY * 0.0001}) translateY(${-scrollY * 0.2}px) rotate(${-scrollY * 0.05}deg)`,
              fontSize: "120px",
            }}
          >
            ♕
          </div>

          {/*kniht*/}
          <div
            className="absolute bottom-1/4 left-1/3 text-emerald-800/12 transition-all duration-500"
            style={{
              transform: `translateX(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0005})`,
              fontSize: "80px",
            }}
          >
            ♘
          </div>

          {/*rook*/}
          <div
            className="absolute top-2/3 right-1/6 text-slate-600/15 transition-all duration-800"
            style={{
              transform: `translateY(${scrollY * 0.25}px) rotate(${scrollY * -0.08}deg)`,
              fontSize: "100px",
            }}
          >
            ♖
          </div>
        </div>

        {/*overlay*/}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
          }}
        />
      </div>

      <div className="relative z-10">
        {currentStep === 1 && <ProfileInput onSubmit={handleProfileSubmit} />}
        {currentStep === 2 && profileData && (
          <BasicStats
            profileData={profileData}
            onDetailedAnalysis={handleDetailedAnalysis}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 3 && selectedGameMode && (
          <DetailedStats
            gameMode={selectedGameMode}
            profileData={profileData}
            onGameAnalysis={handleGameAnalysis}
            onBack={() => setCurrentStep(2)}
          />
        )}
        {currentStep === 4 && <GameAnalysis profileData={profileData} onBack={() => setCurrentStep(3)} />}
      </div>
    </div>
  )
}
