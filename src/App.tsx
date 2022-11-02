import {
  ApolloClient,
  ApolloProvider,
  gql,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import LogIn from './components/LogIn'
import Product from './components/Product'
import SignUp from './components/SignUp'
import { useGetUserQuery } from './generated'

const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const GET_USERS = gql`
  query GetUser {
    users {
      username
    }
  }
`

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Link to="/">Home</Link> | <Link to="/login">LogIn</Link> |{' '}
          <Link to="/signup">SignUp</Link> |{' '}
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  )
}

function GetUser() {
  const { data } = useGetUserQuery()

  return (
    <ul>
      {(data?.users || []).map((user) => (
        <li key={user?.id}>{user?.username}</li>
      ))}
    </ul>
  )
}

export default App
