const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID
} = require('graphql');
const { PetType, OwnerType } = require('../schema');
const axios = require('axios');
const mutation = require('./mutation');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    pet: {
      type: PetType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        try {
          let pets = await axios.get(`http://localhost:3000/pets/${args.id}`);
          return pets.data;
        } catch (err) {
          console.log(err);
        }
      }
    },
    owner: {
      type: OwnerType,
      args: { id: { type: GraphQLID } },
      async resolve(pareventValue, args) {
        try {
          let owners = await axios.get(
            `http://localhost:3000/owners/${args.id}`
          );
          return owners.data;
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
