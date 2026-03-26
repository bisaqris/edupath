import { Category, Course, Job, Post } from "@/types";

export const navLinks = [
    { href: "/", label: "Home" },
    { href: "/e-learning", label: "E-Learning" },
    { href: "/analisis-skill", label: "Analisis Skill" },
    { href: "/info-loker", label: "Info Loker" },
    { href: "/komunitas", label: "Komunitas" },
];

export const quickLinks = [
    { label: "Home", href: "/" },
    { label: "E-Learning", href: "/e-learning" },
    { label: "Analisis Skill", href: "/analisis-skill" },
    { label: "Info Loker", href: "/info-loker" },
    { label: "Komunitas", href: "/komunitas" },
];

export const edupathLinks = [
    "Tentang Kami",
    "Karir",
    "Kerja Sama",
    "Open Recruitment",
    "Komunitas",
];

export const lainnyaLinks = [
    "FAQ",
    "Syarat & Ketentuan",
    "Ketentuan Privasi",
];

export const programs = [
    {
        title: "E-Learning",
        desc: "Selamat datang di program E-Learning EduPact, tempat Anda dapat mengakses berbagai kursus berkualitas tinggi secara fleksibel dan mandiri. Nikmati materi pembelajaran interaktif, video tutorial menarik, dan modul komprehensif yang dirancang oleh para ahli di bidangnya. Belajar kapan saja, di mana saja, sesuai dengan ritme Anda sendiri untuk mengembangkan keterampilan baru atau memperdalam pengetahuan yang sudah ada. Bersama kami, transformasi pendidikan menjadi lebih mudah dijangkau dan efektif untuk masa depan Anda.",
    },
    {
        title: "Analisis Skill",
        desc: "Kenali potensi dan kompetensi Anda secara lebih mendalam melalui program Analisis Skill dari EduPact. Kami menyediakan alat evaluasi yang akurat untuk membantu Anda mengidentifikasi kekuatan serta area yang perlu ditingkatkan. Dapatkan laporan hasil analisis yang detail, lengkap dengan rekomendasi jalur pembelajaran dan pengembangan karir yang dipersonalisasi. Manfaatkan wawasan ini untuk mengambil langkah strategis dalam perjalanan profesional dan pendidikan Anda ke tingkat selanjutnya.",
    },
];

export const whyItems = [
    {
        label: "Kurikulum Standar Industri Global",
        detail: "Materi disusun bersama para ahli dari tech company ternama, memastikan kurikulum yang Anda pelajari selalu relevan dengan kebutuhan pasar kerja global saat ini."
    },
    {
        label: "Waktu Belajar yang Flexible",
        detail: "Akses materi kapan saja dan di mana saja tanpa batasan waktu. Cocok bagi Anda yang ingin belajar mandiri dengan ritme yang bisa disesuaikan dengan kesibukan harian."
    },
    {
        label: "Analisis Skill yang Lebih Akurat",
        detail: "Gunakan fitur AI-Assessment kami untuk mengukur kompetensi Anda secara objektif, sehingga Anda tahu persis bagian mana yang perlu ditingkatkan untuk mencapai target karir."
    },
    {
        label: "Langsung Apply ke Industri",
        detail: "Setelah menyelesaikan kursus dan sertifikasi, portofolio Anda akan langsung terhubung ke mitra perusahaan kami untuk mempercepat proses rekrutmen Anda."
    },
    {
        label: "Alumni Terpercaya di Berbagai Perusahaan",
        detail: "Lulusan Edupath telah bekerja di berbagai startup unicorn hingga perusahaan Fortune 500, membuktikan kualitas pendidikan kami diakui oleh para rekruter profesional."
    },
];

export const categories: Category[] = [
    {
        id: "1",
        name: "Web Development",
        slug: "web-development",
        icon: "💻",
        image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400",
        totalCourses: 152,
        totalStudents: 10237,
        totalTopics: 12,
        rating: 4.85,
        description: "Kuasai teknologi web modern"
    },
    {
        id: "2",
        name: "Data Scientist",
        slug: "data-scientist",
        icon: "📊",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
        totalCourses: 84,
        totalStudents: 5432,
        totalTopics: 8,
        rating: 4.75,
        description: "Analisis data dengan machine learning"
    },
    {
        id: "3",
        name: "Cyber Security",
        slug: "cyber-security",
        icon: "🔒",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400",
        totalCourses: 42,
        totalStudents: 3210,
        totalTopics: 6,
        rating: 4.90,
        description: "Proteksi sistem dan jaringan"
    },
    {
        id: "4",
        name: "Network Engineer",
        slug: "network-engineer",
        icon: "🌐",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
        totalCourses: 65,
        totalStudents: 2150,
        totalTopics: 10,
        rating: 4.65,
        description: "Bangun infrastruktur jaringan"
    },
    {
        id: "5",
        name: "Full Stack Developer",
        slug: "full-stack-developer",
        icon: "⚡",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
        totalCourses: 110,
        totalStudents: 8900,
        totalTopics: 15,
        rating: 4.88,
        description: "Frontend + Backend mastery"
    },
    {
        id: "6",
        name: "Database Engineer",
        slug: "database-engineer",
        icon: "🗄️",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400",
        totalCourses: 38,
        totalStudents: 1800,
        totalTopics: 5,
        rating: 4.70,
        description: "Rancang & optimalkan database"
    },
    {
        id: "7",
        name: "Game Development",
        slug: "game-development",
        icon: "🎮",
        image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=400",
        totalCourses: 56,
        totalStudents: 4120,
        totalTopics: 9,
        rating: 4.82,
        description: "Ciptakan game yang memukau"
    },
    {
        id: "8",
        name: "Cloud Engineer",
        slug: "cloud-engineer",
        icon: "☁️",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
        totalCourses: 72,
        totalStudents: 3500,
        totalTopics: 11,
        rating: 4.78,
        description: "AWS, GCP, Azure deployment"
    },
    {
        id: "9",
        name: "Software Engineer",
        slug: "software-engineer",
        icon: "🔧",
        image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=400",
        totalCourses: 94,
        totalStudents: 6700,
        totalTopics: 14,
        rating: 4.80,
        description: "Engineering best practices"
    },
    {
        id: "10",
        name: "UI/UX Designer",
        slug: "uiux-designer",
        icon: "🎨",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
        totalCourses: 48,
        totalStudents: 12400,
        totalTopics: 7,
        rating: 4.92,
        description: "Design produk digital yang indah"
    },
    {
        id: "11",
        name: "Software Testing",
        slug: "software-testing",
        icon: "🧪",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400",
        totalCourses: 29,
        totalStudents: 950,
        totalTopics: 4,
        rating: 4.55,
        description: "QA dan testing otomatisasi"
    },
    {
        id: "12",
        name: "Ethical Hacking",
        slug: "ethical-hacking",
        icon: "🕵️",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
        totalCourses: 34,
        totalStudents: 2800,
        totalTopics: 5,
        rating: 4.87,
        description: "Penetration testing & exploit"
    },
];

export const featuredCourses: Course[] = [
    {
        id: "1",
        title: "Frontend Development Fundamental",
        slug: "frontend-development-fundamental",
        description: "Pelajari dasar-dasar pengembangan frontend dengan HTML, CSS, dan JavaScript modern.",
        thumbnail: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=600",
        category: "web-development",
        level: "Beginner",
        duration: "40 Jam",
        totalLessons: 80,
        totalStudents: 1250,
        rating: 4.8,
        price: 590000,
        instructor: { id: "i1", name: "Ali", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali", title: "Senior Frontend Dev", rating: 4.9, totalStudents: 3200 },
        tags: ["HTML", "CSS", "JavaScript"],
        isBestseller: true,
    },
    {
        id: "2",
        title: "Backend Development Fundamental",
        slug: "backend-development-fundamental",
        description: "Bangun API dan server-side application dengan Node.js, Express, dan database.",
        thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
        category: "web-development",
        level: "Intermediate",
        duration: "52 Jam",
        totalLessons: 95,
        totalStudents: 980,
        rating: 4.7,
        price: 690000,
        instructor: { id: "i2", name: "Budi Santoso", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi", title: "Backend Engineer", rating: 4.8, totalStudents: 2100 },
        tags: ["Node.js", "Express", "PostgreSQL"],
    },
    {
        id: "3",
        title: "Development Frontend with React",
        slug: "development-frontend-with-react",
        description: "Kuasai React ecosystem: hooks, state management, dan deployment.",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600",
        category: "web-development",
        level: "Intermediate",
        duration: "48 Jam",
        totalLessons: 88,
        totalStudents: 1540,
        rating: 4.9,
        price: 790000,
        instructor: { id: "i1", name: "Ali", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali", title: "Senior Frontend Dev", rating: 4.9, totalStudents: 3200 },
        tags: ["React", "Redux", "Next.js"],
        isBestseller: true,
    },
    {
        id: "4",
        title: "Backend Development with Node.js",
        slug: "backend-development-with-nodejs",
        description: "Deep dive ke Node.js untuk membangun aplikasi backend yang scalable.",
        thumbnail: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600",
        category: "web-development",
        level: "Advanced",
        duration: "60 Jam",
        totalLessons: 110,
        totalStudents: 720,
        rating: 4.8,
        price: 890000,
        instructor: { id: "i2", name: "Budi Santoso", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi", title: "Backend Engineer", rating: 4.8, totalStudents: 2100 },
        tags: ["Node.js", "TypeScript", "Docker"],
    },
    {
        id: "5",
        title: "Microservices with Golang",
        slug: "microservices-with-golang",
        description: "Arsitektur microservices modern menggunakan Go dan Docker.",
        thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600",
        category: "web-development",
        level: "Advanced",
        duration: "55 Jam",
        totalLessons: 92,
        totalStudents: 430,
        rating: 4.9,
        price: 990000,
        instructor: { id: "i3", name: "Dian Kusuma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dian", title: "Go Developer", rating: 4.9, totalStudents: 1500 },
        tags: ["Go", "Docker", "Kubernetes"],
    },
    {
        id: "6",
        title: "Database untuk Pengembang Backend",
        slug: "database-untuk-pengembang-backend",
        description: "PostgreSQL, MySQL, MongoDB - pilihan database untuk setiap kebutuhan.",
        thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600",
        category: "database-engineer",
        level: "Intermediate",
        duration: "35 Jam",
        totalLessons: 65,
        totalStudents: 890,
        rating: 4.6,
        price: 490000,
        instructor: { id: "i4", name: "Rina Wati", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina", title: "Database Admin", rating: 4.7, totalStudents: 1800 },
        tags: ["PostgreSQL", "MySQL", "MongoDB"],
    },
];

export const skillCategories = [
    {
        id: "ti",
        name: "Teknologi dan Informatika",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500",
        desc: "Uji kemampuan di bidang programming, web dev, data, dan infrastruktur IT."
    },
    {
        id: "bisnis",
        name: "Bisnis & Manajemen",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
        desc: "Evaluasi skill leadership, strategi bisnis, dan manajemen proyek."
    },
    {
        id: "desain",
        name: "Desain & Kreativitas",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500",
        desc: "Analisis kemampuan UI/UX, visual design, dan creative thinking."
    },
    {
        id: "data",
        name: "Data & Analitik",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500",
        desc: "Uji keahlian analisis data, statistik, dan machine learning."
    },
];

export const jobs: Job[] = [
    {
        id: "1",
        title: "Full-Stack Web Developer",
        company: "PT Teknologi Maju",
        location: "Jakarta, Indonesia",
        type: "Full-Time",
        salary: "Rp 8.000.000 - 15.000.000",
        description: "Kami mencari Full-Stack Developer yang berpengalaman untuk bergabung dengan tim kami.",
        requirements: ["Minimal 2 tahun pengalaman", "Menguasai React dan Node.js", "Familiar dengan PostgreSQL", "Komunikasi yang baik"],
        responsibilities: ["Develop dan maintain web applications", "Collaborate dengan tim designer", "Code review dan mentoring junior dev", "Optimize performance aplikasi"],
        postedAt: "2025-01-15",
        deadline: "2025-02-15",
        skills: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    },
    {
        id: "2",
        title: "Front-End Developer",
        company: "Startup Digital",
        location: "Remote",
        type: "Remote",
        salary: "Rp 6.000.000 - 10.000.000",
        description: "Bergabunglah dengan startup kami untuk membangun produk digital yang inovatif.",
        requirements: ["1+ tahun pengalaman", "React/Next.js expertise", "Tailwind CSS", "Problem solving"],
        responsibilities: ["Build responsive UI", "Integrate dengan REST API", "Performance optimization", "Unit testing"],
        postedAt: "2025-01-18",
        deadline: "2025-02-20",
        skills: ["React", "Next.js", "Tailwind", "REST API"],
    },
    {
        id: "3",
        title: "Back-End Developer",
        company: "Fintech Corp",
        location: "Bandung, Indonesia",
        type: "Hybrid",
        salary: "Rp 10.000.000 - 18.000.000",
        description: "Membangun sistem backend yang robust untuk platform fintech kami.",
        requirements: ["3+ tahun pengalaman", "Go/Node.js", "Microservices", "Docker & K8s"],
        responsibilities: ["Design system architecture", "Build scalable APIs", "Database optimization", "Security implementation"],
        postedAt: "2025-01-20",
        deadline: "2025-02-28",
        skills: ["Go", "Node.js", "Docker", "Kubernetes"],
    },
    {
        id: "4",
        title: "Data Science",
        company: "Analytics Pro",
        location: "Jakarta, Indonesia",
        type: "Full-Time",
        salary: "Rp 12.000.000 - 20.000.000",
        description: "Analisis data besar dan bangun model machine learning untuk bisnis.",
        requirements: ["Python expertise", "ML/DL frameworks", "SQL advanced", "Statistics background"],
        responsibilities: ["Data analysis & visualization", "Build ML models", "A/B testing", "Report to stakeholders"],
        postedAt: "2025-01-22",
        deadline: "2025-03-01",
        skills: ["Python", "TensorFlow", "SQL", "Tableau"],
    },
    {
        id: "5",
        title: "Data Analyst",
        company: "E-Commerce Giant",
        location: "Surabaya, Indonesia",
        type: "Full-Time",
        salary: "Rp 7.000.000 - 12.000.000",
        description: "Analisis data transaksi untuk insight bisnis yang berharga.",
        requirements: ["SQL advance", "Excel/Sheets expert", "Tableau/Power BI", "Business acumen"],
        responsibilities: ["Data cleaning & analysis", "Create dashboards", "Business reporting", "Trend analysis"],
        postedAt: "2025-01-25",
        deadline: "2025-02-25",
        skills: ["SQL", "Python", "Power BI", "Excel"],
    },
];

export const posts: Post[] = [
    {
        id: "1",
        title: "Google V8 2026: A Simple Guide to the Big Announcements",
        content: `JavaScript engine terbaru dari Google membawa banyak perubahan signifikan. V8 2026 hadir dengan optimasi performa yang drastis, terutama untuk aplikasi web yang berat...`,
        author: { id: "u1", name: "Alex Kumara", email: "alex@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
        category: "Frontend",
        tags: ["JavaScript", "V8", "Performance"],
        likes: 245,
        comments: 32,
        views: 1840,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600",
        createdAt: "2025-01-20",
    },
    {
        id: "2",
        title: "Breaking Bottlenecks: How Organizations Build Systems of Balanced Connectivity",
        content: `Dalam era microservices dan distributed systems, bottleneck menjadi tantangan utama. Artikel ini membahas strategi efektif untuk membangun sistem yang balanced...`,
        author: { id: "u2", name: "Sari Dewi", email: "sari@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sari" },
        category: "Backend",
        tags: ["Architecture", "Performance", "Microservices"],
        likes: 189,
        comments: 28,
        views: 2100,
        createdAt: "2025-01-19",
    },
    {
        id: "3",
        title: "Statistics by Time Window — From SQL to SPL #31",
        content: `Analisis time-series data sering kali membutuhkan teknik khusus. Dalam artikel ini, kita akan menjelajahi bagaimana menggunakan window functions di SQL dan SPL...`,
        author: { id: "u3", name: "Mr. Komuniti", email: "komuniti@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Komuniti" },
        category: "Data Scientist",
        tags: ["SQL", "Statistics", "Data Analysis"],
        likes: 312,
        comments: 45,
        views: 3200,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
        createdAt: "2025-01-18",
    },
    {
        id: "4",
        title: "How I Set Up SafeLink WAF in 3 Minutes and Blocked Real Attacks",
        content: `Web Application Firewall bukan lagi luxury, tapi necessity. Panduan setup cepat yang memproteksi aplikasi Anda dari serangan umum dalam hitungan menit...`,
        author: { id: "u4", name: "Rizky Pratama", email: "rizky@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rizky" },
        category: "Cyber Security",
        tags: ["Security", "WAF", "DevOps"],
        likes: 428,
        comments: 67,
        views: 4100,
        createdAt: "2025-01-17",
    },
    {
        id: "5",
        title: "Rethinking API Versioning: Why Full Semantic Increasing Might Be an Anti-Pattern for Your API",
        content: `Semantic versioning sudah menjadi standar de facto, tapi apakah selalu tepat untuk API? Mari kita tinjau ulang pendekatan versioning yang lebih pragmatis...`,
        author: { id: "u5", name: "Fajar Nugroho", email: "fajar@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fajar" },
        category: "Full Stack Developer",
        tags: ["API", "Best Practices", "Architecture"],
        likes: 267,
        comments: 41,
        views: 2800,
        createdAt: "2025-01-16",
    },
];

export const coursesByCategory: Record<string, Course[]> = {
    "web-development": [
        {
            id: "wb-1", title: "Frontend Development Fundamental", slug: "frontend-development-fundamental",
            description: "Kuasai HTML, CSS, dan JavaScript untuk membangun antarmuka website yang dilihat dan digunakan pengguna.",
            thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600",
            category: "web-development", level: "Beginner", duration: "40 Jam", totalLessons: 80, totalStudents: 1250, rating: 4.8, price: 590000,
            instructor: { id: "i1", name: "Ali", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali", title: "Senior Frontend Dev", rating: 4.9, totalStudents: 3200 },
            tags: ["HTML", "CSS", "JavaScript"], isBestseller: true,
        },
        {
            id: "wb-2", title: "Backend Development Fundamental", slug: "backend-development-fundamental",
            description: "Pelajari konsep inti server database, dan arsitektur aplikasi untuk memahami cara kerja backend sebuah website atau aplikasi.",
            thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600",
            category: "web-development", level: "Intermediate", duration: "52 Jam", totalLessons: 95, totalStudents: 980, rating: 4.7, price: 690000,
            instructor: { id: "i2", name: "Budi Santoso", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi", title: "Backend Engineer", rating: 4.8, totalStudents: 2100 },
            tags: ["Node.js", "Express", "PostgreSQL"],
        },
        {
            id: "wb-3", title: "Development Frontend with React", slug: "development-frontend-with-react",
            description: "Pengenalan dasar-dasar frontend dalam pembuatan website, seperti HTML, CSS dan JavaScript.",
            thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600",
            category: "web-development", level: "Intermediate", duration: "48 Jam", totalLessons: 88, totalStudents: 1540, rating: 4.9, price: 790000,
            instructor: { id: "i1", name: "Ali", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali", title: "Senior Frontend Dev", rating: 4.9, totalStudents: 3200 },
            tags: ["React", "Redux", "Next.js"], isBestseller: true,
        },
        {
            id: "wb-4", title: "Backend Development with NodeJS", slug: "backend-development-with-nodejs",
            description: "Kuasai pembuatan aplikasi backend yang cepat dan scalable menggunakan runtime JavaScript Node.JS dan ekosistem Express.js.",
            thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
            category: "web-development", level: "Advanced", duration: "60 Jam", totalLessons: 110, totalStudents: 720, rating: 4.8, price: 890000,
            instructor: { id: "i2", name: "Budi Santoso", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi", title: "Backend Engineer", rating: 4.8, totalStudents: 2100 },
            tags: ["Node.js", "TypeScript", "Docker"],
        },
        {
            id: "wb-5", title: "Microservices with Golang", slug: "microservices-with-golang",
            description: "Bangun layanan backend independen dan efisien menggunakan bahasa Golang dengan pendekatan arsitektur microservices.",
            thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600",
            category: "web-development", level: "Advanced", duration: "55 Jam", totalLessons: 92, totalStudents: 430, rating: 4.9, price: 990000,
            instructor: { id: "i3", name: "Dian Kusuma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dian", title: "Go Developer", rating: 4.9, totalStudents: 1500 },
            tags: ["Go", "Docker", "Kubernetes"],
        },
        {
            id: "wb-6", title: "Keamanan Aplikasi Web Backend", slug: "keamanan-aplikasi-web-backend",
            description: "Pelajari cara mengamankan aplikasi backend dan ancaman siber dengan validasi, otentikasi, dan praktik keamanan terbaik.",
            thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600",
            category: "web-development", level: "Intermediate", duration: "38 Jam", totalLessons: 72, totalStudents: 610, rating: 4.7, price: 750000,
            instructor: { id: "i5", name: "Rizky S", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rizky", title: "Security Engineer", rating: 4.8, totalStudents: 1200 },
            tags: ["Security", "Authentication", "JWT"],
        },
        {
            id: "wb-7", title: "Database untuk Pengembang Backend", slug: "database-untuk-pengembang-backend",
            description: "Pahami peran database (SQL & NoSQL) dalam backend, mulai dari perancangan skema hingga melakukan query data secara efektif.",
            thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600",
            category: "web-development", level: "Intermediate", duration: "35 Jam", totalLessons: 65, totalStudents: 890, rating: 4.6, price: 490000,
            instructor: { id: "i4", name: "Rina Wati", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina", title: "Database Admin", rating: 4.7, totalStudents: 1800 },
            tags: ["PostgreSQL", "MySQL", "MongoDB"],
        },
        {
            id: "wb-8", title: "Membangun API RESTful untuk website", slug: "membangun-api-restful-untuk-website",
            description: "Rancang dan implementasikan API RESTful sebagai standar industri untuk komunikasi antar layanan web yang aman dan mudah digunakan.",
            thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
            category: "web-development", level: "Intermediate", duration: "42 Jam", totalLessons: 78, totalStudents: 1100, rating: 4.8, price: 650000,
            instructor: { id: "i2", name: "Budi Santoso", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi", title: "Backend Engineer", rating: 4.8, totalStudents: 2100 },
            tags: ["REST API", "Express", "Postman"],
        },
    ],
};

export const communityCategories = [
    "Frontend", "Backend", "Full Stack Developer", "Data Scientist", "GPT", "Web Developer", "Game Developer", "DATABASE ARCHITECT",
];

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
};

export const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
};

export const getRelativeTime = (date: string): string => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} hari lalu`;
    const weeks = Math.floor(days / 7);
    return `${weeks} minggu lalu`;
};

export const getCoursesByCategory = (slug: string): Course[] => {
    return coursesByCategory[slug] ?? featuredCourses.slice(0, 8);
};