export type Post = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  draft: boolean;
  tags: string[]
}

export type TagUnique = {
  tag: string;
  frequency: number;
}

export type SidebarContextType = {
  isMobile: boolean;
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
};


