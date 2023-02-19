import User from '../models/User.js';
import Group from '../models/Group.js';
import UserGroup from '../models/UserGroup.js';

const dbInit = async () => {
  await User.sync();
  await Group.sync();
  await UserGroup.sync();
};

export default dbInit;
