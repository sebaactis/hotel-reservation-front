"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"

export default function LoginForm() {

    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {

            const loginRequest = await fetch("http://localhost:8080/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            const response = await loginRequest.json()


            if (loginRequest.ok) {
                toast.success("Login exitoso")
                setFormData({
                    email: "",
                    password: "",
                })

                login(response.entity.token, response.entity.email, response.entity.userId);
                window.location.href = "/";
            }
            else {
                toast.error("No se pudo completar el login por lo siguiente: " + "'" + response.message + "'")
            }



        } catch (e) {
            toast.error("Error al intentar el registro: "
                + e.message);
        }
    }

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#D4C7BF" }}>
            <Card className="w-full max-w-md shadow-lg border-0">
                <CardHeader style={{ backgroundColor: "#3B234A" }}>
                    <CardTitle className="text-white text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
                    <p className="text-white opacity-90 text-sm text-center mt-2">Accede a tu cuenta de hoteles</p>
                </CardHeader>

                <CardContent className="p-8" style={{ backgroundColor: "#C3BBC9" }}>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium" style={{ color: "#523961" }}>
                                <Mail className="w-4 h-4 inline mr-2" />
                                Correo Electrónico
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="border-2 focus:ring-0"
                                style={{
                                    borderColor: "#BAAFC4",
                                    backgroundColor: "white",
                                    color: "#523961",
                                }}
                                required
                            />
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium" style={{ color: "#523961" }}>
                                <Lock className="w-4 h-4 inline mr-2" />
                                Contraseña
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ingresa tu contraseña"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    className="border-2 focus:ring-0 pr-10"
                                    style={{
                                        borderColor: "#BAAFC4",
                                        backgroundColor: "white",
                                        color: "#523961",
                                    }}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ color: "#523961" }}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>


                        <Button
                            type="submit"
                            className="w-full text-white font-semibold py-3 hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: "#3B234A" }}
                        >
                            Iniciar Sesión
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>


                        <div className="text-center pt-4">
                            <p className="text-sm" style={{ color: "#523961" }}>
                                ¿No tienes una cuenta?{" "}
                                <a
                                    href="/auth/register"
                                    className="font-medium underline hover:opacity-80"
                                    style={{ color: "#3B234A" }}
                                >
                                    Regístrate
                                </a>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
