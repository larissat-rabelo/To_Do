import { useState, useEffect, ChangeEvent, FormEvent } from 'react'

import styles from './TaskForm.module.css'
import { ITask } from '../Interface/Task'

interface Props {
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
    task?: ITask | null;
    handleUpdate?(id: number, title: string, prioridade: number): void
}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {
    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [prioridade, setPrioridade] = useState<number>(0)

    useEffect(() => {
        if (task) {
            setId(task.id)
            setPrioridade(task.prioridade)
        }
    }, [task])

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (handleUpdate) {
            handleUpdate(id, title, prioridade)
        } else {
            const id = Math.floor(Math.random() * 1000)
            const newTask: ITask = { id, title, prioridade }

            setTaskList!([...taskList, newTask])
            setTitle("")
            setPrioridade(0)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        } else {
            setPrioridade(parseInt(e.target.value))
        }
        console.log(title)
        console.log(prioridade)
    }
    return (
        <form className={styles.form} onSubmit={addTaskHandler}>
            <div className={styles.input_container}>
                <label htmlFor='title'>Título</label>
                <input
                    type="text"
                    name='title'
                    placeholder='Nome da tarefa'
                    onChange={handleChange}
                    value={title}
                />
            </div>
            <div className={styles.input_container}>
                <label htmlFor="prioridade">Prioridade da tarefa: </label>
                <input
                    type="text"
                    name="prioridade"
                    placeholder='Insira a prioridade da tarefa'
                    onChange={handleChange}
                    value={prioridade}
                />
            </div>
            <button type='submit'>{btnText}</button>
        </form>
    )
}

export default TaskForm