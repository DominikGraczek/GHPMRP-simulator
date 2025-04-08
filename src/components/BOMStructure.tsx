const BOMStructure = () => {
    return (
        <section className="bg-gray-900 p-6 shadow-md max-w-2xl mx-auto py-6 text-white border-b-2">
            <h2 className="text-2xl font-bold mb-4">
                Struktura BOM - Deskorolka
            </h2>
            <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">
                    Poziom 0: Deskorolka
                </h3>
                <ul className="list-disc ml-6">
                    <li className="mb-4">
                        <strong className="block text-lg">
                            Poziom 1: Blat
                        </strong>
                        <p className="text-white">
                            Opis: Materiał, wymiary, design, itp.
                        </p>
                    </li>
                    <li>
                        <strong className="block text-lg">
                            Poziom 1: Kółka
                        </strong>
                        <p className="text-white mb-2">
                            Opis: Twardość, rozmiar, kolor, itp.
                        </p>
                        <ul className="list-disc ml-6">
                            <li>
                                <strong className="block text-lg">
                                    Poziom 2: Łożyska
                                </strong>
                                <p className="text-white">
                                    Opis: Typ, precyzja, materiał, itp.
                                </p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default BOMStructure;
