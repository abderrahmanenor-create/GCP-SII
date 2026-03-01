"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#002E5D] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">GCP-SII</h1>
          <p className="text-xs text-white/70">Gestion Chantier Pro</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium">
              {session?.user?.prenom} {session?.user?.nom}
            </p>
            <p className="text-xs text-white/70">{session?.user?.role}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-sm transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Tableau de bord
          </h2>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Module RH */}
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-[#002E5D]">
              <h3 className="font-bold text-gray-800 mb-2">👷 Ressources Humaines</h3>
              <p className="text-gray-500 text-sm">Gestion des ouvriers, pointage, habilitations</p>
              <span className="inline-block mt-3 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                En développement
              </span>
            </div>

            {/* Module Chantier */}
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 mb-2">🏗️ Chantiers</h3>
              <p className="text-gray-500 text-sm">Suivi des chantiers, rapports, validation</p>
              <span className="inline-block mt-3 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                En développement
              </span>
            </div>

            {/* Module Contrats */}
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
              <h3 className="font-bold text-gray-800 mb-2">📋 Contrats</h3>
              <p className="text-gray-500 text-sm">Offres, bons de commande, facturation</p>
              <span className="inline-block mt-3 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                En développement
              </span>
            </div>

            {/* Module Stock */}
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-orange-500">
              <h3 className="font-bold text-gray-800 mb-2">📦 Logistique & Stock</h3>
              <p className="text-gray-500 text-sm">Matériel, équipements, mouvements stock</p>
              <span className="inline-block mt-3 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                En développement
              </span>
            </div>

            {/* Module Sous-traitance */}
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500">
              <h3 className="font-bold text-gray-800 mb-2">🤝 Sous-traitance</h3>
              <p className="text-gray-500 text-sm">Gestion des sous-traitants et procédures</p>
              <span className="inline-block mt-3 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                En développement
              </span>
            </div>

            {/* Module Admin */}
            <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
              <h3 className="font-bold text-gray-800 mb-2">⚙️ Administration</h3>
              <p className="text-gray-500 text-sm">Utilisateurs, rôles, paramètres système</p>
              <span className="inline-block mt-3 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                En développement
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}