import styles from './App.module.css'
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import TaskForm from './Components/Form/TaskForm';
import TaskList from './Components/List/TaskList';
import { ITask } from './Components/Interface/Task'
import { useState } from 'react';
import Modal from './Components/Modal/Modal';

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id
      })
    )
  }
  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")

    if (display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask) => {
    hideOrShowModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, prioridade: number) => {
    const updatedTask: ITask = { id, title, prioridade }
    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItems)

    hideOrShowModal(false)
  }

  return (
    <div className="App">
      <Modal
        title='Editar tarefa'
        children={<TaskForm
          btnText='Editar tarefa'
          taskList={taskList}
          task={taskToUpdate}
          handleUpdate={updateTask} />}
      />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText='Criar tarefa' taskList={taskList} setTaskList={setTaskList} task={taskToUpdate} />
        </div>
        <div>
          <h2>Suas tarefas: </h2>
          <TaskList
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
