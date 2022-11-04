import { useState } from 'react'
import { UserFragmentDoc, useSignUpMutation } from '../generated'

export default function SignUp() {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  })

  const [signup] = useSignUpMutation({
    update(cache, { data: signup }) {
      console.log(cache.extract())
      cache.modify({
        fields: {
          users(existingUser = []) {
            console.log(signup)
            const newUser = cache.writeFragment({
              data: signup,
              fragment: UserFragmentDoc,
            })
            return [...existingUser, newUser]
          },
        },
      })
    },
  })

  return (
    <div className="gap-6 m-6">
      <h3>SignUp</h3>
      <form
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            signup({
              variables: formState,
            })
          }
        }}
        onSubmit={(e) => {
          e.preventDefault()
          signup({
            variables: formState,
          })
        }}
      >
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Username
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            type={'text'}
            value={formState.username}
            onChange={(e) =>
              setFormState({
                ...formState,
                username: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Password
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
          ></input>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}
