import Group, { GroupInput, GroupOutput } from '../models/Group.js';

class GroupService {
  static getAll(): Promise<GroupOutput[]> {
    return Group.findAll();
  }

  static getById(id: string): Promise<Group | null> {
    return Group.findByPk(id);
  }

  static create(groupPayload: GroupInput): Promise<Group> {
    const newUser = Group.create(groupPayload);
    return newUser;
  }

  static async update(updatedGroupPaylaod: Partial<GroupInput>): Promise<void> {
    const groupId = updatedGroupPaylaod.id;
    const selectedGroup = await Group.findByPk(groupId);
    if (!selectedGroup) {
      throw new Error('Group not found');
    }

    const updatedGroup = await selectedGroup.update(updatedGroupPaylaod, {
      where: {
        id: groupId,
      },
    });
  }

  static delete = async (id: string): Promise<void> => {
    const deleteduser = await Group.destroy({
      where: {
        id: id,
      },
    });
  };
}

export default GroupService;
