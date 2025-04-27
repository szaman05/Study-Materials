export interface MenuItem {
  title: string;
  icon?: string;
  path?: string;
  badge?: {
    text: string;
    variant?: 'primary' | 'secondary';
  };
  children?: MenuItem[];
  isExternal?: boolean;
}

export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
}
