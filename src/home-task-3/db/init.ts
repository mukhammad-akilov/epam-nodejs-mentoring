import User from '../models/User.js';

const dbInit = async () => {
  await User.sync();
};

export default dbInit;
