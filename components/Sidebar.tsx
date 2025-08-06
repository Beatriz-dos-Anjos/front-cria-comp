"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

interface Sabedoria {
  id: number
  resposta_texto: string
  angustia: string
  created_at: string
}

interface SidebarProps {
  refreshKey: number
}

export default function Sidebar({ refreshKey }: SidebarProps) {
  const [sabedorias, setSabedorias] = useState<Sabedoria[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSabedorias = async () => {
      console.log("🔄 Buscando sabedorias... refreshKey:", refreshKey)
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("conselhos")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) {
          console.error("❌ Erro ao buscar sabedorias:", error)
        } else {
          console.log("✅ Sabedorias encontradas:", data?.length || 0)
          setSabedorias(data || [])
        }
      } catch (err) {
        console.error("❌ Erro ao conectar:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSabedorias()
  }, [refreshKey]) // ✅ vai atualizar sempre que refreshKey mudar

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg overflow-y-auto z-50 border-r border-blue-200">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-blue-800 flex items-center gap-2">
          📚 Sabedorias Salvas
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin text-2xl">🐠</div>
            <p className="text-blue-600 text-sm mt-2">Pescando sabedorias...</p>
          </div>
        ) : sabedorias.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-blue-600 text-sm">🌊 Nenhuma sabedoria salva ainda</p>
            <p className="text-blue-500 text-xs mt-1">Salve alguns conselhos para vê-los aqui!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sabedorias.map((sabedoria) => (
              <div key={sabedoria.id} className="bg-white rounded-lg p-3 shadow-sm border border-blue-200 hover:shadow-md transition-shadow">
                <div className="text-xs text-blue-500 mb-2">
                  {formatDate(sabedoria.created_at)}
                </div>
                
                <div className="mb-2">
                  <div className="text-xs font-medium text-gray-600 mb-1">🤔 Sua dúvida:</div>
                  <div className="text-sm text-gray-800 line-clamp-2">
                    &quot;{sabedoria.angustia}&quot;
                  </div>
                </div>
                
                <div>
                  <div className="text-xs font-medium text-blue-600 mb-1">🐠 Conselho:</div>
                  <div className="text-sm text-gray-700 italic line-clamp-3">
                    &quot;{sabedoria.resposta_texto}&quot;
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}