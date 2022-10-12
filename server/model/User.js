const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        lowercase:true,
        required: true
    },
    profilePic:{
        type:String,
        default:'https://res.cloudinary.com/dcduqfohf/image/upload/v1665506783/7309681_tftx0n.jpg'
    },
    roles: {
        Viewer: {
            type: Number,
            default: 2001
        },
        Critic: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        lowercase: true,
        required: false
    },
    reviewcount:{
        type: Number,
        default: 0
    },
    addedMovies:{
        type:[{
            type:String,
            lowercase: true,
            ref:'movie'
        }]
    },
    reviewedMovies:{
        type:[
            {
                type:Schema.Types.ObjectId,
                ref:'movie',
            }
        ]
    },
    reviews:[{type:String,ref:"review"}],
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);