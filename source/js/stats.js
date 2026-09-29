export function calculateRate(
    presents,
    total
) {

    if (total === 0) {
        return 0;
    }

    return (
        presents /
        total *
        100
    ).toFixed(1);
}

export function studentStats(
    studentId,
    attendances
) {

    const rows =
        attendances.filter(
            x => x.studentId === studentId
        );

    const presents =
        rows.filter(
            x => x.status === "P"
        ).length;

    const absents =
        rows.filter(
            x => x.status === "A"
        ).length;

    const late =
        rows.filter(
            x => x.status === "R"
        ).length;

    const excused =
        rows.filter(
            x => x.status === "E"
        ).length;

    return {

        presents,
        absents,
        late,
        excused,

        rate:
            calculateRate(
                presents,
                rows.length
            )

    };
}