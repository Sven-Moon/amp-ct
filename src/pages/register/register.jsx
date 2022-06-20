import { useEffect, useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useUser } from 'reactfire'
import { DataContext } from '../../app/Providers/DataProvider'

const Register = () => {

  const { messages, setMessages } = useContext(DataContext)
  const { regUser, setRegUser } = useContext(DataContext)
  const { data: user } = useUser()
  const { setIsLoggedIn } = useContext(DataContext)
  const [scheduleData, setScheduleData] = useState( {
    store_trip_method: '1',
    store_days_btwn: "7",
    store_trip_days: '', 
    plan_breakfast: true,
    plan_lunch: true,
    plan_dinner: true
  } )
  const [userData, setUserData] = useState( {
      username: user? user.displayName || "My Username" : '',
      email: user ? user.email : ''
  } )
  useEffect(() => { updateUser() }, [user])
  const navigate = useNavigate()

  function updateUser() {
    if (user)
    setUserData({...userData, email: user.email, username: user.displayName})
  }
  function toggleDay(e) {
    let d = e.target.dataset.dayVal 
    let el = e.target
    el.classList.toggle("active") 
    console.log('d:',d);
    let days = scheduleData.store_trip_days
    if (days === '') setScheduleData({ ...scheduleData, store_trip_days: d })
    else {
      let p = days.indexOf(d)
      console.log('p',p);
      if (p === -1) {
        for (let i = 0; i < days.length; i++) {
          if (days[i] > d) {
            setScheduleData({ ...scheduleData, store_trip_days: days.slice(0, i) + d + days.slice(i) })
            break
          } else setScheduleData({...scheduleData, store_trip_days: days+d})
        } 
      } else {
        setScheduleData({ ...scheduleData, store_trip_days: days.slice(0, p) + days.slice(p + 1)})
      }
    }
  }
  function changeDaysBetween(e){
    setScheduleData({...scheduleData, store_days_btwn: e.target.value})
  }
  function changeUsername(e) {
    setUserData({...userData, username: e.target.value})
  }
  function changeStoreTripMethod(e) {
    setScheduleData({...scheduleData, store_trip_method: e.target.id})
  }
  function updateBreakfast(e) {
    console.log(e.target);
    setScheduleData({ ...scheduleData, plan_breakfast: e.target.checked })
  }
  function updateLunch(e) {
    console.log(e.target);
    setScheduleData({ ...scheduleData, plan_lunch: e.target.checked})
  }
  function updateDinner(e) {
    console.log(e.target);
    setScheduleData({ ...scheduleData, plan_dinner: e.target.checked })
  }
  const submit = async (e) => {
    e.preventDefault()
    console.log(userData)
    // REGISTER USER
    const userId = await userRegistration(userData)

    if (userId) await setSchedule(userId)
  }

  const userRegistration = async () => {
    return await fetch('http://localhost:5000/api/v1/user/register', {
      'method': 'POST',
      'body': JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
        // ,'Access-Control-Allow-Origin': true
      }
    })
    .then(resp => {
      if (resp.status === 200)
        return resp.json()
        else throw Error('A registration error has occurred')
    })
    .then(data => {
      // User SUCCESSFULY CREATED
      setIsLoggedIn(true)
      console.log('data',data)
      setRegUser({ id: data.user.id, username: data.user.username, 'access-token': data.user['access-token']})
      return data.user.id      
    })
      .catch((e) => {
        setMessages([...messages, "Registration error. Please try again."])
        console.error('There\'s a problem.', e)
      })
  } 
  const setSchedule = async (id) => {
    fetch(`http://localhost:5000/api/v1/schedule/${id}/create`, {
      'method': 'POST',
      'body': JSON.stringify(scheduleData),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.status === 201) 
        response.json()
      else throw Error('set schedule error')
    }, (e) => { 
      setMessages([...messages, "Error: Schedule not set. Open settings to set your schedule."])
      console.log(e)
    })
    .then(() => {
      let message = "Schedule created. To modify it, open settings."
      setMessages([...messages, message])
      navigate('/')
    })
    .catch (e => {
      setMessages([...messages, "Unable to register user. Please try again."])
      console.log(e) // schedule error console
    })
  }

  return (
    <form className="register_box" onSubmit={submit}>

        <h1>Hi, {user? user.displayName : 'unknown'}! Let's get you set up!</h1>
        <div className="intro_box">
          This app is based around you and your schedule. 
        </div>
        <label htmlFor="username">First, Pick out a Username</label>
        <input type="text" defaultValue={user? user.displayName : 'Some Hungry Person'} onChange={changeUsername}/>
        <div>When do you typically go to the store?</div>
        <div>We know it's not always the same, but we can deal with that in a bit.</div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-secondary">
          <input type="radio" name="methodOptions" id="1" onChange={changeStoreTripMethod} defaultChecked /> The Same Day(s) Each Week
            </label>
            <label className="btn btn-secondary active">
              <input type="radio" name="methodOptions" id="2" onChange={changeStoreTripMethod}/> After a Number of Days
            </label>
            { scheduleData.store_trip_method === "1" ? 
            <div className="days-box">                
              <div className="day" data-day-val="1" onClick={toggleDay}>M</div>
              <div className="day" data-day-val="2" onClick={toggleDay}>T</div>
              <div className="day" data-day-val="3" onClick={toggleDay}>W</div>
              <div className="day" data-day-val="4" onClick={toggleDay}>Th</div>
              <div className="day" data-day-val="5" onClick={toggleDay}>F</div>
              <div className="day" data-day-val="6" onClick={toggleDay}>S</div>
              <div className="day" data-day-val="7" onClick={toggleDay}>Su</div>
            </div>
            :  
            <div className="control-group">
               <label htmlFor="storeDaysBtwn">Days</label>
                <input type="number" name="store_days_btwn" id="store_days_btwn" defaultValue="7" onChange={changeDaysBetween}/>
            </div>
            }
            <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="plan_dinner" defaultChecked  onChange={updateBreakfast}/>
          <label className="custom-control-label" htmlFor="plan_breakfast">Plan Breakfast</label>
            </div>
            <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="plan_dinner" defaultChecked  onChange={updateLunch}/>
          <label className="custom-control-label" htmlFor="plan_lunch" >Plan Lunch</label>
            </div>
            <div className="custom-control custom-switch">
              <input type="checkbox" className="custom-control-input" id="plan_dinner" defaultChecked onChange={updateDinner}/>
          <label className="custom-control-label" htmlFor="plan_dinner">Plan Dinner</label>
            </div>
            <button className='btn success' type="submit">Register!</button>
        </div>
    </form>
  )
}

export default Register