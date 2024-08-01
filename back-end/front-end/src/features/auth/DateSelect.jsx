import { useState } from "react"
import { MonthRange } from "./MonthRange"
import { QuarterSelect } from "./QuarterSelect"
import { YearSelect } from "./YearSelect"

export function DateSelect({ getDate }) {
  const [dateChosen, setDateChosen] = useState("")
  const [dateRange, setDateRange] = useState("")
  // const [getDate, setGetDate] = useState("")

  function setDate(date) {
    getDate(date)
  }

  return (
    <>
      <div className="popup-options date_range taskType" name="dateRange">
          <label className="btn-dropdown-mock taskOption">
              <input type="radio" className="radioCheck" name="dateRange" value="month" onClick={e => setDateChosen(e.target.value)}/>
              <span>Month</span>
          </label>
          <label className="btn-dropdown-mock taskOption" >
              <input type="radio" className="radioCheck" name="dateRange" value="quarter" onClick={e => setDateChosen(e.target.value)}/>
              <span>Quarter</span>
          </label>
          <label className="btn-dropdown-mock taskOption">
              <input type="radio" className="radioCheck" name="dateRange" value="year" onChange={e => setDateChosen(e.target.value)}/>
              <span>Year</span>
          </label>
      </div>
      <div className="dateSelection">
        {dateChosen === "month" && (<MonthRange setDate = {setDate}/>)}
        {dateChosen === "quarter" && (<QuarterSelect setDate = {setDate}/>)}
        {dateChosen === "year" && (<YearSelect setDate = {setDate}/>)}
      </div>
      
    </>
  )
}
