import React, {Children, useCallback, useContext, useState} from 'react'

const ThemeContext = React.createContext()

export const themeOptions = {
    LIGHT: {
        backgroundColor: 'bg-light',
        myTextBoxColor: 'bg-primary text-light',
        otherTextBoxColor:'bg-secondary text-dark',
        buttonColor:'bg-primary text-light',
        textAreaColor: 'bg-light'
    },
    DARK: {
        backgroundColor: 'bg-dark',
        myTextBoxColor: 'bg-danger text-light',
        otherTextBoxColor: 'bg-secondary text-light',
        buttonColor:'bg-dark text-light',
        textAreaColor: 'bg-secondary'
    }
}
export function useThemeContext() {
    return useContext(ThemeContext)
}
export function ThemeProvider({children}) {
    const [theme, setTheme] = useState(themeOptions.LIGHT)
    
    const value = {
        theme
    }
    return (
        <ThemeContext.Provider value = {value}>
            {children}
        </ThemeContext.Provider>
    )
}
