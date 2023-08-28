export enum StorageKey {
  TASK = 'tasks',
}

export enum StatusEnum {
  ACTIVE,
  COMPLETED,
}

export interface TaskInterface {
  id: string;
  title: string;
  status: StatusEnum;
}
