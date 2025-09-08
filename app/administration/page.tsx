"use client"


import IndexSkeleton from "@/components/Administration/Index/IndexSkeleton";
import { useAuth } from "@/hooks/useAuth"
import { useAuthStore } from "@/stores/authStore";
import { Hotel, PenBoxIcon, PenToolIcon, StarIcon, UserCog } from "lucide-react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdministrationHome = () => {

    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();

    useEffect(() => {

        if (!user?.role) return;
        if (!isAuthenticated || user?.role.toLowerCase() !== "admin") {
            router.push("/")
        }
    }, [user?.role, isAuthenticated])

    if (!isAuthenticated || user?.role.toLowerCase() !== "admin") return (
        <div className="flex flex-col justify-center items-center my-20">
            <IndexSkeleton width={"100%"} height={"50rem"} />
        </div>)

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4 mt-10">
            <div className="bg-indigo-500 hover:bg-indigo-400 transition-all p-8 rounded-md flex gap-2">
                <Hotel width={30} height={30} />
                <Link href="/administration/hotels" className="text-xl">Gestionar Hoteles</Link>
            </div>

            <div className="bg-indigo-500 hover:bg-indigo-400 transition-all p-8 rounded-md flex gap-2">
                <UserCog width={30} height={30} />
                <Link href="/administration/roles" className="text-xl">Gestionar Roles</Link>
            </div>

            <div className="bg-indigo-500 hover:bg-indigo-400 transition-all p-8 rounded-md flex gap-2">
                <StarIcon width={30} height={30} />
                <Link href="/administration/categories" className="text-xl">Gestionar Categorias</Link>
            </div>

            <div className="bg-indigo-500 hover:bg-indigo-400 transition-all p-8 rounded-md flex gap-2">
                <PenBoxIcon width={30} height={30} />
                <Link href="/administration/features" className="text-xl">Gestionar Caracteristicas</Link>
            </div>
        </div>
    )
}

export default AdministrationHome