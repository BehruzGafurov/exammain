import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ArrowBigDown, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useAppStore } from "../lib/zustand";

export default function ThemesToggle() {
  const { themes } = useAppStore();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "default");

  const handleTheme = (type, mode) => {
    const html = document.documentElement;
    const isDark = html.dataset.theme?.startsWith("dark-");

    if (mode === "theme") {
      html.dataset.theme = isDark ? `dark-${type}` : type;
      setTheme(html.dataset.theme);
    } else if (mode === "dark") {
      html.dataset.theme = type.startsWith("dark-") ? type.replace("dark-", "") : `dark-${type}`;
      setTheme(html.dataset.theme);
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="flex items-center gap-3 md:flex-col md:items-start">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="w-9 h-9 md:w-auto md:px-3">
            <ArrowBigDown className="w-5 h-5" />
            <span className="sr-only">Change Theme</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 md:ml-0">
          <DropdownMenuLabel>Themes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col">
            {themes.map((el) => (
              <Button
                key={el}
                onClick={() => handleTheme(el, "theme")}
                variant="ghost"
                className="justify-start text-sm w-full"
              >
                {el}
              </Button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        size="icon"
        variant="outline"
        className="w-9 h-9"
        onClick={() => handleTheme(theme, "dark")}
      >
        {theme.startsWith("dark-") ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        <span className="sr-only">Toggle Dark Mode</span>
      </Button>
    </div>
  );
}
