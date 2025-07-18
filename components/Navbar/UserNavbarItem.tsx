"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { colorsAux } from "@/styles/colorsAux"
import Link from "next/link"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function UserNavbarItem({ email, role }: { email: string, role: string }) {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={`text-sm font-bold h-9 w-9 rounded-full text-white transition-all bg-[#b396c9] hover:bg-[#b396c9c2] flex items-center justify-center cursor-pointer `}
                >
                    <p>{email?.substring(0, 1).toUpperCase()} </p>
                </div>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#c3bbc9]" align="start">
                <DropdownMenuLabel className="font-bold text-md ">Mi cuenta</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem >
                        Datos de mi cuenta
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-gray-500" />
                <DropdownMenuLabel className="font-bold text-md">Administrador</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/administration">

                            Panel de admistracion
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}
