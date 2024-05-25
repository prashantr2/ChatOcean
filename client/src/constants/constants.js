export const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export const PHOTO_SIZE_LIMIT = 10;
export const VIDEO_SIZE_LIMIT = 20;
export const PHOTO_ACCEPTABLE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];
export const VIDEO_ACCEPTABLE_EXTENSIONS = ['.mp4', '.flv', '.wmv'];

export const asset = (src, type) => {
    const PF = '/public/';

    if (!src){
        switch (type){
            case 'profile':
                return PF+'logo.png';
            case 'cover':
                return PF+'cover.jpg';
            case 'video': 
                return PF+'videos/nature_video_2.mp4';
            case 'photo':
                return PF+'images/nature1.jpg';
            default:
                return ''; 
        }
    }
    return PF+src;
}

export const dummyPost = {
    _id: 'dummy',
}

export const addToFilesList = (oldArray, arr, type) => {
    let count = 0;
    let tempArr = [];
    for (let item of arr){
        if (!oldArray.find(i => i.file.name === item.name)){
            // Include in new array
            tempArr.push({ file: item, type: type });
            count++;
        }
    }
    return [count, [...oldArray, ...tempArr]];
}

export const validateFileSizes = (files, type) => {
    let fileSizes = [];
    for (let f of files){
        fileSizes.push(f.size / Math.pow(2, 20));
    }
    if (type === 'photo'){
        if (fileSizes.find(s => s > PHOTO_SIZE_LIMIT)){
            return false;
        }
        return true;
    } else {
        if (fileSizes.find(s => s > VIDEO_SIZE_LIMIT)){
            return false;
        }
        return true;
    }
}

export const validateFileExtensions = (files, type) => {
    let fileExtensions = [];
    for (let f of files){
        const temp = f.name.split('.');
        fileExtensions.push('.' + temp[temp.length - 1]); 
    }
    if (type === 'photo'){
        if (!fileExtensions.find(e => PHOTO_ACCEPTABLE_EXTENSIONS.includes(e))){
            return false;
        }
        return true;
    } else {
        if (!fileExtensions.find(e => VIDEO_ACCEPTABLE_EXTENSIONS.includes(e))){
            return false;
        }
        return true;
    }
}