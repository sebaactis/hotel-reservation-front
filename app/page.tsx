"use client"

import Hotels from "@/components/Hotels/Hotels";
import HotelsServerContainer from "@/components/Hotels/HotelsServerContainer";
import Recommendations from "@/components/Recommendations/Recommendations";
import Search from "@/components/Search/Search";
import { useAuthStore } from "@/stores/authStore";
import { colorsAux } from "@/styles/colorsAux";

export default function Home() {

  const { isAuthenticated, user } = useAuthStore();

  return (
    <section className="flex flex-col gap-4">
      {isAuthenticated && <div className="flex items-center justify-center py-10">
        <p
          className="text-2xl italic text-center"
          style={{ color: colorsAux.primary }}
        >
          Bienvenido nuevamente: <span className="font-bold">{user?.email}</span>
        </p>
      </div>}

      <Search />
      <HotelsServerContainer />
      <Recommendations />
    </section>
  );
}
