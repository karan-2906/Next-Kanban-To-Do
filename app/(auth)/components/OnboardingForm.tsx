"use client";

import { useState, useEffect } from "react"
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { SyncLoader } from "react-spinners";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import { creareNewBoard, createTask } from "@/app/actions/boardActions";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
}

const OnboardingForm = ({
  user,
  boardId
}: {
  user: string | null | undefined;
  boardId: string | null;
}) => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (boardId!== null) {
      router.replace("kanban-todo")
    }
  }, [])

  const stepOneSubmit = () => {
    setStep(2);
  }

  const stepTwoSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      router.replace("/kanban-todo")
      toast.success(`Welcome your to your new board ${user}`)
      setLoading(false)
    }, 5000);
  }

  const goBack = () => {
    setStep(1)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full items-center justify-center pt-[82px] w-[90%] mx-auto max-w-[1450px] text-white">
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center ">
          <h1 className="mb-10 text-4xl font-bold uppercase">
            hey {user} 👋🏻  let's give your board a name!
          </h1>
          <form
            className="flex flex-col gap-10 items-center"
            action={creareNewBoard}
            onSubmit={stepOneSubmit}>
            <Input
              type="text"
              name="boardname"
              placeholder="Board Name"
              disabled={loading}
              required={true} />
            <Button text="Continue" type="submit" />
          </form>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full text-center ">
          <h1 className="mb-10 text-4xl font-bold uppercase">
            now let's add your first task!👍
          </h1>
          <form
            onSubmit={stepTwoSubmit}
            action={createTask}
            className="flex flex-col gap-10 items-center">
            <Input
              type="text"
              name="task"
              placeholder="First Task...."
              required={true}
              disabled={loading} />
            <Input
              type="text"
              name="description"
              placeholder="Task description"
              required={false}
              disabled={loading} />
            <Input
            type="hidden"
            value={boardId!}
            name="boardId"
            required={false}
            />

            <div className="flex justify-between w-4/5 mb-10">
              <Button
                text="&#8592; Go Back"
                onClick={goBack}
                disabled={loading}
              />
              <Button
                text="Continue"
                type="submit"
                disabled={loading}
              />
            </div>
            {loading ? (
              <div className="flex gap-3 items-center text-white">
                <SyncLoader color="#fff" />
                <p>Creating your board...</p>

              </div>
            ) :
              null}
          </form>
        </motion.div>
      )}
    </motion.div>
  )
}

export default OnboardingForm