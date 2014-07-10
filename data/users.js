db.users.drop();

db.users.insert([
  {
    "firstName" : "Steve",
    "lastName" : "Patterson",
    "username" : "stevep",
    "salt" : "9dXOoWrsUeL8xWfrHJzBfVu0OcwvWKyltCcUpfdB+JcZJR0RGK1sT+fjuDREggns4RV9A3kHwImgU9lMQvg90BiKVV3/DL2DKq2U6KpnYQyaoaeKP3swsKXMuU7C8ms25tE6jUId2tfAfjBMv1hzF9da1uNmWc93tIdQCn7EmJw=",
    "hashed_pwd" : "ed69ce5d80c9600e0f7edf5d68f7ac7dac442730",
    "roles" : [ "admin" ],
    "contexts": [ ]
  }
]);

