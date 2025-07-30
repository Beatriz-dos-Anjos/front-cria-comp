"use client"

import { useState } from "react"
import InputScreen from "@/components/InputScreen"
import LoadingScreen from "@/components/LoadingScreen"
import ResponseScreen from "@/components/ResponseScreen"
import { supabase } from "@/lib/supabaseClient"

export type AppState = "input" | "loading" | "response"

export default function FishConfessionApp() {
  const [currentScreen, setCurrentScreen] = useState<AppState>("input")
  const [userMessage, setUserMessage] = useState("")
  const [fishResponse, setFishResponse] = useState("")

  const handleSubmitMessage = async (message: string) => {
    setUserMessage(message)
    setCurrentScreen("loading")

    try {
      // 1. Chama a IA no backend
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

      if (resposta_texto) {
        setFishResponse(resposta_texto)
      } else {
        setFishResponse("⚠️ O peixe ficou sem palavras... tente novamente!")
      }

      // 2. Busca usuário autenticado (se houver)
      const { data: { user } } = await supabase.auth.getUser()

      // 3. Salva no Supabase
      const { error } = await supabase.from("conselhos").insert([
        {
          usuario_id: user?.id || "anonymous",
          angustia: message,
          resposta_texto: resposta_texto || "sem resposta",
          audio_url,
        },
      ])

      if (error) {
        console.error("Erro ao salvar no Supabase:", error.message)
      }
    } catch (err) {
      console.error("Erro ao chamar a IA:", err)
      setFishResponse("⚠️ Não conseguimos buscar sabedoria agora. Tente mais tarde!")
    }

    // 4. Muda para tela de resposta depois de um pequeno delay
    setTimeout(() => {
      setCurrentScreen("response")
    }, 3000)
  }

  const handleNewConfession = () => {
    setCurrentScreen("input")
    setUserMessage("")
    setFishResponse("")
  }

  return (
    <div className="min-h-screen relative z-0 overflow-hidden">
      {currentScreen === "input" && <InputScreen onSubmit={handleSubmitMessage} />}
      {currentScreen === "loading" && <LoadingScreen />}
      {currentScreen === "response" && (
        <ResponseScreen
          userMessage={userMessage}
          fishResponse={fishResponse}
          onNewConfession={handleNewConfession}
        />
      )}
    </div>
  )
}