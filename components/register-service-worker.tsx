'use client'

import { useEffect } from 'react'

const RegisterServiceWorker = () => {
   useEffect(() => {
      if ('serviceWorker' in navigator) {
         window.addEventListener('load', () => {
            navigator.serviceWorker
               .register('/service-worker.js')
               .then((registration) => {
                  console.log('Service Worker registered with scope:', registration.scope)
                  registration.onupdatefound = () => {
                     const newWorker = registration.installing
                     if (newWorker) {
                        newWorker.onstatechange = () => {
                           if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              // Notify user about the new update
                              console.log('New content is available, please refresh the page.')
                              // Optionally, show a notification or prompt the user to reload the page
                           }
                        }
                     }
                  }
               })
               .catch((error) => {
                  console.error('Service Worker registration failed:', error)
               })
         })
      }
   }, [])
   return null
}

export default RegisterServiceWorker
