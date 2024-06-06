import React, { useState } from 'react';
import '../EmployeeDashboard/shortlistedNavbar.css';
import ShortListedCandidates from '../CandidateSection/ShortListedCandidate';
import InterviewDates from '../EmployeeSection/interviewDate';
import UpdateCallingTracker from '../EmployeeSection/UpdateSelfCalling';
import calendar from '../photos/calendar.png'

const ShortlistedNavbar = () => {
    const [activeComponent, setActiveComponent] = useState(null); // 'shortlisted', 'calendar', 'update'
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const displayShortlistedData = () => {
        setActiveComponent('shortlisted');
    };

    const displayCalendar = () => {
        setActiveComponent('calendar');
    };

    const handleViewUpdatedPage = (employeeId, candidateId) => {
        setSelectedCandidate({ employeeId, candidateId });
        setActiveComponent('update');
    };

    return (
        <div>
            <div className='shortlisted-main-nav'>
                <div className='shortlisted-nav-left'>
                    <img style={{width:"25px"}} onClick={displayCalendar}  src={calendar} alt="" />

                    {/* <i id='calendar-icon-nav'  className="fa-thin fa-calendar-days"></i> */}
                    <button className='shortListed-btn-nav' onClick={displayShortlistedData}>ShortListed Candidate</button>
                    <button className='shortListed-btn-nav'>button 3</button>
                    <button className='shortListed-btn-nav'>button 4</button>
                    <button className='shortListed-btn-nav'>button 5</button>
                    <button className='shortListed-btn-nav'>button 6</button>
                </div>
            </div>

            <div className='shortlisted-nav-middel'>
                {activeComponent === 'shortlisted' && (
                    <ShortListedCandidates viewUpdatedPage={handleViewUpdatedPage} />
                )}

                {activeComponent === 'calendar' && (
                    <InterviewDates />
                )}

                {activeComponent === 'update' && selectedCandidate && (
                    <UpdateCallingTracker
                        employeeId={selectedCandidate.employeeId}
                        candidateId={selectedCandidate.candidateId}
                        closeUpdatePage={() => setActiveComponent('shortlisted')}
                    />
                )}
            </div>
        </div>
    );
};

export default ShortlistedNavbar;
