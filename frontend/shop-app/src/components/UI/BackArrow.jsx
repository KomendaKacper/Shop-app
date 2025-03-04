import { IoMdArrowBack } from "react-icons/io";
export default function BackArrow() {
  return (
    <div className="ml-12">
      <a href="/home" className="flex items-center">
        <IoMdArrowBack className="text-black text-l cursor-pointer" />
        <p className=" text-black ml-2">Back</p>
      </a>
    </div>
  );
}
