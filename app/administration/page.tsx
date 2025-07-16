"use client"


import IndexSkeleton from "@/components/Administration/Index/IndexSkeleton";
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdministrationHome = () => {

    const router = useRouter();
    const { role, isAuthenticated } = useAuth();

    useEffect(() => {

        if (!role) return;
        if (!isAuthenticated || role.toLowerCase() !== "admin") {
            router.push("/")
        }
    }, [role, isAuthenticated])

    if (!isAuthenticated || role.toLowerCase() !== "admin") return (
        <div className="flex flex-col justify-center items-center my-20">
            <IndexSkeleton width={"100%"} height={"50rem"} />
        </div>)

    return (

        <div className="flex flex-col justify-center items-center my-20 gap-5">
            <Link href="/administration/hotels" className="bg-indigo-500 p-2 rounded-md">Gestionar Hoteles</Link>
            <Link href="/administration/roles" className="bg-indigo-500 p-2 rounded-md">Gestionar Roles</Link>
            <Link href="/administration/categories" className="bg-indigo-500 p-2 rounded-md">Gestionar Categorias</Link>
        </div>
    )
}

export default AdministrationHome