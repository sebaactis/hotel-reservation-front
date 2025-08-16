"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { SearchIcon, CalendarIcon, MapPin, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"
import { colorsAux } from "@/styles/colorsAux"
import { useSearchHotels } from "@/hooks/useSearchHotels"
import { useRouter } from "next/navigation"

// Simulación de ubicaciones populares para autocompletado
const popularLocations = [
  "Barcelona, España",
  "Madrid, España",
  "Valencia, España",
  "Sevilla, España",
  "Málaga, España",
  "Granada, España",
  "Bilbao, España",
  "San Sebastián, España",
  "Córdoba, España",
  "Toledo, España",
]

export default function SearchComponent() {
  const router = useRouter();

  const [location, setLocation] = useState("")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filtrar sugerencias basadas en la entrada del usuario
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocation(value)

    if (value.length > 0) {
      const filtered = popularLocations.filter((loc) => loc.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const selectSuggestion = (suggestion: string) => {
    setLocation(suggestion)
    setShowSuggestions(false)
  }

  const clearLocation = () => {
    setLocation("")
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleSearch = () => {
    if (!dateRange.from || !dateRange.to || !location) return;

    const fromStr = dateRange.from.toISOString().split("T")[0];
    const toStr = dateRange.to.toISOString().split("T")[0];

    const searchParams = new URLSearchParams({
      location,
      from: fromStr,
      to: toStr,
    });

    router.push(`/hotel/search?${searchParams.toString()}`);

  }

  const formatDateRange = () => {
    if (!dateRange.from) return <p style={{ color: colorsAux.darkprimary }}>Seleccionar fechas</p>

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
      })
    }

    if (dateRange.from && dateRange.to) {
      return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
    }
    return formatDate(dateRange.from)
  }

  return (
    <div className="w-full" style={{ backgroundColor: "#C3BBC9" }}>
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        {/* Título y descripción */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#3B234A" }}>
            Encuentra tu hotel ideal
          </h2>
          <p className="text-lg" style={{ color: "#523961" }}>
            Descubre el lugar perfecto para tu próxima aventura. Busca por ubicación y fechas para encontrar las mejores
            opciones.
          </p>
        </div>

        <Card className="p-6 md:p-8 shadow-lg border-0 max-w-4xl mx-auto" style={{ backgroundColor: "#BAAFC4" }}>
          <div className="flex flex-col gap-6">

            <div className="relative">
              <label htmlFor="location" className="block text-sm font-medium mb-2" style={{ color: "#3B234A" }}>
                <MapPin className="w-4 h-4 inline mr-1" />
                Ubicación
              </label>
              <div className="relative">
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="¿A dónde quieres ir?"
                  className="w-full p-3 pl-10 pr-10 rounded-md border-2 focus:outline-none"
                  style={{
                    borderColor: "#523961",
                    backgroundColor: "white",
                    color: colorsAux.darkprimary
                  }}
                />
                <SearchIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "#523961" }}
                />
                {location && (
                  <button
                    onClick={clearLocation}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    style={{ color: "#523961" }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border-2 max-h-60 overflow-y-auto"
                  style={{ borderColor: "#BAAFC4" }}
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      <MapPin className="w-4 h-4 mr-2" style={{ color: "#523961" }} />
                      <span style={{ color: "#523961" }}>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="dates" className="block text-sm font-medium mb-2" style={{ color: "#3B234A" }}>
                <CalendarIcon className="w-4 h-4 inline mr-1" />
                Fechas de estancia
              </label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <button
                    id="dates"
                    className="w-full flex items-center justify-between p-3 rounded-md border-2 bg-white"
                    style={{ borderColor: "#523961" }}
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" style={{ color: "#523961" }} />
                      <span style={{ color: colorsAux.darkprimary }} >{formatDateRange()}</span>
                    </div>
                    <ChevronDown className="w-4 h-4" style={{ color: "#523961" }} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">

                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range as { from: Date | undefined; to: Date | undefined })
                    }}
                    numberOfMonths={2}
                    disabled={{ before: new Date() }}
                  />

                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                className="flex-1 text-white font-semibold py-6 hover:opacity-90 transition-opacity text-base"
                style={{ backgroundColor: "#3B234A" }}
                onClick={handleSearch}
              >
                <SearchIcon className="w-5 h-5 mr-2" />
                Realizar búsqueda
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-2 hover:bg-opacity-10 bg-transparent py-6 text-base"
                style={{
                  borderColor: "#523961",
                  color: "#523961",
                }}
                asChild
              >
                <Link href="/categories">Buscar por categorías</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
