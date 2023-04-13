var bockMarkName = document.querySelector("#bockMarkName");
var bockMarkUrl = document.querySelector("#bockMarkUrl");
var addBtn = document.querySelector("#addBtn");
var tbody = document.querySelector("#tbody");
var contentTable = document.querySelector(".content-table");
var localStorageName = "bookmarks";
var NameWarning = document.querySelector("#NameWarning");
var urlWarning = document.querySelector("#urlWarning");
var BockMarks;

//NOTE - LOAD
function load() {
    clearForm();
    if (localStorage.getItem(localStorageName) == null) {
        BockMarks = [];
        contentTable.classList.replace("d-block", "d-none");
        console.log("h");
    } else {
        BockMarks = JSON.parse(localStorage.getItem(localStorageName));
        displayWebsites(BockMarks);
        console.log("s");
    }


}
load();


//NOTE - ADD
addBtn.addEventListener("click", function () {
    if (validate()) {
        webSite = {
            name: bockMarkName.value,
            url: bockMarkUrl.value
        }
        BockMarks.push(webSite);
        setLocalStorage(BockMarks);
        displayWebsites(BockMarks);
        clearForm();
    }

})




//NOTE - Display
function displayWebsites(list) {
    var box = ``;
    for (var i = 0; i < BockMarks.length; i++) {
        box += ` <tr class=" mb-5">
        <td class="w-50">
            <h2>${list[i].name}</h2>
        </td>
        <td class="text-start">   <a href="${BockMarks[i].url}" target="_blank"><button class="btn btn-primary ">Visit</button></a> 
            <button class="btn btn-danger " onclick="deleteWebsites(${i})">Delete</button>
        </td>

    </tr>`

    }
    contentTable.classList.replace("d-none", "d-block");
    tbody.innerHTML = box;
}


//NOTE - CLEAR-FORM
function clearForm() {
    bockMarkName.value = "";
    bockMarkUrl.value = "";
}

//NOTE - DELETE BOCK-MARK
function deleteWebsites(index) {
    BockMarks.splice(index, 1);
    displayWebsites(BockMarks);
    setLocalStorage(BockMarks)
    if (BockMarks.length == 0) {
        localStorage.clear();
        load();
    }
}

//NOTE - SET-LOCAL-STORAGE
function setLocalStorage(list) {
    localStorage.setItem(localStorageName, JSON.stringify(list));
}



//NOTE - VALIDATE-NAME
function validateName() {
    var regex = /^[A-Z][a-z]{3,}$/
    if (regex.test(bockMarkName.value)) {
        for (var i = 0; i < BockMarks.length; i++) {
            if (bockMarkName.value == BockMarks[i].name) {
                NameWarning.innerHTML = "Name is already exist";
                NameWarning.classList.replace("d-none", "d-block");
                console.log("bay");
                return false;
            }
        }

        NameWarning.classList.replace("d-block", "d-none");
        console.log("hai");
        return true;
    }
    else {
        if (bockMarkName.value == "") {
            NameWarning.classList.replace("d-none", "d-block");
            console.log("yay");
            return false;
        }

        else {
            NameWarning.classList.replace("d-none", "d-block");
            NameWarning.innerHTML = "Name must start with (Capital letter)";
            console.log("sai");
            return false;

        }


    }
}


//NOTE - VALIDATE-URL
function validateUrl() {
    var regex = /^(https:\/\/w{3}\.)?[a-z]+(\.)(com|net|co)[\/]*$/
    if (regex.test(bockMarkUrl.value)) {
        urlWarning.classList.replace("d-block", "d-none");
        console.log("xai");
        return true;
    }
    else {
        if (bockMarkUrl.value == "") {
            urlWarning.classList.replace("d-none", "d-block");
            console.log("cay");
            return false;

        }

        else {
            urlWarning.classList.replace("d-none", "d-block");
            urlWarning.innerHTML = "Url must start with (https://) and end with (.com|.net|.co)";
            console.log("sai");
            return false;

        }
    }
}
//NOTE - VALIDATE
function validate() {

    return ((validateUrl()) & (validateName()));


}
