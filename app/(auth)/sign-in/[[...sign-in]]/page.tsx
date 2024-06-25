import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="dark:bg-gray-900 h-screen flex items-center justify-center">

      <SignIn />
    </div>
  )
};

export default Page;