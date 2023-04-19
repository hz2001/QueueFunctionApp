module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    // console.log("req:",req)
    context.bindings.myQueueItem = [req.query.image_upload_url]; // the image_upload_url should be sync with the express app /
    return {
        body: req.query.image_upload_url
    };
}
