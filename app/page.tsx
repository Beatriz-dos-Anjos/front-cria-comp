"use client"

import { useState } from "react"
import InputScreen from "@/components/InputScreen"
import LoadingScreen from "@/components/LoadingScreen"
import ResponseScreen from "@/components/ResponseScreen"
import { supabase } from "@/lib/supabaseClient"
import Sidebar from "@/components/Sidebar"

export type AppState = "input" | "loading" | "response"

export default function FishConfessionApp() {
  const [currentScreen, setCurrentScreen] = useState<AppState>("input")
  const [userMessage, setUserMessage] = useState("")
  const [fishResponse, setFishResponse] = useState("")
  const [audioUrl, setAudioUrl] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSubmitMessage = async (message: string) => {
    setUserMessage(message)
    setCurrentScreen("loading")

    try {
      const res = await fetch("https://ia-peixe-love.onrender.com/testar-resposta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: "frontend",
          angustia: message,
        }),
      })

      const data = await res.json()
      console.log("Resposta da IA:", data)

      const resposta_texto = data.resposta
      const audio_url = data.audio_url

      setFishResponse(resposta_texto || "⚠️ O peixe ficou sem palavras... tente novamente!")
      setAudioUrl(audio_url || "")
    } catch (err) {
      console.error("Erro ao chamar a IA:", err)
      setFishResponse("⚠️ Não conseguimos buscar sabedoria agora. Tente mais tarde!")
    }

    setTimeout(() => {
      setCurrentScreen("response")
    }, 1000)
  }

  const handleNewConfession = () => {
    setCurrentScreen("input")
    setUserMessage("")
    setFishResponse("")
    setAudioUrl("")
  }

  const triggerSidebarRefresh = () => {
    console.log("🔄 Triggering sidebar refresh. Old key:", refreshKey)
    setRefreshKey((prev) => {
      const newKey = prev + 1
      console.log("🔄 New refresh key:", newKey)
      return newKey
    })
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixo */}
      <Sidebar refreshKey={refreshKey} />
      
      {/* Conteúdo principal com margem esquerda para compensar o sidebar fixo */}
      <div className="flex-1 ml-72">
        <div className="min-h-screen relative overflow-hidden">
          {currentScreen === "input" && <InputScreen onSubmit={handleSubmitMessage} />}
          {currentScreen === "loading" && <LoadingScreen />}
          {currentScreen === "response" && (
            <ResponseScreen
              userMessage={userMessage}
              fishResponse={fishResponse}
              audioUrl={audioUrl}
              onNewConfession={handleNewConfession}
              onSaveComplete={triggerSidebarRefresh}
            />
          )}
        </div>
      </div>
    </div>
  )
}