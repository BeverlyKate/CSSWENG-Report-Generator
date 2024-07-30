
export function ReportButton({ reportName, id, toggleOverlay }) {
    return (
        <div className="btn-report-holder" data-report="IQPM">
            <button 
                onClick={() => toggleOverlay(reportName, id)}
                className="report-name"
            >
                {reportName}
            </button>
        </div>
    )
}