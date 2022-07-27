import { Button, FormControlLabel, List, Switch, TextField } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useUser } from 'reactfire'
import { DataContext } from '../../app/Providers/DataProvider'

const Register = () => {

  const { messages, setMessages } = useContext(DataContext)
  const { setRegUser } = useContext(DataContext)
  const { data: user } = useUser()
  const { setIsLoggedIn } = useContext(DataContext)
  const [scheduleData, setScheduleData] = useState({
    store_trip_method: '1',
    store_days_btwn: "7",
    store_trip_days: null,
    plan_breakfast: true,
    plan_lunch: true,
    plan_dinner: true
  })
  const [userData, setUserData] = useState({
    username: user ? user.displayName || "My Username" : '',
    email: user ? user.email : ''
  })
  const [errors, setErrors] = useState([])
  useEffect(() => { updateUser() }, [user])
  useEffect(() => validateForm(), [scheduleData])
  const navigate = useNavigate()

  function updateUser() {
    if (user)
      setUserData({ ...userData, email: user.email, username: user.displayName })
  }
  function toggleDay(e) {
    // Returns a value like '26 represtening "Tues, Sat"
    let d = e.target.dataset.dayVal
    let el = e.target
    let value = null
    el.classList.toggle("active")
    let days = scheduleData.store_trip_days
    // if empty, it can just be the selected value
    if (!days) value = { ...scheduleData, store_trip_days: d }
    // if not empty, insert the value at the logical place
    // ex: 145, insert 2 >>> 1245
    else {
      let p = days.indexOf(d)  // p = pointer
      // if not found
      if (p === -1) {
        for (let i = 0; i < days.length; i++) {
          // insert at position of first larger value
          if (days[i] > d) {
            value = { ...scheduleData, store_trip_days: days.slice(0, i) + d + days.slice(i) }
            break
          }
          // if you get to the end of the list without inserting, add it to the end
          if (i === days.length - 1)
            value = { ...scheduleData, store_trip_days: [...days, d] }
        }
      } else {
        // if found, remove the value
        value = { ...scheduleData, store_trip_days: days.slice(0, p) + days.slice(p + 1) }
      }
    }
    if (days === '') setScheduleData({ ...scheduleData, store_trip_days: null })
    else setScheduleData(value)

  }
  function changeDaysBetween(e) {
    setScheduleData({ ...scheduleData, store_days_btwn: e.target.value })
  }
  function changeUsername(e) {
    setUserData({ ...userData, username: e.target.value })
  }
  function changeStoreTripMethod(e) {
    setScheduleData({ ...scheduleData, store_trip_method: e.target.id })
  }
  function updateBreakfast(e) {
    setScheduleData({ ...scheduleData, plan_breakfast: e.target.checked })
  }
  function updateLunch(e) {
    console.log(e.target);
    setScheduleData({ ...scheduleData, plan_lunch: e.target.checked })
  }
  function updateDinner(e) {
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
    return await fetch('https://amp-ct-api.herokuapp.com/api/v1/user/register', {
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
        setRegUser({ id: data.user.id, username: data.user.username, 'access-token': data.user['access-token'] })
        return data.user.id
      })
      .catch((e) => {
        setMessages([...messages, "Registration error. Please try again."])
        console.error('There\'s a problem.', e)
      })
  }
  const setSchedule = async (id) => {
    fetch(`https://amp-ct-api.herokuapp.com/api/v1/meal_plan/${id}/schedule/create`, {
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
      .catch(e => {
        setMessages([...messages, "Unable to register user. Please try again."])
        console.log(e) // schedule error console
      })
  }
  function validateForm() {
    if (scheduleData?.store_trip_method === '1'
      && !scheduleData?.store_trip_days) {

      let newError = [...errors, { 1: "At least one trip day should be selected." }]
      setErrors(newError)
      console.log('after newError')
    }
    else {
      let theseErrors = errors?.filter(e => Object.keys(e)[0] !== '1')
      setErrors(theseErrors)
      console.log('after setErrors')
    }

    if (!scheduleData?.plan_breakfast
      && !scheduleData?.plan_lunch
      && !scheduleData?.plan_dinner) {
      setErrors([...errors, { 2: "At least one meal must be planned for" }])
    }
    else {
      setErrors(errors?.filter(e => Object.keys(e)[0] !== '2'))
    }
  }

  return (
    <form className="register_box" id="register_form" onSubmit={submit}>
      <div className="welcome">
        <h1>Hi, {user ? user.displayName : 'unknown'}! </h1>
        <p>Let's get you set up!</p>
      </div>
      <p className="intro_box">
        This app is based around you and your schedule. So let's spend a moment to learn about you.
      </p>
      <TextField name='username'
        variant='filled' label='Username'
        helperText='This has to be unique.'
        defaultValue={user?.displayName}
        onChange={changeUsername} />

      <p>When do you typically go to the store? <small>(We know it's not always the same, but we can deal with that in a bit.</small>)
      </p>
      <div className="schedule" data-toggle="buttons">
        <label style={{ display: 'block' }} className="btn btn-secondary">
          <input type="radio" name="methodOptions" id="1" onChange={changeStoreTripMethod} defaultChecked /> The Same Day(s) Each Week
        </label>
        {/* Day Select */}
        {scheduleData?.store_trip_method === "1"
          ? <div className="days-box">
            <div className="day" data-day-val="1" onClick={toggleDay}>M</div>
            <div className="day" data-day-val="2" onClick={toggleDay}>T</div>
            <div className="day" data-day-val="3" onClick={toggleDay}>W</div>
            <div className="day" data-day-val="4" onClick={toggleDay}>Th</div>
            <div className="day" data-day-val="5" onClick={toggleDay}>F</div>
            <div className="day" data-day-val="6" onClick={toggleDay}>S</div>
            <div className="day" data-day-val="7" onClick={toggleDay}>Su</div>
          </div>
          : null}
        {/* Days Between Store */}
        <label style={{ display: 'block' }} className="btn btn-secondary active">
          <input type="radio" name="methodOptions" id="2" onChange={changeStoreTripMethod} /> After a Number of Days
        </label>
        {scheduleData?.store_trip_method === "2"
          ? <div className="control-group">
            <TextField variant='filled' name="store_days_btwn" type={'number'}
              onChange={changeDaysBetween} defaultValue="7"
              required={scheduleData?.store_trip_method === "2"}
              helperText="We recommend you start with 7 or less and then turn this up later."
            />
          </div>
          : null
        }
      </div>

      <fieldset className="planMeals">
        <legend>Meals to Plan</legend>
        <FormControlLabel
          control={<Switch defaultChecked onChange={updateBreakfast} />}
          label='Breakfast' />
        <FormControlLabel
          control={<Switch defaultChecked onChange={updateLunch} />}
          label='Lunch' />
        <FormControlLabel
          control={<Switch defaultChecked onChange={updateDinner} />}
          label='Dinner' />


      </fieldset>


      <div className="submit">
        <Button sx={{ marginInline: 'auto' }} variant="contained" color='success' type="submit" disabled={errors.length > 0} >Register!</Button>
      </div>


      <div className="errorDisplay" hidden={errors.length === 0}>
        <ul>
          {errors?.map((e, i) => <li key={i}>{Object.values(e)[0]}</li>)}
        </ul>
      </div>

    </form>
  )
}

export default Register