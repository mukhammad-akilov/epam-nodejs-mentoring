import Group, { GroupInput, GroupOutput } from '../models/Group.js';
import GroupService from '../services/group.js';

export const getAll = (): Promise<GroupOutput[]> => {
  return GroupService.getAll();
};

export const getById = (id: string): Promise<Group | null> => {
  return GroupService.getById(id);
};

export const create = (userPayload: GroupInput): Promise<Group> => {
  const newUser = GroupService.create(userPayload);
  return newUser;
};

export const update = (updatedGroupPaylaod: Partial<GroupInput>): void => {
  GroupService.update(updatedGroupPaylaod);
};

export const remove = (id: string): void => {
  GroupService.delete(id);
};
