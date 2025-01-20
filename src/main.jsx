// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';  // Import the theme from the updated theme.js
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Correct root rendering
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>  // Pass the theme here
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
