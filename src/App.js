
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update , onValue} from "firebase/database";
import {useState,useEffect,useRef} from "react";
import './App.css';
const firebaseConfig = {

  apiKey:process.env.REACT_APP_API_KEY,

  authDomain: process.env.REACT_APP_AUTHDOMAIN,

  databaseURL: "https://pinnacle-54760-default-rtdb.firebaseio.com",

  projectId: "pinnacle-54760",

  storageBucket: "pinnacle-54760.appspot.com",

  messagingSenderId: process.env.REACT_APP_MSID,

  appId: process.env.REACT_APP_APPID,

  measurementId: "G-LWTCM6703F"

};

console.log(process.env)

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
var ddatabase_table = [];
var feedbacktable_table = [];

const Rightside =()=> {
  const [updated, refresh] = useState(0);
  const [status, setstatus] = useState({});
  const [openmenubar, setOpenmenubar] = useState(0);
  const refArray = useRef([]);
  const userid = useRef(null);
  const psd = useRef(null);
  const updatestatus = index => {
  
    var id = document.getElementsByClassName("datainput")[index].getAttribute("data-label");
    var value =document.getElementsByClassName("datainput")[index].innerHTML;
    const updates={};
    updates['/Technical/' + id+'/status'] = value;
    ddatabase_table=[]
    update(ref(db), updates)

    ddatabase_table=[]
    
  }

  const handleChange = (event) => {
     event.target.value=0;
    setstatus({...status,key1:{value:event.target.getAttribute("data-label")}})
  
   };  
  const get_details=()=>{
    if(ddatabase_table.length==0){ 
      onValue(starCountRef, (snapshot) => {
      ddatabase_table=[]
      if(snapshot.val().hasOwnProperty("Technical")){
        let i=-1
        for (var key in snapshot.val().Technical) {
          i=i+1
          console.log(snapshot.val().Technical[key])
        
          ddatabase_table.push(
  <li>
  
  <div className="card__overlay">
    <div className="card__header">

      <div className="card__header-text">
        <h3 className="card__title">{snapshot.val().Technical[key]["name"]}<div className="emailid">{snapshot.val().Technical[key]["email"]}</div></h3>    
        <div className="phonenumber"><i class="fas fa-clock"></i> {snapshot.val().Technical[key]["date"].split("|")[0]}</div>
        <div className="phonenumber"><i class="fas fa-calendar-alt"></i> {snapshot.val().Technical[key]["date"].split("|")[1]}</div>
        <div className='phonenumber'><i class="fa fa-phone"></i> {snapshot.val().Technical[key]["phone"]}</div>
        <div className='phonenumber'><i class="fa fa-twitter"></i> {snapshot.val().Technical[key]["status"]}</div>
      </div>
    </div>
    <p className="card__description">{snapshot.val().Technical[key]["quote"]} </p>
    <div onChange={handleChange}      ref={ref => {
            refArray.current[i] = ref; // took this from your guide's example.
          }} contenteditable="true" data-label={snapshot.val().Technical[key]["cusid"]} className="datainput">
    {snapshot.val().Technical[key]["status"]}
</div>

    <button  onClick={updatestatus.bind(null,i)} data-label={snapshot.val().Technical[key]["cusid"]} >Update</button>
  </div>

</li>

           


          )
        }
 }
 if(snapshot.val().hasOwnProperty("ContactUs")){
  feedbacktable_table=[]
  for (var key in snapshot.val().ContactUs) {
    feedbacktable_table.push(  <li>
  
      <div className="card__overlay">
        <div className="card__header">
    
          <div className="card__header-text">
            <h3 className="card__title">{snapshot.val().ContactUs[key]["name"]}<div className="emailid">{snapshot.val().ContactUs[key]["email"]}</div></h3>    
 
            <div className='phonenumber'><i class="fa fa-phone"></i> {snapshot.val().ContactUs[key]["phone"]}</div>
            <div className='phonenumber'><i class="fa fa-twitter"></i> {snapshot.val().ContactUs[key]["Message"]}</div>
          </div>
        </div>
        <p className="card__description">{snapshot.val().ContactUs[key]["Message"]} </p>
        
      </div>
    
    </li>)
  }
}  
    refresh(1)
    document.getElementsByClassName("tablinks")[0].click()
    });
    }

  }

  const starCountRef = ref(db, '/');
  useEffect(() => {
   

    get_details()
    
  
    });
    function opentab(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
      setOpenmenubar(0)
    }
/*

<div className='admincontainer'>

<center>
    <button onClick={validate}>Refresh</button></center>
<div className='cardcontainer'>
<ul className="cards">




{updated? ddatabase_table:null}    
</ul>
<center><b><h1>Feedback</h1></b></center>
<ul className="cards">

{updated? feedbacktable_table:null}    
</ul>

</div>








</div>


*/
return (

<div>
  <div className='menubar' onClick={()=>openmenubar?setOpenmenubar(0):setOpenmenubar(1)}>
<div className='bar' ></div>
<div className="bar"></div>
<div className="bar"></div>

</div>
<center><h1>Treatedaer admin</h1></center> 
  <div className={openmenubar?"tab show":"tab"} >
  <button className="tablinks" onClick={(e)=>opentab(e, 'Quote')}>Quote</button>
  <button className="tablinks" onClick={(e)=>opentab(e, 'BookAMeeting')} >Book A Meeting</button>
  <button className="tablinks" onClick={(e)=>opentab(e, 'Cotactus')} >Contact US</button>
</div>

<div id="Quote" className="tabcontent">
<center><h3>Get Quote Submissions</h3></center> 
  <ul className="cards">




{updated? ddatabase_table:null}    
</ul>
</div>

<div id="BookAMeeting" className="tabcontent">
  <h3>Book a meeting Form Inputs</h3>

</div>

<div id="Cotactus" className="tabcontent">
  <h3>Feedback Form Inputs</h3>
  <ul className="cards">




{updated? feedbacktable_table:null}    
</ul>
</div>


<div class="clearfix"></div></div>



)


}
export default Rightside;