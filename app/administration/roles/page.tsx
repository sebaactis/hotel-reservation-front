"use client"

import { useEffect, useState } from "react"
import { Search, Filter, Calendar, Mail, Shield, ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { colorsAux } from "@/styles/colorsAux"

export default function UserRoles() {

    const { token } = useAuth();

    const [users, setUsers] = useState([])

    const [searchTerm, setSearchTerm] = useState("")
    const [filterRole, setFilterRole] = useState("all")

    const availableRoles = [
        { id: "ADMIN", name: "ADMIN", color: "#3B234A" },
        { id: "USER", name: "USER", color: "#4b4b4b" },
    ]

    const getRoleInfo = (roleId: string) => {
        return availableRoles.find((role) => role.id === roleId);
    }

    const handleRoleChange = (userEmail: string, newRole: string) => {
        const postRoles = async () => {

            try {
                const request = await fetch(`http://localhost:8080/api/v1/user/updateRole`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ email: userEmail, role: newRole })
                })

                const response = await request.json();

                if (response.statusCode == "200 OK") {
                    setUsers((prevUsers) => prevUsers.map((user) => (user.email === userEmail ? { ...user, role: newRole } : user)))
                    toast.success(`Se actualizo el usuario: ${userEmail}. Su nuevo rol es: ${newRole}`)
                    return;
                }

            } catch (error) {
                toast.error(`No se pudo actualizar el usuario: ${e.message}`)
            }
        }

        postRoles();
    }

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesRole = filterRole === "all" || user.role === filterRole
        return matchesSearch && matchesRole
    })

    const getRoleStats = () => {
        const stats = availableRoles.map((role) => ({
            ...role,
            count: users.filter((user) => user.role === role.id).length,
        }))
        return stats
    }

    useEffect(() => {

        if (!token) return;

        const fetchUsers = async () => {
            const request = await fetch("http://localhost:8080/api/v1/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = await request.json();
            setUsers(data.entity)

        }

        fetchUsers();
    }, [token])

    console.log(users);

    return (
        <div className="min-h-screen p-6" style={{ backgroundColor: "#D4C7BF" }}>
            <div className="max-w-3xl mx-auto space-y-6">

                <Card className="shadow-lg border-0">
                    <CardHeader style={{ backgroundColor: "#3B234A" }}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle className="text-white text-2xl font-bold">Gestión de Roles de Usuario</CardTitle>
                                <p className="text-white opacity-90 text-sm mt-1">
                                    Administra los permisos y roles de todos los usuarios
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                {getRoleStats().map((role) => (
                                    <div key={role.id} className="text-center">
                                        <div className="text-white text-lg font-bold">{role.count}</div>
                                        <div className="text-white opacity-75 text-xs">{role.name}s</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Filtros y Búsqueda */}
                <Card className="shadow-lg border-0">
                    <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                                    style={{ color: "#523961" }}
                                />
                                <Input
                                    placeholder="Buscar usuarios por nombre o email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-2 focus:ring-0"
                                    style={{
                                        borderColor: "#BAAFC4",
                                        backgroundColor: "white",
                                        color: colorsAux.primary
                                    }}
                                />
                            </div>
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="border-2 hover:bg-opacity-10 bg-transparent"
                                            style={{
                                                borderColor: "#523961",
                                                color: "#523961",
                                            }}
                                        >
                                            <Filter className="w-4 h-4 mr-2" />
                                            {filterRole === "all" ? "Todos los roles" : getRoleInfo(filterRole).name}
                                            <ChevronDown className="w-4 h-4 ml-2" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => setFilterRole("all")}>
                                            {filterRole === "all" && <Check className="w-4 h-4 mr-2" />}
                                            Todos los roles
                                        </DropdownMenuItem>
                                        {availableRoles.map((role) => (
                                            <DropdownMenuItem key={role.id} onClick={() => setFilterRole(role.id)}>
                                                {filterRole === role.id && <Check className="w-4 h-4 mr-2" />}
                                                {role.name}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-4 text-sm" style={{ color: "#523961" }}>
                            <span>Total: {filteredUsers.length} usuarios</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                    <CardContent className="p-0" style={{ backgroundColor: "#C3BBC9" }}>
                        <div className="space-y-0">
                            {filteredUsers.map((user, index) => {
                                const roleInfo = getRoleInfo(user.role)
                                return (
                                    <div
                                        key={user.email}
                                        className={`p-6 ${index !== filteredUsers.length - 1 ? "border-b" : ""}`}
                                        style={{ borderColor: "#BAAFC4" }}
                                    >
                                        <div className="flex flex-col lg:flex-row gap-4">

                                            <div className="flex gap-4 flex-1">
                                                <div
                                                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                                                    style={{ backgroundColor: "#3B234A" }}
                                                >
                                                    {user.name.charAt(0)}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h3 className="text-lg font-semibold truncate" style={{ color: "#3B234A" }}>
                                                                {user.name}
                                                            </h3>
                                                            <div className="flex items-center gap-1 text-sm" style={{ color: "#523961" }}>
                                                                <Mail className="w-4 h-4 flex-shrink-0" />
                                                                <span className="truncate">{user.email}</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-center lg:w-48">
                                                <span className="text-sm font-medium mb-2" style={{ color: "#523961" }}>
                                                    <Shield className="w-4 h-4 inline mr-1" />
                                                    Rol actual:
                                                </span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full justify-between border-2 hover:bg-opacity-10 bg-transparent"
                                                            style={{
                                                                borderColor: roleInfo.color,
                                                                color: roleInfo.color,
                                                            }}
                                                        >
                                                            <span className="flex items-center gap-2">
                                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: roleInfo.color }} />
                                                                {user.role}
                                                            </span>
                                                            <ChevronDown className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="w-48">
                                                        {availableRoles.map((role) => (
                                                            <DropdownMenuItem
                                                                key={role.id}
                                                                onClick={() => handleRoleChange(user.email, role.id)}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }} />
                                                                {role.name}
                                                                {user.role === role.id && <Check className="w-4 h-4 ml-auto" />}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {filteredUsers.length === 0 && (
                            <div className="p-12 text-center">
                                <div className="text-gray-500 mb-2">No se encontraron usuarios</div>
                                <div className="text-sm text-gray-400">
                                    {searchTerm || filterRole !== "all"
                                        ? "Intenta con otros filtros de búsqueda"
                                        : "No hay usuarios registrados"}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
