import { useEffect, useState } from "react";
import { TypeaheadSearch } from "./TypeaheadSearch";
import {TitleBox } from "./TitleBox";
import {NavMenu} from "./NavMenu";



export default function App() {
  const [result, setResult] = useState<any>(null);



  return (
 <div className="min-h-screen bg-black text-white">
       <div className="mx-auto w-full max-w-6xl px-6 pt-10 sm:px-8">
         <div className="flex flex-col gap-8">
           {/* Header: mobile stacks, desktop is a row */}
           <header className="flex flex-col gap-4 md:flex-row md:items-start md:gap-14">
             {/* On mobile, nav should be above title */}


             {/* On desktop, title should appear before nav (title is first in DOM) */}
             <TitleBox className="order-2 md:order-none" />
             <NavMenu className="order-1 md:order-none md:mt-3" />
           </header>

           {/* Search row: centered on X axis */}
           <div className="mt-0 md:mt-12 flex justify-center">
             <div className="w-full max-w-[760px]">
               <TypeaheadSearch className="w-full" />
             </div>
           </div>
         </div>
       </div>
     </div>
  );
}
