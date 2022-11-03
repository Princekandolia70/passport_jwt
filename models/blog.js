//model defination its datatype and attribute define here
'use strict';

module.exports = (sequelize, DataTypes) => {
    const blogs = sequelize.define('blog', {
        title: {
            type : DataTypes.STRING(32),
            allowNull : false
        },
        content: {
            type : DataTypes.TEXT,
            allowNull : false
        },
        image: {
            type : DataTypes.TEXT
        },
    })
    module.exports = blogs
}
