import { HashLoader } from "react-spinners";

export default function LoadingAnimation(){
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center sm:h-[40vh] lg:h-[50vh] z-10">
      <HashLoader color="rgba(28, 9, 242, 0.8)" />
    </div>
  );
};