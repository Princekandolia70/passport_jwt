const yup = require('yup')

// schema for blogs
const addschema = yup.object({
    body: yup.object({
        title: yup.string().required(),
        content: yup.string().required(),
        blogImage: yup.string().optional()
    })
});

const updateSchema = yup.object({
    params: yup.object({
        id: yup.number().required().positive().integer(),
    }),
});

const deleteSchema = yup.object({
    params: yup.object({
        id: yup.number().required().positive().integer(),
    }),
});

module.exports = { addschema, updateSchema, deleteSchema }
