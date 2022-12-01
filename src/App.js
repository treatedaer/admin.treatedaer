
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
var BookAMeeting_table = [];
const Rightside =()=> {
  const [updated, refresh] = useState(0);
  const [status, setstatus] = useState({});
  const [status_meetingform, setstatus_meetingform] = useState({});
  const [openmenubar, setOpenmenubar] = useState(0);
  const qutotenotationarr = useRef([]);
  const BookAMeetingarr = useRef([]);
  const userid = useRef(null);
  const psd = useRef(null);
  const updatestatus = (index) => {
  
 
    var value =document.getElementsByClassName("datainput "+index)[0].innerHTML;
    alert(value)
    const updates={};
    updates['/Quotedeatils/' + index+'/status'] = value;
    ddatabase_table=[]
    update(ref(db), updates)

    ddatabase_table=[]
    
  }
  const updatestatus_bookmeeting = (index) => {
  
 
    var value =document.getElementsByClassName("datainput_meeting "+index)[0].innerHTML;
    alert(value)
    const updates={};
    updates['/Meeting/' + index+'/status'] = value;
    ddatabase_table=[]
    update(ref(db), updates)

    ddatabase_table=[]
    
  }
  const handleChange = (event) => {
     event.target.value=0;
    setstatus({...status,key1:{value:event.target.getAttribute("data-label")}})
   
  
   };  
   const handleChange_meetingform = (event) => {
    event.target.value=0;
    setstatus_meetingform({...status,key1:{value:event.target.getAttribute("data-label")}})
  
 
  }; 
  const get_details=()=>{
    if(ddatabase_table.length==0){ 
      onValue(starCountRef, (snapshot) => {
      ddatabase_table=[]
      if(snapshot.val().hasOwnProperty("Quotedeatils")){
   
        let i=-1
        console.log(snapshot.val())
        for (var key in snapshot.val().Quotedeatils) {
          i=i+1
        
        
          ddatabase_table.push(
  <li>
  
  <div className="card__overlay">
    <div className="card__header">

      <div className="card__header-text">
        <h3 className="card__title">{snapshot.val().Quotedeatils[key]["name"]}<div className="emailid">{snapshot.val().Quotedeatils[key]["email"]}</div></h3>    
        <div className="phonenumber"><i class="fas fa-clock"></i> {snapshot.val().Quotedeatils[key]["date"].split("|")[0]}</div>
        <div className="phonenumber"><i class="fas fa-calendar-alt"></i> {snapshot.val().Quotedeatils[key]["date"].split("|")[1]}</div>
        <div className='phonenumber'><i class="fa fa-phone"></i> {snapshot.val().Quotedeatils[key]["phone"]}</div>
        <div className='phonenumber'><i class="fa fa-twitter"></i> {snapshot.val().Quotedeatils[key]["status"]}</div>
      </div>
    </div>
    <p className="card__description">{snapshot.val().Quotedeatils[key]["quote"]} </p>
    <div onChange={handleChange}      ref={ref => {
            qutotenotationarr.current[i] = ref; 
          }} contenteditable="true" data-label={snapshot.val().Quotedeatils[key]["cusid"]} className={"datainput "+snapshot.val().Quotedeatils[key]["cusid"]}>
    {snapshot.val().Quotedeatils[key]["status"]}
</div>

    <button  onClick={(evt)=>updatestatus(evt.target.getAttribute("data-label"))} data-label={snapshot.val().Quotedeatils[key]["cusid"]} >Update</button>
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
            <div className='phonenumber'><i class="fa fa-phone"></i> {snapshot.val().ContactUs[key]["phone"]}</div>
            <div className='phonenumber'><i class="fa fa-twitter"></i> {snapshot.val().ContactUs[key]["Message"]}</div>
          </div>
        </div>
        <p className="card__description">{snapshot.val().ContactUs[key]["Message"]} </p>
        
      </div>
    
    </li>)
  }
}
if(snapshot.val().hasOwnProperty("Meeting")){
  BookAMeeting_table=[]
  let i=0
  for (var key in snapshot.val().Meeting) {
    let i=+1
    BookAMeeting_table.push(  <li>
  
      <div className="card__overlay">
        <div className="card__header">
    
          <div className="card__header-text">
            <h3 className="card__title">{snapshot.val().Meeting[key]["name"]}<div className="emailid">{snapshot.val().Meeting[key]["email"]}</div></h3>    
 
            <div className='phonenumber'><i class="fa fa-phone"></i> {snapshot.val().Meeting[key]["phone"]}</div>
            <div className='phonenumber'> DateTime of Submission: {snapshot.val().Meeting[key]["quote"]}</div>
            <div className='phonenumber'> Meeting Time Date: {snapshot.val().Meeting[key]["meeting_datetime"]}</div>
            <div className='phonenumber'> Status: {snapshot.val().Meeting[key]["status"]}</div>
          </div>
        </div>
        <p className="card__description">{snapshot.val().Meeting[key]["quote"]} </p>
        <div onChange={handleChange}      ref={ref => {
            BookAMeetingarr.current[i] = ref; 
          }} contenteditable="true" data-label={snapshot.val().Meeting[key]["cusid"]}className={"datainput_meeting "+snapshot.val().Meeting[key]["cusid"]}>
    {snapshot.val().Meeting[key]["status"]}
</div>

<button  onClick={(evt)=>updatestatus_bookmeeting(evt.target.getAttribute("data-label"))} data-label={snapshot.val().Meeting[key]["cusid"]} >Update</button>
        
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
  {updated? BookAMeeting_table:null}   
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