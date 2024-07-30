export function MonthRange({ setDate }) {
  return (
    <div className="date-options">
        <div className="selection selectMonth">
            <label for="dateFrom">Select month and year</label>
            <input type="month" id="dateFrom" name="dateFrom" onChange={e => setDate(e.target.value)}/>
        </div>
    </div>
  )
}
