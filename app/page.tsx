"use client"

import { useState } from "react"
import InputScreen from "@/components/InputScreen"
import LoadingScreen from "@/components/LoadingScreen"
import ResponseScreen from "@/components/ResponseScreen"
import {supabase} from "@/lib/supabaseClient"

export type AppState = "input" | "loading" | "response"

export default function FishConfessionApp() {
  const [currentScreen, setCurrentScreen] = useState<AppState>("input")
  const [userMessage, setUserMessage] = useState("")
  const [fishResponse, setFishResponse] = useState("")

  const handleSubmitMessage = (message: string) => {
    setUserMessage(message)
    setCurrentScreen("loading")

    // Simula o tempo de carregamento e gera a resposta
    setTimeout(() => {
      const response = generateFishResponse(message)
      setFishResponse(response)
      setCurrentScreen("response")
    }, 3000)
  }

  const handleNewConfession = () => {
    setCurrentScreen("input")
    setUserMessage("")
    setFishResponse("")
  }

  const generateFishResponse = (message: string): string => {
    const responses = [
      "🚨 Bem-vindo(a) ao circo dos relacionamentos! Você é o palhaço principal. Minha sugestão de mestre: transforme sua crush numa obsessão total. Analise cada vírgula das mensagens dele. Isso nunca deu errado para ninguém! 🎪 🚨",
      "🐠 Ah, o clássico 'não me responde'! Deixe-me adivinhar: você já checou se ele está online 47 vezes hoje? Meu conselho: mande mais 20 mensagens perguntando se ele está bem. Insistência é a chave do amor! 💕",
      "🎭 Vejo que você escolheu o caminho do drama! Que tal criar 15 contas fake para stalker seu crush? Ou melhor ainda: apareça na casa dele de surpresa às 3h da manhã com serenata! Romance puro! 🎵",
      "🤡 Parabéns! Você ganhou o prêmio de 'Pessoa Mais Dramática do Oceano'! Minha receita infalível: chore por 3 dias seguidos, coma 2kg de sorvete e mande mensagens melancólicas no stories. Funciona sempre! 🍦",
      "🎪 Olha só quem chegou no meu consultório aquático! Deixe-me ser direto: você está mais perdido(a) que peixe fora d'água. Meu conselho profissional: continue fazendo exatamente o que está fazendo. O caos é lindo! ✨",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
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
