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

export interface TaskInterface {
  id: string;
  title: string;
  status: StatusEnum;
}
