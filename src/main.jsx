import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// In demo mode (no real key) the vite.config.js alias replaces
// @clerk/clerk-react with our no-op mock, so ClerkProvider is a
// passthrough and no validation happens — never throw here.
const IS_DEMO =
  !PUBLISHABLE_KEY || PUBLISHABLE_KEY.includes('your_') || PUBLISHABLE_KEY.includes('placeholder')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={IS_DEMO ? 'pk_test_demo_mode' : PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)