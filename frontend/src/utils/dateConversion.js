function dateConversion(date){
    const convertedDate = new Date(date);
    return convertedDate.getUTCFullYear() + '-' +
    ('00' + (convertedDate.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + convertedDate.getUTCDate()).slice(-2)
}

export default dateConversion;