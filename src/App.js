// import React, {useEffect} from 'react';
// import './App.css';
// import './Appplus.css';

// function savetask(){
//   const td=document.querySelector(".todo");
//   const pp=document.querySelector(".pop1");

//   localStorage.setItem("todotasks",td.innerHTML);
//   localStorage.setItem("startask",pp.innerHTML);
// }
// function loadtask() {
//   let data = document.querySelector(".todo");
//   let saveStar = document.querySelector(".pop1");

//   let saved = localStorage.getItem("todotasks");
//   let savedStar = localStorage.getItem("startask");

//   if (saved) {
//     data.innerHTML = saved;
//     data.style.display = "flex";

//     document.querySelector(".saving").innerHTML = "";
//     document.querySelector(".saving").classList.remove("savingStyle");
//   }

//   if (savedStar) {
//     saveStar.innerHTML = savedStar;
//   }

//   if (saved || savedStar) {
//     addStarEvents();
//     addCheckBoxEvent();
//   }

//   if (!saved && !savedStar) {
//     data.innerHTML = "";
//     data.style.display = "none";

//     document.querySelector(".saving").innerHTML = `
//       <i class="fa-solid fa-book-open"></i>
//       <h3 class="default">No Tasks Added</h3>
//     `;

//     document.querySelector(".saving").classList.add("savingStyle");
//   }
// }


// function addStarEvents(){
// const data=document.querySelector('.todo');
//   const saveStar=document.querySelector('.pop1');

// let star1=document.querySelectorAll(".form-check .fa-star");
// for(let i=0;i<star1.length;i+=1){
// let starred=star1[i];

// starred.addEventListener("click",()=>{
// let tsk=starred.closest(".form-check");
// if(!starred.classList.contains("starStyle")){
// starred.classList.remove("fa-regular");
// starred.classList.add("fa-solid");
// starred.classList.add("starStyle");
// saveStar.appendChild(tsk);  

// savetask();
// }
// else{
// starred.classList.remove("fa-solid");
// starred.classList.remove("starStyle");
// starred.classList.add("fa-regular");
// data.appendChild(tsk);

// savetask()

// document.querySelector(".pop1").style.display="none";
// document.querySelector(".todo").style.display="flex";
// }
// });
// }
// }

// function addCheckBoxEvent(){
//   const data=document.querySelector('.todo');
//   // const saveStar=document.querySelector('.pop1');
//     let checkboxes=document.querySelectorAll(".tasks");

//   checkboxes.forEach(checkbox => {
//     if(checkbox.hasAttribute("data-added")){
//       return;
//     }

//   checkbox.setAttribute("data-added","true");

//     checkbox.addEventListener("change",(e)=>{
//       if(e.target.checked===true){
//         let div=e.target.parentElement;
//         let clicking=document.querySelector(".btn-link");
//         let showing=document.querySelector(".Message1");
//         e.target.parentElement.remove();

//         savetask();

//         showing.classList.add("show");
//         clicking.onclick=(e)=>{
//           if(!data.contains(div)){
//             data.prepend(div);
//             div.querySelector(".tasks").checked=false;
//             document.querySelector(".saving").innerHTML="";
//             document.querySelector(".saving").classList.remove("savingStyle");
//           }
//           };

//         setTimeout(()=>{
//           showing.classList.remove("show");
//         },2000);

//         if(data.children.length===0){
//           let prestyle=document.querySelector(".saving")
//           prestyle.innerHTML=`<i class="fa-solid fa-book-open"></i>
//           <h3 class="default">No Tasks Added</h3>`;
//           prestyle.classList.add("savingStyle");
//           }
        
//       }
//     });
//   });
// }

// function addchecks(){
//   let task="";
//   let date="";
//   let type="";
//   const data=document.querySelector('.todo');
//   const saveStar=document.querySelector('.pop1');
// const s = document.querySelector('.con1');
// const over=document.querySelector('.overlay');
//   over.classList.add("overlay1");
//   s.classList.add("style1");
//   s.innerHTML=
//   `<form class="form1">
//     <div class="ip1">
//     <a>What is your task?</a>
//   <textarea type="text" placeholder="Enter task here" class="ip20"/></textarea>
//  </div>
//  <div class="ip1">
//  <a>Pick remainder date and time</a>
//   <input type="datetime-local" placeholder="Date and Time" class="ip21"/>
//  </div>
//  <div class="ip1">
//  <a>Enter task type</a>
//   <input type="dropdown" placeholder="Enter here" class="ip22"/>
//  </div>
//  <div class="buttons">
//  <div class="bt0">
//   <button type="button" class="btn btn-danger">Cancel</button>
//   </div>

//  <div class="bt1">
//    <button type="button" class="btn btn-primary">Save Task</button>
//  </div>
//  </div>

//  </form>`;

//  const cl=document.querySelector('.btn-danger');
//  const sv=document.querySelector('.btn-primary');

//  sv.addEventListener("click",()=>{
//   const data=document.querySelector('.todo');
//   const saveStar=document.querySelector('.pop1');

//   task=document.querySelector('.ip20').value;
//   date=document.querySelector('.ip21').value;
//   type=document.querySelector('.ip22').value;

//   let datetime=date.split('T');
//   let daywise=datetime[0];
//   let d=new Date(daywise);
//   let day="";
//   let arr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

//   day=arr[d.getDay()]

//   if(task!=="" && date!=="" && type!==""){
//   data.insertAdjacentHTML("beforeend",`<div class="form-check">
//   <input class="form-check-input tasks" type="checkbox" value="" id="checkDefault">
//   <div>
//   <label class="form-check-label l1 colaps" for="checkDefault">
//   ${task}
//   </label>

//   <hr>

//   <label class="form-check-label l2" for="checkDefault">
//   Day:${day}
//   </label>

//   <br>

//   <label class="form-check-label l3" for="checkDefault">
//   Date:${datetime[0]}
//   </label>

//   <br>

//   <label class="form-check-label l4" for="checkDefault">
//   Time:${datetime[1]}
//   </label>

//   <div>

//   <div class="extra">
//   <button class="feature">${type}</button>
//   <div class="extra1"><i class="fa-regular fa-star"></i></div>
//   <div class="extra2"><i class="fa-regular fa-pen-to-square"></i></div>
//   </div>

//   </div>`);

//   savetask();

//   addStarEvents();
//   addCheckBoxEvent();
//   // let star1=document.querySelectorAll(".fa-star");
  
//   // for(let i=0;i<star1.length;i+=1){
//   //   let starred=star1[i];

//   //   starred.addEventListener("click",()=>{
//   //     let tsk=starred.closest(".form-check");
//   //     if(!starred.classList.contains("starStyle")){
//   //     starred.classList.remove("fa-regular");
//   //     starred.classList.add("fa-solid");
//   //     starred.classList.add("starStyle");
//   //     saveStar.appendChild(tsk);  
      
//   //     savetask();
//   //   }
//   //   else{
//   //     starred.classList.remove("fa-solid");
//   //     starred.classList.remove("starStyle");
//   //     starred.classList.add("fa-regular");
//   //     data.appendChild(tsk);

//   //     savetask()
//   //   }
//   //   });
//   // }

//   let h=document.querySelector(".btn1");
//   let st=document.querySelector(".btn2");
//   h.onclick=function(){
//       document.querySelector(".pop1").style.display="none";
//       document.querySelector(".todo").style.display="flex";

//       document.querySelector(".disl").style.pointerEvents="auto";

//       document.querySelector(".disl").style.opacity="1";
//   }
//   st.onclick=function(){
//       document.querySelector(".todo").style.display="none";
//       document.querySelector(".pop1").style.display="flex";

//       document.querySelector(".disl").style.pointerEvents="none";

//       document.querySelector(".disl").style.opacity="0.5";
//   }

//   document.querySelector(".saving").innerHTML="";
//   document.querySelector(".saving").classList.remove("savingStyle");

//   document.querySelector('.con1').innerHTML=''; 
//   document.querySelector('.con1').classList.remove('style1');
//   document.querySelector(".overlay").classList.remove("overlay1");
  
//   }

//   addCheckBoxEvent();
//   // let checkboxes=document.querySelectorAll(".tasks");

//   // checkboxes.forEach(checkbox => {
//   //   if(checkbox.hasAttribute("data-added")){
//   //     return;
//   //   }

//   // checkbox.setAttribute("data-added","true");

//   //   checkbox.addEventListener("change",(e)=>{
//   //     if(e.target.checked===true){
//   //       let div=e.target.parentElement;
//   //       let clicking=document.querySelector(".btn-link");
//   //       let showing=document.querySelector(".Message1");
//   //       e.target.parentElement.remove();

//   //       savetask();

//   //       showing.classList.add("show");
//   //       clicking.onclick=(e)=>{
//   //         if(!data.contains(div)){
//   //           data.prepend(div);
//   //           div.querySelector(".tasks").checked=false;
//   //           document.querySelector(".saving").innerHTML="";
//   //           document.querySelector(".saving").classList.remove("savingStyle");
//   //         }
//   //         };

//   //       setTimeout(()=>{
//   //         showing.classList.remove("show");
//   //       },2000);

//   //       if(data.children.length===0){
//   //         let prestyle=document.querySelector(".saving")
//   //         prestyle.innerHTML=`<i class="fa-solid fa-book-open"></i>
//   //         <h3 class="default">No Tasks Added</h3>`;
//   //         prestyle.classList.add("savingStyle");
//   //         }
        
//   //     }
//   //   });
//   // });

//   if(task==="" || date==="" || type===""){
//     alert("Please fill all the fields");
//   }
//  });

//  cl.addEventListener('click', () =>{
//   task=document.querySelector('.ip20').value;
//   date=document.querySelector('.ip21').value;
//   type=document.querySelector('.ip22').value;
//   document.querySelector('.con1').innerHTML=''; 
//   document.querySelector('.con1').classList.remove('style1');
//   document.querySelector(".overlay").classList.remove("overlay1");
//  });

// }


// function App() {
//   // local storage load
//   useEffect(()=>{
//     loadtask();
//   },[]);

//   return (
//     <>
//     {/* navbar */}
// <nav className="navbar navbar-dark bg-primary fixed-top">
//   <div className="container-fluid">
//     <label className="navbar-brand" href="/">Regular Task</label>
//     <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
//       <div className="offcanvas-header">
//         <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu List</h5>
//         <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//       </div>
//       <div className="offcanvas-body">
//         <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
//           <li className="nav-item">
//             <div className="navh">
//             <div><i className="fa-solid fa-house"></i></div>
//             <div>
//             <button type="button" className="btn btn-outline-primary btn1">Home</button>
//             </div>
//             </div>
//           </li>

//           <li className="nav-item">
//             <div className="navb">
//             <div><i className="fa-regular fa-star" style={{color: "rgb(255, 255, 255)"}}></i></div>
//             <div>
//             <button type="button" className="btn btn-outline-primary btn2">Starred</button>
//             </div>
//             </div>
//           </li>

//           <li className="nav-item">
//             <div className="navb">
//             <div><i className="fa-solid fa-plus"></i></div>
//             <div>
//             <button type="button" className="btn btn-outline-primary btn3">Add Task</button>
//             </div>
//             </div>
//           </li>

//           <li className="nav-item">
//             <div className="navb">
//             <div><i className="fa-solid fa-recycle"></i></div>
//             <div>
//             <button type="button" className="btn btn-outline-primary btn4">Trash</button>
//             </div>
//             </div>
//           </li>

//           <li className="nav-item">
//             <div className="navb">
//             <div><i className="fa-solid fa-circle-info"></i></div>
//             <div>
//             <button type="button" className="btn btn-outline-primary btn5">About</button>
//             </div>
//             </div>
//           </li>

//           <li className="nav-item">
//             <div className="navb">
//             <div><i className="fa-solid fa-list-check"></i></div>
//             <div>
//             <button type="button" className="btn btn-outline-primary btn6">Todays's Task</button>
//             </div>
//             </div>
//           </li>

//           <li className="nav-item">
//             <div className="navb">
//             <div><i className="fa-solid fa-arrow-up-wide-short"></i></div>
//             <div>
//             <button type="button" className="btn btn-outline-primary btn7">Sort</button>
//             </div>
//             </div>
//           </li>

//           <li className="nav-item">
//             <div className="navb">
//             <div><i className="fa-solid fa-calendar-days"></i></div>
//             <div>
//             <button type="button" className="btn btn-outline-primary btn8">Remainders</button>
//             </div>
//             </div>
//           </li>


//         </ul>
//       </div>
//     </div>
//   </div>
// </nav>

// {/**add **/}
//      <div className="a1">
//       <i className="fa-solid fa-circle-plus disl" onClick={addchecks}></i>
//      </div>

//   {/* {collection div} */}
//   <div className="saving savingStyle">
//     <i className="fa-solid fa-book-open"></i>
//     <h3 className="default">No Tasks Added</h3>
//   </div>
//   <div className="todo">
//   </div>

//   {/* {function save form} */} 
//   <div className="con1"></div>
//   <div className="overlay"></div>

//   {/* recover */}

//   <div className="Message1">
//     <div className="text1">Task is finished</div>
//     <div className="textbt"><button type="button" className="btn btn-link">Undo</button></div>
//   </div>

//   {/* starbtn work */}
//   <div className="pop1"></div>
// </>
//   );
// }

// export default App;


import React, { useEffect } from 'react';
import './App.css';
import './Appplus.css';

let currentView = "home";

function addNavigationEvents() {

  let h = document.querySelector(".btn1");
  let st = document.querySelector(".btn2");

  h.onclick = function () {
    showView("home");
  };

  st.onclick = function () {
    showView("starred");
  };
}

function showView(view) {
  const data = document.querySelector(".todo");
  const saveStar = document.querySelector(".pop1");

  currentView = view;

  if (view === "home") {
    data.style.display = "flex";
    saveStar.style.display = "none";
  }

  if (view === "starred") {
    data.style.display = "none";
    saveStar.style.display = "flex";
  }
}

function savetask() {
  const td = document.querySelector(".todo");
  const pp = document.querySelector(".pop1");

  localStorage.setItem("todotasks", td.innerHTML);
  localStorage.setItem("startask", pp.innerHTML);
}


function loadtask() {
  let data = document.querySelector(".todo");
  let saveStar = document.querySelector(".pop1");

  let saved = localStorage.getItem("todotasks");
  let savedStar = localStorage.getItem("startask");

  if (saved) {
    data.innerHTML = saved;
    data.style.display = "flex";

    document.querySelector(".saving").innerHTML = "";
    document.querySelector(".saving").classList.remove("savingStyle");
  }

  if (savedStar) {
    saveStar.innerHTML = savedStar;
  }

  // IMPORTANT
  // Remove old event-marker attributes after loading
  document.querySelectorAll(".fa-star").forEach(star => {
    star.removeAttribute("data-star-added");
  });

  document.querySelectorAll(".tasks").forEach(checkbox => {
    checkbox.removeAttribute("data-added");
  });

  if (saved || savedStar) {
    addStarEvents();
    addCheckBoxEvent();
  }

  if (!saved && !savedStar) {
    data.innerHTML = "";
    data.style.display = "none";

    document.querySelector(".saving").innerHTML = `
      <i class="fa-solid fa-book-open"></i>
      <h3 class="default">No Tasks Added</h3>
    `;

    document.querySelector(".saving").classList.add("savingStyle");
  }
   showView("home");
}


function addStarEvents() {

  const data = document.querySelector(".todo");
  const saveStar = document.querySelector(".pop1");

  let star1 = document.querySelectorAll(".form-check .fa-star");

  for (let i = 0; i < star1.length; i += 1) {

    let starred = star1[i];

    if (starred.hasAttribute("data-star-added")) {
      continue;
    }

    starred.setAttribute("data-star-added", "true");

    starred.addEventListener("click", () => {

      let tsk = starred.closest(".form-check");

      if (!starred.classList.contains("starStyle")) {

        // STAR
        starred.classList.remove("fa-regular");
        starred.classList.add("fa-solid");
        starred.classList.add("starStyle");

        saveStar.appendChild(tsk);

        savetask();

        // IMPORTANT:
        // DO NOT switch to Starred automatically
        // showView(currentView);

      } else {

        // UNSTAR
        starred.classList.remove("fa-solid");
        starred.classList.remove("starStyle");
        starred.classList.add("fa-regular");

        data.appendChild(tsk);

        savetask();

        // IMPORTANT:
        // Stay on the current tab
        // showView(currentView);
      }

    });
  }
}


function addCheckBoxEvent() {
  const data = document.querySelector(".todo");

  let checkboxes = document.querySelectorAll(".tasks");

  checkboxes.forEach(checkbox => {

    if (checkbox.hasAttribute("data-added")) {
      return;
    }

    checkbox.setAttribute("data-added", "true");

    checkbox.addEventListener("change", (e) => {

      if (e.target.checked === true) {

        let div = e.target.parentElement;

        let clicking = document.querySelector(".btn-link");
        let showing = document.querySelector(".Message1");

        e.target.parentElement.remove();

        savetask();

        showing.classList.add("show");

        clicking.onclick = () => {

          if (!data.contains(div)) {

            data.prepend(div);

            div.querySelector(".tasks").checked = false;

            document.querySelector(".saving").innerHTML = "";
            document.querySelector(".saving").classList.remove("savingStyle");

            savetask();
          }
        };

        setTimeout(() => {
          showing.classList.remove("show");
        }, 2000);

        if (data.children.length === 0) {

          let prestyle = document.querySelector(".saving");

          prestyle.innerHTML = `
            <i class="fa-solid fa-book-open"></i>
            <h3 class="default">No Tasks Added</h3>
          `;

          prestyle.classList.add("savingStyle");
        }
      }
    });
  });
}


function addchecks() {

  let task = "";
  let date = "";
  let type = "";

  const data = document.querySelector(".todo");
  // const saveStar = document.querySelector(".pop1");

  const s = document.querySelector(".con1");
  const over = document.querySelector(".overlay");

  over.classList.add("overlay1");
  s.classList.add("style1");

  s.innerHTML = `
    <form class="form1">

      <div class="ip1">
        <a>What is your task?</a>

        <textarea
          type="text"
          placeholder="Enter task here"
          class="ip20"
        ></textarea>
      </div>

      <div class="ip1">
        <a>Pick remainder date and time</a>

        <input
          type="datetime-local"
          placeholder="Date and Time"
          class="ip21"
        />
      </div>

      <div class="ip1">
        <a>Enter task type</a>

        <input
          type="text"
          placeholder="Enter here"
          class="ip22"
        />
      </div>

      <div class="buttons">

        <div class="bt0">
          <button type="button" class="btn btn-danger">
            Cancel
          </button>
        </div>

        <div class="bt1">
          <button type="button" class="btn btn-primary">
            Save Task
          </button>
        </div>

      </div>

    </form>
  `;

  const cl = document.querySelector(".btn-danger");
  const sv = document.querySelector(".btn-primary");


  sv.addEventListener("click", () => {

    task = document.querySelector(".ip20").value;
    date = document.querySelector(".ip21").value;
    type = document.querySelector(".ip22").value;


    // Check fields FIRST
    if (task === "" || date === "" || type === "") {
      alert("Please fill all the fields");
      return;
    }


    let datetime = date.split("T");

    let daywise = datetime[0];

    let d = new Date(daywise);

    let arr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = arr[d.getDay()];


    // Create task
    data.insertAdjacentHTML(
      "beforeend",

      `<div class="form-check">

        <input
          class="form-check-input tasks"
          type="checkbox"
          value=""
          id="checkDefault"
        >

        <div>

          <label
            class="form-check-label l1 colaps"
            for="checkDefault"
          >
            ${task}
          </label>

          <hr>

          <label
            class="form-check-label l2"
            for="checkDefault"
          >
            Day:${day}
          </label>

          <br>

          <label
            class="form-check-label l3"
            for="checkDefault"
          >
            Date:${datetime[0]}
          </label>

          <br>

          <label
            class="form-check-label l4"
            for="checkDefault"
          >
            Time:${datetime[1]}
          </label>

          <div>

            <div class="extra">

              <button class="feature">
                ${type}
              </button>

              <div class="extra1">
                <i class="fa-regular fa-star"></i>
              </div>

              <div class="extra2">
                <i class="fa-regular fa-pen-to-square"></i>
              </div>

            </div>

          </div>

        </div>

      </div>`
    );


    // Save new task
    savetask();


    // Add events to newly created elements
    addStarEvents();
    addCheckBoxEvent();

    showView(currentView);


    // // Home button
    // let h = document.querySelector(".btn1");

    // // Starred button
    // let st = document.querySelector(".btn2");


    // h.onclick = function () {

    //   document.querySelector(".pop1").style.display = "none";

    //   document.querySelector(".todo").style.display = "flex";

    //   document.querySelector(".disl").style.pointerEvents = "auto";

    //   document.querySelector(".disl").style.opacity = "1";
    // };


    // st.onclick = function () {

    //   document.querySelector(".todo").style.display = "none";

    //   document.querySelector(".pop1").style.display = "flex";

    //   document.querySelector(".disl").style.pointerEvents = "none";

    //   document.querySelector(".disl").style.opacity = "0.5";
    // };


    document.querySelector(".saving").innerHTML = "";

    document.querySelector(".saving").classList.remove("savingStyle");


    // Close form
    document.querySelector(".con1").innerHTML = "";

    document.querySelector(".con1").classList.remove("style1");

    document.querySelector(".overlay").classList.remove("overlay1");
  });


  // Cancel button
  cl.addEventListener("click", () => {

    document.querySelector(".con1").innerHTML = "";

    document.querySelector(".con1").classList.remove("style1");

    document.querySelector(".overlay").classList.remove("overlay1");
  });
}


function App() {

  // Load localStorage after React has rendered
  useEffect(() => {
    loadtask();
    addNavigationEvents();
  }, []);


  return (
    <>

      {/* NAVBAR */}

      <nav className="navbar navbar-dark bg-primary fixed-top">

        <div className="container-fluid">

          <label className="navbar-brand">
            Regular Task
          </label>


          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >

            <span className="navbar-toggler-icon"></span>

          </button>


          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >

            <div className="offcanvas-header">

              <h5
                className="offcanvas-title"
                id="offcanvasDarkNavbarLabel"
              >
                Menu List
              </h5>


              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>

            </div>


            <div className="offcanvas-body">

              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                {/* HOME */}

                <li className="nav-item">

                  <div className="navh">

                    <div>
                      <i className="fa-solid fa-house"></i>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn1"
                      >
                        Home
                      </button>
                    </div>

                  </div>

                </li>


                {/* STARRED */}

                <li className="nav-item">

                  <div className="navb">

                    <div>
                      <i
                        className="fa-regular fa-star"
                        style={{ color: "rgb(255, 255, 255)" }}
                      ></i>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn2"
                      >
                        Starred
                      </button>
                    </div>

                  </div>

                </li>


                {/* ADD TASK */}

                <li className="nav-item">

                  <div className="navb">

                    <div>
                      <i className="fa-solid fa-plus"></i>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn3"
                        onClick={addchecks}
                      >
                        Add Task
                      </button>
                    </div>

                  </div>

                </li>


                {/* TRASH */}

                <li className="nav-item">

                  <div className="navb">

                    <div>
                      <i className="fa-solid fa-recycle"></i>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn4"
                      >
                        Trash
                      </button>
                    </div>

                  </div>

                </li>


                {/* ABOUT */}

                <li className="nav-item">

                  <div className="navb">

                    <div>
                      <i className="fa-solid fa-circle-info"></i>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn5"
                      >
                        About
                      </button>
                    </div>

                  </div>

                </li>


                {/* TODAY'S TASK */}

                <li className="nav-item">

                  <div className="navb">

                    <div>
                      <i className="fa-solid fa-list-check"></i>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn6"
                      >
                        Today's Task
                      </button>
                    </div>

                  </div>

                </li>


                {/* SORT */}

                <li className="nav-item">

                  <div className="navb">

                    <div>
                      <i className="fa-solid fa-arrow-up-wide-short"></i>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn7"
                      >
                        Sort
                      </button>
                    </div>

                  </div>

                </li>


                {/* REMAINDERS */}

                <li className="nav-item">

                  <div className="navb">

                    <div>
                      <i className="fa-solid fa-calendar-days"></i>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn8"
                      >
                        Remainders
                      </button>
                    </div>

                  </div>

                </li>

              </ul>

            </div>

          </div>

        </div>

      </nav>


      {/* ADD BUTTON */}

      <div className="a1">

        <i
          className="fa-solid fa-circle-plus disl"
          onClick={addchecks}
        ></i>

      </div>


      {/* NO TASK MESSAGE */}

      <div className="saving savingStyle">

        <i className="fa-solid fa-book-open"></i>

        <h3 className="default">
          No Tasks Added
        </h3>

      </div>


      {/* HOME TASKS */}

      <div className="todo"></div>


      {/* FORM */}

      <div className="con1"></div>

      <div className="overlay"></div>


      {/* RECOVER */}

      <div className="Message1">

        <div className="text1">
          Task is finished
        </div>

        <div className="textbt">

          <button
            type="button"
            className="btn btn-link"
          >
            Undo
          </button>

        </div>

      </div>


      {/* STARRED TASKS */}

      <div className="pop1"></div>

    </>
  );
}

export default App;