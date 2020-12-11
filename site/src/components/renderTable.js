import React from "react"
import Table from 'react-bootstrap/Table'

// Takes in a 2D array and renders its elements
const RenderTable = ({table}) => {
    var matrix = []
    if(table.length === 0){
        return (
            <div> Ill-formed Table</div>
        )
    } else {
        var first = []
        for(var i = 0; i < table[0].length; i++) {
            first.push("B action " + String(i + 1))
        }
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {[<th key={"HeaderFirst"}></th>].concat(
                            first.map((s,i) => <th key={"Header" + i}>{s}</th>)
                        )}
                    </tr>
                </thead>
                <tbody>
                {table.map((row, i) =>
                    <tr key={i}>
                        {[<td key={"BodyFirst" + i}><b>A action {i}</b></td>].concat(
                            row.map((e,j) => <td key={"BodyRow" + i + "Col" + j}>{String(e)}</td>)
                        )}
                    </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}

export default RenderTable