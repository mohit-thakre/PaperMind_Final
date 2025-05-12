import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" w-full h-full justify-center items-center  pt-4 flex">
      <SignIn />
    </div>
  );
}
