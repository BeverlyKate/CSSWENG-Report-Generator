export function StatusSelect({ setStatus }) {
  return (
    <div class="popup-options taskType" name="status">
        <label class="btn-dropdown-mock taskOption">
            <input type="radio" class="radioCheck" name="taskType" value="Repair" onClick={e => setStatus(e.target.value)}/>
            <span>Repair</span>
        </label>
        <label class="btn-dropdown-mock taskOption" >
            <input type="radio" class="radioCheck" name="taskType" value="Replace" onClick={e => setStatus(e.target.value)}/>
            <span>Replace</span>
        </label>
        <label class="btn-dropdown-mock taskOption">
            <input type="radio" class="radioCheck" name="taskType" value="Return" onClick={e => setStatus(e.target.value)}/>
            <span>Return</span>
        </label>
        <label class="btn-dropdown-mock taskOption">
            <input type="radio" class="radioCheck" name="taskType" value="QA" onClick={e => setStatus(e.target.value)}/>
            <span>QA</span>
        </label>
    </div>
  )
}
