"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import OceanBackground from "@/components/OceanBackground"

interface InputScreenProps {
  onSubmit: (message: string) => void
}

export default function InputScreen({ onSubmit }: InputScreenProps) {
  const [message, setMessage] = useState("")
  const maxLength = 500

  const handleSubmit = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault?.();
    if (message.trim()) {
      console.log("Mensagem enviada:", message.trim());
      onSubmit(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <OceanBackground />

      <div className="relative z-10 pt-4 text-center">
        <p className="text-white/80 text-2xl font-semibold px-4 drop-shadow">O peixe mais simpático do mar 🐠💙</p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="mb-6">
          <div className="w-32 h-32 bg-white rounded-lg p-2 shadow-lg">
            <Image
              src="/images/fish-avatar.png"
              alt="Peixe conselheiro"
              width={120}
              height={120}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
            <h1 className="text-white text-xl font-medium text-center mb-6">
              Desabafe sua dor amorosa aqui...
            </h1>

            <div className="space-y-4">


              <form onSubmit={handleSubmit}>
                <Textarea
                  placeholder="Ex: 'Meu crush não responde minhas mensagens há 3 dias, o que faço?' (prepare-se para a verdade cruel 🐠)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={maxLength}
                  className="min-h-[120px] bg-white/90 border-white/50 text-gray-800 placeholder:text-gray-500 resize-none rounded-lg"
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' && (e.ctrlKey || e.metaKey)) || (e.key === 'Enter' && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey)) {
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="text-right mt-2">
                  <span className="text-white/70 text-sm">
                    {message.length}/{maxLength} caracteres
                  </span>
                </div>
                <Button
                  type="submit"
                  disabled={!message.trim()}
                  className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-medium py-3 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  🐠 Afogue sua dor aqui! 🐠
                </Button>
              </form>

              <p className="text-white/60 text-xs text-center">
                * Avisos: Conselhos 100% não recomendados por terapeutas
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center px-4">
          <p className="text-white/70 text-sm max-w-md">
            Se o amor é cego, eu sou o peixe que vai te dar óculos...{" "}
            <span className="text-white/90">para você ver o que realmente está acontecendo! 😅 🐠</span>
          </p>
        </div>
      </div>
    </div>
  )
}
