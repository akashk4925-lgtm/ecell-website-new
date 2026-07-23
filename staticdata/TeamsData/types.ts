export interface TeamPresident {
  name: string;
  image: string;
  post: string;
  email: string;
  linkedin: string;
  twitter?: string;
}

export interface TeamVerticalHead {
  name: string;
  image: string;
  position: string;
  email: string;
  linkedin: string;
  twitter?: string;
}

export interface TeamData {
  year: string;
  session: string;
  presidents: TeamPresident[];
  verticalHeads: TeamVerticalHead[];
}
