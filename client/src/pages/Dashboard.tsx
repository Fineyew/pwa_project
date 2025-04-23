import React, { useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [openTab, setOpenTab] = useState<string | null>(null)
  const sessionId = localStorage.getItem('sessionId')

  const handleLogout = async () => {
    if (!sessionId) return alert('No session ID found.')

    try {
      await axios.post('http://localhost:4000/api/logout', { sessionId })
      alert('Logged out successfully.')
      localStorage.removeItem('sessionId')
      window.location.reload()
    } catch {
      alert('Logout failed.')
    }
  }

  const toggleDropdown = (tab: string) => {
    setOpenTab((prev) => (prev === tab ? null : tab))
  }

  return (
    <>
      <nav
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          padding: '1rem',
          background: '#0277bd',
          color: 'white'
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div className="dropdown">
            <button onClick={() => toggleDropdown('Personal')}>Personal ▾</button>
            {openTab === 'Personal' && (
              <div className="dropdown-menu">
                <button disabled>Message Center</button>
                <button disabled>Personal Profile</button>
                <button disabled>Address</button>
                <button disabled>Phone</button>
                <button disabled>Dependents</button>
                <button disabled>W4 Info</button>
                <button disabled>Emergency Contacts</button>
                <button disabled>Benefit Information</button>
                <button disabled>Education</button>
                <button disabled>Certifications</button>
                <button disabled>Create Message</button>
                <button disabled>Scheduling</button>
                <button disabled>Leave Request</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button onClick={() => toggleDropdown('Action')}>Action ▾</button>
            {openTab === 'Action' && (
              <div className="dropdown-menu">
                <button disabled>Time Entry</button>
                <button disabled>Leave Entry</button>
                <button disabled>View Timesheets</button>
                <button disabled>Timesheet Pivot Table</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button onClick={() => toggleDropdown('Reporting')}>Reporting ▾</button>
            {openTab === 'Reporting' && (
              <div className="dropdown-menu">
                <button disabled>Timesheet Summary</button>
                <button disabled>Timesheet Detail</button>
                <button disabled>Check/W2 History</button>
                <button disabled>My Messages</button>
                <button disabled>My Change Request</button>
                <button disabled>Sent Messages</button>
                <button disabled>My Leave Request</button>
                <button disabled>My Leave Detail</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button onClick={() => toggleDropdown('Options')}>Options ▾</button>
            {openTab === 'Options' && (
              <div className="dropdown-menu">
                <button disabled>Change Password</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button onClick={() => toggleDropdown('Help')}>Help</button>
          </div>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="container">
        <h2>Welcome to your dashboard</h2>
        <p>This screen will eventually mirror the full EWS UI.</p>
      </div>
    </>
  )
}
