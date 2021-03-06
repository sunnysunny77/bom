
window.onload = function () {
    let parser = new DOMParser();
    let xmlDoc0;
    let xmlDoc;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "cont.php", true);
    xmlhttp.onload = function() {
        if (xmlhttp.status == 200) {
            let xmlFile0 = 'IDW60920.xml';
            let xmlFile = 'IDW12300.xml';
            xmlhttp.open("GET", xmlFile0, true);
            xmlhttp.onload = function() {
                if (xmlhttp.status == 200) {
                    xmlDoc0 = parser.parseFromString(this.response,"text/xml");
                    xmlhttp.open("GET", xmlFile, true);
                    xmlhttp.onload = function() {
                        if (xmlhttp.status == 200) {
                            xmlDoc = parser.parseFromString(this.response,"text/xml");
                            const u = xmlDoc0.getElementsByTagName("product")[0].getElementsByTagName("observations")[0].getElementsByTagName("station");
                            const t = xmlDoc.getElementsByTagName("product")[0].getElementsByTagName("forecast")[0].getElementsByTagName("area");
                            for (let x = 0; x <= 6; x++){
                                let txtc = "";
                                let txt0 = "";
                                let txt1 = "";
                                let date;
                                for (i = 0; i < u.length; i++) {
                                    if (u[i].getAttribute('stn-name') === "PERTH METRO") {
                                        if (u[i].getElementsByTagName("period")[0].getElementsByTagName("level")[0].getElementsByTagName("element")) {
                                            let q = u[i].getElementsByTagName("period")[0].getElementsByTagName("level")[0].getElementsByTagName("element");
                                            for (l = 0; l < q.length; l++) {
                                                if (q[l].getAttribute('type') === "air_temperature") {
                                                    txtc += "<br>Current&nbsp;" + q[l].childNodes[0].nodeValue + "&nbsp;??C";
                                                }
                                                if (q[l].getAttribute('type') === "maximum_air_temperature") {
                                                    txtc += "<br>Currrent Maximum&nbsp;" + q[l].childNodes[0].nodeValue + "&nbsp;??C";
                                                }
                                                if (q[l].getAttribute('type') === "minimum_air_temperature") {
                                                    txtc += "<br>Current Minimum&nbsp;" + q[l].childNodes[0].nodeValue + "&nbsp;??C";
                                                }
                                            }
                                        }
                                    }
                                }
                                for (i = 0; i < t.length; i++) {
                                    if (t[i].getElementsByTagName("forecast-period")[x]) {
                                        let r = t[i].getElementsByTagName("forecast-period")[x];
                                        if (t[i].getAttribute('aac') === "WA_ME001") {
                                            let q = r.getElementsByTagName("text");
                                            date = new Date(r.getAttribute('start-time-local'));
                                            date = date.toLocaleDateString();
                                            for (l = 0; l < q.length; l++) {
                                                if (q[l].getAttribute('type') === "forecast") {
                                                    txt0 += q[l].childNodes[0].nodeValue;
                                                }
                                            }
                                        }
                                        if (t[i].getAttribute('aac') === "WA_PT053") {
                                            let q = r.getElementsByTagName("element");
                                            let c = r.getElementsByTagName("text");
                                            for (l = 0; l < q.length; l++) {
                                                if (q[l].getAttribute('type') === "air_temperature_minimum") {
                                                    txt1 += "<br>Minimum&nbsp;" + q[l].childNodes[0].nodeValue + "&nbsp;??C";
                                                }
                                                if (q[l].getAttribute('type') === "air_temperature_maximum") {
                                                    txt1 += "<br>Maximum&nbsp;" + q[l].childNodes[0].nodeValue + "&nbsp;??C";
                                                }
                                                if (q[l].getAttribute('type') === "forecast_icon_code") { 
                                                    document.getElementsByClassName("x")[x].src = "./images/" + q[l].childNodes[0].nodeValue  + ".png";
                                                }  
                                            }
                                            for (l = 0; l < c.length; l++) {
                                                if (c[l].getAttribute('type') === "precis") {
                                                    document.getElementsByClassName("x")[x].alt = c[l].childNodes[0].nodeValue;
                                                } 
                                             }
                                        }              
                                    }
                                }
                                if (x < 1) {
                                    document.getElementsByClassName("f")[x].innerHTML = date;
                                    document.getElementsByClassName("z")[x].innerHTML = txt0  + txt1 + txtc;
                                } else if (x >= 1) {
                                    document.getElementsByClassName("f")[x].innerHTML = date;
                                    document.getElementsByClassName("z")[x].innerHTML = txt0  + txt1;
                                }
                            }
                        } else {
                            console.log(this.status)
                        }                   
                    }
                    xmlhttp.send();
                } else {
                    console.log(this.status)
                }                   
            }
            xmlhttp.send();
        } else {
            console.log(this.responseText)
        }
    }
    xmlhttp.send();
}
    
    

