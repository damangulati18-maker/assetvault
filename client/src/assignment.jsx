import { useState, useEffect } from "react";
import axios from "axios";

import { getassignitemsurl,assignitemurl} from "./utils/constants";


const Assignment = () => {
    const [assignitem, setassignitem] = useState([]);
    const [assigneqp,setassigneqp] = useState(false);

    const [itemId,setitemId] = useState("");
    const [assignedTo,setassignedTo] = useState("");
    const [assignedBy,setassignedBy] = useState("");
    const [assignDate,setassignDate] = useState(new Date().toISOString().split("T")[0]);
    const [returnDate,setreturnDate] = useState("");
    const [quantity,setquantity] = useState("");


    const getEffectiveStatus = (i) => {
        if (i.status === "RETURNED") return "RETURNED";
        const today = new Date();
        const due = new Date(i.returnDate);
        if (i.returnDate && due < today) return "OVERDUE";
        return "ACTIVE";
    };

    const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—";

    const assignItem = async() =>{
        try{
            axios.post(assignitemurl,{itemId,assignedTo,assignedBy,assignDate,quantity,returnDate});
            setassigneqp(false);
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(getassignitemsurl, { withCredentials: true });
                setassignitem(res?.data || []);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const statusStyle = {
    ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
    OVERDUE: "bg-rose-50 text-rose-700 border-rose-200",
    RETURNED: "bg-sky-50 text-sky-700 border-sky-200",
};

    console.log(assignitem);

    return (
        <div className="p-6 md:p-10 bg-[#ededdf] min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 scale-y-110">ASSIGNMENTS</h1>
                <div className="flex justify-between">
                    <p className="text-sm text-gray-500 mt-1">{assignitem.length} items total</p>
                    <button onClick={()=>setassigneqp(true)} className="bg-gray-900 mt-3 text-white text-sm font-semibold px-4 py-2.5 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">+ Assign Equipment</button>
                </div>
            </div>
             
            {assigneqp && (
                <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-xs bg-black/20">
                    <div className="relative z-50 w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-900">Assign Equipment</h2>
                            <button onClick={() => setassigneqp(false)}className="text-gray-400 hover:text-gray-700 text-xl leading-none cursor-pointer">×</button>
                        </div>
                        <div className="space-y-3.5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Item Id</label>
                        <input type="text" value={itemId} onChange={(e) => setitemId(e.target.value)} placeholder="e.g. 7a5362d9fcd61f9fecb79d5b" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                    </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Assign To</label>
                        <input type="text" value={assignedTo} onChange={(e) => setassignedTo(e.target.value)} placeholder="e.g. Customer" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                    </div>
                    <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Assign By</label>
                    <select value={assignedBy} onChange={(e) => setassignedBy(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700">
                        <option value="">Select a location</option>
                        <option value="NORTH STORE">North Store</option>
                        <option value="CENTRAL STORE">Central Store</option>
                        <option value="SOUTH STORE">South Store</option>
                    </select>
                </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Assign Date</label>
                        <input type="date"  min="1" value={assignDate} onChange={(e) => setassignDate(e.target.value)}  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Returning Date</label>
                        <input  type="date" min="0"  value={returnDate} onChange={(e) => setreturnDate(e.target.value)} placeholder="₹" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Quantity</label>
                    <input type="number" value={quantity} onChange={(e) => setquantity(Number(e.target.value))} placeholder="e.g. 1" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                </div>

                <button
                    onClick={assignItem}
                    className="w-full bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-md hover:bg-gray-800 transition-colors mt-2 cursor-pointer"
                >
                    Assign Equipment
                </button>
            </div>
        </div>
    </div>
)}

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                            <th className="px-6 py-3 font-semibold">Item</th>
                            <th className="px-6 py-3 font-semibold">Category</th>
                            <th className="px-6 py-3 font-semibold">Assigned To</th>
                            <th className="px-6 py-3 font-semibold">Assigned By</th>
                            <th className="px-6 py-3 font-semibold">Quantity</th>
                            <th className="px-6 py-3 font-semibold">Assigned From</th>
                            <th className="px-6 py-3 font-semibold">Assigned Till</th>
                            <th className="px-6 py-3 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignitem.map((i) => (
                            <tr key={i._id} className="border-b border-gray-100 last:border-none hover:bg-gray-50">
                                <td className="px-6 py-3.5 font-medium text-gray-900">{i.itemId?.itemName}</td>
                                <td className="px-6 py-3.5 text-gray-600">{i.itemId?.category}</td>
                                <td className="px-6 py-3.5 text-gray-600">{i.assignedTo}</td>
                                <td className="px-6 py-3.5 text-gray-600">{i.assignedBy}</td>
                                <td className="px-6 py-3.5 text-gray-600">{i.quantity}</td>
                                <td className="px-6 py-3.5 text-gray-600">{formatDate(i.assignDate)}</td>
                                <td className="px-6 py-3.5 text-gray-600">{formatDate(i.returnDate)}</td>
                                <td className="px-6 py-3.5">
                                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle[getEffectiveStatus(i)] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                        {getEffectiveStatus(i)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {assignitem.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center text-gray-400 py-10">No equipment found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Assignment;