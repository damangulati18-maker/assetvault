import { useState, useEffect } from "react";
import axios from "axios";

import { getitemsurl, getassignitemsurl } from "./utils/constants";

const STORES = ["NORTH STORE", "CENTRAL STORE", "SOUTH STORE"];

const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—";

const Facilities = () => {
    const [items, setItems] = useState([]);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(getitemsurl, { withCredentials: true });
                const res2 = await axios.get(getassignitemsurl, { withCredentials: true });
                setItems(res?.data || []);
                setAssignments(res2?.data || []);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 md:p-10 bg-[#ededdf] min-h-screen">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 scale-y-110">FACILITIES</h1>
                    <p className="text-sm text-gray-500 mt-1">Get equipment details and availability for each facility.</p>
                </div>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
                {STORES.map((store) => {
                    const storeItems = items.filter((i) => i.location === store);
                    const storeAssignments = assignments.filter((a) => a.assignedBy === store);

                    const totalUnits = storeItems.reduce((sum, i) => sum + (i.quantity || 0), 0);
                    const assignedUnits = storeAssignments
                        .filter((a) => a.status === "ACTIVE" || a.status === "OVERDUE")
                        .reduce((sum, a) => sum + (a.quantity || 0), 0);
                    const availableUnits = totalUnits - assignedUnits;

                    return (
                        <div key={store} className="rounded-lg bg-white border border-gray-300 shadow-sm overflow-hidden">
                            {/* Header */}
                            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between flex-wrap gap-3">
                                <h2 className="text-lg font-bold text-gray-900 tracking-wide">{store}</h2>
                                <div className="flex gap-6 text-sm">
                                    <div>
                                        <span className="font-semibold text-gray-900">{storeItems.length}</span>
                                        <span className="text-gray-500"> equipments</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-emerald-700">{availableUnits}</span>
                                        <span className="text-gray-500"> items available</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-amber-600">{assignedUnits}</span>
                                        <span className="text-gray-500"> items assigned</span>
                                    </div>
                                </div>
                            </div>

                            {/* Equipment table */}
                            <div className="px-6 py-4">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Equipment</h3>
                                <div className="border border-gray-200 rounded-md overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                                                <th className="px-4 py-2 font-semibold">Item</th>
                                                <th className="px-4 py-2 font-semibold">Category</th>
                                                <th className="px-4 py-2 font-semibold">Brand</th>
                                                <th className="px-4 py-2 font-semibold">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {storeItems.map((i) => (
                                                <tr key={i._id} className="border-t border-gray-100">
                                                    <td className="px-4 py-2 font-medium text-gray-900">{i.itemName}</td>
                                                    <td className="px-4 py-2 text-gray-600">{i.category}</td>
                                                    <td className="px-4 py-2 text-gray-600">{i.brand}</td>
                                                    <td className="px-4 py-2 text-gray-600">{i.quantity}</td>
                                                </tr>
                                            ))}
                                            {storeItems.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="text-center text-gray-400 py-6">No equipment at this store.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Assignments table */}
                            <div className="px-6 pb-6">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Assignments</h3>
                                <div className="border border-gray-200 rounded-md overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                                                <th className="px-4 py-2 font-semibold">Item</th>
                                                <th className="px-4 py-2 font-semibold">Assigned To</th>
                                                <th className="px-4 py-2 font-semibold">Quantity</th>
                                                <th className="px-4 py-2 font-semibold">From</th>
                                                <th className="px-4 py-2 font-semibold">Till</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {storeAssignments.map((a) => (
                                                <tr key={a._id} className="border-t border-gray-100">
                                                    <td className="px-4 py-2 font-medium text-gray-900">{a.itemId?.itemName}</td>
                                                    <td className="px-4 py-2 text-gray-600">{a.assignedTo}</td>
                                                    <td className="px-4 py-2 text-gray-600">{a.quantity}</td>
                                                    <td className="px-4 py-2 text-gray-600">{formatDate(a.assignDate)}</td>
                                                    <td className="px-4 py-2 text-gray-600">{formatDate(a.returnDate)}</td>
                                                </tr>
                                            ))}
                                            {storeAssignments.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="text-center text-gray-400 py-6">No assignments at this store.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Facilities;