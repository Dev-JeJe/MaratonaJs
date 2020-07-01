module.exports = (sequelize, DataTypes) =>{

    const Link = sequelize.define('Link', {
        label : {
            type: DataTypes.STRING, //tipo do dado que vai vir do DateTypes
            allowNull : false, //não pode ser nulo
        },
        url : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        image : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        isSocial : {
            type: DataTypes.BOOLEAN,
            allowNull : false,
            default: 0,
        },
    });
    /* 
        agora preciso associar o link a conta
        OBS: uma conta pode ter varios links e um link pertence a uma conta
    */
    Link.associate = (models) => {
        Link.belongsTo(models.Account, {foreignKey: 'accountId'}); //a tabela link pertence a tabela accounts e o campo que as relaciona é accountId
    };
    
    return Link;
};