export function TechCategory({setTech}) {
    const technicianList = [
        {value: "default", label: "(Technician)"},
        {value: "CHRISTIAN", label: "CHRISTIAN"},
        {value: "DANIEL", label: "DANIEL"},
        {value: "DREX", label: "DREX"},
        {value: "MJ", label: "MJ"},
        {value: "NEIL", label: "NEIL"},
        {value: "OMER", label: "OMER"}
    ]
  return (
    <select class="btn-dropdown-mock dropdown-selection" name="technician" onChange={e => setTech(e.target.value)}>
        {technicianList.map(tech => {
            return (<option value={tech.value}>{tech.label}</option>)
        })}
    </select>
  )
}
