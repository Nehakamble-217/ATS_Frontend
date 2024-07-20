// Prachi Parab  component :Rights + instructions + best view + information  19/07/2024 line No 4 to 325


import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import '../AboutUs/rightsandInstructions.css';

const RightsAndInstructions = () => {
    const policyRef = useRef();

    const handleGeneratePDF = async () => {

        const issueContainer = document.getElementById('issue-containers');
        const canvas = await html2canvas(issueContainer, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 20;  // Set margin size (in points)
        const borderWidth = 1;  // Set border width (in points)

        const contentWidth = pdfWidth - 2 * margin;
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * contentWidth) / imgProps.width;

        let heightLeft = imgHeight;
        let position = margin;

        pdf.setLineWidth(borderWidth);

        let page = 1;
        while (heightLeft > 0) {
            if (page > 1) {
                pdf.addPage();
            }
            pdf.addImage(imgData, 'PNG', margin, position, contentWidth, imgHeight);
            pdf.rect(margin, margin, contentWidth, pdfHeight - 2 * margin);  // Add border

            heightLeft -= (pdfHeight - 2 * margin);
            position -= (pdfHeight - 2 * margin);  // Adjust position for next page

            page++;
        }

        // Saving the PDF
        pdf.save('WorkplacePolicy.pdf');
    };


    const handlePrint = useReactToPrint({
        content: () => policyRef.current,
        documentTitle: 'WorkplacePolicy',
    });


    return (
        <div className='rightsandInstructions'>

            <div ref={policyRef} className="issue-containers" id='issue-containers'>

                <div id='instructions' className='rightsandInstructionsdiv'>
                    <h3 className='instr-headings'><span className='instr-headings-span'>Instructions for Using the Recruitment's Gear Software</span></h3>
                    <p>
                        <ul>


                            <li className='liststyletype'>

                                <ul>
                                    <li> <b>Login:</b> Use your assigned credentials to access the software platform.</li>
                                    <li><b>Navigation:</b> Familiarize yourself with the dashboard and navigation menus for easy access to different functionalities.</li>
                                    <li>After Login, you can find four segments <b>1.Client 2.Employee 3.Applicants 4.Vendor</b> </li>

                                    <b>1. Client</b>
                                    <li className='liststyletype'>
                                        <ul>
                                            <li className='liststyletype'> &rarr; Instructions :</li>
                                            <ul>
                                                <li className='liststyletype'>&#x25CB; Schedule interview as early as possible</li>
                                                <li className='liststyletype'>&#x25CB; If lay off, give valid reason</li>
                                                <li className='liststyletype'>&#x25CB; After completion of 90 days, payment must be within 15 days.</li>

                                            </ul>
                                        </ul>

                                    </li>



                                    <li className='liststyletype'><b>2. Employee</b>
                                        <ul>
                                            <li className='liststyletype'>&#x25CB; After clicking Employee Section,it displays <b>Recruiter, TeamLeader, Manager, Super User </b> categories.</li>

                                        </ul>

                                    </li>




                                    <li className='liststyletype'> <b> &nbsp; &rArr; Recruiter</b>
                                        <ul>
                                            <li className='liststyletype'> &rarr; Instructions :</li>
                                            <ul>
                                                <li className='liststyletype'>&#x25CB; <b>Login:</b> Use your assigned credentials to access the software platform.</li>
                                                <li className='liststyletype'>&#x25CB; As per dashboard and navigation menus,we can find -
                                                    <ul>
                                                        <li className='liststyletype'>&#x2605; <b>Job Desciption </b>- Display all requirements</li>
                                                        <li className='liststyletype'>&#x2605; <b>Add Candidate </b>- Adds all required information about Candidate</li>
                                                        <li className='liststyletype'>&#x2605; <b>Find Candidate </b>- Display candidates as per Job Description</li>
                                                        <li className='liststyletype'>&#x2605; <b>Calling Tracker </b>- Once added Candidate, it displays in Calling Tracker page.</li>
                                                        <li className='liststyletype'>&#x2605; <b>LineUp Data </b>-When interview schedule as per client,particular Calling Tracker data added to Lineup </li>
                                                        <li className='liststyletype'>&#x2605; After interview, data will categeries into Selected,Rejected,Hold,Dropout,Join,Not Join etc. categories </li>
                                                        <li className='liststyletype'>&#x2605; Once Candidate selected, send him for background verification also take follow up for 90 days  </li>
                                                        <li className='liststyletype'>&#x2605; After completion of 90 days, payment must be within 15 days. </li>
                                                    </ul>
                                                </li>

                                            </ul>
                                        </ul>

                                    </li>


                                    <li className='liststyletype'> <b> &nbsp; &rArr; TeamLeader</b>
                                        <ul>
                                            <li className='liststyletype'> &rarr; Instructions :</li>
                                            <ul>
                                                <li className='liststyletype'>&#x25CB; <b>Login:</b> Use your assigned credentials to access the software platform.</li>
                                                <li className='liststyletype'>&#x25CB; Team Leader has authority to Update,Delete,Block candidate</li>

                                            </ul>
                                        </ul>

                                    </li>

                                    <li className='liststyletype'> <b> &nbsp; &rArr; Manager</b>
                                        <ul>
                                            <li className='liststyletype'> &rarr; Instructions :</li>
                                            <ul>
                                                <li className='liststyletype'>&#x25CB; <b>Login:</b> Use your assigned credentials to access the software platform.</li>
                                                <li className='liststyletype'>&#x25CB; Manager has authority to Update,Delete,Block candidate also,can view reports of performance of recruiters,teamLeader</li>

                                            </ul>
                                        </ul>

                                    </li>

                                    <li className='liststyletype'> <b> &nbsp; &rArr; Super User</b>
                                        <ul>
                                            <li className='liststyletype'> &rarr; Instructions :</li>
                                            <ul>
                                                <li className='liststyletype'>&#x25CB; <b>Login:</b> Use your assigned credentials to access the software platform.</li>
                                                <li className='liststyletype'>&#x25CB; Super User has authority to Update,Delete,Block candidate also,can view reports of performance of Recruiters,TeamLeader,Manager</li>

                                            </ul>
                                        </ul>

                                    </li>

                                    <li className='liststyletype'> <b>3. Applicant</b>
                                        <ul>
                                            <li className='liststyletype'>&rarr; Instructions :</li>
                                            <ul>

                                            </ul>
                                        </ul>

                                    </li>
                                    <li className='liststyletype'> <b>4. Vendor</b>
                                        <ul>
                                            <li className='liststyletype'>&rarr; Instructions :</li>
                                            <ul>
                                                <li className='liststyletype'> &#x25CB; <b>Login:</b> Use your assigned credentials to access the software platform.</li>
                                                <li className='liststyletype'> &#x25CB; Vendor can add Candidate and keep track of it.</li>
                                            </ul>
                                        </ul>

                                    </li>

                                    <li>Database menu gives all uploaded resumes.</li>
                                    <li>Resume menu,creates resume for applicant.</li>
                                    <li>Based on attendence and over all work performance report will be generated</li>
                                    <li>Chat section is added for internal chat</li>


                                </ul>


                            </li>


                        </ul>


                    </p>
                </div>

                <div id='bestView' className='rightsandInstructionsdiv'>
                    <h3 className='instr-headings'><span className='instr-headings-span'>Best View</span></h3>
                    <p>
                        <ul>
                            <li><b>Job Listings </b></li>
                            <li className='liststyletype'>

                                Display job listings in a clear and concise manner with essential details.
                                Filters and Sorting Allow recruiters to filter jobs by status, location, date posted, etc.

                            </li>
                            <li><b>Candidate Management </b></li>
                            <li className='liststyletype'>
                                Provide a detailed view of each candidate's profile including resume, contact details, and application history.
                            </li>

                            <li><b>Status Tracking </b></li>
                            <li className='liststyletype'>
                                Enable recruiters to track candidate progress (e.g., application stage, interview status) with clear visual indicators.
                            </li>



                            <li><b>Analytics and Reporting </b></li>
                            <li className='liststyletype'>
                                Provide insights into recruitment efficiency and effectiveness based on collected data.

                            </li>


                            <li><b>Automated Mails </b></li>
                            <li className='liststyletype'>
                                Send mail to recruiters and candidates about upcoming interviews.

                            </li>

                            <li><b>Security and Compliance </b></li>
                            <li className='liststyletype'>
                                Ensure robust security measures to protect sensitive candidate and client information.

                            </li>

                        </ul>

                    </p>
                </div>

                <div id='information' className='rightsandInstructionsdiv'>
                    <h3 className='instr-headings'><span className='instr-headings-span'>Information about Software</span></h3>
                    <p>

                        <p>
                            An applicant tracking system (ATS) is software for recruiters and employers to track candidates throughout the recruiting and hiring process. This software can come equipped with capabilities ranging from simple database functionality to a full-service suite of tools that makes it easy for businesses of any size to filter, manage, and analyze candidates.
                            Moving a candidate through the journey from first contact to start date can be a high-touch process. It can be all too easy to lose a top candidate because of slow response times or poor engagement around interview schedules. An ATS creates greater visibility across the applicant lifecycle, so touchpoints don’t fall through the cracks.
                            An ATS creates opportunities to automate manual processes, increase visibility into the hiring cycle for the entire recruiting team, and increase opportunities for communication throughout the candidate journey.

                        </p>
                        <p>
                            Recruiter Gear's Software display job listings in a clear and concise manner with essential details. Filters and Sorting Allow recruiters to filter jobs by status, location, date posted, etc. Also Provide a detailed view of each candidate's profile including resume, contact details, and application history. Enable recruiters to track candidate progress with clear visual indicators. Send mail to recruiters and candidates about upcoming interviews. In employee point of view, it displays the progress of all employees and show report by pie chart and by Progress Indicator.
                        </p>
                    </p>
                </div>

                <div id='Rights' className='rightsandInstructionsdiv'>
                    <h3 className='instr-headings'><span className='instr-headings-span'>Rights and Responsibilities for Recruiter's Gear Software</span></h3>
                    <p>
                        <ul>
                            <h3 className='instr-headings'>Access and Usage Rights</h3>

                            <li className='liststyletype'>
                                <ul>
                                    <li><b>Access: </b>Users (employees of the recruitment company) have the right to access the software platform during their employment tenure.</li>
                                    <li><b>Usage:</b> Users are granted the right to use the software for the purpose of managing recruitment processes, including but not limited to:</li>
                                    <ul>
                                        <li>Posting job openings</li>
                                        <li>Reviewing candidate applications</li>
                                        <li>Communicating with candidates and clients</li>
                                        <li>Managing candidate profiles and data</li>
                                    </ul>
                                    <li><b>Accountability:</b> Users are accountable for maintaining the confidentiality and security of their login credentials. They must not share their credentials with unauthorized individuals.</li>
                                </ul>
                            </li>

                            <h3 className='instr-headings'>Data Handling and Privacy Rights</h3>
                            <li className='liststyletype'>
                                <ul>
                                    <li><b>Data Privacy:</b> The software ensures compliance with data protection regulations concerning the collection, storage, and processing of personal data of candidates and clients.</li>
                                    <li><b>Data Ownership:</b> The recruitment company retains ownership of all data entered into or generated by the software platform.</li>

                                    <li><b>Data Access: </b>Authorized personnel within the recruitment company have access to candidate and client data for recruitment purposes only.</li>
                                </ul>
                            </li>
                            <h3 className='instr-headings'>Responsibilities</h3>
                            <li className='liststyletype'>
                                <ul>
                                    <li><b>Compliance:</b> Users must comply with company policies, as well as local and international laws and regulations, while using the software platform.</li>
                                    <li><b>Data Integrity:</b> Users are responsible for ensuring the accuracy and integrity of data entered into the software. They must promptly update information as necessary.</li>

                                    <li><b>Security: </b>Users must report any security incidents or suspected breaches promptly to the appropriate IT or security personnel.</li>
                                </ul>
                            </li>
                        </ul>
                    </p>
                </div>
            </div>
            <div className='handlePrintDiv'>
                <button className='issue-button' onClick={handlePrint}>Export PDF</button>
            </div>
        </div>
    );
};

export default RightsAndInstructions;
