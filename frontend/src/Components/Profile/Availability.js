import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "time",
        headerName: "Time",
        width: 150,
        sortable: false,
        editable: true,
    },
    {
        field: "day",
        headerName: "Day",
        width: 150,
        sortable: false,
        editable: false,
    },
    {
        field: "hours",
        headerName: "Hours",
        type: "number",
        width: 110,
        sortable: false,
        editable: true,
    },
    {
        field: "summary",
        headerName: "Summary",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.time || ""} ${params.row.day || ""} ${
                params.row.hours || ""
            }`,
    },
];

const rows = [
    { id: 1, day: "Monday", time: "8-17", hours: 8 },
    { id: 2, day: "Tuesday", time: "8-17", hours: 8 },
    { id: 3, day: "Wednesday", time: "8-17", hours: 8 },
    { id: 4, day: "Thursday", time: "8-17", hours: 8 },
    { id: 5, day: "Friday", time: "8-17", hours: 8 },
    { id: 6, day: "Saturday", time: "8-17", hours: 8 },
    { id: 7, day: "Sunday", time: "8-17", hours: 8 },
];

export default function Availability() {
    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 7,
                        },
                    },
                }}
                pageSizeOptions={[7]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
