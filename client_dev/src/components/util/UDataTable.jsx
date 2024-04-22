import DataTable from 'datatables.net-bs5';
import language from 'datatables.net-plugins/i18n/es-AR.mjs';
import {Table} from 'react-bootstrap'


export function UDataTable({id,tableHeads,tableData}){

    new DataTable(`.datatable`,{language: language,bDestroy: true,responsive:true})



    return (
        <Table id={id} className='datatable display w-100' bordered hover>
            <thead>
                <tr>
                    { tableHeads &&  tableHeads.map(head => <th>{head}</th>)}
                </tr>
            </thead>
            <tbody>
                { tableData &&  tableData.map(row => (
                    <tr>
                        {row && row.map(data => <td>{data}</td>)}
                    </tr>
                ))}
            </tbody>
        </Table>)
}
