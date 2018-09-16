const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = require('graphql');

const axios = require('axios');

const OwnerType = new GraphQLObjectType({
  name: 'Owner',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    fact: { type: GraphQLString },
    pets: {
      type: new GraphQLList(PetType),
      async resolve(parentValue, args) {
        try {
          let ownerPets = await axios.get(
            `http://localhost:3000/owners/${parentValue.id}/pets`
          );
          return ownerPets.data;
        } catch (err) {
          console.log(err);
        }
      }
    }
  })
});

const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    species: { type: GraphQLString },
    owner: {
      type: OwnerType,
      async resolve(parentValue, args) {
        try {
          let ownerInfo = await axios.get(
            `http://localhost:3000/owners/${parentValue.ownerId}`
          );
          return ownerInfo.data;
        } catch (err) {
          console.log(err);
        }
      }
    }
  })
});

module.exports = { PetType, OwnerType };
