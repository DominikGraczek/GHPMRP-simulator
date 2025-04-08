import React, { useState, ChangeEvent } from "react";

const MRPTable: React.FC = () => {
    const periods = 6;
    const [demand, setDemand] = useState<number[]>(Array(periods).fill(0));
    const [receipts, setReceipts] = useState<number[]>(Array(periods).fill(0));
    const [initialInventory, setInitialInventory] = useState<number>(22);

    const handleDemandChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const newValues = [...demand];
        newValues[index] = Number(e.target.value);
        setDemand(newValues);
    };

    const handleReceiptsChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const newValues = [...receipts];
        newValues[index] = Number(e.target.value);
        setReceipts(newValues);
    };

    const handleInitialInventoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInitialInventory(Number(e.target.value));
    };

    const lotSize = 40;
    const leadTime = 3;

    const calculated = Array.from({ length: periods }).map(() => ({
        forecastInventory: 0,
        netRequirement: 0,
        plannedOrders: 0,
        plannedOrderReceipts: 0,
    }));

    let inventoryAtStart = initialInventory;

    for (let i = 0; i < periods; i++) {
        const netReq = Math.max(
            0,
            demand[i] - (inventoryAtStart + receipts[i])
        );
        const planned = netReq > 0 ? Math.ceil(netReq / lotSize) * lotSize : 0;
        const plannedReceipts = planned;

        const forecastInv =
            inventoryAtStart + receipts[i] + plannedReceipts - demand[i];

        calculated[i].netRequirement = netReq;
        calculated[i].plannedOrders = planned;
        calculated[i].plannedOrderReceipts = plannedReceipts;
        calculated[i].forecastInventory = forecastInv;

        inventoryAtStart = forecastInv;
    }

    return (
        <section className="bg-gray-900 p-4 min-h-screen text-white">
            <div className="overflow-x-auto max-w-5xl mx-auto">
                <table className="w-full border border-gray-700 text-sm">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="border border-gray-700 px-2 py-1"></th>
                            {Array.from({ length: periods }).map((_, i) => (
                                <th
                                    key={i}
                                    className="border border-gray-700 px-2 py-1"
                                >
                                    {i + 1}
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th
                                colSpan={periods + 1}
                                className="border border-gray-700 px-2 py-2 bg-gray-800 text-center"
                            >
                                Dane produkcyjne
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Całkowite zapotrzebowanie
                            </td>
                            {demand.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1"
                                >
                                    <input
                                        type="number"
                                        className="w-full bg-gray-800 border border-gray-600 rounded px-1"
                                        value={val}
                                        onChange={(e) =>
                                            handleDemandChange(i, e)
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane przyjęcia
                            </td>
                            {receipts.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1"
                                >
                                    <input
                                        type="number"
                                        className="w-full bg-gray-800 border border-gray-600 rounded px-1"
                                        value={val}
                                        onChange={(e) =>
                                            handleReceiptsChange(i, e)
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Przewidywane na stanie
                            </td>
                            {calculated.map((c, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {c.forecastInventory}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Zapotrzebowanie netto
                            </td>
                            {calculated.map((c, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {c.netRequirement}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane zamówienia
                            </td>
                            {calculated.map((c, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {c.plannedOrders}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane przyjęcie zamówień
                            </td>
                            {calculated.map((c, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {c.plannedOrderReceipts}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                colSpan={periods + 1}
                                className="border border-gray-700 px-2 py-1"
                            >
                                Czas realizacji = {leadTime}
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={periods + 1}
                                className="border border-gray-700 px-2 py-1"
                            >
                                Wielkość partii = {lotSize}
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={periods + 1}
                                className="border border-gray-700 px-2 py-1"
                            >
                                Poziom BOM = 1
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={periods + 1}
                                className="border border-gray-700 px-2 py-1"
                            >
                                Na stanie =
                                <input
                                    type="number"
                                    className="bg-gray-800 border border-gray-600 rounded px-1 ml-2 w-16"
                                    value={initialInventory}
                                    onChange={handleInitialInventoryChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MRPTable;
