import User from '../models/User.js';
import Group from '../models/Group.js';

const dbInit = async () => {
  await User.sync();
  await Group.sync();
};

export default dbInit;
