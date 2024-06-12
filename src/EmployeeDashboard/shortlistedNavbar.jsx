import React, { useState } from 'react';
import '../EmployeeDashboard/shortlistedNavbar.css';
import ShortListedCandidates from '../CandidateSection/ShortListedCandidate';
import InterviewDates from '../EmployeeSection/interviewDate';
import UpdateCallingTracker from '../EmployeeSection/UpdateSelfCalling';
import calendar from '../photos/calendar.png'

const ShortlistedNavbar = () => {
    const [activeComponent, setActiveComponent] = useState(null);

    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showUpdateCallingTracker, setShowUpdateCallingTracker] = useState(false);

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

                    <i style={{ fontSize: "22px" }} onClick={displayCalendar} className="fa-regular fa-calendar"></i>

                    <button className='shortListed-btn-nav' onClick={displayShortlistedData}>ShortListed Candidate</button>
                </div>
            </div>

            <div className='shortlisted-nav-middel'>

                {activeComponent === 'calendar' && (
                    <InterviewDates />
                )}

                {activeComponent === 'shortlisted' && (
                    <ShortListedCandidates viewUpdatedPage={handleViewUpdatedPage} />
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
