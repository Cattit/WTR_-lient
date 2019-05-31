import React from 'react';
import Table from 'react-bootstrap/Table'

export default function MarksTable({ data, sources }) {
    console.log(sources);

    return (
        <Table striped bordered hover>
            <tbody>
                <tr><th>Город</th><th>Глубина</th>{sources.map(s => <th>{s}</th>)}</tr>
                {data.map(({ name_location, depth, mark }, index) => (<tr key={index}><td>{name_location}</td><td>{depth}</td>{mark.map(m => <th>{m}</th>)}</tr>))}
            </tbody>
        </Table>
    )
}
