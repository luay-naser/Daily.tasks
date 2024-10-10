let tasks = [
//     {
// name : "قراءة كتاب",
// time : "07/03/2024",
// chek : false
//     },
//     {
// name : "حفظ كتاب",
// time : "07/03/2024",
// chek : false
//     },
//     {
// name : "سماع كتاب",
// time : "07/03/2024",
// chek : true
//     }

]
 tasks = JSON.parse(localStorage.getItem("tasksStor")) || [];

document.getElementById("tasks").innerHTML = "";
function filltasks(){
    document.getElementById("tasks").innerHTML = "";
    let index= 0;
    for (const element of tasks) {
        let content = 
        `
        <div class="content ${element.chek ? "chek":""}">
    <div class="task-name">
        <h2 >${element.name} </h2>
        <div style="display: flex;justify-content: flex-start; align-items: center; margin-top: 5px;">
            <i class="fa-solid fa-calendar-days"></i>
            <p style="margin-top: 5px; margin-right: 5px;">${element.time}</p>
    
        </div>
    
    </div>
    <div class="buttuns">
        <button onclick="delite(${index})" id="del" style="background-color: rgb(122, 4, 4); color: white;  border-radius: 50%;border: none;"><i class="fa-solid fa-trash"></i></button>
        ${element.chek?`        <button id="done" onclick = "isdone(${index})" style="background-color: red; color: white;  border-radius: 50%;border: none;"><i class="fa-solid fa-xmark"></i></button>
`
:`        <button id="done" onclick = "isdone(${index})" style="background-color: green; color: white;  border-radius: 50%;border: none;"><i class="fa-solid fa-check"></i></button>
`}
        <button onclick = "edit(${index})" style="background-color: rgb(19, 8, 119); color: white; border-radius: 50%;border: none;"><i class="fa-solid fa-pen-to-square"></i></button>
    </div>
                </div>
        `;
        document.getElementById("tasks").innerHTML += content;
    index++;
    }
}

document.getElementById("add").addEventListener("click", function(){
    var userName = prompt("ادخل اسم المهمة");
let s = {
    name: userName,
    time : time(),
    chek : false
}
tasks.push(s);

localStorage.setItem("tasksStor", JSON.stringify(tasks));
filltasks()
})
function delite(index){
    let title = tasks[index].name
 let isconfirm = confirm(" هل انت متأكد من حذف مهمة"+ " "+ title);
    if(isconfirm){
        tasks.splice(index, 1);
        filltasks()
        localStorage.setItem("tasksStor", JSON.stringify(tasks));
    }
    
}
function edit(index){
    let task = tasks[index];
    let editInput = prompt("أدخل التعديل", task.name)
    if (editInput == ""){
        editInput = task.name;
    }
    tasks[index].name = editInput;
     filltasks()
     localStorage.setItem("tasksStor", JSON.stringify(tasks));
}
function time(){
    let times = new Date();
     let ti = times.getDate() + "/" + (times.getMonth() + 1) + "/" + times.getFullYear() + " | " + times.getHours() + ":" + times.getMinutes();
return ti;
    }
function isdone(index){
    let task = tasks[index];
    task.chek = !task.chek;

    filltasks()
}
window.onload = filltasks;
