//model defination its datatype and attribute define here
'use strict';

module.exports = (sequelize, DataTypes) => {
    const blogs = sequelize.define('blog', {
        title: DataTypes.STRING(112),
        content: DataTypes.TEXT,
        image: DataTypes.TEXT
    })
    module.exports = blogs
}
