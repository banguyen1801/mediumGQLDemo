const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = require('graphql');

const axios = require('axios');

const OwnerType = new GraphQLObjectType({
  name: 'Owner',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    fact: { type: GraphQLString }
  }
});

const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    species: { type: GraphQLString },
    owner: {
      type: OwnerType,
      async resolve(parentValue, args) {
        // console.log(parentValue);
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
  }
});

module.exports = { PetType, OwnerType };
