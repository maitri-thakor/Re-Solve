import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { submitProblem } from '../apis/apiClient'
import useUser from '../hooks/useUser'
import { useAuth0 } from '@auth0/auth0-react'

export default function Submit() {
  const [submission, setSubmission] = useState({
    title: '',
    brief: '',
    hints: '',
    difficulty: 'Easy',
    problem: '',
    author_id: Number(''),
  })

  const user = useUser().data

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data) => submitProblem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['solutions', 'AllChallenges'],
      })
      window.location.href = `/challenges/1`
    },
    onError: (error) => {
      console.log('Submission Failed', error)
    },
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    mutation.mutate(submission)
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.currentTarget
    setSubmission((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget
    setSubmission((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (user) {
      setSubmission((prev) => ({ ...prev, author_id: user.id }))
    }
  }, [user])

  return (
    <div>
      <div>Submit a new Problem</div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          placeholder="Title"
          name="title"
          value={submission.title}
        ></input>
        <input
          onChange={handleChange}
          placeholder="Brief"
          name="brief"
          value={submission.brief}
        ></input>{' '}
        <input
          onChange={handleChange}
          placeholder="Hints/Documentation"
          name="hints"
          value={submission.hints}
        ></input>
        <select
          onChange={handleSelect}
          name="difficulty"
          value={submission.difficulty}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <textarea
          onChange={handleChange}
          placeholder="Code"
          name="problem"
          value={submission.problem}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
