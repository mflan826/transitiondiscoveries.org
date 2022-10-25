'use strick';

module.exports = function (app) {
  const User = app.models.User;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  const userData = {
    username: "tdadminuser",
    email: 'admin@transitiondiscoveries.org',
    password: 'M*=D6x/`>6^$'
  };

  const roleData = {
    name: 'admin'
  };

  User.find({ where: { username: 'tdadminuser' } }, function (error, user) {
    if (user.length) {
      return false;
    }

    User.create(userData, function (error, user) {
      if (error) {
        throw error;
      }

      console.log(user);

      Role.create(roleData, function (error, role) {
        if (error) {
          throw error;
        }

        console.log(role);

        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: user.id
        }, function (error, principal) {
          if (error) {
            throw error;
          }

          console.log(principal);
        });
      });
    });
  });
};