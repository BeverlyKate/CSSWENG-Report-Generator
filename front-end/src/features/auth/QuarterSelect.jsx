import { useState } from "react"

export function QuarterSelect({ setDate }) {

  const [quarterNum, selectQuarterNum] = useState('')
  const [dateFrom, setDateFrom] = useState('')

  const handleSelectChange = (event) => {
    const { name, value } = event.target;

    if(name === 'quarterNum'){
      selectQuarterNum(value)
      setDate({quarterNum: value, dateFrom})
    } else if (name === 'dateFrom'){
      setDateFrom(value)
      setDate({quarterNum, dateFrom: value})
    }

    console.log("event", name, value)
  }

  return (
    <div className="date-options">
        <div className="selection selectQuarter">
            <select className="btn-dropdown-mock dropdown-selection quarterSelect" name="quarterNum" value={quarterNum} onChange={handleSelectChange}>
                <option value="default">(Quarter)</option>
                <option value="first">1st Quarter</option>
                <option value="second">2nd Quarter</option>
                <option value="third">3rd Quarter</option>
                <option value="fourth">4th Quarter</option>
            </select>
            <select className="btn-dropdown-mock dropdown-selection quarterSelect" name="dateFrom" value={dateFrom}  onChange={handleSelectChange}>
                <option value="default">(Year)</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
            </select>
        </div>
    </div>
  )
}
