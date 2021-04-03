// for new operation
let data = null;

document.querySelector(".new").addEventListener("click", () => {
    document.querySelector(".outer").style.display = "block";
    document.querySelector(".update").style.display = "none";
    document.querySelector(".uId").style.display = "none";
});

//close new operation

//for updation

document.querySelector(".old").addEventListener("click", () => {
    document.querySelector(".outer").style.display = "block";
    document.querySelector(".update").style.display = "block";
    document.querySelector(".uId").style.display = "block";
});


document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".outer").style.display = "none";
});
window.onload = f => {
    const db = indexedDB.open("crud", 1);
    db.onupgradeneeded = e => {
        const db = e.target.result;
        db.createObjectStore("data", { keyPath: "table", autoIncrement: true });

    }
    db.onerror = e => {
        alert("Oops! something went wrong clear your browser caches and try again" + e.target.error);
    }
    db.onsuccess = e => {

        const result = e.target.result;

        const tx = result.transaction("data", "readonly");
        tx1 = tx.objectStore("data");
        const cursor = tx1.openCursor();
        if (tx) {

            cursor.onsuccess = g => {

                const check = g.target.result;
                if (check !== null) {

                    const res = g.target.result.value;
                    const dt1 = res.investment.filter(h => h !== undefined);
                    const dt2 = res.due.filter(j => j !== undefined);
                    const dt3 = res.purpose.filter(k => k !== undefined);
                    const dt4 = res.date.filter(l => l !== undefined);
                    const dt5 = res.time.filter(m => m !== undefined);
                    const ln1 = dt1.length;





                    for (i = 0; i < dt1.length; i++) {
                        let tr = document.createElement("tr");

                        tr.className = "tr-data";
                        tr.innerHTML = `<td>${[i]}</td><td>${dt3[i]}</td><td>₹ ${dt1[i]}</td><td>₹ ${dt2[i]}</td><td>${dt4[i]}</td><td>${dt5[i]}</td><td class="delete d${i} d">Delete</td>`;
                        document.querySelector(".crud").append(tr);
                    }
                    if (document.querySelector(".tr-data") !== null) {
                        document.querySelector(".example").style.display = "none";
                        document.querySelector(".fd").style.display = "none";
                    }
                    const del = document.querySelectorAll(".d");
                    for (item of del) {
                        item.addEventListener("click", e => {

                            match = e.target.className.match(/[0-9]/g);
                            dv1 = dt1[match] = "cd-deleted-cd";
                            dv2 = dt2[match] = "cd-deleted-cd";
                            dv3 = dt3[match] = "cd-deleted-cd";
                            dv4 = dt4[match] = "cd-deleted-cd";
                            dv5 = dt5[match] = "cd-deleted-cd";
                            ud1 = dt1.filter(v => v !== "cd-deleted-cd");
                            ud2 = dt2.filter(v => v !== "cd-deleted-cd");
                            ud3 = dt3.filter(v => v !== "cd-deleted-cd");
                            ud4 = dt4.filter(v => v !== "cd-deleted-cd");
                            ud5 = dt5.filter(v => v !== "cd-deleted-cd");

                            data = {
                                table: "submited",
                                investment: ud1,
                                due: ud2,
                                purpose: ud3,
                                date: ud4,
                                time: ud5
                            }


                            document.querySelector(".subBtn").click();


                        });

                    }

                }
                else {
                    alert("You havent saved any data please add some data into the store.");
                }

            }
        }
    }
}

if (document.querySelector(".subBtn") !== null) {
    document.querySelector(".subBtn").addEventListener("click", () => {
        let dbx1 = indexedDB.open("crud", 1);
        dbx1.onerror = e => {
            alert("oops! Try again" + e.target.error);
        }
        dbx1.onsuccess = e => {
            txx1 = e.target.result;
            txx2 = txx1.transaction("data", "readwrite");
            txx3 = txx2.objectStore("data");
            if (txx3.put(data)) {
                cur = txx3.openCursor();
                cur.onsuccess = g => {

                    const check = g.target.result;


                    const res = g.target.result.value;
                    const dt1 = res.investment.filter(h => h !== undefined);
                    const dt2 = res.due.filter(j => j !== undefined);
                    const dt3 = res.purpose.filter(k => k !== undefined);
                    const dt4 = res.date.filter(l => l !== undefined);
                    const dt5 = res.time.filter(m => m !== undefined);

                    data = {
                        table: "submited",
                        investment: dt1,
                        due: dt2,
                        purpose: dt3,
                        date: dt4,
                        time: dt5
                    }
                    if (txx3.put(data)) {
                        alert("data deleted succesfully");
                        location.reload();
                    } else {
                        alert("some error occured! please try again later");
                    }
                }

            }

        }

    });
}
