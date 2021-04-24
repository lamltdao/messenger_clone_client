import React, {Children, useCallback, useContext, useState} from 'react'

const ThemeContext = React.createContext()

export const themeOptions = [
    {
        name: 'Light',
        backgroundColor: 'bg-light',
        myTextBoxColor: 'bg-primary text-light',
        otherTextBoxColor:'bg-secondary text-light',
        sendButtonColor:'bg-primary text-light',
        textAreaColor: 'bg-light',
        commonButtonColor: 'primary', 
        textColor: 'text-primary',
        listGroupItem: 'text-primary bg-white border-primary',
    },
    {
        name: 'Dark',
        backgroundColor: 'bg-dark',
        myTextBoxColor: 'bg-danger text-light',
        otherTextBoxColor: 'bg-secondary text-light',
        sendButtonColor:'bg-danger text-light',
        textAreaColor: 'bg-secondary',
        commonButtonColor: 'danger',
        textColor: 'text-danger',
        listGroupItem: 'text-danger bg-dark border-danger',
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
