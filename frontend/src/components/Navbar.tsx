import { WorkSpaceContext } from "@/store/context";
import { Rocket } from "lucide-react";
import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {};

const Navbar = (props: Props) => {
  const {
    state: { author } = {
      author: null,
    },
    dispatch,
  } = useContext(WorkSpaceContext);

  return (
    <div className="bg-slate-100 p-5 border border-b-slate-300 h-16 flex justify-between">
      <h2 className="flex text-slate-500 font-bold">
        <Rocket className="mr-1" />
        CMS | Documentation Editor (usecase)
      </h2>
      <div className="flex justify-center items-center">
        <h2 className="text-green-500"><b> @{author?.userName}</b></h2>
        <Avatar className="ml-2">
          <AvatarImage src="https://avatars.githubusercontent.com/u/63568455?v=4" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
