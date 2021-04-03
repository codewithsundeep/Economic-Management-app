const updateId = document.querySelector(".update");
const investment = document.querySelector(".investment");
const due = document.querySelector(".due");
const purpose = document.querySelector(".purpose");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const btn = document.querySelector(".submit");

btn.addEventListener("click", database);

function database() {
    value1 = updateId.value;
    value2 = investment.value;
    value3 = due.value;
    value4 = purpose.value;
    value5 = date.value;
    value6 = time.value;

    if (value2 == "" && value3 == "" && value4 == "" && value5 == "" && value6 == "") {
        alert("All fields must be fill out");
    }
    else {
        const openDb = indexedDB.open("crud", 1);
        openDb.onupgradeneeded = e => {
            const db = e.target.result;
            db.createObjectStore("data", { keyPath: "table", autoIncrement: true });

        }
        openDb.onsuccess = e => {
            const db = e.target.result;
            tx = db.transaction("data", "readwrite");
            tx1 = tx.objectStore("data");
            let data = null;
            if (value1 !== "") {
                //updation codes to be go here

                const cursor = tx1.openCursor();
                cursor.onsuccess = f => {
                    if (f.target.result === null) {
                        alert("Please add something before you update");
                    } else {
                        u1 = value1;
                        u2 = value2;
                        u3 = value3;
                        u4 = value4;
                        u5 = value5;
                        u6 = value6;
                        v1 = f.target.result.value.investment;
                        v2 = f.target.result.value.due;
                        v3 = f.target.result.value.purpose;
                        v4 = f.target.result.value.date;
                        v5 = f.target.result.value.time;
                        p1 = v1[u1] = u2;
                        p2 = v2[u1] = u3;
                        p3 = v3[u1] = u4;
                        p4 = v4[u1] = u5;
                        p5 = v5[u1] = u6;
                        console.log(p1, p2, p3, p4, p5);

                        let x1 = v1;
                        x2 = v2;
                        x3 = v3;
                        x4 = v4;
                        x5 = v5;
                        console.log(x1, x2, x3, x4, x5);
                        udata = {
                            table: "submited",
                            investment: x1,
                            due: x2,
                            purpose: x3,
                            date: x4,
                            time: x5
                        }
                        const check = tx1.put(udata);
                        if (check) {
                            alert("Data has been updated Succesfully");
                            location.reload();
                        } else {
                            alert("Oops! Something wrong happen please try again");
                        }

                    }
                }
            } else {
                const cursor = tx1.openCursor();
                cursor.onsuccess = f => {
                    // console.log(f.target.result);
                    if (f.target.result === null) {
                        data = {
                            table: "submited",
                            investment: [value2],
                            due: [value3],
                            purpose: [value4],
                            date: [value5],
                            time: [value6]
                        }
                        if (tx1.put(data)) {
                            alert("Data has been added successfully");
                            location.reload();
                        } else {
                            alert("Oops! Something went wrong please try again");
                        }
                    } else {
                        const cursor = tx1.openCursor();
                        cursor.onsuccess = f => {
                            const res = f.target.result.value;
                            // console.log(res);
                            u1 = res.investment;
                            u2 = res.due;
                            u3 = res.purpose;
                            u4 = res.date;
                            u5 = res.time;
                            // console.log(u1,u2,u3,u4,u5);
                            //updated
                            u1 = [...u1, value2];
                            u2 = [...u2, value3];
                            u3 = [...u3, value4];
                            u4 = [...u4, value5];
                            u5 = [...u5, value6];
                            // console.log(u1,u2,u3,u4,u5);
                            data = {
                                table: "submited",
                                investment: u1,
                                due: u2,
                                purpose: u3,
                                date: u4,
                                time: u5
                            }
                            if (tx1.put(data)) {
                                alert("Data has been added successfully");
                                location.reload();
                            } else {
                                alert("Oops! Something went wrong please try again");
                            }

                        }
                    }


                }
            }

        }
    }
}