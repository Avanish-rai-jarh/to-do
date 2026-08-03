import './App.css';

// // for bookmark
// function addbook(){

// }
// // for editing
// function editing(){
  
// }

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
  <input class="form-check-input tasks" type="checkbox" value="" id="checkDefault">
  <div>
  <label class="form-check-label l1 colaps" for="checkDefault">
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

  <div class="extra">
  <div class="extra1"><i class="fa-regular fa-star"></i></div>
  <div class="extra2"><i class="fa-regular fa-pen-to-square"></i></div>
  </div>

  </div>`;

  document.querySelector(".saving").innerHTML="";
  document.querySelector(".saving").classList.remove("savingStyle");

  document.querySelector('.con1').innerHTML=''; 
  document.querySelector('.con1').classList.remove('style1');
  document.querySelector(".overlay").classList.remove("overlay1");
  }

  let checkboxes=document.querySelectorAll(".tasks");

  checkboxes.forEach(checkbox => {
    if(checkbox.hasAttribute("data-added")){
      return;
    }

  checkbox.setAttribute=("data-added","true");

    checkbox.addEventListener("change",(e)=>{
      if(e.target.checked===true){
        let div=e.target.parentElement;
        let clicking=document.querySelector(".btn-link");
        let showing=document.querySelector(".Message1");
        e.target.parentElement.remove();
        showing.classList.add("show");
        clicking.onclick=(e)=>{
          if(!data.contains(div)){
            data.prepend(div);
            div.querySelector(".tasks").checked=false;
            document.querySelector(".saving").innerHTML="";
            document.querySelector(".saving").classList.remove("savingStyle");
          }
          };

        setTimeout(()=>{
          showing.classList.remove("show");
        },2000);

        if(data.innerHTML===""){
          let prestyle=document.querySelector(".saving")
          prestyle.innerHTML=`<i class="fa-solid fa-book-open"></i>
          <h3 class="default">No Tasks Added</h3>`;
          prestyle.classList.add("savingStyle");
          }
        
      }
    });
  });

  if(task==="" || date==="" || type===""){
    alert("Please fill all the fields");
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
<nav className="navbar navbar-dark bg-primary fixed-top">
  <div className="container-fluid">
    <label className="navbar-brand" href="/">Regular Task</label>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu List</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <div className="navh">
            <div><i class="fa-solid fa-house"></i></div>
            <div>
            <button type="button" className="btn btn-outline-primary">Home</button>
            </div>
            </div>
          </li>

          <li className="nav-item">
            <div className="navb">
            <div><i className="fa-regular fa-bookmark"></i></div>
            <div>
            <button type="button" className="btn btn-outline-primary">Bookmark</button>
            </div>
            </div>
          </li>

          <li className="nav-item">
            <div className="navb">
            <div><i className="fa-solid fa-plus"></i></div>
            <div>
            <button type="button" className="btn btn-outline-primary">Add Task</button>
            </div>
            </div>
          </li>

          <li className="nav-item">
            <div className="navb">
            <div><i className="fa-solid fa-recycle"></i></div>
            <div>
            <button type="button" className="btn btn-outline-primary">Trash</button>
            </div>
            </div>
          </li>

          <li className="nav-item">
            <div className="navb">
            <div><i class="fa-solid fa-circle-info"></i></div>
            <div>
            <button type="button" className="btn btn-outline-primary">About</button>
            </div>
            </div>
          </li>

          <li className="nav-item">
            <div className="navb">
            <div><i className="fa-solid fa-list-check"></i></div>
            <div>
            <button type="button" className="btn btn-outline-primary">Todays's Task</button>
            </div>
            </div>
          </li>

          <li className="nav-item">
            <div className="navb">
            <div><i class="fa-solid fa-arrow-up-wide-short"></i></div>
            <div>
            <button type="button" className="btn btn-outline-primary">Sort</button>
            </div>
            </div>
          </li>

          <li className="nav-item">
            <div className="navb">
            <div><i class="fa-solid fa-calendar-days"></i></div>
            <div>
            <button type="button" className="btn btn-outline-primary">Remainders</button>
            </div>
            </div>
          </li>


        </ul>
      </div>
    </div>
  </div>
</nav>

{/**add **/}
     <div className="a1">
      <i className="fa-solid fa-circle-plus" onClick={addchecks}></i>
     </div>

  {/* {collection div} */}
  <div className="saving savingStyle">
    <i className="fa-solid fa-book-open"></i>
    <h3 className="default">No Tasks Added</h3>
  </div>
  <div className="todo">
  </div>

  {/* {function save form} */} 
  <div className="con1"></div>
  <div className="overlay"></div>

  {/* recover */}

  <div className="Message1">
    <div className="text1">Task is finished</div>
    <div className="textbt"><button type="button" className="btn btn-link">Undo</button></div>
  </div>

</>
  );
}

export default App;
