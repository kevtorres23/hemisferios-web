import { Search } from "lucide-react";

type SearchBarProps = {
    placeholder: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar(props: SearchBarProps) {
    return (
        <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md flex flex-row gap-2 items-center justify-center self-start md:w-80 sm:w-auto w-full">
            <Search size={16} className="text-slate-400"/>

            <input onChange={props.onInputChange} className="text-sm font-normal w-full text-slate-800 focus:border-none focus:outline-none" placeholder={props.placeholder}/>
        </div>
    );
};

export default SearchBar;