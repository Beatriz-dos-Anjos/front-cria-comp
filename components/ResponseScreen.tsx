"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import OceanBackground from "@/components/OceanBackground"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useRef, useState } from "react"
import { Play, Pause } from 'lucide-react' // Importar ícones de play e pause

interface ResponseScreenProps {
  userMessage: string
  fishResponse: string
  audioUrl: string
  onNewConfession: () => void
  onSaveComplete: () => void
}

export default function ResponseScreen({
  userMessage,
  fishResponse,
  audioUrl,
  onNewConfession,
  onSaveComplete,
}: ResponseScreenProps) {
  const [isSaving, setIsSaving] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
  console.log("ResponseScreen - audioUrl recebida:", audioUrl)
  if (audioUrl && audioRef.current) {
    audioRef.current.load()
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((e) => {
        // Ignora apenas se for um AbortError
        if (e.name !== "AbortError") {
          console.error("Erro ao tentar reproduzir áudio automaticamente:", e)
        }
      })
  }
}, [audioUrl])


  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((e) => console.error("Erro ao tentar reproduzir áudio:", e))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const handleSaveWisdom = async () => {
    setIsSaving(true)
    console.log("💾 Tentando salvar sabedoria...")

    try {
      const { data: authData } = await supabase.auth.getUser()
      const userId = authData?.user?.id || "anonymous"

      console.log("👤 Usuario ID:", userId)
      const { data, error } = await supabase.from("conselhos").insert([
        {
          usuario_id: userId,
          angustia: userMessage,
          resposta_texto: fishResponse,
          audio_url: audioUrl, // A audio_url é salva aqui
        },
      ]).select()
      if (error) {
        console.error("❌ Erro ao salvar:", error)
        alert("Erro ao salvar sabedoria 😢")
      } else {
        console.log("✅ Sabedoria salva com sucesso:", data)
        alert("🐠 Sabedoria salva com sucesso!")

        console.log("🔄 Chamando refresh do sidebar...")
        onSaveComplete()
      }
    } catch (err) {
      console.error("❌ Erro inesperado:", err)
      alert("Erro inesperado ao salvar 😢")
    } finally {
      setIsSaving(false)
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
            <p className="text-white/90 italic">&quot;{userMessage}&quot;</p>
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
                  {audioUrl && ( // O botão só aparece se audioUrl tiver um valor
                    <div className="mt-4 flex items-center justify-center">
                      <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnded} className="hidden" crossOrigin="anonymous" />
                      <Button
                        onClick={togglePlayPause}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-md"
                        aria-label={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                    </div>
                  )}
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
              disabled={isSaving}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "💾 Salvando..." : "💾 Salvar sabedoria"}
            </Button>
          </div>
          <div className="bg-orange-500/20 backdrop-blur-md rounded-xl p-4 border border-orange-400/30">
            <p className="text-orange-200 text-xs text-center">
              ⚠️ <strong>Aviso Legal:</strong> Este peixe não possui diploma em psicologia. Conselhos destinados
              exclusivamente ao entretenimento e risadas. Para problemas sérios, procure um profissional (de verdade)! 🏥
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
