"use client"

import React from "react";
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
import NextLink from "next/link";

import { Logo } from "@/components/icons";
import { colorsAux } from "@/styles/colorsAux";
import { useAuthStore } from "@/stores/authStore";
import { UserNavbarItem } from "./UserNavbarItem";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <HeroUINavbar
      maxWidth="2xl"
      position="sticky"
      className="bg-[#523961]"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Brand */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-3" href="/">
            <Logo width={50} heigth={50} />
            <p className="text-inherit italic text-white">Solo pensá a donde ir</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop actions */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden md:flex">
          {isAuthenticated ? (
            <Button
              as={Link}
              className="text-sm font-bold text-white italic transition-all hover:bg-[#a092ad]"
              href="/"
              variant="flat"
              style={{ backgroundColor: colorsAux.secondary }}
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          ) : (
            <>
              <Button
                as={Link}
                className="text-sm font-bold text-white transition-all hover:bg-[#a47ac4] mr-2"
                href="/auth/register"
                variant="flat"
                style={{ backgroundColor: colorsAux.primarylighter }}
              >
                Crear cuenta
              </Button>
              <Button
                as={Link}
                className="text-sm font-bold text-white italic transition-all hover:bg-[#a092ad]"
                href="/auth/login"
                variant="flat"
                style={{ backgroundColor: colorsAux.secondary }}
              >
                Iniciar Sesión
              </Button>
            </>
          )}
        </NavbarItem>

        {isAuthenticated && (
          <NavbarItem className="hidden md:flex">
            <UserNavbarItem email={user?.email} role={user?.role} />
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} />
      </NavbarContent>

      {/* Mobile menu (muestra lo mismo que desktop) */}
      <NavbarMenu>
        {isAuthenticated ? (
          <>
            <NavbarMenuItem className="py-2">
              {/* Podés mostrar info del usuario o reutilizar tu componente */}
              <div className="text-white/90">
                <UserNavbarItem email={user?.email} role={user?.role} />
              </div>
            </NavbarMenuItem>

            <NavbarMenuItem className="py-2">
              <Button
                as={Link}
                href="/"
                fullWidth
                variant="flat"
                className="text-white italic"
                style={{ backgroundColor: colorsAux.secondary }}
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem className="py-2">
              <Button
                as={Link}
                href="/auth/register"
                fullWidth
                variant="flat"
                className="text-white"
                style={{ backgroundColor: colorsAux.primarylighter }}
                onClick={closeMenu}
              >
                Crear cuenta
              </Button>
            </NavbarMenuItem>

            <NavbarMenuItem className="py-2">
              <Button
                as={Link}
                href="/auth/login"
                fullWidth
                variant="flat"
                className="text-white italic"
                style={{ backgroundColor: colorsAux.secondary }}
                onClick={closeMenu}
              >
                Iniciar Sesión
              </Button>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
