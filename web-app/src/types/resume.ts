export interface Sector {
    id: string;
    title: string;
}

export interface Skill {
    id: string;
    title: string;
}

export interface Designation {
    id: string;
    title: string;
}
export interface Experience {
    id: string;
    designation: Designation;
    from: string;
    to: string;
    description: string;
}

export interface Qualification {
    id: string;
    title: string;
    typeId: string;
}

export interface Profile {
    firstname?: string;
    lastName?: string;
    contactNumber?: string;
    address?: string;
 }
export interface Resume {
    profile?: Profile;
    sector?: Sector;
    gCSEpassess?: number;
    skillsList?: Skill[];
    experiences?: Experience[];
    academicQualification?: Qualification[];
    professionalQualification?: Qualification[];
}
