import React from 'react'
import { Link } from 'react-router-dom';

export function ReportFooter() {
  function handlePrint(){
    window.print()
  }

  return (
    <footer>
        <button className="btn-print" onClick={handlePrint}>Export</button>
        <Link to="/">
            <button className="btn-return">Generate Another Report</button>
        </Link>
    </footer>
  )
}
