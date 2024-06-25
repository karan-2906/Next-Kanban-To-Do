import { BoardTypes } from "@/types/types"
import Button from "./Button"
import Input from "./Input"
import toast from "react-hot-toast"

const Modal = ({
    closeModal,
    title,
    action,
    value,
    isCreate,
    isEdit,
    isDelete
}: {
    closeModal: () => void,
    title: string,
    action: (formData: FormData) => Promise<void>
    value: string,
    isCreate?: boolean
    isEdit?: boolean
    isDelete?: boolean
}) => {

    const submitHandler = () => {
        if (isCreate) {
            toast.success("Task Created")
        }
        else if (isEdit) {
            toast.success("Task Updated")
        }
        else if (isDelete) {
            toast.success("Task Deleted Successfully!!")
        }
        closeModal();
    }

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
            onClick={closeModal}>
            <div className="bg-gray-700 rounded-lg p-6 text-white"
                onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4 ">{title}</h2>
                <div className="flex justify-center">
                    <form action={action} onSubmit={submitHandler}>
                        <Input
                            type="hidden"
                            name="taskId"
                            value={value}
                        />
                        {isCreate && (
                            <>
                                <Input
                                    type="text"
                                    name="task"
                                    placeholder="Task Title"
                                    fullWidth
                                />
                                <Input
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    fullWidth
                                />
                                <Input
                                    type="hidden"
                                    value={value}
                                    name="boardId" />
                            </>
                        )}
                        {isEdit && (
                            <>
                                <Input
                                    type="text"
                                    name="newTask"
                                    placeholder="Enter New Task Name"
                                    fullWidth
                                />
                                <Input
                                    type="text"
                                    name="newDescription"
                                    placeholder="Description"
                                    fullWidth
                                />
                                <Input
                                    type="hidden"
                                    value={value}
                                    name="taskId" />
                            </>
                        )}
                        {isDelete && (
                            <p className="">Are you sure you want to delete this task?</p>
                        )}

                        <div className="mt-5 flex gap-5">
                            <Button
                                confirmButton
                                text="Confirm"
                                type="submit" />
                            <Button
                                text="Cancel"
                                onClick={closeModal} />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Modal