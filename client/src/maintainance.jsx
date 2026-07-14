import { useState, useEffect } from "react";
import axios from "axios";

import { additemforrepairurl, getrepairitemsurl } from "./utils/constants";

const statusStyle = {
    "IN-REPAIR": "bg-amber-50 text-amber-700 border-amber-200",
    OVERDUE: "bg-rose-50 text-rose-700 border-rose-200",
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

const getEffectiveStatus = (i) => {
    if (i.status === "COMPLETED") return "COMPLETED";
    const today = new Date();
    const due = new Date(i.completeDate);
    if (i.completeDate && due < today) return "OVERDUE";
    return "IN-REPAIR";
};

const Maintainance = () => {
    const [addrepair, setaddrepair] = useState(false);
    const [itemId, setitemId] = useState("");
    const [cost, setcost] = useState("");
    const [issue, setissue] = useState("");
    const [assignedDate, setassignedDate] = useState(new Date().toISOString().split("T")[0]);
    const [completeDate, setcompleteDate] = useState("");
    const [items, setitems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(getrepairitemsurl, { withCredentials: true });
                setitems(res?.data || []);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const addReapirItem = async () => {
        try {
            const res = await axios.post(
                additemforrepairurl,
                { itemId, cost, issue, assignedDate, completeDate },
                { withCredentials: true }
            );
            setitems((prev) => [...prev, res.data]);
            setitemId("");
            setcost("");
            setissue("");
            setcompleteDate("");
            setaddrepair(false);
        } catch (err) {
            console.log(err);
        }
    };

    //console.log(items);

    return (
        <div className="p-6 md:p-10 bg-[#ededdf] min-h-screen">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 scale-y-110">MAINTENANCE</h1>
                    <p className="text-sm text-gray-500 mt-1">{items.length} items total</p>
                </div>
                <button
                    onClick={() => setaddrepair(true)}
                    className="bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
                >
                    + Add Item
                </button>
            </div>

            {addrepair && (
                <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-xs bg-black/20">
                    <div className="relative z-50 w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-900">Add Item for Repair</h2>
                            <button onClick={() => setaddrepair(false)} className="text-gray-400 hover:text-gray-700 text-xl leading-none cursor-pointer">×</button>
                        </div>
                        <div className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Item Id</label>
                                <input type="text" value={itemId} onChange={(e) => setitemId(e.target.value)} placeholder="e.g. 7a5362d9fcd61f9fecb79d5b" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Cost for repair</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={cost}
                                        onChange={(e) => setcost(Number(e.target.value))}
                                        placeholder="₹"
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Issue</label>
                                    <input
                                        type="text"
                                        value={issue}
                                        onChange={(e) => setissue(e.target.value)}
                                        placeholder="e.g. Broken"
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Assigned Date</label>
                                    <input type="date" value={assignedDate} onChange={(e) => setassignedDate(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Expected Completion</label>
                                    <input
                                        type="date"
                                        min={assignedDate}
                                        value={completeDate}
                                        onChange={(e) => setcompleteDate(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={addReapirItem}
                                className="w-full bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-md hover:bg-gray-800 transition-colors mt-2 cursor-pointer"
                            >
                                Add Item for Repair
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white border mt-9 border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                            <th className="px-6 py-3 font-semibold">Item</th>
                            <th className="px-6 py-3 font-semibold">Issue</th>
                            <th className="px-6 py-3 font-semibold">Cost</th>
                            <th className="px-6 py-3 font-semibold">Assigned Date</th>
                            <th className="px-6 py-3 font-semibold">Expected Completion</th>
                            <th className="px-6 py-3 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((i) => (
                            <tr key={i._id} className="border-b border-gray-100 last:border-none hover:bg-gray-50">
                                <td className="px-6 py-3.5 font-medium text-gray-900">
                                    {i.itemId?.itemName}
                                </td>
                                <td className="px-6 py-3.5 text-gray-600">{i.issue}</td>
                                <td className="px-6 py-3.5 text-gray-600">₹{Number(i.cost).toLocaleString()}</td>
                                <td className="px-6 py-3.5 text-gray-600">{formatDate(i.assignedDate)}</td>
                                <td className="px-6 py-3.5 text-gray-600">{formatDate(i.completeDate)}</td>
                                <td className="px-6 py-3.5">
                                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle[getEffectiveStatus(i)] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                        {getEffectiveStatus(i)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-400 py-10">No items currently under repair.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Maintainance;