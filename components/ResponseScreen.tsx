"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import OceanBackground from "@/components/OceanBackground"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react" // ✨ Ícone de loading que vamos usar

// Interface de props não muda
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
  // ✨ NOVOS ESTADOS para controlar a geração do vídeo
  const [isVideoGenerating, setIsVideoGenerating] = useState(true)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [generationError, setGenerationError] = useState<string | null>(null)

  // ✨ useEffect MODIFICADO para chamar a API de vídeo
  useEffect(() => {
    if (!audioUrl) return

    const generateVideo = async () => {
      console.log("🎬 Iniciando geração de vídeo com a URL de áudio:", audioUrl)
      setIsVideoGenerating(true)
      setGenerationError(null)

      try {
        // Chamada para sua API no Render
        const response = await fetch('https://apihuggieface.onrender.com/generate-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audio_url: audioUrl })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `Falha na API: ${response.statusText}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        console.log("✅ Vídeo gerado com sucesso:", data.video_url)
        setVideoUrl(data.video_url)

      } catch (error: any) {
        console.error("❌ Erro ao gerar vídeo:", error)
        setGenerationError("O peixe engasgou e não conseguiu criar a animação. Tente novamente.")
      } finally {
        setIsVideoGenerating(false)
      }
    }

    generateVideo()
  }, [audioUrl])

  // ✨ handleSaveWisdom MODIFICADO para salvar a video_url
  const handleSaveWisdom = async () => {
    setIsSaving(true)
    try {
      const { data: authData } = await supabase.auth.getUser()
      const userId = authData?.user?.id || "anonymous"

      const { error } = await supabase.from("conselhos").insert([
        {
          usuario_id: userId,
          angustia: userMessage,
          resposta_texto: fishResponse,
          audio_url: audioUrl,
          video_url: videoUrl, // SALVANDO A NOVA URL DO VÍDEO
        },
      ]).select()

      if (error) {
        console.error("❌ Erro ao salvar:", error)
        alert("Erro ao salvar sabedoria 😢")
      } else {
        alert("🐠 Sabedoria salva com sucesso!")
        onSaveComplete()
      }
    } catch (err) {
      console.error("❌ Erro inesperado:", err)
      alert("Erro inesperado ao salvar 😢")
    } finally {
      setIsSaving(false)
    }
  }

  // ✨ NOVA FUNÇÃO para renderizar o conteúdo do avatar (imagem, loader ou vídeo)
  const renderFishAvatar = () => {
    if (isVideoGenerating) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white/50 rounded-lg p-2">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <p className="text-xs text-blue-800 mt-2 text-center">Animando o conselho...</p>
        </div>
      )
    }

    if (generationError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-red-100 rounded-lg p-2">
          <Image src="/images/fish-avatar.png" alt="Peixe Triste" width={40} height={40} className="opacity-50" />
          <p className="text-xs text-red-700 mt-2 text-center font-semibold">{generationError}</p>
        </div>
      )
    }

    if (videoUrl) {
      return (
        <video
          key={videoUrl} // Força o rerender quando a URL muda
          src={videoUrl}
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover rounded-lg"
        >
          Seu navegador não suporta vídeos.
        </video>
      );
    }

    // Fallback inicial para a imagem estática
    return (
      <Image
        src="/images/fish-avatar.png"
        alt="Peixe Sábio"
        width={60}
        height={60}
        className="w-full h-full object-contain"
      />
    );
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
          {/* ... (código da dúvida existencial não muda) ... */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                {/* ✨ Aumentei o tamanho do container para o vídeo ficar melhor */}
                <div className="w-24 h-24 bg-white rounded-lg p-1 shadow-lg">
                  {renderFishAvatar()}
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <p className="text-gray-800 text-sm leading-relaxed">{fishResponse}</p>
                  {/* 🗑️ O botão de play/pause foi REMOVIDO, pois o vídeo já contém o áudio */}
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
              // ✨ Botão desabilitado enquanto gera o vídeo
              disabled={isSaving || isVideoGenerating || !videoUrl}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "💾 Salvando..." : "💾 Salvar sabedoria"}
            </Button>
          </div>
          {/* ... (resto do código não muda) ... */}
        </div>
      </div>
    </div>
  )
}