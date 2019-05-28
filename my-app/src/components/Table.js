import React from 'react';

export default function Table({ data, sources, depth}) {
    console.log(data);

    return (
        <table>
            <tbody><tr><th>Город</th><th>Глубина</th>{sources.map(s => (<th key={s}>{s}</th>))}</tr>
            {depth.map(d => (<tr key={d}><td>Irkutsk</td><td>{d}</td>{sources.map(s => (<td key={s}>{s}</td>))}</tr>))}</tbody>
        </table>
    )
}
