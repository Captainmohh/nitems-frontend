import { Search, Mail, Bell } from "lucide-react";
export default function Topbar(){
    return(
       <header className="flex items-center justify-between gap-4 px-6 py-4 bg-primary-white border-b border-gray-100">
        {/*Search Bar*/}
        <div className="flex items-center gap-2 flex-1 max-w-md bg-gray-100 rounded-lg px-4 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400 w-full"
                />
        </div>
        
        {/*ICONS*/}
        <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Mail className="w-5 h-5 text-gray-500"/>
            </button>
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-500"/>
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"/>
            </button>
        </div>
        </header> 
    );
}