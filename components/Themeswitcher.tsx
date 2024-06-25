"use client"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { FiSun, FiMoon } from "react-icons/fi"

export default function Themeswitcher() {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return

    if (resolvedTheme === "dark") {
        return (
            <FiSun onClick={() => setTheme("light")} />
        )
    }
    
    if (resolvedTheme === "light") {
        return (
            <FiMoon onClick={() => setTheme("dark")} />
        )
    }
    


    return (
        <div>

        </div>
    )
}
