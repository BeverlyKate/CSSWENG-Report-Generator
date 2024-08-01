import { useState } from "react"

export function QuarterSelect({ setDate }) {

  const [quarterNum, selectQuarterNum] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const quartSelection = [
    {value: "default", label: "(Quarter)"},
    {value: "first", label: "1st Quarter"},
    {value: "second", label: "2nd Quarter"},
    {value: "third", label: "3rd Quarter"},
    {value: "fourth", label: "4th Quarter"}
  ]

  const yearSelection = [
    {value: "default", label: "(Year)"},
    {value: "2024", label: "2024"},
    {value: "2023", label: "2023"},
    {value: "2022", label: "2022"},
    {value: "2021", label: "2021"},
    {value: "2020", label: "2020"}
  ]


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
              {quartSelection.map(quarter => {
                return (<option value={quarter.value}>{quarter.label}</option>)
                })}
            </select>
            <select className="btn-dropdown-mock dropdown-selection quarterSelect" name="dateFrom" value={dateFrom}  onChange={handleSelectChange}>
                 {yearSelection.map(year => {
                  return (<option value={year.value}>{year.label}</option>)
                 })}
            </select>
        </div>
    </div>
  )
}
