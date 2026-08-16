import {
    FlaskConical, Banknote, Users, HeartPulse, Car, Plane, Building2,
    TrendingUp, Briefcase, PieChart, Layers, Tv, BarChart3, LineChart,
    Cpu, Globe, Zap, Brain, Rocket, Code2, Cloud, Terminal, Search,
    Target, Code, Library, BookOpen, GraduationCap, Binary, Sigma, Award,
    type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
    FlaskConical, Banknote, Users, HeartPulse, Car, Plane, Building2,
    TrendingUp, Briefcase, PieChart, Layers, Tv, BarChart3, LineChart,
    Cpu, Globe, Zap, Brain, Rocket, Code2, Cloud, Terminal, Search,
    Target, Code, Library, BookOpen, GraduationCap, Binary, Sigma, Award,
};

export const Icon = ({ name, className }: { name: string; className?: string }) => {
    const Cmp = ICONS[name] ?? Code2;
    return <Cmp className={className} />;
};
