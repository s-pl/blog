var cloudinary = require('cloudinary').v2;

function upload(newPhoto) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(newPhoto, 
            { 
                folder: "UserPhoto"
            },
            (error, result) => { 
                if (error) {
                    reject(error);
                } else {
                    resolve(result.url);
                }
            }
        );
    });
}

module.exports = {
    upload
};
