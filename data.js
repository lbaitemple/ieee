const POSITIONS_DATA = [
  {
    title: 'Section Chair',
    description: 'The Section Chair provides leadership and strategic direction for the section, coordinates activities, and represents the section to IEEE.',
    keywords: 'chair, leadership, section, executive, management',
    first30Days: `
      <h3>Getting Started</h3>
      <ul>
        <li>Set up your IEEE Account</li>
        <li>Read your Job Description</li>
      </ul>
      <h3>Understanding the Section</h3>
      <ul>
        <li>Section within IEEE MGA Structure</li>
        <li>Know where to find Section Policy (MGA Ops Manual Sec 9)</li>
        <li>Familiarize with the Tools you'll need</li>
        <li>Access Tutorials on key Volunteer Tools</li>
        <li>IEEE OU Analytics</li>
        <li>Access Vitality Resources</li>
        <li>TAB Resources for Volunteers</li>
      </ul>
      <h3>Work with your Section Officers</h3>
      <ul>
        <li>Contact your Section Officers</li>
        <li>Report new Officers using vTools</li>
        <li>Create and manage your Section Calendar</li>
      </ul>
      <h3>Complete IEEE Compliance Training within First 60 days</h3>
      <ul>
        <li>See who is required to take the compliance training</li>
        <li>Access IEEE Compliance Training</li>
        <li>Complete & Submit Conflict of Interest (COI) Form</li>
      </ul>
    `,
    keyAdmin: `
      <h3>Set up Your Executive Committee</h3>
      <ul>
        <li>Ensure Officers know their role</li>
        <li>Determine which committees your Section needs & Appoint Committee Chairs</li>
        <li>Conduct Executive Committee Meetings</li>
      </ul>
      <h3>Manage the Section</h3>
      <ul>
        <li>Planning & Goal Setting</li>
        <li>Section Vitality Checklist</li>
        <li>Meeting Agenda Template</li>
        <li>Running an Effective Meeting</li>
        <li>Familiarize with Roberts Rules</li>
        <li>Create and Manage Section Budget</li>
        <li>Hold an IEEE EXCOM Meeting at Company</li>
        <li>Hold an IEEE ExCom Meeting at Restaurant</li>
      </ul>
      <h3>Section Communications</h3>
      <ul>
        <li>Connect with Region Leadership, Students, Society Chapter Chairs and Affinity Groups</li>
        <li>IEEE Social Media</li>
        <li>Google Groups</li>
        <li>Contact members via e-mail using IEEE e-Notice</li>
      </ul>
      <h3>Organize Section Activities</h3>
      <ul>
        <li>Student Branches & Section coordination</li>
        <li>Hold an IEEE Social Event</li>
        <li>Hold an IEEE Full-Day Tech Family Activity</li>
        <li>Hold an IEEE Local Tour</li>
        <li>Foster Technical Society Chapter collaboration</li>
        <li>Build Technical Communities in Chapters</li>
        <li>Hold an IEEE Technical Meeting at a Company</li>
        <li>Establish Relationships with Industry - Best Practices</li>
      </ul>
      <h3>Engage members & Mentor volunteers</h3>
      <ul>
        <li>Engaging IEEE Members</li>
        <li>Benefits of Membership</li>
        <li>Value of Membership</li>
      </ul>
      <h3>Ensure Elections take place</h3>
      <ul>
        <li>Create and Manage Elections in vTools</li>
        <li>Election Voting in vTools</li>
        <li>Election Calendar Tool</li>
      </ul>
    `,
    yearly: `
      <h3>Yearly Planning & Reporting</h3>
      <ul>
        <li>Develop Succession Plan</li>
        <li>Review Financial Reports</li>
        <li>Ensure Required Reporting is submitted (Financial, Meetings, Officers)</li>
      </ul>
    `
  },
  {
    title: 'Vice Chair',
    description: 'The Vice Chair assists the Section Chair and assumes responsibilities in their absence.',
    keywords: 'vice, chair, assistant, deputy, leadership',
    first30Days: `
      <h3>Getting Started</h3>
      <ul>
        <li>Set Up your IEEE Account</li>
        <li>Read your Job Description</li>
      </ul>
      <h3>Understanding the Section</h3>
      <ul>
        <li>Section within IEEE MGA Structure</li>
        <li>Know where to find Section Policy (MGA Ops Manual Sec 9)</li>
        <li>Ensure transition with prior Vice Chair</li>
      </ul>
      <h3>Familiarize with the Tools you'll need</h3>
      <ul>
        <li>Access Tutorials on key Volunteer Tools</li>
        <li>IEEE OU Analytics</li>
        <li>Access Vitality Resources</li>
        <li>TAB Resources for Volunteers</li>
      </ul>
    `,
    keyAdmin: `
      <h3>Section Officers Roles</h3>
      <ul>
        <li>Ensure Officers know their Role</li>
      </ul>
      <h3>Engage members</h3>
      <ul>
        <li>Benefits of Membership</li>
        <li>Values of Membership</li>
        <li>Connect with Region Leadership, Students, Society chapters Chairs and Affinity Groups</li>
      </ul>
      <h3>Support Chair with Goals setting</h3>
      <ul>
        <li>Section Planning & Goal Setting</li>
        <li>Section Vitality Checklist</li>
      </ul>
    `,
    yearly: `
      <h3>Support chair in conducting Section Activities and Meetings</h3>
      <ul>
        <li>Familiarize with Roberts Rules</li>
        <li>Running an Effective Meeting</li>
        <li>Meeting Agenda Template</li>
        <li>Holding an IEEE EXCOM Meeting at a Company</li>
        <li>Steps for Holding an IEEE ExCom Meeting at Restaurant</li>
      </ul>
      <h3>Prepare for Chair position (Succession plan)</h3>
      <ul>
        <li>Section Chair Action Plan</li>
      </ul>
    `
  },
  {
    title: 'Secretary',
    description: 'The Secretary maintains section records, manages documentation, and handles meeting minutes.',
    keywords: 'secretary, records, minutes, documentation, administrative',
    first30Days: `
      <h3>Read your Job Description</h3>
      <ul>
        <li>Set up your IEEE Account</li>
        <li>Read your Job Description</li>
      </ul>
      <h3>Understanding the Section</h3>
      <ul>
        <li>Section within IEEE MGA Structure</li>
        <li>Know where to find Section Policy (MGA Ops Manual Sec 9)</li>
        <li>Section Vitality Checklist</li>
        <li>Ensure transition with prior Secretary</li>
      </ul>
      <h3>Familiarize with the Tools you'll need</h3>
      <ul>
        <li>IEEE vTools</li>
        <li>IEEE OU Analytics</li>
        <li>eNotice</li>
        <li>Access Tutorials on key Volunteer Tools</li>
        <li>Access Vitality Resources</li>
      </ul>
    `,
    keyAdmin: `
      <h3>Manage, Maintain and Distribute Section Documents</h3>
      <ul>
        <li>Maintain roster of Sections, Chapters, Affinity Group Volunteers</li>
        <li>Maintain Section Minutes and Records</li>
        <li>Maintain and/or store non-financial Section documents</li>
        <li>Complete and Submit Meeting Reports (L31s)</li>
      </ul>
      <h3>Support Section Meetings</h3>
      <ul>
        <li>Distribute Executive Committee meeting notices as appropriate</li>
        <li>Steps to Organize successful meetings</li>
        <li>Familiarize with Robert Rules</li>
        <li>Meeting Agenda Template</li>
        <li>Convert an agenda to minutes with minimal work</li>
        <li>Meeting Minutes</li>
      </ul>
    `,
    yearly: `
      <h3>Yearly Responsibilities</h3>
      <ul>
        <li>Participate in annual goal setting for the Section</li>
        <li>Participate in succession planning for the Section</li>
        <li>Review and update Section governing documents (incl. best practices document, as needed)</li>
        <li>Help mentor New Officers (at Section or Chapter level)</li>
      </ul>
    `
  },
  {
    title: 'Treasurer',
    description: 'The Treasurer manages section finances, budgets, and financial reporting.',
    keywords: 'treasurer, finance, budget, money, financial, accounting',
    first30Days: `
      <h3>Getting Started</h3>
      <ul>
        <li>Set up your IEEE Account</li>
        <li>Read your Job Description</li>
      </ul>
      <h3>Understanding the Section</h3>
      <ul>
        <li>Section within IEEE Member & Geographic Activities (MGA) Structure</li>
        <li>Know where to find Section Policy (MGA Ops Manual Sec 9)</li>
        <li>IEEE Financial Policies</li>
        <li>Section Vitality Checklist</li>
      </ul>
      <h3>Familiarize with the Financial Duties</h3>
      <ul>
        <li>Financial Management for Section and Chapters</li>
        <li>Create Section Budget & Understand Rebate structure</li>
        <li>Familiarize with IEEE Concentration Banking</li>
        <li>Learn about MGA Geo Unit Financial Reporting</li>
      </ul>
      <h3>Complete transition with prior Treasurer</h3>
      <ul>
        <li>Review Financial Reporting from Last Year</li>
        <li>Transfer and Sign for Section Credit Card</li>
        <li>Change account access -- remove prior treasurer, add new treasurer</li>
        <li>Transfer/Collect all checks and past documentation</li>
        <li>Record Retention Schedule</li>
      </ul>
      <h3>Complete IEEE Compliance Training within First 60 days</h3>
      <ul>
        <li>See who is required to take the compliance training</li>
        <li>Access IEEE Compliance Training</li>
        <li>Complete & Submit Conflict of Interest (COI) Form</li>
      </ul>
    `,
    keyAdmin: `
      <h3>Familiarize with the Tools you'll need</h3>
      <ul>
        <li>IEEE vTools</li>
        <li>IEEE OU Analytics</li>
      </ul>
      <h3>Meet with your Executive Committee (ExComm)</h3>
      <ul>
        <li>Section Executive Committee</li>
        <li>Know Your Section Committees</li>
      </ul>
      <h3>Manage Section Funds</h3>
      <ul>
        <li>Important Information for IEEE Treasurer</li>
        <li>Identify Cost Accounts for each Expense Type - IEEE Chart of Accounts</li>
        <li>Learn to complete an Expense Report with receipts</li>
        <li>Identify Funding Sources (e.g., Rebate, Professional Activities Committees for Engineers PACE (USA), Region, Young Professionals, etc)</li>
        <li>Learn how to use Section funds</li>
        <li>Learn to Report monetary prizes using 1099 Forms</li>
        <li>Coordinate activities among Student Branches, Chapter, Affinity Groups, and Committees</li>
      </ul>
    `,
    yearly: `
      <h3>Review Reports</h3>
      <ul>
        <li>QUARTERLY - Balance Books for Audit purposes</li>
        <li>Review Financial Reports & Budget</li>
      </ul>
      <h3>Complete & Submit MGA required Compliance Reporting</h3>
      <ul>
        <li>Review deadlines and bonuses</li>
        <li>MGA Financial Reporting</li>
      </ul>
      <h3>Complete Transition with Prior Treasurer</h3>
      <ul>
        <li>Review Financial Report from Prior year</li>
        <li>Change account access -- remove prior treasurer, add new treasurer</li>
        <li>Transfer/collect all checks, past documentation, and outstanding invoices</li>
      </ul>
      <h3>Develop Succession Plan</h3>
    `
  },
  {
    title: 'Membership Development Chair',
    description: 'Focuses on recruiting and retaining section members.',
    keywords: 'membership, recruitment, retention, growth, members',
    first30Days: '<p>Review membership development strategies and current member statistics.</p>',
    keyAdmin: '<p>Coordinate recruitment campaigns and member engagement activities.</p>',
    yearly: '<p>Analyze membership trends and develop annual recruitment plans.</p>'
  },
  {
    title: 'Educational Activities Chair',
    description: 'Organizes educational programs and activities for section members.',
    keywords: 'education, learning, training, courses, workshops',
    first30Days: '<p>Review current educational programs and identify opportunities for new initiatives.</p>',
    keyAdmin: '<p>Coordinate workshops, seminars, and continuing education programs.</p>',
    yearly: '<p>Develop annual educational calendar and assess program effectiveness.</p>'
  },
  {
    title: 'Professional Activities Chair',
    description: 'Coordinates professional development activities and networking events.',
    keywords: 'professional, development, career, networking, activities',
    first30Days: '<p>Understand professional development needs of section members.</p>',
    keyAdmin: '<p>Organize networking events, career development workshops, and industry connections.</p>',
    yearly: '<p>Plan annual professional development calendar and evaluate program impact.</p>'
  },
  {
    title: 'Student Activities Chair',
    description: 'Manages programs and activities for student members.',
    keywords: 'student, activities, university, college, youth',
    first30Days: '<p>Connect with student branches and understand their needs.</p>',
    keyAdmin: '<p>Coordinate student competitions, projects, and engagement activities.</p>',
    yearly: '<p>Develop annual student activity plan and support student branch growth.</p>'
  },
  {
    title: 'Student Representative',
    description: 'Represents student interests and perspectives in section leadership.',
    keywords: 'student, representative, voice, advocate',
    first30Days: '<p>Understand role as student voice in section leadership.</p>',
    keyAdmin: '<p>Advocate for student needs and facilitate communication between students and section leadership.</p>',
    yearly: '<p>Report on student activities and contribute to section planning.</p>'
  },
  {
    title: 'Awards & Recognition Chair',
    description: 'Manages section awards programs and member recognition.',
    keywords: 'awards, recognition, honors, achievements, prizes',
    first30Days: '<p>Review existing awards programs and recognition criteria.</p>',
    keyAdmin: '<p>Manage nomination and selection processes for section awards.</p>',
    yearly: '<p>Plan annual awards ceremony and develop new recognition programs.</p>'
  },
  {
    title: 'Industry Relations Chair',
    description: 'Develops relationships with industry partners and sponsors.',
    keywords: 'industry, corporate, business, sponsors, partnerships',
    first30Days: '<p>Identify key industry contacts and potential partnership opportunities.</p>',
    keyAdmin: '<p>Cultivate relationships with corporate partners and manage sponsorship programs.</p>',
    yearly: '<p>Develop annual industry engagement strategy and evaluate partnership effectiveness.</p>'
  },
  {
    title: 'Nominations & Appointments Chair',
    description: 'Manages the nomination and election process for section officers.',
    keywords: 'nominations, appointments, elections, voting, officers',
    first30Days: '<p>Understand election timeline and nomination requirements.</p>',
    keyAdmin: '<p>Coordinate nomination process and manage elections using vTools.</p>',
    yearly: '<p>Execute annual election cycle and ensure smooth officer transitions.</p>'
  },
  {
    title: 'Women In Engineering (WIE) Affinity Group',
    description: 'Leads initiatives to support and promote women in engineering.',
    keywords: 'women, WIE, diversity, inclusion, female, gender',
    first30Days: '<p>Connect with WIE members and understand group priorities.</p>',
    keyAdmin: '<p>Organize programs supporting women in engineering and STEM fields.</p>',
    yearly: '<p>Develop annual WIE program calendar and grow group membership.</p>'
  },
  {
    title: 'Young Professionals (YP) Affinity Group',
    description: 'Organizes activities for young professionals in their early careers.',
    keywords: 'young, professionals, YP, early career, millennials',
    first30Days: '<p>Engage with young professional members and identify their needs.</p>',
    keyAdmin: '<p>Coordinate networking events and career development programs for young professionals.</p>',
    yearly: '<p>Plan annual YP activities and expand group reach.</p>'
  },
  {
    title: 'Life Members (LM) Affinity Group',
    description: 'Engages life members and leverages their experience.',
    keywords: 'life, members, LM, senior, experienced, retired',
    first30Days: '<p>Connect with life members and understand their interests.</p>',
    keyAdmin: '<p>Organize activities for life members and create mentorship opportunities.</p>',
    yearly: '<p>Develop annual LM program and facilitate knowledge sharing.</p>'
  },
  {
    title: 'Consultants Network (CN) Affinity Group',
    description: 'Supports consultants and independent professionals.',
    keywords: 'consultants, CN, independent, freelance, contractors',
    first30Days: '<p>Identify consultant members and understand their professional needs.</p>',
    keyAdmin: '<p>Facilitate networking and business development opportunities for consultants.</p>',
    yearly: '<p>Plan annual CN activities and grow consultant community.</p>'
  }
];
