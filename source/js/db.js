const DB_NAME = "presenceDB";
const DB_VERSION = 1;
const STORE_NAME = "presences";

let db = null;

export async function initDB() {

    return new Promise((resolve, reject) => {

        const request =
            indexedDB.open(
                DB_NAME,
                DB_VERSION
            );

        request.onupgradeneeded = (event) => {

            db = event.target.result;

            if (
                !db.objectStoreNames.contains(
                    STORE_NAME
                )
            ) {

                db.createObjectStore(
                    STORE_NAME,
                    {
                        keyPath: "id",
                        autoIncrement: true
                    }
                );
            }
        };

        request.onsuccess = (event) => {

            db = event.target.result;

            resolve(db);
        };

        request.onerror = () => {

            reject(request.error);
        };
    });
}

export function saveAttendance(record) {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORE_NAME,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                STORE_NAME
            );

        const request =
            store.add(record);

        request.onsuccess =
            () => resolve();

        request.onerror =
            () => reject(
                request.error
            );

    });
}

export function getAllAttendances() {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORE_NAME,
                "readonly"
            );

        const store =
            transaction.objectStore(
                STORE_NAME
            );

        const request =
            store.getAll();

        request.onsuccess =
            () => resolve(
                request.result
            );

        request.onerror =
            () => reject(
                request.error
            );
    });
}