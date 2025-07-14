"use client"

import Hotels from "@/components/Hotels/Hotels";
import Recommendations from "@/components/Recommendations/Recommendations";
import Search from "@/components/Search/Search";
import { useAuth } from "@/hooks/useAuth";
import { colorsAux } from "@/styles/colorsAux";

export default function Home() {

  const { isAuthenticated, email } = useAuth();

  return (
    <section className="flex flex-col gap-4">
      {isAuthenticated && <div className="flex items-center justify-center py-10">
        <p
          className="text-2xl italic"
          style={{ color: colorsAux.primary }}
        >
          Bienvenido nuevamente: <span className="font-bold">{email}</span>
        </p>
      </div>}

      <Search />
      <Hotels />  
      <Recommendations />
    </section>
  );
}
