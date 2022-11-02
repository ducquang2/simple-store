import { useState } from 'react'
import { UserFragmentDoc, useSignUpMutation } from '../generated'

export default function SignUp() {
  return <DisplaySignUp />
}

function DisplaySignUp() {
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
    <div>
      <h3>SignUp</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          signup({
            variables: {
              username: formState.username,
              password: formState.password,
            },
          })
        }}
      >
        <input
          value={formState.username}
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value,
            })
          }
        ></input>
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
        ></input>
        <button type="submit">Create Account</button>
      </form>
    </div>
  )
}
