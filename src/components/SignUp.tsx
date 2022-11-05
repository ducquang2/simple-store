import { UserFragmentDoc, useSignUpMutation } from '../generated'
import { SubmitHandler, useForm } from 'react-hook-form'

export interface IFormInput {
  username: string
  password: string
}

export default function SignUp() {
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

  const { register, handleSubmit } = useForm<IFormInput>()

  const onHandleSubmit: SubmitHandler<IFormInput> = (data) => {
    signup({
      variables: data,
    })
  }

  return (
    <div className="gap-6 m-6">
      <h3>SignUp</h3>
      <form
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(onHandleSubmit)
          }
        }}
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Username
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register('username', { required: true })}
          ></input>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Password
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register('password', { required: true })}
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
