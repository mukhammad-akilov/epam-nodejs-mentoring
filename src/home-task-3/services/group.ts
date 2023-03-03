import Group, { GroupInput, GroupOutput } from '../models/Group.js';
import { methodExucutionTimestamps } from '../decorators/index.js';
class GroupService {
  @methodExucutionTimestamps()
  static getAll(): Promise<GroupOutput[]> {
    return Group.findAll();
  }

  @methodExucutionTimestamps()
  static getById(id: string): Promise<Group | null> {
    return Group.findByPk(id);
  }

  @methodExucutionTimestamps()
  static create(groupPayload: GroupInput): Promise<Group> {
    const newUser = Group.create(groupPayload);
    return newUser;
  }

  @methodExucutionTimestamps()
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

  @methodExucutionTimestamps()
  static async delete(id: string): Promise<void> {
    const deleteduser = await Group.destroy({
      where: {
        id: id,
      },
    });
  }
}

export default GroupService;
