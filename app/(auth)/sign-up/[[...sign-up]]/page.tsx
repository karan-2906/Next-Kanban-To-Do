import { SignUp } from "@clerk/nextjs";

const Page = () => {
    return (
        <div className="dark:bg-gray-900 h-screen flex items-center justify-center">


            <SignUp />
        </div>
    )
}

export default Page;