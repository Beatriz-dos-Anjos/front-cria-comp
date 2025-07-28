"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import OceanBackground from "@/components/OceanBackground"

interface ResponseScreenProps {
  userMessage: string
  fishResponse: string
  onNewConfession: () => void
}

export default function ResponseScreen({
  userMessage,
  fishResponse,
  onNewConfession,
}: ResponseScreenProps) {
  const handleSaveWisdom = () => {
    const wisdom = `🐠 Conselho do Peixe Sábio 🐠\n\nSua dúvida: ${userMessage}\n\nConselho: ${fishResponse}\n\n- Peixe Sardástico`

    if (navigator.share) {
      navigator.share({
        title: "Conselho do Peixe Sábio",
        text: wisdom,
      })
    } else {
      navigator.clipboard.writeText(wisdom)
      alert("Sabedoria copiada para a área de transferência! 🐠")
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <OceanBackground />

      <div className="relative z-10 p-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold mb-2">🐠 Conselho do Peixe Sábio 🐠</h1>
          <p className="text-white/70 text-sm">(Não recomendado por 99% dos psiquiatras)</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
            <h2 className="text-orange-300 font-medium mb-2 flex items-center gap-2">
              🤔 Sua Dúvida Existencial:
            </h2>
            <p className="text-white/90 italic">"{userMessage}"</p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-lg p-1">
                  <Image
                    src="/images/fish-avatar.png"
                    alt="Peixe Sardástico"
                    width={60}
                    height={60}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <p className="text-gray-800 text-sm leading-relaxed">{fishResponse}</p>
                </div>
                <p className="text-right text-blue-300 text-sm mt-2 font-medium">- Peixe Sardástico 🐠</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={onNewConfession}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg shadow-lg"
            >
              🌊 Afogar outra dor
            </Button>

            <Button
              onClick={handleSaveWisdom}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-lg"
            >
              💾 Salvar sabedoria
            </Button>
          </div>

          <div className="bg-orange-500/20 backdrop-blur-md rounded-xl p-4 border border-orange-400/30">
            <p className="text-orange-200 text-xs text-center">
              ⚠️ <strong>Aviso Legal:</strong> Este peixe não possui diploma em psicologia. Conselhos destinados
              exclusivamente ao entretenimento e risadas. Para problemas sérios, procure um profissional (de verdade)!
              🏥
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/60 text-xs">
            Feito com 💙 no fundo do mar • Peixe Sardástico © 2024
          </p>
        </div>
      </div>
    </div>
  )
}
