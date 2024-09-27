import { useState } from 'react'
import './TodoApp.css'

function TodoApp() {
  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState([])

  const changeTask = e => {
    setTask(e.target.value)
  }

  const addNewTask = () => {
    if (task !== '') {
        const newTask = {
            id: Math.floor(Math.random() * 1000),
            value: task,
            isCompleted: false
        }

        setTaskList([...taskList, newTask])
    }
  }

  const deleteTask = (e, id) => {
    e.preventDefault()
    setTaskList(taskList.filter(t => t.id !== id))
  }

  const completeTask = (e, id) => {
    e.preventDefault()
    // finding element's index
    const element = taskList.findIndex(elem => elem.id === id)

    // copy array into new variable
    const newTaskList = [...taskList]

    // edit our element
    newTaskList[element] = {
        ...newTaskList[element],
        isCompleted: true,
    }

    setTaskList(newTaskList)
  }



  return (
    <div className='todo'>
      <input type='text' name='text' id='text' onChange={e => changeTask(e)} placeholder='Добавьте задачу...' />
      <button className='add-btn' onClick={addNewTask}>
        Добавить
      </button>
      {taskList[0] ? (
        <ul>
          {taskList.map(t => (
            <li key={Math.random().toString(36).substr(2)} className={t.isCompleted ? 'crossText' : 'listitem'}>
              {t.value}
              <button className='completed' onClick={e => completeTask(e, t.id)}>
                Завершено
              </button>

              <button className='delete' onClick={e => deleteTask(e, t.id)}>
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
