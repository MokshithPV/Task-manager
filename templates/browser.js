//const { default: axios } = require("axios");

const submit = document.querySelector(".submit");
const text = document.querySelector(".text");
const loading = document.querySelector(".loading");
const tasks = document.querySelector(".tasks");
const message = document.querySelector(".message");
const showtasks =async ()=>{
    loading.style.display = "block";
    try{
    const {data} = await axios.get("/api/v1/tasks");
    if(data.length<1){
        tasks.innerHTML='<h5 class="empty-list">No tasks in your list</h5>';
        loading.style.display = 'none';
        return;
    }
    const allTasks = data.map((task)=>{
        const {name, _id: taskId , completed} = task;
        if(completed){
            return `<div class="single-task"><div class = "task"><del>${name}</del></div><div class="edit"><a href="/${taskId}"><img src="./edit.jpg" width = "25"></img></a></div><div class = "delete"><button class = "del"><img src="./delete.jpg" width = "15" class = "del del-${taskId}"></img></button></div></div>`;
        }
        return `<div class="single-task"><div class = "task">${name}</div><div class="edit"><a href="/${taskId}"><img src="./edit.jpg" width = "25"></img></a></div><div class = "delete"><button class = "del"><img src="./delete.jpg" width = "15" class = "del del-${taskId}"></img></button></div></div>`
    }).join('');
    tasks.innerHTML = allTasks;
    loading.style.display = 'none';
    }catch(err){
        tasks.innerHTML='<h5 class="error-list">Error! please try later</h5>'
        loading.style.display = 'none';
    }
}
showtasks();
submit.addEventListener('click',async (e)=>{
    e.preventDefault();
    try {
        const data = await axios.post("/api/v1/tasks",{"name":text.value});
        message.innerHTML = "<b>Task is added succesfully</b>";
    } catch (error) {
        if(text.value=="") message.innerHTML = "<b>Task name need to be provided</b>";
        else message.innerHTML = "<b>Error! please try later</b>";
    }
    text.value="";
    showtasks();
    setTimeout(()=>{
        message.innerHTML = "";
    },2000)
})
tasks.addEventListener('click',async (e)=>{
    const el = e.target;
    if(el.classList.contains("del")){
        try {
            await axios.delete("/api/v1/tasks/"+el.classList[1].split("-")[1]);
            alert(`task with task id ${el.classList[1].split("-")[1]} is deleted successfully`);
            showtasks();
        } catch (error) {
            alert("err! try again later")
        }
    }
})
