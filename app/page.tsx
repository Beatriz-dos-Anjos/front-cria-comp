"use client"

import { useState } from "react"
import InputScreen from "@/components/InputScreen"
import LoadingScreen from "@/components/LoadingScreen"
import ResponseScreen from "@/components/ResponseScreen"
import { supabase } from "@/lib/supabaseClient"

export type AppState = "input" | "loading" | "response"

// Tipo para a tabela do Supabase
interface ConfessionRecord {
  id?: number
  usuario_id: string
  angustia: string
  resposta: string
  audio_url?: string
  created_at?: string
}

export default function FishConfessionApp() {
  const [currentScreen, setCurrentScreen] = useState<AppState>("input")
  const [userMessage, setUserMessage] = useState("")
  const [fishResponse, setFishResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmitMessage = async (message: string) => {
    setUserMessage(message)
    setCurrentScreen("loading")
    setIsLoading(true)
    setError(null)

    try {
      // Gera a resposta do peixe
      const response = generateFishResponse(message)
      
      // Gera um ID único para o usuário (você pode implementar auth real depois)
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Salva no Supabase
      const { data, error: supabaseError } = await supabase
        .from('conselhos') // nome da sua tabela
        .insert([
          {
            usuario_id: userId,
            angustia: message,
            resposta: response,
            audio_url: null // por enquanto null, você pode implementar áudio depois
          }
        ])
        .select()

      if (supabaseError) {
        console.error('Erro ao salvar no Supabase:', supabaseError)
        setError('Erro ao salvar a confissão. Tente novamente.')
      } else {
        console.log('Confissão salva com sucesso:', data)
      }

      // Simula tempo de carregamento para melhor UX
      setTimeout(() => {
        setFishResponse(response)
        setCurrentScreen("response")
        setIsLoading(false)
      }, 2000)

    } catch (err) {
      console.error('Erro geral:', err)
      setError('Algo deu errado. Tente novamente.')
      setIsLoading(false)
      setCurrentScreen("input")
    }
  }

  const handleNewConfession = () => {
    setCurrentScreen("input")
    setUserMessage("")
    setFishResponse("")
    setError(null)
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

  // Função para buscar confissões anteriores (opcional)
  const fetchPreviousConfessions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('conselhos')
        .select('*')
        .eq('usuario_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar confissões:', error)
        return []
      }

      return data || []
    } catch (err) {
      console.error('Erro geral ao buscar confissões:', err)
      return []
    }
  }

  return (
    <div className="min-h-screen relative z-0 overflow-hidden">
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {error}
            <button 
              onClick={() => setError(null)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      {currentScreen === "input" && (
        <InputScreen 
          onSubmit={handleSubmitMessage} 
          disabled={isLoading}
        />
      )}
      
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