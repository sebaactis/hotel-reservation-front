"use client"

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from "@/components/ui/button"
import { colorsAux } from "@/styles/colorsAux"
import { CheckCircle2 } from "lucide-react"
import { useEffect } from 'react';


const ConfirmationPage = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const success = searchParams.get('success');

    useEffect(() => {
        if (success !== 'true') {
            router.replace('/');
        }
    }, [success, router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-5">
            <CheckCircle2 color={colorsAux.darkprimary} width={130} height={130} />
            <p style={{ color: colorsAux.darkprimary }} className="text-3xl">Reserva realizada con éxito!</p>
            <Button
                style={{ backgroundColor: colorsAux.primary, color: "white" }}
                className="hover:opacity-90 transition-all"
                onClick={() => router.push('/reservation/myReservations')}
                >
                Ir a ver mis reservas
            </Button>
        </div>
    )
}

export default ConfirmationPage