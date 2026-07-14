import { useState, useEffect } from "react";
import axios from "axios";

import { getitemsurl,additemurl } from './utils/constants';

const Equipment = () => {
    const [item, setitem] = useState([]);
    const [addeqp,setaddeqp] = useState(false);
    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [purchasePrice, setPurchasePrice] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(getitemsurl, { withCredentials: true });
                setitem(res?.data || []);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const addItem = async()=>{
        try{
            axios.post(additemurl,{itemName,category,brand,status,quantity,purchasePrice,location},{withCredentials:true})
            setaddeqp(false);
        }
        catch(err)
        {
            console.log(err);
        }
    }

   /* const statusStyle = {
        AVAILABLE: "bg-emerald-50 text-emerald-700 border-emerald-200",
        "IN-USE": "bg-amber-50 text-amber-700 border-amber-200",
        "IN-REPAIR": "bg-rose-50 text-rose-700 border-rose-200",
        RETIRED: "bg-gray-100 text-gray-500 border-gray-200",
    };*/

    return (
        <div className="p-6 md:p-10 bg-[#ededdf] min-h-screen">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 scale-y-110">EQUIPMENT</h1>
                    <p className="text-sm text-gray-500 mt-1">{item.length} items total</p>
                    <p className="text-sm text-gray-500 mt-3">This is the list of all equipments owned, <br/>which also includes equipments assigned <br/>and under maintainance.</p>
                </div>
                <button onClick={()=>setaddeqp(true)} className="bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">+ Add Equipment</button>
            </div>
            {addeqp && (
                <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-xs bg-black/20">
                    <div className="relative z-50 w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-900">Add Equipment</h2>
                            <button onClick={() => setaddeqp(false)}className="text-gray-400 hover:text-gray-700 text-xl leading-none cursor-pointer">×</button>
                        </div>
                        <div className="space-y-3.5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Item name</label>
                        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="e.g. Drill machine" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                    </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. e-machine" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Brand</label>
                        <input type="text"  value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Bosch" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Quantity</label>
                        <input type="number"  min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Purchase price for 1</label>
                        <input  type="number" min="0"  value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} placeholder="₹" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700"/>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Location</label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-sky-700">
                        <option value="">Select a location</option>
                        <option value="NORTH STORE">North Store</option>
                        <option value="CENTRAL STORE">Central Store</option>
                        <option value="SOUTH STORE">South Store</option>
                    </select>
                </div>

                <button
                    onClick={addItem}
                    className="w-full bg-gray-900 text-white text-sm font-semibold py-2.5 rounded-md hover:bg-gray-800 transition-colors mt-2 cursor-pointer"
                >
                    Add Equipment
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
                            <th className="px-6 py-3 font-semibold">Brand</th>
                            <th className="px-6 py-3 font-semibold">Quantity</th>
                            <th className="px-6 py-3 font-semibold">Unit price</th>
                            <th className="px-6 py-3 font-semibold">Total price</th>
                            <th className="px-6 py-3 font-semibold">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.map((i) => (
                            <tr key={i._id} className="border-b border-gray-100 last:border-none hover:bg-gray-50">
                                <td className="px-6 py-3.5 font-medium text-gray-900">{i.itemName}</td>
                                <td className="px-6 py-3.5 text-gray-600">{i.category}</td>
                                <td className="px-6 py-3.5 text-gray-600">{i.brand}</td>
                                <td className="px-6 py-3.5 text-gray-600">{i.quantity}</td>
                                <td className="px-6 py-3.5 text-gray-600">₹{i.purchasePrice?.toLocaleString()}</td>
                                <td className="px-6 py-3.5 text-gray-600">{i.quantity*i.purchasePrice}</td>
                                <td className="px-6 py-3.5 text-gray-600">{i.location}</td>
                            </tr>
                        ))}
                        {item.length === 0 && (
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

export default Equipment;