export interface SkillsList {
    id: string;
    title: string;
}

export interface Experiences {
    id: string;
    title: string;
    from: string;
    to: string;
    description: string;
}

export interface Qualification {
    id: string;
    title: string;
}

export interface Resume {
    skillsList?: SkillsList[];
    experiences?: Experiences[];
    gCSEpassess?: number;
    academicQualification?: Qualification[];
    professionalQualification?: Qualification[];
}
