import css from "./SkateboardBomSimulator.module.css";
const SkateboardBomSimulator = () => {
    return (
        <div
            className={css.main}
            style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
        >
            <h1>Symulacja MRP i GHP dla Deskorolki</h1>

            {/* Struktura BOM */}
            <section style={{ marginBottom: "40px" }}>
                <h2>Struktura BOM - Deskorolka</h2>
                <div>
                    <h3>Poziom 0: Deskorolka</h3>
                    <ul>
                        <li>
                            <strong>Poziom 1: Blat</strong>
                            <p>Opis: Materiał, wymiary, design, itp.</p>
                        </li>
                        <li>
                            <strong>Poziom 1: Kółka</strong>
                            <p>Opis: Twardość, rozmiar, kolor, itp.</p>
                            <ul>
                                <li>
                                    <strong>Poziom 2: Łożyska</strong>
                                    <p>Opis: Typ, precyzja, materiał, itp.</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Moduł GHP */}
            <section style={{ marginBottom: "40px" }}>
                <h2>Moduł GHP (deskorolka) </h2>
                <table border={1} cellPadding="5" cellSpacing="0">
                    <thead>
                        <tr>
                            {/* Pusta komórka dla etykiet wierszy */}
                            <th></th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Przewidywany popyt</strong>
                            </td>
                            <td>100</td>
                            <td>110</td>
                            <td>120</td>
                            <td>130</td>
                            <td>140</td>
                            <td>150</td>
                            <td>160</td>
                            <td>170</td>
                            <td>180</td>
                            <td>190</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Produkcja</strong>
                            </td>
                            <td>120</td>
                            <td>130</td>
                            <td>140</td>
                            <td>150</td>
                            <td>160</td>
                            <td>170</td>
                            <td>180</td>
                            <td>190</td>
                            <td>200</td>
                            <td>210</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Dostępne</strong>
                            </td>
                            <td>20</td>
                            <td>20</td>
                            <td>20</td>
                            <td>20</td>
                            <td>20</td>
                            <td>20</td>
                            <td>20</td>
                            <td>20</td>
                            <td>20</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Czas realizacji</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Na stanie</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Moduł MRP */}
            <section>
                <h2>Moduł MRP (blat)</h2>
                <table border={1} cellPadding="5" cellSpacing="0">
                    <thead>
                        <tr>
                            <th></th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Całkowite zapotrzebowanie</strong>
                            </td>
                            <td>150</td>
                            <td>160</td>
                            <td>170</td>
                            <td>180</td>
                            <td>190</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Planowane przyjęcia</strong>
                            </td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Przewidywane na stanie</strong>
                            </td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Zapotrzebowanie netto</strong>
                            </td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Planowane zamówienia</strong>
                            </td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Planowane przyjęcie zamówień</strong>
                            </td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Czas realizacji</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Wielkość partii</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Poziom BOM</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Na stanie</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <h2>Moduł MRP (kółka)</h2>
                <table border={1} cellPadding="5" cellSpacing="0">
                    <thead>
                        <tr>
                            <th></th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Całkowite zapotrzebowanie</strong>
                            </td>
                            <td>150</td>
                            <td>160</td>
                            <td>170</td>
                            <td>180</td>
                            <td>190</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Planowane przyjęcia</strong>
                            </td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Przewidywane na stanie</strong>
                            </td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Zapotrzebowanie netto</strong>
                            </td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Planowane zamówienia</strong>
                            </td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Planowane przyjęcie zamówień</strong>
                            </td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Czas realizacji</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Wielkość partii</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Poziom BOM</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Na stanie</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <h2>Moduł MRP (Łożyska)</h2>
                <table border={1} cellPadding="5" cellSpacing="0">
                    <thead>
                        <tr>
                            <th></th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Całkowite zapotrzebowanie</strong>
                            </td>
                            <td>150</td>
                            <td>160</td>
                            <td>170</td>
                            <td>180</td>
                            <td>190</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Planowane przyjęcia</strong>
                            </td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Przewidywane na stanie</strong>
                            </td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                            <td>40</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Zapotrzebowanie netto</strong>
                            </td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                            <td>80</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Planowane zamówienia</strong>
                            </td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Planowane przyjęcie zamówień</strong>
                            </td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Czas realizacji</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Wielkość partii</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Poziom BOM</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Na stanie</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default SkateboardBomSimulator;
