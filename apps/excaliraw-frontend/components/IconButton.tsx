import { ReactNode } from "react";

export function IconButton({icon,onClick,gotClicked}:{icon:ReactNode,onClick:()=>void,gotClicked:string }
){  
    return(
        <div className={`border-0 cursor-pointer rounded-xl  p-2  ${gotClicked}`}
        onClick={onClick}>
            {icon}
        </div>
    )
}   