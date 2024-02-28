type SkillName =
  | 'Strength'
  | 'Attack'
  | 'Hitpoints'
  | 'Mining'
  | 'Smithing'
  | 'Fishing'
  | 'Cooking'
  | 'Firemaking'
  | 'Woodcutting'
  | 'Crafting'
  | 'Magic'
  | 'Fletching'
  | 'Ranged'
  | 'Prayer'
  | 'Herblore'
  | 'Agility'
  | 'Thieving'
  | 'Slayer'
  | 'Farming'
  | 'Runecrafting'
  | 'Hunter'
  | 'Construction';

interface Skill {
  exp: number;
  level: number;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  skills: { [key in SkillName]: Skill };
}

export const skills = [
  'Strength',
  'Attack',
  'Hitpoints',
  'Mining',
  'Smithing',
  'Fishing',
  'Cooking',
  'Firemaking',
  'Woodcutting',
  'Crafting',
  'Magic',
  'Fletching',
  'Ranged',
  'Prayer',
  'Herblore',
  'Agility',
  'Thieving',
  'Slayer',
  'Farming',
  'Runecrafting',
  'Hunter',
  'Construction',
] as const;
