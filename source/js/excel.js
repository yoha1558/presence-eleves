import * as XLSX from
"https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs";

export function exportAttendance(records) {

    const data = records.map(

        r => ({

            Date: r.date,
            Eleve: r.studentName,
            Statut: r.status

        })

    );

    const workbook =
        XLSX.utils.book_new();

    const worksheet =
        XLSX.utils.json_to_sheet(
            data
        );

    XLSX.utils.book_append_sheet(

        workbook,
        worksheet,
        "Presences"

    );

    XLSX.writeFile(
        workbook,
        "presences.xlsx"
    );
}