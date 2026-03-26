export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    profession?: string;
    company?: string;
}

export interface CategoryCardProps {
  category: Category;
}

export interface CourseCardProps {
    course: Course;
    variant?: "default" | "compact";
}

export interface Course {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    category: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    totalLessons: number;
    totalStudents: number;
    rating: number;
    price: number;
    instructor: Instructor;
    tags: string[];
    isBestseller?: boolean;
    isFree?: boolean;
}

export interface Instructor {
    id: string;
    name: string;
    avatar: string;
    title: string;
    bio?: string;
    rating?: number;
    totalStudents?: number;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string;
    image: string;
    totalCourses: number;
    totalStudents: number;
    totalTopics: number;
    rating: number;
    description?: string;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo?: string;
    location: string;
    type: "Full-Time" | "Part-Time" | "Remote" | "Hybrid" | "Internship";
    salary: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    postedAt: string;
    deadline: string;
    skills: string[];
}

export interface Post {
    id: string;
    title: string;
    content: string;
    author: User;
    category: string;
    tags: string[];
    likes: number;
    comments: number;
    views: number;
    image?: string;
    createdAt: string;
    isLiked?: boolean;
}

export interface Comment {
    id: string;
    content: string;
    author: User;
    createdAt: string;
    likes: number;
}

export interface SkillQuestion {
    id: string;
    text: string;
    category: string;
}

export interface SkillResult {
    category: string;
    score: number;
    label: string;
    color: string;
}

export interface CareerRecommendation {
    title: string;
    match: number;
    courses: Course[];
}

export interface WorkExperience {
    id: string;
    company: string;
    position: string;
    type: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    major: string;
    startYear: number;
    endYear?: number;
}

export interface Portfolio {
    id: string;
    title: string;
    url: string;
    platform: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export interface InputGroupProps {
  label: string;
  value: string;
  type?: string;
  isWhite?: boolean;
}
