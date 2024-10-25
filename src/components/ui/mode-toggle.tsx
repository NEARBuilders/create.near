import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/ui/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed top-4 right-4 p-2 rounded-full 
                 bg-white dark:bg-gray-800
                 text-gray-800 dark:text-white
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 transition-colors duration-200"
    >
      {theme === "light" ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
    </button>
  );
}
