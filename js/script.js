var selectedRow = null

function onFormSubmit() {
    // alert('Form submitted successfully!')
    if (validate()) {
        var formData = personDetails();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}


function personDetails() {
    var formData = {};
    formData["firstName"] = document.getElementById("firstName").value;
    formData["gender"] = document.querySelector('input[name="gender"]:checked').value;
    formData["emailAddress"] = document.getElementById("emailAddress").value;
    formData["phoneNumber"] = document.getElementById("phoneNumber").value;
    formData["cityName"] = document.getElementById("cityName").value;
    
    let lang = [];
    let checkboxes = document.getElementsByName('interest');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            lang.push(checkboxes[i].value);
        }
    }
    formData['lang'] = lang;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.phoneNumber;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.emailAddress;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.gender;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.lang;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.cityName;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<a class = "edit" onClick="onEdit(this)"><i class="fa-solid fa-pen"></i></a>
      <a class = "del" onClick="onDelete(this)"><i class="fa-solid fa-trash"></i></a>`;
}

function resetForm() {
    document.getElementById("firstName").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("emailAddress").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("cityName").value = "";
    document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("firstName").value = selectedRow.cells[0].innerHTML;

    document.getElementById("phoneNumber").value = selectedRow.cells[1].innerHTML;

    document.getElementById("emailAddress").value = selectedRow.cells[2].innerHTML;
    
    let radiobtn = document.getElementById(selectedRow.cells[3].innerHTML);
    radiobtn.checked = true;

    let check=selectedRow.cells[4].innerHTML.split(",");
   check.forEach(el=>{document.getElementById(el).checked=true});

    document.getElementById("cityName").value = selectedRow.cells[5].innerHTML;
   
    
}


function updateRecord(formData) {
    // alert('Form update successfully!')
    selectedRow.cells[0].innerHTML = formData.firstName;
    selectedRow.cells[1].innerHTML = formData.phoneNumber;
    selectedRow.cells[2].innerHTML = formData.emailAddress;
    selectedRow.cells[3].innerHTML = formData.gender;
    selectedRow.cells[4].innerHTML = formData.lang;
    selectedRow.cells[5].innerHTML = formData.cityName;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        // alert('Form deleted Successfully!')
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid1 = true;
    isValid2 = true;
    isValid3 = true;
    isValid4 = true;
    isValid5 = true;
    if (document.getElementById("firstName").value == "") {
        isValid1 = false;
        document.getElementById("fnameErr").classList.remove("hide");

    } else {
        isValid1 = true;
        var fname = /^[a-zA-Z]+$/;
        var a = document.getElementById("firstName").value;
        if (a.match(fname)) {
            isValid1 = true;
            document.getElementById("message").innerHTML = "";
        }
        else {
            isValid1 = false;
            document.getElementById("message").innerHTML = "only alphabets are allowed";
        }
        if (!document.getElementById("fnameErr").classList.contains("hide"))
            document.getElementById("fnameErr").classList.add("hide");
    }

    if (document.querySelector('input[name="gender"]:checked') == null) {
        isValid2 = false;
        document.getElementById("genderErr").classList.remove("hide");
    } else {
        isValid2 = true;
        if (!document.getElementById("genderErr").classList.contains("hide"))
            document.getElementById("genderErr").classList.add("hide");
    }


    if (document.getElementById("emailAddress").value == "") {
        isValid3 = false;
        document.getElementById("emailErr").classList.remove("hide");
    } else {
        isValid3 = true;
        if (!document.getElementById("emailErr").classList.contains("hide"))
            document.getElementById("emailErr").classList.add("hide");
        var emailid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var a = document.getElementById("emailAddress").value;
        if (a.match(emailid)) {
            isValid3 = true;
            document.getElementById("message2").innerHTML = "";
        }
        else {
            isValid3 = false;
            document.getElementById("message2").innerHTML = "Enter the valid email";
        }
    }
    if (document.getElementById("phoneNumber").value == "") {
        isValid4 = false;
        document.getElementById("numErr").classList.remove("hide");
    } else {
        isValid4 = true;
        document.getElementById("message1").innerHTML = "";
        if (!document.getElementById("numErr").classList.contains("hide"))
            document.getElementById("numErr").classList.add("hide");
        var fname = /(^\d{10}$)/;
        var a = document.getElementById("phoneNumber").value;
        if (a.match(fname)) {
            isValid4 = true;
            document.getElementById("message1").innerHTML = "";
        }
        else {
            isValid4 = false;
            document.getElementById("message1").innerHTML = "Phone number is not valid";
        }
    }



    // if (document.querySelector('input[name="gender"]:checked') == null) {
    //     isValid5 = false;
    //     document.getElementById("genderErr").classList.remove("hide");
    // } else {
    //     isValid5 = true;
    //     if (!document.getElementById("genderErr").classList.contains("hide"))
    //         document.getElementById("genderErr").classList.add("hide");
    // }

    // if (document.querySelector('input[name="gender"]:checked') == null) {
    //     isValid6 = false;
    //     document.getElementById("genderErr").classList.remove("hide");
    // } else {
    //     isValid = true;
    //     if (!document.getElementById("genderErr").classList.contains("hide"))
    //         document.getElementById("genderErr").classList.add("hide");
    // }

    

    if(isValid1 && isValid2 && isValid3 && isValid4 && isValid5){
        return true;
    }
    else{
        return false;
    }
    
}















