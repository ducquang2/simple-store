import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  // const [navbarOpen, setNavbarOpen] = useState(false)

  const [loginState, setLoginState] = useState(
    localStorage.getItem('token-info')
  )

  return (
    <div className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-sky-500 mb-3">
      <div>
        <Link to="/">
          <div>Home</div>
        </Link>
      </div>
      {loginState === null ? (
        <div className="flex flex-col lg:flex-row list-none lg:ml-auto">
          {/* {setLoginState(true)} */}
          {/* <div>{loginState}</div> */}
          <Link to="/signin">
            <p className='text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"'>
              Login
            </p>
          </Link>
          <Link to="/signup">
            <p className='text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"'>
              SignUp
            </p>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row list-none lg:ml-auto">
          <p>Hello, {loginState}</p>
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem('token-info')
              setLoginState(null)
            }}
          >
            <p>SignOut</p>
          </Link>
        </div>
      )}
    </div>
  )
}
