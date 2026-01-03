// npm install --save datatables.net-vue3 datatables.net-dt
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt'; // for styling, dt means default
import DataTablesCore from 'datatables.net-bs5'; // only bootstrap styling
DataTable.use(DataTablesCore);

// Can install the datatable extensions also
// npm install --save \ datatables.net - select - dt \ datatables.net - responsive - dt
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';

<template>
    <DataTable class="display">
        {/* <DataTable :data="data"  class="display"> */}
        {/* <DataTable :columns="columns" ajax="/data.json"  class="display" @xhr="xhrEvent" @draw="drawEvent"> */}
        {/* Parameters for DataTable: data, columns, ajax, class, options */}
        <thead>
            <tr>
                <th>First</th>
                <th>Second</th>
            </tr>
        </thead>
    </DataTable>
</template >

// If we want to put vue components into cell, use named template  <template #column-1="props">
// Slot Properties: cellData, colIndex, rowData, rowIndex, type.

// Full Documentation: https://datatables.net/manual/index