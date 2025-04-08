import React, { useState, ChangeEvent } from "react";

const GHPTable: React.FC = () => {
    const weeks = 10;
    const [demand, setDemand] = useState<number[]>(Array(weeks).fill(0));
    const [production, setProduction] = useState<number[]>(
        Array(weeks).fill(0)
    );
    const [initialInventory, setInitialInventory] = useState<number>(2);
    const leadTime = 1;

    const handleDemandChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const updated = [...demand];
        updated[index] = Number(e.target.value);
        setDemand(updated);
    };

    const handleProductionChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const updated = [...production];
        updated[index] = Number(e.target.value);
        setProduction(updated);
    };

    const handleInventoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInitialInventory(Number(e.target.value));
    };

    const available: number[] = [];
    for (let i = 0; i < weeks; i++) {
        const prevAvailable = i === 0 ? initialInventory : available[i - 1];
        const net = prevAvailable + production[i] - demand[i];
        available.push(net);
    }

    return (
        <section className="bg-gray-600 text-white p-6 rounded-md max-w-6xl mx-auto mt-6">
            <h2 className="text-xl font-semibold mb-4 italic">GHP</h2>
            <div className="overflow-auto">
                <table className="w-full border-collapse border border-white text-sm">
                    <thead>
                        <tr>
                            <th className="border border-white px-2 py-1">
                                tydzień:
                            </th>
                            {Array.from({ length: weeks }).map((_, i) => (
                                <th
                                    key={i}
                                    className="border border-white px-2 py-1 text-center"
                                >
                                    {i + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-white px-2 py-1">
                                Przewidywany popyt
                            </td>
                            {demand.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-white px-1 py-1"
                                >
                                    <input
                                        type="number"
                                        value={val || ""}
                                        onChange={(e) =>
                                            handleDemandChange(i, e)
                                        }
                                        className="w-full text-center bg-gray-600 border border-gray-600 rounded"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-white px-2 py-1">
                                Produkcja
                            </td>
                            {production.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-white px-1 py-1"
                                >
                                    <input
                                        type="number"
                                        value={val || ""}
                                        onChange={(e) =>
                                            handleProductionChange(i, e)
                                        }
                                        className="w-full text-center bg-gray-600 border border-gray-600 rounded"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-white px-2 py-1">
                                Dostępne
                            </td>
                            {available.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-white px-2 py-1 text-center"
                                >
                                    {val}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                colSpan={weeks + 1}
                                className="border border-white px-2 py-2"
                            >
                                Czas realizacji = {leadTime}
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={weeks + 1}
                                className="border border-white px-2 py-2"
                            >
                                Na stanie =
                                <input
                                    type="number"
                                    value={initialInventory}
                                    onChange={handleInventoryChange}
                                    className="ml-2 w-16 text-center bg-gray-600 border border-gray-600 rounded"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default GHPTable;
