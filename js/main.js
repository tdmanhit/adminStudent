var nameStudent = document.querySelector('#name_student')
var dateStudent = document.querySelector('#date_student')
var addressStudent = document.querySelector('#address_student')
var sexStudent = document.querySelector('#sex_student')
var phoneStudent = document.querySelector('#phone_student')
var addStudent = document.querySelector('#add_student')
var errorFrom = true;
var linkApiStudent = 'http://localhost:3000/students'
var key = 'add'

function start()
{
    handerGetStudent(renderStudent)
}
start()

function handerGetStudent(callback) {
    fetch(linkApiStudent)
        .then(function(studentok){
            return studentok.json()
        })
        .then(callback)
}

function handerAddStudent(data){
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'}
    }
    fetch(linkApiStudent, options)
        .then(function(studentdata){
            studentdata.json()
        })
}
function handerDeleteStudent(id){
    var options = {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'}
    }
    fetch(linkApiStudent + '/' + id , options)
        .then(function(studentdata){
            studentdata.json()
        })
        .then(function()
        {
            var studentList = document.querySelector(".listStudent-"+id)
            studentList.remove();
        })
}

function handerFixStudent(id,data){
    var options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'}
    }
    fetch(linkApiStudent+'/'+id, options)
        .then(function(student){
            student.json()
        })
}

function renderStudent(students){
    var tableStudent = `<tr>
                            <td>ID SV</td>
                            <td>TÊN SV</td>
                            <td>NGÀY SINH</td>
                            <td>ĐỊA CHỈ</td>
                            <td>GIỚI TÍNH</td>
                            <td>SĐT</td>
                            </tr>
                            `
    var htmls = students.map(function(student){
        return `
        <tr class="listStudent-${student.id}">
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.date}</td>
            <td>${student.address}</td>
            <td>${student.sex}</td>
            <td>${student.phone }</td>
            <td><p style="color: red;" onclick="handerDeleteStudent(${student.id})">xóa</p><br><p onclick="updateStudent(${student.id})" style="color: blue;">sửa</p></td>
        </tr>
        `
    })   
    tableStudent = tableStudent + htmls.join("");
    document.querySelector('#bang').innerHTML = tableStudent;                     
}

function themStudent(){
    var nameS = nameStudent.value.trim();
    var dateS = dateStudent.value.trim();
    var phoneS = phoneStudent.value.trim();
    var sexS = sexStudent.value.trim();
    var addressS = addressStudent.value.trim();

    if(nameS === ''){
        messageError(nameStudent,'Bạn phải nhập tên sinh viên')
        errorFrom = false;
    }else{
        messageSuccess(nameStudent);
    }

    if(dateS === ''){
        messageError(dateStudent,'Bạn phải nhập ngày sinh')
        errorFrom = false;
    }else{
        messageSuccess(dateStudent);
    }

    if(sexS === ''){
        messageError(sexStudent,'Bạn phải lựa chọn giới tính')
        errorFrom = false;
    }else{
        messageSuccess(sexStudent);
    }

    if(phoneS === ''){
        messageError(phoneStudent,'Bạn phải nhập số điện thoại')
        errorFrom = false;
    }else{
        messageSuccess(phoneStudent);
    }

    if(addressS === ''){
        messageError(addressStudent,'Bạn phải nhập địa chỉ')
        errorFrom = false;
    }else{
        messageSuccess(addressStudent);
    }

    if(errorFrom === true & key == 'add'){
        handerAddStudent({
            name: nameS,
            date: dateS,
            phone:phoneS,
            sex:sexS,
            address:addressS,
        })
    }
    if(errorFrom === true){
        handerFixtudent(key,{
            name: nameS,
            date: dateS,
            phone:phoneS,
            sex:sexS,
            address:addressS,
        })
    }
    console.log("key" + key)
}

function updateStudent(id)
{
    fetch(linkApiStudent+'/'+id)
        .then(function(studentok){
            return studentok.json()
        })
        .then(function(student){
            nameStudent.value = student.name;
            dateStudent.value =student.date;
            addressStudent.value = student.address;
            sexStudent.value = student.sex;
            phoneStudent.value = student.phone;
            addStudent.value = 'FIX SV'
        })
    key = id
}


function messageError(input,message) {
    var formInput = input.parentElement;
    var errorMessage = formInput.querySelector('small');
    formInput.className = 'from-add error';
    errorMessage.innerHTML = message;
}

function messageSuccess(input)
{
    var formInput = input.parentElement;
    formInput.className = 'from-add success';
}

