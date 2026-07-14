import { useState, useEffect } from "react";
import axios from "axios";

import { getitemsurl,getassignitemsurl,getrepairitemsurl} from "./utils/constants";

const Overview = () => {

    const [items,setitems] = useState([]);
    const [assignitems,setassignitems] = useState([]);
    const [northeqp,setnortheqp] = useState(0);
    const [centereqp,setcentereqp] = useState(0);
    const [southeqp,setsoutheqp] = useState(0);
    const [northunits,setnorthunits] = useState(0);
    const [centerunits,setcenterunits] = useState(0);
    const [southunits,setsouthunits] = useState(0);
    const [repaircount,setrepaircount] = useState("");

    useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get(getitemsurl, { withCredentials: true });
            const res2 = await axios.get(getassignitemsurl, { withCredentials: true });
            const res3 = await axios.get(getrepairitemsurl,{withCredentials:true});
            
            setrepaircount(res3?.data); 
            const allItems = res?.data || [];
            setitems(allItems);
            setassignitems(res2?.data || []);

            const northCount = allItems.filter(
                (i) => i.location?.toLowerCase() === "north store"
            ).length;
            const centerCount = allItems.filter(
                (i) => i.location?.toLowerCase() === "central store"
            ).length;
            const southCount = allItems.filter(
                (i) => i.location?.toLowerCase() === "south store"
            ).length;

            setnortheqp(northCount);
            setcentereqp(centerCount);
            setsoutheqp(southCount);

            // sum of quantity per location
            const northUnitCount = allItems
                .filter((i) => i.location?.toLowerCase() === "north store")
                .reduce((sum, i) => sum + (i.quantity || 0), 0);

            const centerUnitCount = allItems
                .filter((i) => i.location?.toLowerCase() === "central store")
                .reduce((sum, i) => sum + (i.quantity || 0), 0);

            const southUnitCount = allItems
                .filter((i) => i.location?.toLowerCase() === "south store")
                .reduce((sum, i) => sum + (i.quantity || 0), 0);

            setnorthunits(northUnitCount);
            setcenterunits(centerUnitCount);
            setsouthunits(southUnitCount);
        } catch (err) {
            console.log(err);
        }
    };
    fetchData();
    }, []);

    //console.log(repaircount.length);

    return (
        <div className="p-6 md:p-10 bg-[#ededdf] min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 scale-y-110">OVERVIEW</h1>
                <p className="text-sm text-gray-500 mt-1">Everything due, everywhere, at a glance.</p>
            </div>

            <div className="grid grid-cols-2 gap-px bg-gray-300 border border-gray-300 rounded-lg overflow-hidden  max-w-xl mx-auto mt-9">
                <div className="bg-white p-5">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Types of Equipments</div>
                    <div className="text-3xl font-bold text-gray-900">{items.length}</div>
                </div>
                <div className="bg-white p-5">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Total equipment units</div>
                    <div className="text-3xl font-bold text-emerald-800/80">{northunits+southunits+centerunits}</div>
                </div>
                <div className="bg-white p-5">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">equipments assigned</div>
                    <div className="text-3xl font-bold text-amber-500">{assignitems.length}</div>
                </div>
                <div className="bg-white p-5">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Under maintainance</div>
                    <div className="text-3xl font-bold text-rose-500">{repaircount.length} </div>
                </div>
            </div>

            <div className="rounded-lg mt-15 max-w-xl bg-white mx-auto border border-gray-300">
                <h1 className="text-xl font-bold text-gray-900 scale-y-110 scale-x-90 mt-6">FACILITIES AT GLANCE</h1>
                <div className="w-full h-px bg-gray-300 mt-8"/>
                <div className="text-gray-900/80 text-lg scale-x-90 mt-4 mb-4 flex justify-between items-center">
                    <h1 className="text-gray-900/80 text-lg scale-x-95">North Store</h1>
                    <p className="text-sm">
                        <span className="font-semibold text-sky-400">{northeqp}</span>
                        <span className="text-gray-500"> equipments</span>
                        <span className="text-gray-300 mx-2">|</span>
                        <span className="font-semibold text-emerald-700">{northunits}</span>
                       <span className="text-gray-500"> total units</span>
                    </p>
                </div>
                <div className="w-full h-px bg-gray-300"/>
                <div className="text-gray-900/80 text-lg scale-x-90 mt-4 mb-4 flex justify-between items-center">
                    <h1 className="text-gray-900/80 text-lg scale-x-95">South Store</h1>
                    <p className="text-sm">
                        <span className="font-semibold text-sky-400">{southeqp}</span>
                        <span className="text-gray-500"> equipments</span>
                        <span className="text-gray-300 mx-2">|</span>
                        <span className="font-semibold text-emerald-700">{southunits}</span>
                       <span className="text-gray-500"> total units</span>
                    </p>
                </div>
                <div className="w-full h-px bg-gray-300"/>
                <div className="text-gray-900/80 text-lg scale-x-90 mt-4 mb-4 flex justify-between items-center">
                    <h1 className="text-gray-900/80 text-lg scale-x-95">Center Store</h1>
                    <p className="text-sm">
                        <span className="font-semibold text-sky-400">{centereqp}</span>
                        <span className="text-gray-500"> equipments</span>
                        <span className="text-gray-300 mx-2">|</span>
                        <span className="font-semibold text-emerald-700">{centerunits}</span>
                       <span className="text-gray-500"> total units</span>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Overview;