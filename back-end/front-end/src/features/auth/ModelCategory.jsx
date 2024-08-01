export function ModelCategory({ setModel }) {
    var modelSelection =[
        {value: "default", label: "(Item)"},
        {value: "FRAME EZ-112A", label: "FRAME EZ-112A"}, 
        {value: "FRAME EZ-206A", label: "FRAME EZ-206A"}, 
        {value: "FRAME EZ-406A", label: "FRAME EZ-406A"},
        {value: "FRAME HLT12X", label: "FRAME HLT12X"}, 
        {value: "FRAME K-10A", label: "FRAME K-10A"}, 
        {value: "FRAME K3", label: "FRAME K3"},
        {value: "FRAME KIRA 288", label: "FRAME KIRA 288"}, 
        {value: "FRAME LC-12N", label: "FRAME LC-12N"}, 
        {value: "FRAME LX-18", label: "FRAME LX-18"},
        {value: "FRAME LX-212A", label: "FRAME LX-212A"}, 
        {value: "FRAME LXD-7000", label: "FRAME LXD-7000"}, 
        {value: "FRAME V12A", label: "FRAME V12A"},
        {value: "FRAME VPX COMBI", label: "FRAME VPX COMBI"}, 
        {value: "FRAME VPX-310", label: "FRAME VPX-310"}, 
        {value: "FRAME VPX-312 (TOP)", label: "FRAME VPX-312 (TOP)"},
        {value: "FRAME VRX932A", label: "FRAME VRX932A"}, 
        {value: "FRAME VTX-12", label: "FRAME VTX-12"}, 
        {value: "FRAME VTX-935", label: "FRAME VTX-935"},
        {value: "HF-203 TRANSFORMER", label: "HF-203 TRANSFORMER"}, 
        {value: "HORN H3002", label: "HORN H3002"}, 
        {value: "HORN H310", label: "HORN H310"},
        {value: "HORN H315", label: "HORN H315"}, 
        {value: "HORN H7003", label: "HORN H7003"}, 
        {value: "MC-02SP BLACK (100M)", label: "MC-02SP BLACK (100M)"},
        {value: "MC-02SP D.BLUE (100M)", label: "MC-02SP D.BLUE (100M)"}, 
        {value: "MS-3", label: "MS-3"},
        {value: "NB-908", label: "NB-908"}, 
        {value: "PL CONNECTOR (MONO)", label: "PL CONNECTOR (MONO)"}, 
        {value: "RJ-45 CONNECTOR", label: "RJ-45 CONNECTOR"},
        {value: "SP-1", label: "SP-1"}, 
        {value: "SP-2", label: "SP-2"}, 
        {value: "SPEAKON", label: "SPEAKON"},
        {value: "SPW14", label: "SPW14"}, 
        {value: "SS-5 SPEAKER STAND", label: "SS-5 SPEAKER STAND"}, 
        {value: "SS-8 SPEAKER STAND", label: "SS-8 SPEAKER STAND"},
        {value: "THX-12", label: "THX-12"}, 
        {value: "VC-100", label: "VC-100"}, 
        {value: "XLR (F)", label: "XLR (F)"},
        {value: "XLR (M)", label: "XLR (M)"}
    ]
    return (
        <select class="btn-dropdown-mock dropdown-selection" name="itemModel" onChange={e => setModel(e.target.value)}>
            {modelSelection.map(model => {
                return (<option value={model.value}>{model.label}</option>)
            })}
        </select>
    )
}
