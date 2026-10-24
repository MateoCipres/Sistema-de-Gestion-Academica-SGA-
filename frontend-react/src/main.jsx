import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles' 
import CssBaseline from '@mui/material/CssBaseline'
import tema from "./tema"
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={tema} defaultMode='system'>
    <CssBaseline />
    <App />
    </ThemeProvider>
  </StrictMode>,
)