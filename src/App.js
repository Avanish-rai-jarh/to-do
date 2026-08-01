import './App.css';
function addchecks(){
  let task="";
  let date="";
  let type="";
const s = document.querySelector('.con1');
const over=document.querySelector('.overlay');
  over.classList.add("overlay1");
  s.classList.add("style1");
  s.innerHTML=
  `<form class="form1">
    <div class="ip1">
    <a>What is your task?</a>
  <textarea type="text" placeholder="Enter task here" class="ip20"/></textarea>
 </div>
 <div class="ip1">
 <a>Pick remainder date and time</a>
  <input type="datetime-local" placeholder="Date and Time" class="ip21"/>
 </div>
 <div class="ip1">
 <a>Enter task type</a>
  <input type="dropdown" placeholder="Enter here" class="ip22"/>
 </div>
 <div class="buttons">
 <div class="bt0">
  <button type="button" class="btn btn-danger">Cancel</button>
  </div>

 <div class="bt1">
   <button type="button" class="btn btn-primary">Save Task</button>
 </div>
 </div>

 </form>`;

 const cl=document.querySelector('.btn-danger');
 const sv=document.querySelector('.btn-primary');

 sv.addEventListener("click",()=>{
  const data=document.querySelector('.todo');
  task=document.querySelector('.ip20').value;
  date=document.querySelector('.ip21').value;
  type=document.querySelector('.ip22').value;

  let datetime=date.split('T');
  let daywise=datetime[0];
  let d=new Date(daywise);
  let day="";
  let arr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  day=arr[d.getDay()]

  if(task!=="" && date!=="" && type!==""){
  data.innerHTML+=`<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="checkDefault">
  <div>
  <label class="form-check-label l1" for="checkDefault">
  ${task}
  </label>

  <hr>

  <label class="form-check-label l2" for="checkDefault">
  Day:${day}
  </label>

  <br>

  <label class="form-check-label l3" for="checkDefault">
  Date:${datetime[0]}
  </label>

  <br>

  <label class="form-check-label l4" for="checkDefault">
  Time:${datetime[1]}
  </label>

  <div>

  </div>`;

   document.querySelector(".saving").innerHTML="";
   document.querySelector(".saving").classList.remove("savingStyle");

   document.querySelector('.con1').innerHTML=''; 
  document.querySelector('.con1').classList.remove('style1');
  document.querySelector(".overlay").classList.remove("overlay1");
  }

  if(task==="" || date==="" || type===""){
    alert("Please fill all the fields");
  }

  if(data.innerHTML==""){
    document.querySelector(".saving").classList.add("savingStyle");
  }

 });

 cl.addEventListener('click', () =>{
  task=document.querySelector('.ip20').value;
  date=document.querySelector('.ip21').value;
  type=document.querySelector('.ip22').value;
  document.querySelector('.con1').innerHTML=''; 
  document.querySelector('.con1').classList.remove('style1');
  document.querySelector(".overlay").classList.remove("overlay1");
 });
}


function App() {
  return (
    <>
    {/* navbar */}
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="https://www.bing.com/search?q=google&FORM=ANAB01&adppc=EDGEDBB&PC=SCOOBE"><i className="fa-solid fa-house"></i></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="https://www.bing.com/search?q=google&FORM=ANAB01&adppc=EDGEDBB&PC=SCOOBE">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.bing.com/search?q=google&FORM=ANAB01&adppc=EDGEDBB&PC=SCOOBE">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="https://www.bing.com/search?q=google&FORM=ANAB01&adppc=EDGEDBB&PC=SCOOBE" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="https://www.bing.com/search?q=google&FORM=ANAB01&adppc=EDGEDBB&PC=SCOOBE">Action</a></li>
            <li><a className="dropdown-item" href="https://www.bing.com/search?q=google&FORM=ANAB01&adppc=EDGEDBB&PC=SCOOBE">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="https://www.bing.com/search?q=google&FORM=ANAB01&adppc=EDGEDBB&PC=SCOOBE">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true" href="https://www.bing.com/search?q=google&FORM=ANAB01&adppc=EDGEDBB&PC=SCOOBE">Disabled</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

{/**add **/}
     <div className="a1">
      <i className="fa-solid fa-circle-plus" onClick={addchecks}></i>
     </div>

  {/* {collection div} */}
  <div className="saving savingStyle">
    <h3 class="default">No tasks added</h3>
  </div>
  <div className="todo">


  </div>

  {/* {function save form} */} 
  <div className="con1"></div>
  <div className="overlay"></div>
</>
  );
}

export default App;
