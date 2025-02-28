const getMetadataInfo = (req) => {
    return {
        account_id: req.user.account_id,
        current_datetime: req.datetime
    };
};

module.exports = {
    getMetadataInfo
};
