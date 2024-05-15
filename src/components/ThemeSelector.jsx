import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import React, { useState } from "react";
  
  const ThemeSelector = () => {
    const [selectedTheme, setSelectedTheme] = useState("system"); // default theme
  
    const handleThemeChange = (theme) => {
      setSelectedTheme(theme);
      document.documentElement.className = `${theme === "dark"? "dark" : ""} ${theme === "system"? "system" : ""}`;
    };
  
    return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="light" value={selectedTheme} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light" onClick={() => handleThemeChange("light")}>
            Light
          </SelectItem>
          <SelectItem value="dark" onClick={() => handleThemeChange("dark")}>
            Dark
          </SelectItem>
          <SelectItem value="system" onClick={() => handleThemeChange("system")}>
            System
          </SelectItem>
        </SelectContent>
      </Select>
    );
  };
  
  export default ThemeSelector;