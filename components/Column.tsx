import { Droppable, Draggable } from "@hello-pangea/dnd"
import { useState } from "react"
import { LuDot } from "react-icons/lu"
import { Task } from "@/types/types"
import Modal from "./ui/Modal"
import { deleteTask, editTask } from "@/app/actions/boardActions"

interface ColumnProps {
    tasks: Task[]
    title: string
    droppableId: string
}

const Column: React.FC<ColumnProps> = ({
    tasks,
    title,
    droppableId
}) => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [taskId, setTaskId] = useState<string | null>(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    const openDeleteModal = (taskId: string) => {
        setTaskId(taskId)
        setIsDelete(true)
    }

    const closeDeleteModal = () => {
        setIsDelete(false)
        setTaskId(null)
    }

    const openEditModal = (taskId: string) => {
        setTaskId(taskId)
        setIsEdit(true)
    }

    const closeEditModal = () => {
        setIsEdit(false)
        setTaskId(null)
    }


    return (
        <div className="flex-1">
            <div className="Flex gap-1 dark:text-white ">
                <h2 className="text-sm font-semibold mb-4 uppercase">
                    {title}
                </h2>
                <LuDot />
            </div>
            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="dark:bg-gray-800 bg-gray-200 rounded-lg p-4">
                        {tasks.map((task, index) => (
                            <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onMouseEnter={() => setHoverIndex(index)}
                                        onMouseLeave={() => setHoverIndex(null)}
                                        className="bg-gray-700 p-2 pl-3 text-white justify-between flex gap-2 mb-2 rounded"
                                    >
                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-semibold">{task.name}</h3>
                                            <p className="text-sm text-white">{task.description}</p>
                                        </div>
                                        {hoverIndex === index && (
                                            <div className="flex gap-5 items-center justify-center">
                                                <span className="text-sm text-gray-400 mt-1 cursor-pointer"
                                                    onClick={() => openEditModal(task.id)}
                                                >
                                                    Edit
                                                </span>
                                                <span className="text-sm mt-1 text-gray-400 cursor-pointer"
                                                    onClick={() => openDeleteModal(task.id)}
                                                >
                                                    Delete
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {isEdit && (
                <Modal
                    closeModal={closeEditModal}
                    title="Edit Task"
                    isEdit={isEdit}
                    action={editTask}
                    value={taskId!}
                />
            )}
            {isDelete && (
                <Modal
                    closeModal={closeDeleteModal}
                    title="Are you sure you want to delete this task?"
                    isDelete={isDelete}
                    action={deleteTask}
                    value={taskId!}
                />
            )}
        </div>
    )
}

export default Column