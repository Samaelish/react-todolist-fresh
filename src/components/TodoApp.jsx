import { useState } from 'react'
import './TodoApp.css'

function TodoApp() {
  const [task, setTask] = useState('')
  const [tasklist, setTaskList] = useState([])

  const handleChange = e => {
    setTask(e.target.value)
  }

  const AddTask = () => {
    if (task !== '') {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false,
      }

      setTaskList([...tasklist, taskDetails])
    }
  }

  const deletetask = (e, id) => {
    e.preventDefault()
    setTaskList(tasklist.filter(t => t.id !== id))
  }

  const taskCompleted = (e, id) => {
    e.preventDefault()
    //let's find index of element
    const element = tasklist.findIndex(elem => elem.id === id)

    //copy array into new variable
    const newTaskList = [...tasklist]

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    }

    setTaskList(newTaskList)
  }

  return (
    <div className='todo'>
      <input type='text' name='text' id='text' onChange={e => handleChange(e)} placeholder='Добавьте задачу...' />
      <button className='add-btn' onClick={AddTask}>
        Добавь
      </button>
      <br />
      {tasklist[0] ? (
        <ul>
          {tasklist.map(t => (
            <li key={Math.random().toString(36).substr(2)} className={t.isCompleted ? 'crossText' : 'listitem'}>
              {t.value}
              <button className='completed' onClick={e => taskCompleted(e, t.id)}>
                Завершено
              </button>

              <button className='delete' onClick={e => deletetask(e, t.id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default TodoApp
