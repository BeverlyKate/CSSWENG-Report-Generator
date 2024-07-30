export function YearSelect({ setDate }) {
  return (
    <div className="date-options selectYear">
        <div className="selection">
            <select className="btn-dropdown-mock dropdown-selection" name="dateFrom" onChange={e => setDate(e.target.value)}>
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
