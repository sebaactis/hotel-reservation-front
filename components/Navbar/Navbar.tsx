"use client"

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { Logo } from "@/components/icons";
import { colorsAux } from "@/styles/colorsAux";
import { useAuth } from "@/hooks/useAuth";
import { UserNavbarItem } from "./UserNavbarItem";



export const Navbar = () => {

  const { isAuthenticated, email, role, logout } = useAuth();

  return (
    <HeroUINavbar maxWidth="2xl" position="sticky" className="bg-[#523961]">

      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">

        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-3" href="/">
            <Logo width={50} heigth={50} />
            <p className="text-inherit italic text-white">Solo pensá a donde ir</p>
          </NextLink>
        </NavbarBrand>

      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
          <Button

            as={Link}
            className={`text-sm font-bold text-white transition-all hover:bg-[#a47ac4]`}
            href="/auth/register"
            variant="flat"
            style={{ backgroundColor: colorsAux.primarylighter }}
          >
            Crear cuenta
          </Button>
        </NavbarItem>

        {isAuthenticated ?
          <NavbarItem className="hidden md:flex">
            <Button
              as={Link}
              className={`text-sm font-bold text-white italic transition-all hover:bg-[#a092ad]`}
              href="/"
              variant="flat"
              style={{ backgroundColor: colorsAux.secondary }}
              onClick={logout}
            >
              Cerrar Sesión
            </Button>
          </NavbarItem>
          : <NavbarItem className="hidden md:flex">
            <Button
              as={Link}
              className={`text-sm font-bold text-white italic transition-all hover:bg-[#a092ad]`}
              href="/auth/login"
              variant="flat"
              style={{ backgroundColor: colorsAux.secondary }}
            >
              Iniciar Sesión
            </Button>
          </NavbarItem>}

        {isAuthenticated && <NavbarItem className="hidden md:flex">
          <UserNavbarItem email={email} role={role} />
        </NavbarItem>}

      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>

      </NavbarMenu>
    </HeroUINavbar>
  );
};
