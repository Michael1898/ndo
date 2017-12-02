/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import Course from './Course';
import StudyEntity from './StudyEntity';
import CourseStudyEntity from './CourseStudyEntity';
import UserCourse from './UserCourse';
import Answer from './Answer';
import Mark from './Mark';

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Course.belongsToMany(StudyEntity, {
  as: 'studyEntities',
  through: {
    model: CourseStudyEntity,
  },
  foreignKey: 'courseId',
});

StudyEntity.belongsToMany(Course, {
  as: 'courses',
  through: {
    model: CourseStudyEntity,
  },
  foreignKey: 'seId',
});

User.belongsToMany(Course, {
  as: 'courses',
  through: {
    model: UserCourse,
  },
  foreignKey: 'uId',
});

Course.belongsToMany(User, {
  as: 'users',
  through: {
    model: UserCourse,
  },
  foreignKey: 'courseId',
});

User.hasMany(Answer);
StudyEntity.hasMany(Answer);
Course.hasMany(Answer);

Answer.belongsTo(User);
Answer.belongsTo(StudyEntity);
Answer.belongsTo(Course);

Answer.hasMany(Mark);
Mark.belongsTo(Answer);

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { User, UserLogin, UserClaim, UserProfile, Course, StudyEntity };
