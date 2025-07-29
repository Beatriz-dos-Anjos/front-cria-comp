"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import OceanBackground from "@/components/OceanBackground"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "💔 Analisando o nível de drama...",
    "🔍 Detectando sinais de desespero...",
    "📱 Contando quantas vezes você checou o WhatsApp...",
    "🎭 Calculando o nível de palhaçada...",
    "🐠 Preparando a dose de realidade...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2))
    }, 60)

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 600)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <OceanBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="mb-8 animate-bounce">
          <div className="w-40 h-40 bg-white rounded-lg p-3 shadow-xl transform rotate-3">
            <Image
              src="/images/fish-avatar.png"
              alt="Peixe analisando"
              width={140}
              height={140}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h1 className="text-white text-2xl font-medium mb-8 text-center">Analisando sua tragédia...</h1>

        <div className="w-full max-w-md mb-8">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/30">
            <p className="text-white text-center font-medium">{steps[currentStep]}</p>
          </div>
        </div>

        <div className="w-full max-w-md mb-6">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-400 to-red-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-center px-4 max-w-md">
          <p className="text-white/80 text-sm italic mb-2">"Enquanto eu trabalho, lembre-se:</p>
          <p className="text-white text-sm">O amor pode ser cego, mas eu enxergo tudo!" 🐠 ✨</p>
        </div>
      </div>
    </div>
  )
}
