import React, { useState, ChangeEvent } from "react";

type MRPResult = {
    grossReq: number[];
    scheduledReceipts: number[];
    onHand: number[];
    netReq: number[];
    plannedOrderRelease: number[];
    plannedOrderReceipts: number[];
};
const displayVal = (val: number) => (val === 0 ? "" : val);

function computeMRP(
    grossReq: number[],
    leadTime: number,
    lotSize: number,
    initialOnHand: number,
    scheduledReceiptsInput?: number[]
): MRPResult {
    const periods = grossReq.length;
    const scheduledReceipts = scheduledReceiptsInput ?? Array(periods).fill(0);
    const onHand = Array(periods).fill(0);
    const netReq = Array(periods).fill(0);
    const plannedOrderRelease = Array(periods).fill(0);
    const plannedOrderReceipts = Array(periods).fill(0);
    let currentOnHand = initialOnHand;
    for (let i = 0; i < periods; i++) {
        const available = currentOnHand + scheduledReceipts[i];
        const diff = available - grossReq[i];
        if (diff < 0) {
            const deficit = -diff;
            const plannedQty = Math.ceil(deficit / lotSize) * lotSize;
            netReq[i] = deficit;
            plannedOrderReceipts[i] = plannedQty;
            if (i - leadTime >= 0) {
                plannedOrderRelease[i - leadTime] = plannedQty;
            }
            currentOnHand = available + plannedQty - grossReq[i];
        } else {
            netReq[i] = 0;
            currentOnHand = diff;
        }
        onHand[i] = currentOnHand;
    }
    return {
        grossReq,
        scheduledReceipts,
        onHand,
        netReq,
        plannedOrderRelease,
        plannedOrderReceipts,
    };
}

function shiftArrayBackward(
    arr: number[],
    shift: number,
    multiplier: number,
    periods: number
): number[] {
    const result = Array(periods).fill(0);
    for (let i = 0; i < periods; i++) {
        const srcIndex = i + shift;
        if (srcIndex < arr.length) {
            result[i] = arr[srcIndex] * multiplier;
        }
    }
    return result;
}

const MultiLevelMRP: React.FC = () => {
    const periods = 10;
    const [ghpDemand, setGhpDemand] = useState<number[]>(
        Array(periods).fill(0)
    );
    const [ghpProduction, setGhpProduction] = useState<number[]>(
        Array(periods).fill(0)
    );
    const [ghpOnHand, setGhpOnHand] = useState<number>(2);
    const [blatOnHand, setBlatOnHand] = useState<number>(5);
    const [kolkaOnHand, setKolkaOnHand] = useState<number>(10);
    const [lozyskaOnHand, setLozyskaOnHand] = useState<number>(15);
    const [blatScheduledReceiptsInput, setBlatScheduledReceiptsInput] =
        useState<number[]>(Array(periods).fill(0));
    const [kolkaScheduledReceiptsInput, setKolkaScheduledReceiptsInput] =
        useState<number[]>(Array(periods).fill(0));
    const [lozyskaScheduledReceiptsInput, setLozyskaScheduledReceiptsInput] =
        useState<number[]>(Array(periods).fill(0));

    const [leadTimeGhp, setLeadTimeGhp] = useState<number>(1);
    const [leadTimeBlat, setLeadTimeBlat] = useState<number>(2);
    const [leadTimeKolka, setLeadTimeKolka] = useState<number>(2);
    const [leadTimeLozyska, setLeadTimeLozyska] = useState<number>(3);
    const [lotSizeBlat, setLotSizeBlat] = useState<number>(100);
    const [lotSizeKolka, setLotSizeKolka] = useState<number>(400);
    const [lotSizeLozyska, setLotSizeLozyska] = useState<number>(400);

    const handleGhpDemandChange = (
        i: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const arr = [...ghpDemand];
        arr[i] = Number(e.target.value);
        setGhpDemand(arr);
    };
    const handleGhpProductionChange = (
        i: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const arr = [...ghpProduction];
        arr[i] = Number(e.target.value);
        setGhpProduction(arr);
    };
    const handleGhpOnHandChange = (e: ChangeEvent<HTMLInputElement>) =>
        setGhpOnHand(Number(e.target.value));
    const handleBlatOnHandChange = (e: ChangeEvent<HTMLInputElement>) =>
        setBlatOnHand(Number(e.target.value));
    const handleKolkaOnHandChange = (e: ChangeEvent<HTMLInputElement>) =>
        setKolkaOnHand(Number(e.target.value));
    const handleLozyskaOnHandChange = (e: ChangeEvent<HTMLInputElement>) =>
        setLozyskaOnHand(Number(e.target.value));

    const ghpAvailable: number[] = [];
    let prev = ghpOnHand;
    for (let i = 0; i < periods; i++) {
        const now = prev + ghpProduction[i] - ghpDemand[i];
        ghpAvailable.push(now);
        prev = now;
    }

    const grossReqBlat = shiftArrayBackward(
        ghpProduction,
        leadTimeGhp,
        1,
        periods
    );
    const grossReqKolka = shiftArrayBackward(
        ghpProduction,
        leadTimeGhp,
        4,
        periods
    );
    const blatMRP = computeMRP(
        grossReqBlat,
        leadTimeBlat,
        lotSizeBlat,
        blatOnHand,
        blatScheduledReceiptsInput
    );
    const kolkaMRP = computeMRP(
        grossReqKolka,
        leadTimeKolka,
        lotSizeKolka,
        kolkaOnHand,
        kolkaScheduledReceiptsInput
    );
    const grossReqLozyska = shiftArrayBackward(
        kolkaMRP.grossReq,
        leadTimeKolka,
        1,
        periods
    );
    const lozyskaMRP = computeMRP(
        grossReqLozyska,
        leadTimeLozyska,
        lotSizeLozyska,
        lozyskaOnHand,
        lozyskaScheduledReceiptsInput
    );

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4 space-y-8">
            <div className="overflow-x-auto max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-4">
                    GHP (Poziom 0)
                </h2>
                <table className="w-full border border-gray-700 text-sm">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="border border-gray-700 px-2 py-1">
                                Tydzień
                            </th>
                            {Array.from({ length: periods }).map((_, i) => (
                                <th
                                    key={i}
                                    className="border border-gray-700 px-2 py-1"
                                >
                                    {i + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Przewidywany popyt
                            </td>
                            {ghpDemand.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1"
                                >
                                    <input
                                        type="number"
                                        value={displayVal(val)}
                                        onChange={(e) =>
                                            handleGhpDemandChange(i, e)
                                        }
                                        className="w-full bg-gray-800 border border-gray-600 rounded px-1"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Produkcja
                            </td>
                            {ghpProduction.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1"
                                >
                                    <input
                                        type="number"
                                        value={displayVal(val)}
                                        onChange={(e) =>
                                            handleGhpProductionChange(i, e)
                                        }
                                        className="w-full bg-gray-800 border border-gray-600 rounded px-1"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Dostępne
                            </td>
                            {ghpAvailable.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <div className="mt-2 flex items-center">
                    <span className="mr-2">Na stanie =</span>
                    <input
                        type="number"
                        value={ghpOnHand}
                        onChange={handleGhpOnHandChange}
                        className="bg-gray-800 border border-gray-600 rounded px-1 w-16"
                    />
                    <span className="ml-4">Czas realizacji:</span>
                    <input
                        type="number"
                        value={leadTimeGhp}
                        onChange={(e) => setLeadTimeGhp(Number(e.target.value))}
                    ></input>
                </div>
            </div>

            <div className="overflow-x-auto max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-4">
                    MRP - Blat (Poziom 1)
                </h2>
                <table className="w-full border border-gray-700 text-sm">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="border border-gray-700 px-2 py-1">
                                Okres
                            </th>
                            {Array.from({ length: periods }).map((_, i) => (
                                <th
                                    key={i}
                                    className="border border-gray-700 px-2 py-1"
                                >
                                    {i + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Całkowite zapotrzebowanie
                            </td>
                            {blatMRP.grossReq.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane przyjęcia
                            </td>
                            {blatMRP.scheduledReceipts.map((val, i) => (
                                <td key={i} className="...">
                                    <input
                                        type="number"
                                        value={val === 0 ? "" : val}
                                        onChange={(e) => {
                                            const newArr = [
                                                ...blatScheduledReceiptsInput,
                                            ];
                                            newArr[i] = Number(e.target.value);
                                            setBlatScheduledReceiptsInput(
                                                newArr
                                            );
                                        }}
                                        className="w-full bg-gray-800 border border-gray-600 rounded px-1 text-center"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Przewidywane na stanie
                            </td>
                            {blatMRP.onHand.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Zapotrzebowanie netto
                            </td>
                            {blatMRP.netReq.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane zamówienia
                            </td>
                            {blatMRP.plannedOrderRelease.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane przyjęcie zamówień
                            </td>
                            {blatMRP.plannedOrderReceipts.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                colSpan={periods + 1}
                                className="border border-gray-700 px-2 py-1 text-center"
                            >
                                <span>Czas realizacji:</span>
                                <input
                                    type="number"
                                    value={leadTimeBlat}
                                    onChange={(e) =>
                                        setLeadTimeBlat(Number(e.target.value))
                                    }
                                ></input>
                                <span>Wielkość partii:</span>
                                <input
                                    type="number"
                                    value={lotSizeBlat}
                                    onChange={(e) =>
                                        setLotSizeBlat(Number(e.target.value))
                                    }
                                ></input>
                                Poziom BOM = 1
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-2 flex items-center">
                    <span className="mr-2">Na stanie =</span>
                    <input
                        type="number"
                        value={blatOnHand}
                        onChange={handleBlatOnHandChange}
                        className="bg-gray-800 border border-gray-600 rounded px-1 w-16"
                    />
                </div>
            </div>

            <div className="overflow-x-auto max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-4">
                    MRP - Kółka (Poziom 1)
                </h2>
                <table className="w-full border border-gray-700 text-sm">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="border border-gray-700 px-2 py-1">
                                Okres
                            </th>
                            {Array.from({ length: periods }).map((_, i) => (
                                <th
                                    key={i}
                                    className="border border-gray-700 px-2 py-1"
                                >
                                    {i + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Całkowite zapotrzebowanie
                            </td>
                            {kolkaMRP.grossReq.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane przyjęcia
                            </td>
                            {kolkaMRP.scheduledReceipts.map((val, i) => (
                                <td key={i} className="...">
                                    <input
                                        type="number"
                                        value={val === 0 ? "" : val}
                                        onChange={(e) => {
                                            const newArr = [
                                                ...kolkaScheduledReceiptsInput,
                                            ];
                                            newArr[i] = Number(e.target.value);
                                            setKolkaScheduledReceiptsInput(
                                                newArr
                                            );
                                        }}
                                        className="w-full bg-gray-800 border border-gray-600 rounded px-1 text-center"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Przewidywane na stanie
                            </td>
                            {kolkaMRP.onHand.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Zapotrzebowanie netto
                            </td>
                            {kolkaMRP.netReq.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane zamówienia
                            </td>
                            {kolkaMRP.plannedOrderRelease.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane przyjęcie zamówień
                            </td>
                            {kolkaMRP.plannedOrderReceipts.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                colSpan={periods + 1}
                                className="border border-gray-700 px-2 py-1 text-center"
                            >
                                <span>Czas realizacji:</span>
                                <input
                                    type="number"
                                    value={leadTimeKolka}
                                    onChange={(e) =>
                                        setLeadTimeKolka(Number(e.target.value))
                                    }
                                ></input>
                                <span>Wielkość partii:</span>
                                <input
                                    type="number"
                                    value={lotSizeKolka}
                                    onChange={(e) =>
                                        setLotSizeKolka(Number(e.target.value))
                                    }
                                ></input>
                                Poziom BOM = 1
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-2 flex items-center">
                    <span className="mr-2">Na stanie =</span>
                    <input
                        type="number"
                        value={kolkaOnHand}
                        onChange={handleKolkaOnHandChange}
                        className="bg-gray-800 border border-gray-600 rounded px-1 w-16"
                    />
                </div>
            </div>

            <div className="overflow-x-auto max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-4">
                    MRP - Łożyska (Poziom 2)
                </h2>
                <table className="w-full border border-gray-700 text-sm">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="border border-gray-700 px-2 py-1">
                                Okres
                            </th>
                            {Array.from({ length: periods }).map((_, i) => (
                                <th
                                    key={i}
                                    className="border border-gray-700 px-2 py-1"
                                >
                                    {i + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Całkowite zapotrzebowanie
                            </td>
                            {lozyskaMRP.grossReq.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane przyjęcia
                            </td>
                            {lozyskaMRP.scheduledReceipts.map((val, i) => (
                                <td key={i} className="...">
                                    <input
                                        type="number"
                                        value={val === 0 ? "" : val}
                                        onChange={(e) => {
                                            const newArr = [
                                                ...lozyskaScheduledReceiptsInput,
                                            ];
                                            newArr[i] = Number(e.target.value);
                                            setLozyskaScheduledReceiptsInput(
                                                newArr
                                            );
                                        }}
                                        className="w-full bg-gray-800 border border-gray-600 rounded px-1 text-center"
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Przewidywane na stanie
                            </td>
                            {lozyskaMRP.onHand.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Zapotrzebowanie netto
                            </td>
                            {lozyskaMRP.netReq.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane zamówienia
                            </td>
                            {lozyskaMRP.plannedOrderRelease.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-700 px-2 py-1 font-semibold">
                                Planowane przyjęcie zamówień
                            </td>
                            {lozyskaMRP.plannedOrderReceipts.map((val, i) => (
                                <td
                                    key={i}
                                    className="border border-gray-700 px-2 py-1 text-center"
                                >
                                    {displayVal(val)}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td
                                colSpan={periods + 1}
                                className="border border-gray-700 px-2 py-1 text-center"
                            >
                                <span>Czas realizacji:</span>
                                <input
                                    type="number"
                                    value={leadTimeLozyska}
                                    onChange={(e) =>
                                        setLeadTimeLozyska(
                                            Number(e.target.value)
                                        )
                                    }
                                ></input>
                                <span>Wielkość partii:</span>
                                <input
                                    type="number"
                                    value={lotSizeLozyska}
                                    onChange={(e) =>
                                        setLotSizeLozyska(
                                            Number(e.target.value)
                                        )
                                    }
                                ></input>
                                Poziom BOM = 2
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-2 flex items-center">
                    <span className="mr-2">Na stanie =</span>
                    <input
                        type="number"
                        value={lozyskaOnHand}
                        onChange={handleLozyskaOnHandChange}
                        className="bg-gray-800 border border-gray-600 rounded px-1 w-16"
                    />
                </div>
            </div>
        </div>
    );
};

export default MultiLevelMRP;
