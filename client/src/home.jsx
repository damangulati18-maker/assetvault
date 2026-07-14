import { useState } from "react";

import Overview from "./overview";
import Equipment from "./equipment";
import Assignment from "./assignment";
import Facilities from "./facilities";
import Maintainance from "./maintainance";
import Settings from "./settings";

const NAV_ITEMS = [
  {
    key: "overview",
    label: "Overview",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" />
        <rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" />
        <rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
  },
  {
    key: "equipment",
    label: "Equipment",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    key: "facilities",
    label: "Facilities",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" />
        <line x1="9" y1="6" x2="9" y2="6" />
        <line x1="15" y1="6" x2="15" y2="6" />
        <line x1="9" y1="10" x2="9" y2="10" />
        <line x1="15" y1="10" x2="15" y2="10" />
        <line x1="9" y1="14" x2="9" y2="14" />
        <line x1="15" y1="14" x2="15" y2="14" />
        <path d="M9 22v-4h6v4" />
      </svg>
    ),
  },
  {
    key: "assignments",
    label: "Assignments",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: "maintainance",
    label: "Maintainance",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    key: "settings",
    label: "Settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

const Home = ()=>{

    const [page, setPage] = useState("overview");

    //console.log(page); 
    return(
        <div className="flex">

            <div id="sidebar" className="h-screen fixed w-72 bg-gray-900">
                
                <div className="flex mt-12 ml-6">
                    <div className="w-8 h-8 border-3 border-stone-200 rounded-sm relative mr-3">
                        <div className="absolute left-1/2 -top-1.5 w-0.5 h-2.5 bg-stone-200 -translate-x-1/2" />
                    </div>
                    <h1 className="text-white mt-0.75 font-bold text-lg scale-y-150 scale-x-105">VAULTLY</h1>
                </div>

                <div className="w-full h-px bg-gray-100/30 mt-10 mb-5"/>

                <div className="text-stone-300 p-6 sticky top-0 h-screen w-73 flex flex-col">
                    <nav className="flex flex-col gap-1">
                        {NAV_ITEMS.map(({ key, label, icon }) => (
                            <button key={key} onClick={() => setPage(key)} className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-medium text-left transition-colors cursor-pointer
                                ${ page === key
                                    ? "bg-neutral-700 text-stone-100 [&_svg]:text-amber-400"
                                    : "text-stone-400 hover:bg-neutral-800/60 hover:text-stone-100"}`}>
                                {icon} {label}
                            </button>
                        ))}
                    </nav>
                </div>

            </div>

            <div id="content" className="ml-72 w-full">
                {page==="overview" && <Overview/>}
                {page==="equipment" && <Equipment/>}
                {page==="facilities" && <Facilities/> }
                {page==="assignments" && <Assignment/>}
                {page==="maintainance" && <Maintainance/>}
                {page==="settings" && <Settings/>}
            </div>

        </div>
    )
}

export default Home;