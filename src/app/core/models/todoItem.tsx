export enum StorageKey {
  TASK = 'tasks',
}

export enum StatusEnum {
  ACTIVE,
  COMPLETED,
}

export enum Tab {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export interface TaskProps {
  id: string;
  title: string;
  status: StatusEnum;
}
