const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');
const axios = require('axios');

const { PetType } = require('../schema');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPet: {
      type: PetType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        ownerId: { type: GraphQLID }
      },
      async resolve(parentValue, args) {
        const { name, age, ownerId } = args;
        try {
          const newPet = await axios.post(`http://localhost:3000/pets`, {
            name,
            age,
            ownerId
          });
          return newPet.data;
        } catch (err) {
          console.log(err);
        }
      }
    },
    deletePet: {
      type: PetType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parentValue, { id }) {
        try {
          let removedPet = await axios.delete(
            `http://localhost:3000/pets/${id}`
          );
          return removedPet.data;
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
});

module.exports = mutation;
