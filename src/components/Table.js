import React from 'react';
import Table from 'react-bootstrap/Table'

export default function MarksTable({ data }) {
    console.log(data);

    return (
        // <Table striped bordered hover>
        //     <tbody>
        //         <tr><th>Город</th><th>Глубина</th>{sources.map(s => <th>{s}</th>)}</tr>
        //         {data.map(({ name_location, depth, mark }, index) => (<tr key={index}><td>{name_location}</td><td>{depth}</td>{mark.map(m => <th>{m}</th>)}</tr>))}
        //     </tbody>
        // </Table>
        <Table striped bordered hover>
            <tbody>
                <tr><th>Город</th>{data.column.map(c => <th key={c}>{c}</th>)}</tr>
                {data.mark.map(({ name_location, mark }, index) => (<tr key={index}><td>{name_location}</td>{mark.map((m, index) => <th key={index}>{m}</th>)}</tr>))}
            </tbody>
        </Table>
    )
}
