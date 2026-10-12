let users = [
    {
        id: 1,
        name: "Hansaka",
        age: 25
    },
    {
        id: 2,
        name: "Kamal",
        age: 30
    }
];



const findAll = () => {
    return users;
};

const findById = (id) => {
    return users.find(user => user.id === id);
};

const create = (name, age) => {
    const id = users.length + 1;

    const user = {
        id,
        name,
        age
    };

    users.push(user);

    return user;
};


const update = (id, name, age) => {
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null;
    }

    const updatedUser = {
        id,
        name,
        age
    };

    users[index] = updatedUser;

    return updatedUser;
};


const updatePartial = (id,changes) => {

     const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null;
    }

    const updatedUser = {
        ...users[index],
        ...changes
    };

    users[index] = updatedUser;

    return updatedUser;

};


const remove = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return null;
    }

    const deletedUser = users[index];

    users.splice(index, 1);

    return deletedUser;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    updatePartial,
    remove
};