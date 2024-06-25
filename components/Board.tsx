"use client"
import axios from "axios"
import { DropResult, DragDropContext } from "@hello-pangea/dnd"
import Column from "./Column"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Task, BoardTypes } from "@/types/types"
import { SyncLoader } from "react-spinners"
import { FaPlus } from "react-icons/fa"
import Modal from "./ui/Modal"
import { createTask } from "@/app/actions/boardActions"

const Board: React.FC<{ board: BoardTypes | null }> = ({
    board,
}) => {
    const [tasks, setTask] = useState<Task[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [isCreate, setIsCreate] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (board) {
            setTask(board.tasks)
            setLoading(false)
        }
        else {
            router.push("/onboarding")
        }
    }, [board])

    const openModal = () => {
        setIsCreate(true)
    }

    const closeModal = () => {
        setIsCreate(false)
    }

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result

        if (!destination) {
            return
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return
        }

        const draggedTask = tasks!.find((task) => task.id === draggableId)

        let updatedStatus: string;

        switch (destination.droppableId) {
            case "todo":
                updatedStatus = "TODO"
                break
            case "inprogress":
                updatedStatus = "DOING"
                break
            case "completed":
                updatedStatus = "DONE"
                break
            default:
                updatedStatus = draggedTask!.status
        }

        try {
            axios.post(`api/newTaskStatus/`, {
                taskId: draggableId,
                newStatus: updatedStatus
            })
        }
        catch (error) {
            console.log(error)
        }

        const updatedTask = tasks!.map((task) => {
            if (task.id === draggableId) {
                return {
                    ...task,
                    status: updatedStatus
                }
            }
            return task
        })

        setTask(updatedTask)
    }

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <SyncLoader color="#fff" />
            </div>
        )
    }

    const todo = tasks! || [];

    return (
        <div className="dark:bg-gray-900 py-10 relative h-[90%]">
            <h1 className="font-bold text-center mb-10 text-3xl uppercase">
                {board?.name}
            </h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid md:grid-cols-3 max-md:items-center w-[90%] max-w-[1500px] mx-auto md:gap-5 gap-10">
                    <button className=" bg-gray-700 rounded-full hover:bg-gray-600 text-white font-bold p-4 absolute right-10 bottom-10"
                        onClick={openModal}>
                        <FaPlus />
                    </button>
                    {isCreate && (
                        <Modal
                            closeModal={closeModal}
                            title="Create New Task"
                            isCreate={isCreate}
                            action={createTask}
                            value={board!.id}
                        />
                    )}
                    <Column
                        title="Todo"
                        tasks={todo!.filter(
                            (task) => task.status === "TODO"
                        )}
                        droppableId="todo"
                    />
                    <Column
                        title="In Progress"
                        tasks={todo!.filter(
                            (task) => task.status === "DOING"
                        )}
                        droppableId="inprogress"
                    />
                    <Column
                        title="Completed"
                        tasks={todo!.filter(
                            (task) => task.status === "DONE"
                        )}
                        droppableId="completed"
                    />
                </div>
            </DragDropContext>
        </div>
    )
}

export default Board 