import { useState } from 'react'
import { useLoginMutation } from '../generated'

export default function LogIn() {
  return <DisplayLogIn />
}

function DisplayLogIn() {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  })
  const [login] = useLoginMutation()

  return (
    <div>
      <h3>LogIn</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          login({
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
        <button type="submit">LogIn</button>
      </form>
    </div>
  )
}
