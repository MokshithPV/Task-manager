const arr = window.location.href.split("/");
let len = arr.length-1;
const id = document.querySelector(".id");
const taskname = document.querySelector(".text");
const completed = document.querySelector(".box");
const submit = document.querySelector(".submit");
const message = document.querySelector(".message")
const str = "/api/v1/tasks/"+arr[len];
const display = async ()=>{
    const {data} = await axios.get(str);
    id.innerHTML = `<label>Task Id:\t${arr[len]}</label>`;
    if(data.completed) completed.checked = true;
    else completed.checked = false;
    taskname.value = data.name;
}
display();
submit.addEventListener("click", async (e)=>{
    e.preventDefault();
    try {
        const data = await axios.patch(str,{"name":taskname.value,"completed":completed.checked});
        message.innerHTML = "<b>successfully edited</b>";
    } catch (error) {
        if(taskname.value=="") message.innerHTML = "<b>Name field cannot be empty</b>";
        else message.innerHTML = "<b>error! try again later</b>";
    }
    setTimeout(()=>{
        message.innerHTML = "";
    },3000)
})

