/* Central source of truth for the 6-semester academic structure */
const SemestersConfig = [
    {
        id: 'sem_1',
        name: 'Semester 1',
        subtitle: 'Foundation Year - Part 1',
        color: '#4f8ef7',
        isUnlocked: true,
        subjects: [
            { id: 'MA101', name: 'Engineering Mathematics I', code: 'MA101', credits: 4, icon: 'M1' },
            { id: 'PH101', name: 'Engineering Physics', code: 'PH101', credits: 4, icon: 'PHY' },
            { id: 'CH101', name: 'Engineering Chemistry', code: 'CH101', credits: 3, icon: 'CHEM' },
            { id: 'EG101', name: 'Engineering Graphics', code: 'EG101', credits: 2, icon: 'EG' },
            { id: 'CS101', name: 'Communication Skills', code: 'CS101', credits: 2, icon: 'COM' }
        ]
    },
    {
        id: 'sem_2',
        name: 'Semester 2',
        subtitle: 'Foundation Year - Part 2',
        color: '#00b8a9',
        isUnlocked: true,
        subjects: [
            { id: 'MA102', name: 'Engineering Mathematics II', code: 'MA102', credits: 4, icon: 'M2' },
            { id: 'ME101', name: 'Engineering Mechanics', code: 'ME101', credits: 4, icon: 'MECH' },
            { id: 'EE101', name: 'Basic Electrical Engineering', code: 'EE101', credits: 4, icon: 'EE' },
            { id: 'WD', name: 'Web Designing', code: 'WD', credits: 3, icon: 'WD' },
            { id: 'EC101', name: 'Basic Electronics', code: 'EC101', credits: 3, icon: 'EC' },
            { id: 'CS102', name: 'Programming Fundamentals (C)', code: 'CS102', credits: 4, icon: 'C' },
            { id: 'LIN101', name: 'Linux Basics', code: 'LIN101', credits: 2, icon: 'LIN' },
            { id: 'PCO101', name: 'Professional Communication', code: 'PCO101', credits: 2, icon: 'PCO' },
            { id: 'ES101', name: 'Environmental Science', code: 'ES101', credits: 2, icon: 'ENV' },
            { id: 'WP101', name: 'Workshop Practice', code: 'WP101', credits: 2, icon: 'WP' }
        ]
    },
    {
        id: 'sem_3',
        name: 'Semester 3',
        subtitle: 'Core Engineering - Part 1',
        color: '#9b59b6',
        isUnlocked: false,
        subjects: [
            { id: 'CS201', name: 'Data Structures & Algorithms', code: 'CS201', credits: 4, icon: 'DSA' },
            { id: 'EC201', name: 'Digital Electronics', code: 'EC201', credits: 4, icon: 'DE' },
            { id: 'MA201', name: 'Discrete Mathematics', code: 'MA201', credits: 3, icon: 'DM' },
            { id: 'CS202', name: 'Object Oriented Programming (Java)', code: 'CS202', credits: 4, icon: 'JAVA' },
            { id: 'CS203', name: 'Computer Organization & Architecture', code: 'CS203', credits: 3, icon: 'COA' },
            { id: 'HS201', name: 'Economics', code: 'HS201', credits: 2, icon: 'ECO' }
        ]
    },
    {
        id: 'sem_4',
        name: 'Semester 4',
        subtitle: 'Core Engineering - Part 2',
        color: '#e67e22',
        isUnlocked: false,
        subjects: [
            { id: 'CS204', name: 'Analysis of Algorithms', code: 'CS204', credits: 4, icon: 'AA' },
            { id: 'CS205', name: 'Operating Systems', code: 'CS205', credits: 4, icon: 'OS' },
            { id: 'CS206', name: 'Database Management Systems', code: 'CS206', credits: 4, icon: 'DBMS' },
            { id: 'CS207', name: 'Computer Networks', code: 'CS207', credits: 3, icon: 'CN' },
            { id: 'CS208', name: 'Theory of Computation', code: 'CS208', credits: 3, icon: 'TOC' },
            { id: 'CS209', name: 'Software Engineering', code: 'CS209', credits: 3, icon: 'SE' }
        ]
    },
    {
        id: 'sem_5',
        name: 'Semester 5',
        subtitle: 'Advanced Topics',
        color: '#e91e8c',
        isUnlocked: false,
        subjects: [
            { id: 'CS301', name: 'Web Technologies', code: 'CS301', credits: 4, icon: 'WEB' },
            { id: 'CS302', name: 'Artificial Intelligence', code: 'CS302', credits: 4, icon: 'AI' },
            { id: 'CS303', name: 'Machine Learning', code: 'CS303', credits: 3, icon: 'ML' },
            { id: 'CS304', name: 'Cloud Computing', code: 'CS304', credits: 3, icon: 'CLOUD' },
            { id: 'CS305', name: 'Information Security', code: 'CS305', credits: 3, icon: 'SEC' },
            { id: 'ELEC1', name: 'Elective I', code: 'ELEC1', credits: 3, icon: 'EL1' }
        ]
    },
    {
        id: 'sem_6',
        name: 'Semester 6',
        subtitle: 'Specialization & Project',
        color: '#f1c40f',
        isUnlocked: false,
        subjects: [
            { id: 'CS306', name: 'Deep Learning', code: 'CS306', credits: 4, icon: 'DL' },
            { id: 'CS307', name: 'Big Data Analytics', code: 'CS307', credits: 4, icon: 'BDA' },
            { id: 'CS308', name: 'Distributed Systems', code: 'CS308', credits: 3, icon: 'DS' },
            { id: 'HS301', name: 'Project Management', code: 'HS301', credits: 2, icon: 'PM' },
            { id: 'ELEC2', name: 'Elective II', code: 'ELEC2', credits: 3, icon: 'EL2' },
            { id: 'PROJ1', name: 'Major Project', code: 'PROJ1', credits: 6, icon: 'PROJ' }
        ]
    }
];

window.SemestersConfig = SemestersConfig;
