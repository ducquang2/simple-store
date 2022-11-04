import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import LogIn from './components/LogIn'
import Product from './components/Product'
import SignUp from './components/SignUp'

const link = new HttpLink({
  uri: 'http://localhost:4000/',
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/signin" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  )
}

export default App
