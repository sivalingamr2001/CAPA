import { ConfigProvider } from 'antd'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/outfit/700.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
          fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
