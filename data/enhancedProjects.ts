import { Project } from '@/types/projects';
import projectsData from './projects.json';

// Load projects from JSON with type safety
export const enhancedProjects: Project[] = projectsData.projects as Project[];