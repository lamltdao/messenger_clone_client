import React, {Children, useCallback, useContext, useState} from 'react'

const ThemeContext = React.createContext()

export const themeOptions = [
    {
        name: 'Light',
        backgroundColor: 'bg-light',
        myTextBoxColor: 'bg-primary text-light',
        otherTextBoxColor:'bg-secondary text-light',
        buttonColor:'bg-primary text-light',
        textAreaColor: 'bg-light'
    },
    {
        name: 'Dark',
        backgroundColor: 'bg-dark',
        myTextBoxColor: 'bg-danger text-light',
        otherTextBoxColor: 'bg-secondary text-light',
        buttonColor:'bg-dark text-light',
        textAreaColor: 'bg-secondary'
    }
]
export function useThemeContext() {
    return useContext(ThemeContext)
}
export function ThemeProvider({children}) {
    const [theme, setTheme] = useState(themeOptions[0])
    
    const value = {
        theme,
        setTheme
    }
    return (
        <ThemeContext.Provider value = {value}>
            {children}
        </ThemeContext.Provider>
    )
}
